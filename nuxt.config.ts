// https://nuxt.com/docs/getting-started/configuration
export default defineNuxtConfig({
  modules: ["@nuxt/ui"],
  runtimeConfig: {
    auth0: {
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
      orgId: process.env.AUTH0_ORG_ID,
      redirectUri: process.env.AUTH0_REDIRECT_URI,
    },
    cookieName: '__session',
    public: {
      siteUrl: 'http://localhost:3000'
    }
  },
  typescript: {
    shim: false
  },
})
