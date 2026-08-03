/* ==========================================================================
   Re-Source — Application Entry Point
   ========================================================================== */

import './css/main.css';
import { store } from './store/state.js';
import { Router } from './router.js';
import { renderNavbar, bindNavbarEvents } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';

// Views
import { HomeView, bindHomeEvents } from './views/HomeView.js';
import { MarketplaceView, bindMarketplaceEvents } from './views/MarketplaceView.js';
import { ProductDetailView, bindProductDetailEvents } from './views/ProductDetailView.js';
import { ProfileView, bindProfileEvents } from './views/ProfileView.js';
import { LoginView, bindLoginEvents } from './views/LoginView.js';
import { SignupView, bindSignupEvents } from './views/SignupView.js';

// Initialize Theme Class
if (store.state.theme === 'dark') {
  document.body.classList.add('dark-theme');
}

// Router Setup
const routes = {
  '/': HomeView,
  '/marketplace': MarketplaceView,
  '/product': ProductDetailView,
  '/profile': ProfileView,
  '/login': LoginView,
  '/signup': SignupView
};

const router = new Router(routes, 'app-view');

// Post-Render View Listener for Event Binding & Shell Elements
window.addEventListener('view-rendered', (e) => {
  const { path, params } = e.detail;

  // Render Shell Elements
  const headerEl = document.getElementById('app-header');
  const footerEl = document.getElementById('app-footer');

  if (headerEl) {
    headerEl.innerHTML = renderNavbar();
    bindNavbarEvents();
  }

  if (footerEl) {
    footerEl.innerHTML = renderFooter();
  }

  // Bind View-Specific Events
  if (path === '/') bindHomeEvents();
  if (path === '/marketplace') bindMarketplaceEvents();
  if (path === '/product') bindProductDetailEvents(params);
  if (path === '/profile') bindProfileEvents();
  if (path === '/login') bindLoginEvents();
  if (path === '/signup') bindSignupEvents();
});

// Store Subscription Re-render
store.subscribe(() => {
  const headerEl = document.getElementById('app-header');
  if (headerEl) {
    headerEl.innerHTML = renderNavbar();
    bindNavbarEvents();
  }
});
