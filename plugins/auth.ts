export default defineNuxtPlugin(async (nuxtApp) => {
  const { data, refresh } = await useFetch<{ email?: string }>('/api/session', { key: 'session' });
  const loggedIn: Ref<Boolean> = computed(() => !!data.value?.email);

  addRouteMiddleware(
    "auth",
    (to) => {
      if (to.meta.auth && !loggedIn.value) {
        return "/login";
      }
    },
    { global: true }
  );

  const currentRoute = useRoute();

  if (loggedIn.value && currentRoute.path === "/login") {
    await navigateTo("/");
  }

  return {
    provide: {
      auth: {
        session: data,
        updateSession: refresh
      }
    }
  }
});