import cases from '../../data/cases.json';

export async function renderCaseDetail(container, params) {
  const allCases = Array.isArray(cases) ? cases : (cases.cases || []);
  const item = allCases.find(c => c.slug === params.slug);
  
  if (!item) {
    container.innerHTML = `<div class="container"><p>Caso não encontrado.</p><a href="#/">Voltar para a Home</a></div>`;
    return;
  }

  // Generate gallery items
  const galleryHtml = (item.gallery && Array.isArray(item.gallery)) ? item.gallery.map(media => {
    if (media.type === 'vimeo') {
      return `
        <div class="gallery-item">
          <div class="gallery-video-wrapper">
            <iframe src="https://player.vimeo.com/video/${media.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479" 
                    title="${media.caption}" 
                    frameborder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen 
                    style="width: 100%; height: 100%; border: none;"></iframe>
          </div>
          <span class="gallery-caption">${media.caption}</span>
        </div>
      `;
    } else if (media.type === 'youtube') {
      return `
        <div class="gallery-item">
          <div class="gallery-video-wrapper">
            <iframe src="https://www.youtube.com/embed/${media.youtubeId}" 
                    title="${media.caption}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen 
                    style="width: 100%; height: 100%; border: none;"></iframe>
          </div>
          <span class="gallery-caption">${media.caption}</span>
        </div>
      `;
    } else if (media.type === 'video') {
      // Map file path. If the video is in public folder or root, link it.
      return `
        <div class="gallery-item">
          <div class="gallery-video-wrapper">
            <video controls preload="metadata" playsinline>
              <source src="${media.src}" type="video/mp4">
              <source src="${media.src}" type="video/quicktime">
              Seu navegador não suporta a reprodução de vídeo.
            </video>
          </div>
          <span class="gallery-caption">${media.caption}</span>
        </div>
      `;
    } else {
      return `
        <div class="gallery-item">
          <div style="background-color: var(--color-bg-secondary); aspect-ratio: 16/10; width: 100%; display: flex; align-items: center; justify-content: center; border: 1px solid var(--color-border);">
            <div style="padding: 2rem; text-align: center; color: var(--color-text-muted);">
              [Visualização Editorial de Portfólio: ${media.caption}]
            </div>
          </div>
          <span class="gallery-caption">${media.caption}</span>
        </div>
      `;
    }
  }).join('') : '';

  container.innerHTML = `
    <div class="container" style="padding-top: var(--space-md);">
      <!-- Breadcrumb -->
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Início</a>
        <span class="breadcrumb-separator">/</span>
        <a href="/cases">Cases</a>
        <span class="breadcrumb-separator">/</span>
        <span style="color: var(--color-text-primary); font-weight: 500;">${item.client}</span>
      </nav>

      <!-- Header -->
      <div class="case-detail-header">
        <h1 class="case-detail-title">${item.title}</h1>
      </div>

      ${item.image ? `
        <div class="case-cover-container" style="margin-bottom: var(--space-md);">
          <img src="${item.image.startsWith('/') ? item.image : '/' + item.image}" alt="${item.title}" style="width: 100%; max-height: 480px; object-fit: cover; border-radius: 4px; border: 1px solid var(--color-border);" />
        </div>
      ` : ''}

      <!-- Grid layout: Meta Sidebar + Main body -->
      <div class="editorial-grid">
        <div class="case-meta-sidebar">
          <div class="meta-item">
            <span class="meta-label">Cliente</span>
            <span class="meta-value">${item.client}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Categoria</span>
            <span class="meta-value">${item.category}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Ano</span>
            <span class="meta-value">${item.year}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Atuação</span>
            <span class="meta-value" style="font-size: 0.95rem; font-weight: 300; line-height: 1.4;">${item.role}</span>
          </div>
        </div>

        <div class="case-main-body">
          <div class="case-section">
            <h2 class="case-section-title">Contexto</h2>
            <div class="case-section-content">${item.context}</div>
          </div>
          
          <div class="case-section">
            <h2 class="case-section-title">Desafio</h2>
            <div class="case-section-content">${item.challenge}</div>
          </div>

          <div class="case-section">
            <h2 class="case-section-title">Estratégia</h2>
            <div class="case-section-content">${item.strategy}</div>
          </div>

          <div class="case-section">
            <h2 class="case-section-title">Solução Desenvolvida</h2>
            <div class="case-section-content">${item.solution}</div>
          </div>

          <div class="case-section">
            <h2 class="case-section-title">Resultados e Impacto</h2>
            <div class="case-section-content">${item.results}</div>
          </div>
        </div>
      </div>

      <!-- Gallery -->
      ${galleryHtml ? `
        <div class="case-gallery">
          <h2 class="case-section-title">Peças e Demonstrações</h2>
          ${galleryHtml}
        </div>
      ` : ''}
    </div>
  `;
}
