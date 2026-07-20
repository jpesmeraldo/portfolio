export default async function handler(req, res) {
  const { code } = req.query;
  const client_id = process.env.OAUTH_CLIENT_ID;
  const client_secret = process.env.OAUTH_CLIENT_SECRET;
  
  if (!client_id || !client_secret) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(500).send(`
      <h2>Erro de Configuração</h2>
      <p>As variáveis de ambiente <strong>OAUTH_CLIENT_ID</strong> ou <strong>OAUTH_CLIENT_SECRET</strong> estão ausentes na Vercel.</p>
    `);
  }

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
      res.setHeader('Content-Type', 'text/html');
      return res.status(400).send(`
        <h2>Erro de Autenticação do GitHub</h2>
        <p><strong>Erro:</strong> ${data.error}</p>
        <p><strong>Descrição:</strong> ${data.error_description || 'Nenhuma descrição fornecida.'}</p>
      `);
    }

    const token = data.access_token;
    
    // Output HTML page with script to post the token back to Decap CMS and close the popup
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Autenticado com Sucesso</title>
          <style>
            body { font-family: sans-serif; text-align: center; padding: 2rem; color: #333; }
            .spinner { border: 4px solid rgba(0,0,0,0.1); width: 36px; height: 36px; border-radius: 50%; border-left-color: #09f; animation: spin 1s linear infinite; margin: 1rem auto; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          </style>
        </head>
        <body>
          <h3>Autenticação concluída!</h3>
          <p>Conectando ao painel do portfólio...</p>
          <div class="spinner"></div>
          <script>
            const sender = window.opener || window.parent;
            if (sender) {
              const responseData = {
                token: "${token}",
                provider: "github"
              };
              sender.postMessage('authorization:github:success:' + JSON.stringify(responseData), '*');
              setTimeout(() => {
                window.close();
              }, 1000);
            } else {
              document.body.innerHTML = '<h3>Erro</h3><p>Não foi possível encontrar a janela principal do painel.</p>';
            }
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`Server error during authentication callback: ${error.message}`);
  }
}
