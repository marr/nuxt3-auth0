export default defineOAuthAuth0EventHandler({
  config: {
    emailRequired: true,
    scope: ['profile email openid']
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        login: user.nickname || user.email,
        picture: user.picture
      },
      loggedInAt: new Date(),
    })
    return sendRedirect(event, '/')
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  },
})