// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    auth0: {
      audience: '',
      baseUrl: '',
      clientId: '',
      redirectUri: ''
    },
    authSession: {
      name: 'nuxt-auth',
      password: ''
    }
  }
})
