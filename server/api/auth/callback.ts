import Iron from "@hapi/iron";
import * as jose from "jose";

export default defineEventHandler(async event => {
  const {
    AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_COOKIE_NAME,
    AUTH0_REDIRECT_URI,
  } = process.env;

  const params = useQuery(event.req);

  if (params.error) {
    throw new Error(params.error as string);
  }
  const body = JSON.stringify({
    grant_type: "authorization_code",
    client_id: AUTH0_CLIENT_ID,
    client_secret: AUTH0_CLIENT_SECRET,
    code: params.code,
    redirect_uri: AUTH0_REDIRECT_URI,
  }).toString()

  const data = await fetch(`${AUTH0_ISSUER_BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body
  });

  const { access_token, id_token, scope, expires_in, token_type } =
    await data.json();

  const JWKS = jose.createRemoteJWKSet(
    new URL(`${AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`)
  );

  const { payload: user } = await jose.jwtVerify(id_token, JWKS, {
    issuer: `${AUTH0_ISSUER_BASE_URL}/`,
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
    AUTH0_CLIENT_SECRET,
    Iron.defaults
  );

  const date = new Date();
  date.setDate(date.getDate() + 1);

  event.res.writeHead(302, {
    "Set-cookie": `${AUTH0_COOKIE_NAME}=${sealedCookie}; Path=/; Secure; HttpOnly; SameSite=Lax; Expires=${date.toUTCString()}`,
    Location: "/",
  });
  event.res.end();
});