/**
 * Simple client-side History API router for the SPA portfolio.
 */
export class Router {
  constructor(routes, containerId) {
    this.routes = routes;
    this.container = document.getElementById(containerId);
    this.currentPath = null;

    // Listen to history popstate (e.g. back/forward buttons)
    window.addEventListener('popstate', () => this.handleRouting());
    window.addEventListener('load', () => this.handleRouting());

    // Intercept clicks on links globally
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href && link.host === window.location.host) {
        // Skip default navigation for standard SPA routes, but let admin bypass
        if (!link.getAttribute('target') && !link.pathname.startsWith('/admin')) {
          e.preventDefault();
          const targetPath = link.pathname + link.search + link.hash;
          this.navigate(targetPath);
        }
      }
    });
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRouting();
  }

  handleRouting() {
    let path = window.location.pathname || '/';
    
    // Support routing to sections on the homepage (e.g. /sobre, /especialidades)
    let sectionId = '';
    const basePaths = ['sobre', 'especialidades', 'metodologia', 'contato', 'cases', 'depoimentos', 'clientes'];
    const parts = path.split('/');
    if (parts.length === 2 && basePaths.includes(parts[1])) {
      sectionId = parts[1];
      path = '/';
    }

    this.currentPath = path;
    this.updateActiveNavLinks();

    // Match route
    let matchedRoute = null;
    let params = {};

    for (const route of this.routes) {
      const routeRegex = route.path.replace(/:\w+/g, '([^/]+)');
      const match = path.match(new RegExp(`^${routeRegex}$`));
      
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
      this.container.innerHTML = `<div class="view-fade" id="current-view"></div>`;
      const viewContainer = document.getElementById('current-view');
      
      matchedRoute.render(viewContainer, params).then(() => {
        if (sectionId) {
          const element = document.getElementById(sectionId);
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            return;
          }
        }
        window.scrollTo(0, 0);
      });
    } else {
      // Fallback to home
      this.navigate('/');
    }
  }

  updateActiveNavLinks() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      const linkPath = link.pathname;
      if (linkPath === this.currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
