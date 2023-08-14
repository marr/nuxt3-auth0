import Auth0 from 'auth0';

export default defineEventHandler(async event => {

  const params = getQuery(event);

  if (params.error) {
    throw new Error(params.error.toString());
  }

  const { auth0, authSession } = useRuntimeConfig();

  const client = new Auth0.AuthenticationClient({
    domain: auth0.baseUrl,
    clientId: auth0.clientId,
  });

  const options = {
    code: params.code,
    redirect_uri: auth0.redirectUri,
  };

  if (params.org_id) {
    options.organization = params.org_id;
  }

  try {
    const userData = await client.oauth.authorizationCodeGrant(options);
    const profile = await client.getProfile(userData.access_token);
    await updateSession(event, authSession, profile);
    return sendRedirect(event, '/');
  } catch (err) {
    console.error(err);
    return createError(err.message)
  }

});