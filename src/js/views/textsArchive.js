import texts from '../../data/texts.json';

export async function renderTextsArchive(container) {
  // Get all unique categories for filters
  const categories = ['Todos', ...new Set(texts.map(t => t.category))];

  function renderFeed(filterCategory = 'Todos') {
    const filteredTexts = filterCategory === 'Todos' 
      ? texts 
      : texts.filter(t => t.category === filterCategory);

    return filteredTexts.map(t => `
      <div class="text-feed-item" onclick="window.location.hash = '#/texto/${t.slug}'">
        <div class="text-feed-header">
          <span class="text-feed-category">${t.category}</span>
          <span class="text-feed-date">${t.date}</span>
        </div>
        <h3 class="text-feed-title">${t.title}</h3>
        <p class="text-feed-excerpt">${t.intro}</p>
      </div>
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
