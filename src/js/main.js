import '../css/main.css';
import '../css/components/home.css';
import '../css/components/detail.css';
import '../css/components/library.css';

import { Router } from './router.js';
import { renderHome } from './views/home.js';
import { renderCaseDetail } from './views/caseDetail.js';
import { renderTextDetail } from './views/textDetail.js';
import { renderCasesArchive } from './views/casesArchive.js';
import { renderTextsArchive } from './views/textsArchive.js';

// Define routing map
const routes = [
  { path: '/', render: renderHome },
  { path: '/cases', render: renderCasesArchive },
  { path: '/case/:slug', render: renderCaseDetail },
  { path: '/biblioteca', render: renderTextsArchive },
  { path: '/texto/:slug', render: renderTextDetail },
];

// Initialize Router
const router = new Router(routes, 'app');

// --- Global UI Features ---

// Back-to-top button behavior
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Fallback scroll progress bar for browsers without native support
if (!CSS.supports('animation-timeline', 'scroll()')) {
  const progress = document.querySelector('#progress');
  if (progress) {
    window.addEventListener('scroll', () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progressPercentage = scrollable > 0 ? (scrolled / scrollable) : 0;
      progress.style.transform = `scaleX(${progressPercentage})`;
    });
  }
}

// --- Dark / Light Theme Switching ---
const themeToggleBtn = document.getElementById('theme-toggle');

function getPreferredTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Initialize Theme
setTheme(getPreferredTheme());

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
}

// Fallback shrinking header for browsers without native support
if (!CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)')) {
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.backgroundColor = 'var(--color-bg-primary)';
        header.querySelector('.header-container').style.height = '60px';
      } else {
        header.style.backgroundColor = 'var(--color-bg-primary)';
        header.querySelector('.header-container').style.height = '80px';
      }
    });
  }
}
