import texts from '../../data/texts.json';

export async function renderTextDetail(container, params) {
  const item = texts.find(t => t.slug === params.slug);

  if (!item) {
    container.innerHTML = `<div class="container"><p>Texto não encontrado.</p><a href="/">Voltar para a Home</a></div>`;
    return;
  }

  container.innerHTML = `
    <div class="text-detail-container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Início</a>
        <span class="breadcrumb-separator">/</span>
        <a href="/biblioteca">Biblioteca</a>
        <span class="breadcrumb-separator">/</span>
        <span style="color: var(--color-text-primary);">${item.category}</span>
      </nav>

      <!-- Header -->
      <div class="text-detail-header">
        <span class="text-category-badge">${item.category}</span>
        <h1 class="text-detail-title">${item.title}</h1>
        <div class="text-detail-meta">Publicado em: ${item.date}</div>
      </div>

      <!-- Content -->
      <div class="text-detail-intro">
        ${item.intro}
      </div>

      <div class="text-detail-body">
        ${item.content}
      </div>
    </div>
  `;
}
