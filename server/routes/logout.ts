export default defineEventHandler(async event => {
  const { auth0, authSession } = useRuntimeConfig();

  await clearSession(event, authSession);

  const logoutUrl = new URL('/v2/logout?', auth0.audience);
  const logoutUrlParams = new URLSearchParams({
    client_id: auth0.clientId,
    returnTo: 'http://localhost:3000/login'
  })

  return sendRedirect(event, logoutUrl + logoutUrlParams.toString());
});