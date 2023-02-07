export default defineNuxtRouteMiddleware(() => {
  if (!useUser().value) {
    return navigateTo('/login', { external: true });
  }
});