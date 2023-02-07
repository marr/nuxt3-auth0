import Iron from "@hapi/iron";
import * as jose from "jose";

export default defineEventHandler(async event => {
  const params = getQuery(event);

  if (params.error) {
    throw new Error(params.error.toString());
  }

  const { auth0, cookieName }= useRuntimeConfig();

  const body = JSON.stringify({
    grant_type: "authorization_code",
    client_id: auth0.clientId,
    client_secret: auth0.clientSecret,
    code: params.code,
    redirect_uri: auth0.redirectUri,
  }).toString()

  const data = await fetch(`${auth0.issuer}/oauth/token`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body
  });

  const { access_token, id_token, scope, expires_in, token_type } =
    await data.json();

  const JWKS = jose.createRemoteJWKSet(
    new URL(`${auth0.issuer}/.well-known/jwks.json`)
  );

  const { payload: user } = await jose.jwtVerify(id_token, JWKS, {
    issuer: `${auth0.issuer}/`,
  });

  const cookie = {
    user,
    id_token,
    access_token,
    scope,
    expires_in,
    token_type,
  };

  const sealedCookie = await Iron.seal(
    cookie,
    auth0.clientSecret,
    Iron.defaults
  );

  const date = new Date();
  date.setDate(date.getDate() + 1);

  setCookie(event, cookieName, sealedCookie, {
    path: '/',
    secure: false, // TODO: Infer this from config
    httpOnly: true,
    sameSite: 'lax',
    expires: date
  });

  return sendRedirect(event, '/');
});