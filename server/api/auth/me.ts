export default eventHandler(async event => {
  const data = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`, {
    headers: {
      Authorization: `Bearer ${event.context.session.access_token}`,
    },
  });
  return await data.json();
});