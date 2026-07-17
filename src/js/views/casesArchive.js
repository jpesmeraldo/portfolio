import cases from '../../data/cases.json';

export async function renderCasesArchive(container) {
  // Get all unique categories for filters
  const categories = ['Todos', ...new Set(cases.map(c => c.category))];

  function renderGrid(filterCategory = 'Todos') {
    const filteredCases = filterCategory === 'Todos' 
      ? cases 
      : cases.filter(c => c.category === filterCategory);

    return filteredCases.map(c => `
      <a href="/case/${c.slug}" class="case-card">
        <div class="case-card-image">
          <div style="padding: 2rem; text-align: center;">
            <span style="font-family: var(--font-serif); font-size: 1.25rem; font-style: italic; color: var(--color-accent);">${c.client}</span>
          </div>
        </div>
        <div class="case-card-meta">
          <span>${c.category}</span>
          <span>${c.year}</span>
        </div>
        <h3 class="case-card-title">${c.title}</h3>
      </a>
    `).join('');
  }

  container.innerHTML = `
    <div class="container archive-title-section">
      <span class="section-label">Portfólio</span>
      <h1 class="archive-title">Cases de Comunicação Estratégica</h1>
      <p style="max-width: 600px; color: var(--color-text-secondary); margin-bottom: var(--space-md);">
        Estudos de caso detalhando o diagnóstico, posicionamento e redação desenvolvidos para marcas corporativas e campanhas públicas.
      </p>
    </div>

    <div class="container">
      <div class="filter-bar-container">
        ${categories.map(cat => `
          <button class="filter-btn ${cat === 'Todos' ? 'active' : ''}" data-category="${cat}">${cat}</button>
        `).join('')}
      </div>

      <div class="editorial-grid" style="margin-top: var(--space-md);">
        <div class="archive-grid" id="cases-grid-container">
          ${renderGrid()}
        </div>
      </div>
    </div>
  `;

  // Bind filter button click events
  const buttons = container.querySelectorAll('.filter-btn');
  const gridContainer = container.querySelector('#cases-grid-container');

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active from all
      buttons.forEach(b => b.classList.remove('active'));
      // Add active to clicked
      e.target.classList.add('active');
      
      const selectedCategory = e.target.getAttribute('data-category');
      gridContainer.innerHTML = renderGrid(selectedCategory);
    });
  });
}
