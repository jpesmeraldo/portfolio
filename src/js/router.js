/**
 * Simple client-side hash router for the SPA portfolio.
 */
export class Router {
  constructor(routes, containerId) {
    this.routes = routes;
    this.container = document.getElementById(containerId);
    this.currentPath = null;

    window.addEventListener('hashchange', () => this.handleRouting());
    window.addEventListener('load', () => this.handleRouting());
  }

  handleRouting() {
    let hash = window.location.hash || '#/';
    
    // Support routing to sections on the homepage (e.g. #/about, #/specialties)
    let sectionId = '';
    if (hash.startsWith('#/') && hash.length > 2 && !hash.includes('/case/') && !hash.includes('/texto/')) {
      const parts = hash.split('/');
      if (parts.length === 2 && ['sobre', 'especialidades', 'metodologia', 'contato', 'cases', 'depoimentos'].includes(parts[1])) {
        sectionId = parts[1];
        hash = '#/';
      }
    }

    this.currentPath = hash;
    this.updateActiveNavLinks();

    // Match route
    let matchedRoute = null;
    let params = {};

    for (const route of this.routes) {
      const routeRegex = route.path.replace(/:\w+/g, '([^/]+)');
      const match = hash.match(new RegExp(`^${routeRegex}$`));
      
      if (match) {
        matchedRoute = route;
        if (route.path.includes(':')) {
          const paramNames = [...route.path.matchAll(/:(\w+)/g)].map(m => m[1]);
          paramNames.forEach((name, index) => {
            params[name] = match[index + 1];
          });
        }
        break;
      }
    }

    if (matchedRoute) {
      // Clear container and render
      this.container.innerHTML = `<div class="view-fade" id="current-view"></div>`;
      const viewContainer = document.getElementById('current-view');
      
      matchedRoute.render(viewContainer, params).then(() => {
        // If we routed to a section on home
        if (sectionId) {
          const element = document.getElementById(sectionId);
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            return;
          }
        }
        
        // Scroll to top by default
        window.scrollTo(0, 0);
      });
    } else {
      // Fallback to home
      window.location.hash = '#/';
    }
  }

  updateActiveNavLinks() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === this.currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
