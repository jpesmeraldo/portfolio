import texts from '../../data/texts.json';
import profile from '../../data/profile.json';
import { formatDatePT } from '../utils.js';

export async function renderTextDetail(container, params) {
  const allTexts = Array.isArray(texts) ? texts : (texts.texts || []);
  const item = allTexts.find(t => t.slug === params.slug);

  if (!item) {
    container.innerHTML = `<div class="container"><p>Texto não encontrado.</p><a href="/">Voltar para a Home</a></div>`;
    return;
  }

  const linkedinUrl = profile.contact ? profile.contact.linkedin : 'https://www.linkedin.com/in/jpesmeraldo/';

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

      <!-- Cover Image & Caption (LinkedIn Article Style Hero Image) -->
      ${item.image ? `
        <div class="article-hero-cover-container">
          <img src="${item.image.startsWith('/') ? item.image : '/' + item.image}" alt="${item.title}" class="article-hero-cover-img" />
          ${item.imageCaption ? `<div class="article-cover-caption">${item.imageCaption}</div>` : ''}
        </div>
      ` : ''}

      <!-- Header & Author Meta -->
      <div class="text-detail-header">
        <span class="text-category-badge">${item.category}</span>
        <h1 class="text-detail-title">${item.title}</h1>
        
        <!-- Author Profile Bar (LinkedIn / Editorial Style) -->
        <div class="article-author-bar">
          <img src="/assets/images/foto_quem_sou_bege.png" alt="João Paulo Esmeraldo" class="article-author-avatar" />
          <div class="article-author-info">
            <div class="article-author-name">
              João Paulo Esmeraldo
              <a href="${linkedinUrl}" target="_blank" class="article-linkedin-badge" title="Perfil no LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
            </div>
            <div class="article-author-role">Redator Sênior & Estrategista de Comunicação</div>
            <div class="article-date">${formatDatePT(item.date)}</div>
          </div>
        </div>
      </div>

      <!-- Intro -->
      ${item.intro ? `
        <div class="text-detail-intro">
          ${item.intro}
        </div>
      ` : ''}

      <!-- Body -->
      <div class="text-detail-body">
        ${item.content}
      </div>
    </div>
  `;
}
