import texts from '../../data/texts.json';

export async function renderTextsArchive(container) {
  const allTexts = Array.isArray(texts) ? texts : (texts.texts || []);

  // Get all unique categories for filters
  const categories = ['Todos', ...new Set(allTexts.map(t => t.category))];

  function renderFeed(filterCategory = 'Todos') {
    const filteredTexts = filterCategory === 'Todos' 
      ? allTexts 
      : allTexts.filter(t => t.category === filterCategory);

    return filteredTexts.map(t => `
      <a href="/texto/${t.slug}" class="text-feed-item">
        <div class="text-feed-main">
          <div class="text-feed-header">
            <span class="text-feed-category">${t.category}</span>
            <span class="text-feed-date">${t.date}</span>
          </div>
          <h3 class="text-feed-title">${t.title}</h3>
          <p class="text-feed-excerpt">${t.intro}</p>
        </div>
        ${t.image ? `
          <div class="text-feed-thumbnail-wrapper">
            <img src="${t.image.startsWith('/') ? t.image : '/' + t.image}" alt="${t.title}" class="text-feed-thumbnail" />
          </div>
        ` : ''}
      </a>
    `).join('');
  }

  container.innerHTML = `
    <div class="container archive-title-section">
      <span class="section-label">Biblioteca</span>
      <h1 class="archive-title">Biblioteca de Redação</h1>
      <p style="max-width: 600px; color: var(--color-text-secondary); margin-bottom: var(--space-md);">
        Manifestos, discursos, artigos opinativos e roteiros conceituais. Uma amostra do estilo de redação e arquitetura de mensagens.
      </p>
    </div>

    <div class="container">
      <div class="filter-bar-container">
        ${categories.map(cat => `
          <button class="filter-btn ${cat === 'Todos' ? 'active' : ''}" data-category="${cat}">${cat}</button>
        `).join('')}
      </div>

      <div class="editorial-grid" style="margin-top: var(--space-md);">
        <div class="texts-feed" id="texts-feed-container">
          ${renderFeed()}
        </div>
      </div>
    </div>
  `;

  // Bind filter events
  const buttons = container.querySelectorAll('.filter-btn');
  const feedContainer = container.querySelector('#texts-feed-container');

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      buttons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      const selectedCategory = e.target.getAttribute('data-category');
      feedContainer.innerHTML = renderFeed(selectedCategory);
    });
  });
}
