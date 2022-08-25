export default defineNuxtPlugin((nuxt) => {
  const session = nuxt.ssrContext.event['req'].session;
  if (session && session.user) {
    useState("user", () => session.user);
  }
});