import Iron, { Password } from "@hapi/iron";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const cookie = getCookie(event, config.cookieName);
  if (cookie) {
    event.context.session = await Iron.unseal(
      cookie,
      config.auth0.clientSecret,
      Iron.defaults
    );
  }
});
