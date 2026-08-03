/* ==========================================================================
   Re-Source — Hash SPA Router (GitHub Pages Compatible)
   ========================================================================== */

export class Router {
  constructor(routes, containerId = 'app-view') {
    this.routes = routes;
    this.containerId = containerId;
    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  getRouteInfo() {
    const hash = window.location.hash || '#/';
    const [pathWithHash, queryString] = hash.split('?');
    const path = pathWithHash.replace('#', '') || '/';
    const params = new URLSearchParams(queryString || '');

    return { path, params };
  }

  handleRoute() {
    const { path, params } = this.getRouteInfo();
    const viewFn = this.routes[path] || this.routes['/'];

    const container = document.getElementById(this.containerId);
    if (container) {
      // Scroll to top on route change
      window.scrollTo(0, 0);
      container.innerHTML = viewFn(params);
      
      // Dispatch custom event for post-render hook
      window.dispatchEvent(new CustomEvent('view-rendered', { detail: { path, params } }));
    }
  }

  navigate(path) {
    window.location.hash = `#${path}`;
  }
}
