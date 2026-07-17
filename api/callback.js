export default async function handler(req, res) {
  const { code } = req.query;
  const client_id = process.env.OAUTH_CLIENT_ID;
  const client_secret = process.env.OAUTH_CLIENT_SECRET;
  
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host;
  const redirect_uri = `${protocol}://${host}/api/callback`;

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
        redirect_uri,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).send(`Authentication error: ${data.error_description || data.error}`);
    }

    const token = data.access_token;
    
    // Output HTML page with script to post the token back to Decap CMS and close the popup
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Autenticado</title>
        </head>
        <body>
          <script>
            const sender = window.opener || window.parent;
            const responseData = {
              token: "${token}",
              provider: "github"
            };
            sender.postMessage('authorization:github:success:' + JSON.stringify(responseData), '*');
            window.close();
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`Server error during authentication callback: ${error.message}`);
  }
}
