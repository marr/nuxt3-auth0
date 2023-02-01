export default eventHandler((event) => {
  const { auth0 } = useRuntimeConfig();
  const loginUrl = new URL("/authorize?", auth0.issuer);
  const loginUrlQuery = new URLSearchParams({
    client_id: auth0.clientId,
    client_secret: auth0.clientSecret,
    redirect_uri: auth0.redirectUri,
    response_type: "code",
    scope: "openid profile email",
    audience: auth0.audience,
  });

  if (auth0.orgId) {
    loginUrlQuery.append('organization', auth0.orgId);
  }

  return sendRedirect(event, loginUrl + loginUrlQuery.toString());
});
