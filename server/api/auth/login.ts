export default async (req, res) => {
  const {
    AUTH0_AUDIENCE,
    AUTH0_CLIENT_ID,
    AUTH0_ISSUER_BASE_URL,
    AUTH0_REDIRECT_URI,
  } = process.env;

  const loginUrl = `${AUTH0_ISSUER_BASE_URL}/authorize?response_type=code&client_id=${AUTH0_CLIENT_ID}&redirect_uri=${AUTH0_REDIRECT_URI}&scope=openid%20profile%20email&audience=${AUTH0_AUDIENCE}`;

  res.writeHead(302, {
    Location: loginUrl,
  });
  res.end();
};