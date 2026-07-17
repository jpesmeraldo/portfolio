export default function handler(req, res) {
  const client_id = process.env.OAUTH_CLIENT_ID;
  // Dynamically resolve protocol and host for callback redirection
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host;
  const redirect_uri = `${protocol}://${host}/api/callback`;
  
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo&redirect_uri=${redirect_uri}`;
  res.redirect(url);
}
