export default function handler(req, res) {
  const client_id = process.env.OAUTH_CLIENT_ID;
  
  if (!client_id) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(500).send(`
      <h2>Erro de Configuração</h2>
      <p>A variável de ambiente <strong>OAUTH_CLIENT_ID</strong> não foi configurada na Vercel.</p>
      <p>Por favor, certifique-se de adicioná-la nas configurações do projeto da Vercel e realizar o <strong>Redeploy</strong> da aplicação.</p>
    `);
  }

  // Dynamically resolve protocol and host for callback redirection
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host;
  const redirect_uri = `${protocol}://${host}/api/callback`;
  
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo&redirect_uri=${redirect_uri}`;
  res.redirect(url);
}
