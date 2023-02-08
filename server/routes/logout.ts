
export default eventHandler(event => {
  const config = useRuntimeConfig();

  deleteCookie(event, config.cookieName);

  const logoutUrl = new URL('/v2/logout?', config.auth0.issuer);
  const logoutUrlParams = new URLSearchParams({
    client_id: config.auth0.clientId,
    returnTo: config.public.siteUrl 
  })

  return sendRedirect(event, logoutUrl + logoutUrlParams.toString());
});