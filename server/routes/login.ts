import Iron from '@hapi/iron';
import { randomBytes } from 'crypto';

export default eventHandler(async (event) => {
  const { auth0, cookieName } = useRuntimeConfig();
  const loginUrl = new URL("/authorize?", auth0.issuer);

  const nonce = randomBytes(15).toString('base64');

  const loginUrlQuery = new URLSearchParams({
    client_id: auth0.clientId,
    client_secret: auth0.clientSecret,
    redirect_uri: auth0.redirectUri,
    response_type: "code",
    scope: "openid profile email",
    audience: auth0.audience,
    state: nonce
  });

  if (auth0.orgId) {
    loginUrlQuery.append('organization', auth0.orgId);
  }

  const { redirectTo } = getQuery(event);
  if (redirectTo) {
    const sealedCookie = await Iron.seal(
      { nonce, redirectTo },
      auth0.clientSecret,
      Iron.defaults
    );
    setCookie(event, cookieName, sealedCookie);
  }

  return sendRedirect(event, loginUrl + loginUrlQuery.toString());
});
