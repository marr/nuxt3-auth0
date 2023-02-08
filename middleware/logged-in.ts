export default defineNuxtRouteMiddleware((to) => {
  const { siteUrl } = useRuntimeConfig().public;
  if (!useUser().value) {
    const redirectTo = `?redirectTo=${siteUrl}` + to.path;
    return navigateTo(`${siteUrl}/login` + redirectTo, { external: true });
  }
});