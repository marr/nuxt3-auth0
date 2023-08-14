import { randomBytes } from 'crypto';

export default defineEventHandler((event) => {
  const { auth0 } = useRuntimeConfig();
  const loginUrl = new URL("/authorize?", auth0.audience);

  const nonce = randomBytes(15).toString('base64');

  const loginUrlQuery = new URLSearchParams({
    client_id: auth0.clientId,
    redirect_uri: auth0.redirectUri,
    response_type: "code",
    scope: "openid profile email",
    audience: auth0.audience,
    state: nonce
  });

  if (auth0.orgId) {
    loginUrlQuery.append('organization', auth0.orgId);
  }

  return sendRedirect(event, loginUrl + loginUrlQuery.toString());
});
