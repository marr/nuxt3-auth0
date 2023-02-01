export default defineNuxtPlugin((nuxtApp) => {
  const { session } = nuxtApp.ssrContext?.event.context || {};
  if (session && session.user) {
    useState("user", () => session.user);
  }
});