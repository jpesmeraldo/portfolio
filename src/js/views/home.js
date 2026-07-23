import profile from '../../data/profile.json';
import cases from '../../data/cases.json';
import texts from '../../data/texts.json';

export async function renderHome(container) {
  const allCases = Array.isArray(cases) ? cases : (cases.cases || []);
  const allTexts = Array.isArray(texts) ? texts : (texts.texts || []);

  // Take last 3 cases and last 3 texts for highlights
  const recentCases = allCases.slice(0, 3);
  const recentTexts = allTexts.slice(0, 3);

  const specialtiesHtml = profile.specialties.map(spec => `
    <div class="specialty-card">
      <h3 class="specialty-title">${spec.title}</h3>
      <p class="specialty-desc">${spec.description}</p>
    </div>
  `).join('');

  const methodologyHtml = profile.methodology.map(step => `
    <div class="methodology-step">
      <span class="step-num">${step.step}</span>
      <h3 class="step-title">${step.name}</h3>
      <p class="step-desc">${step.description}</p>
    </div>
  `).join('');

  const casesHtml = recentCases.map(c => `
    <a href="/case/${c.slug}" class="case-card">
      <div class="case-card-image">
        <!-- Generates inline placeholder design or default editorial preview -->
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

  const textsHtml = recentTexts.map(t => `
    <a href="/texto/${t.slug}" class="text-feed-item">
      <div class="text-feed-header">
        <span class="text-feed-category">${t.category}</span>
        <span class="text-feed-date">${t.date}</span>
      </div>
      <h3 class="text-feed-title">${t.title}</h3>
      <p class="text-feed-excerpt">${t.intro}</p>
    </a>
  `).join('');

  const testimonialsHtml = profile.testimonials.map(test => `
    <div class="testimonial-card">
      <p class="testimonial-quote">“${test.quote}”</p>
      <div>
        <h4 class="testimonial-author">${test.author}</h4>
        <span class="testimonial-company">${test.company}</span>
      </div>
    </div>
  `).join('');

  const clientsHtml = profile.clients.map(client => `
    <li style="padding: var(--space-xs) 0; border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between;">
      <strong>${client.name}</strong>
      <span style="color: var(--color-text-muted); font-size: 0.9rem;">${client.sector}</span>
    </li>
  `).join('');

  container.innerHTML = `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container editorial-grid">
        <div class="hero-title-container">
          <h1 class="hero-tagline">${profile.tagline}</h1>
          <a href="/cases" class="hero-cta">Conheça meu trabalho</a>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="sobre" class="bg-sec">
      <div class="container editorial-grid">
        <div class="about-grid-left">
          <span class="section-label">Sobre Mim</span>
          <h2 style="font-size: 2.5rem; line-height: 1.2; margin-bottom: var(--space-md);">Quem sou, como penso e como trabalho.</h2>
          <div class="profile-image-container">
            <img src="/assets/images/foto_quem_sou_azul.png" alt="João Paulo Esmeraldo" class="profile-main-image" />
          </div>
        </div>
        <div class="about-grid-right">
          <p class="about-intro">${profile.about.intro}</p>
          <div class="about-paragraphs">
            <div class="about-section-block">
              <h3>Atuação & Clientes</h3>
              <p>${profile.about.who_am_i}</p>
            </div>
            <div class="about-section-block">
              <h3>Planejamento & Campanhas</h3>
              <p>${profile.about.how_i_think}</p>
            </div>
            <div class="about-section-block">
              <h3>Inovação & Startups</h3>
              <p>${profile.about.how_i_work}</p>
            </div>
            <div class="about-section-block">
              <h3>Foco & Resultados</h3>
              <p>${profile.about.why_hire_me}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Specialties Section -->
    <section id="especialidades">
      <div class="container editorial-grid">
        <div class="about-grid-left">
          <span class="section-label">Especialidades</span>
          <h2 style="font-size: 2.5rem; line-height: 1.2;">Áreas de atuação estratégica.</h2>
        </div>
        <div class="about-grid-right">
          <div class="specialties-grid">
            ${specialtiesHtml}
          </div>
        </div>
      </div>
    </section>

    <!-- Cases Highlights Section -->
    <section id="cases" class="bg-sec">
      <div class="container">
        <div class="cases-section-header">
          <div>
            <span class="section-label">Cases de Sucesso</span>
            <h2 style="font-size: 2.5rem;">Trabalhos em Destaque</h2>
          </div>
          <a href="/cases" class="hero-cta" style="margin-top: 0;">Ver todos os cases</a>
        </div>
        <div class="editorial-grid" style="margin-top: var(--space-md);">
          <div class="cases-teaser-grid">
            ${casesHtml}
          </div>
        </div>
      </div>
    </section>

    <!-- Methodology Section -->
    <section id="metodologia">
      <div class="container">
        <span class="section-label">Metodologia</span>
        <h2 style="font-size: 2.5rem; margin-bottom: var(--space-md);">O Processo Estratégico</h2>
        <div class="editorial-grid">
          <div class="methodology-flow">
            ${methodologyHtml}
          </div>
        </div>
      </div>
    </section>

    <!-- Texts Highlight Section -->
    <section id="biblioteca" class="bg-sec">
      <div class="container">
        <div class="cases-section-header">
          <div>
            <span class="section-label">Biblioteca de Textos</span>
            <h2 style="font-size: 2.5rem;">Redação Estratégica e Peças Conceituais</h2>
          </div>
          <a href="/biblioteca" class="hero-cta" style="margin-top: 0;">Explorar Biblioteca</a>
        </div>
        <div class="editorial-grid" style="margin-top: var(--space-md);">
          <div class="texts-feed">
            ${textsHtml}
          </div>
        </div>
      </div>
    </section>

    <!-- Clients list Section -->
    <section id="clientes">
      <div class="container editorial-grid">
        <div class="about-grid-left">
          <span class="section-label">Clientes</span>
          <h2 style="font-size: 2.5rem; line-height: 1.2;">Quem confia na minha redação.</h2>
        </div>
        <div class="about-grid-right">
          <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-sm);">
            ${clientsHtml}
          </ul>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="depoimentos" class="bg-sec">
      <div class="container">
        <span class="section-label">Reconhecimento</span>
        <h2 style="font-size: 2.5rem; margin-bottom: var(--space-md);">Depoimentos e Avaliações</h2>
        <div class="editorial-grid">
          <div class="testimonials-grid">
            ${testimonialsHtml}
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contato">
      <div class="container editorial-grid">
        <div class="contact-grid-left">
          <span class="section-label">Contato</span>
          <h2 style="font-size: 2.5rem; line-height: 1.2; margin-bottom: var(--space-sm);">Vamos iniciar um projeto?</h2>
          <div class="profile-image-container" style="margin-bottom: var(--space-sm);">
            <img src="/assets/images/foto_contato_verde.png" alt="Contato João Paulo" class="profile-contact-image" />
          </div>
          <p style="color: var(--color-text-secondary);">
            Entre em contato para discutir posicionamento, discursos corporativos ou campanhas de comunicação de alto padrão.
          </p>
        </div>
        <div class="contact-grid-right">
          <div class="contact-channels">
            <a href="mailto:${profile.contact.email}" class="contact-link">
              <span>E-mail: ${profile.contact.email}</span>
            </a>
            <a href="${profile.contact.whatsapp}" target="_blank" class="contact-link">
              <span>WhatsApp: Conversar agora</span>
            </a>
            <a href="${profile.contact.linkedin}" target="_blank" class="contact-link">
              <span>LinkedIn Professional Profile</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}
