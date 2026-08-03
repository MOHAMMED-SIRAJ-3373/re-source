/* ==========================================================================
   Re-Source — Navbar Component
   ========================================================================== */

import { store } from '../store/state.js';

export function renderNavbar() {
  const user = store.state.user;
  const activeHash = window.location.hash || '#/';

  return `
    <nav class="navbar">
      <div class="container nav-container">
        <a href="#/" class="nav-brand">
          <img src="/assets/logo1.png" alt="Re-Source Logo" class="nav-logo-img" onerror="this.src='/logo1.png'" />
          <span>Re-Source <small style="font-size:0.7rem;color:var(--accent-cyan);font-weight:400;">UAE</small></span>
        </a>

        <div class="nav-links">
          <a href="#/" class="nav-link ${activeHash === '#/' ? 'active' : ''}">Home</a>
          <a href="#/marketplace" class="nav-link ${activeHash.includes('#/marketplace') ? 'active' : ''}">Marketplace</a>
          
          ${user ? `
            <a href="#/profile" class="nav-link ${activeHash === '#/profile' ? 'active' : ''}">Dashboard</a>
            <button id="nav-logout-btn" class="btn btn-sm btn-ghost" style="color:var(--text-light);">Logout</button>
          ` : `
            <a href="#/login" class="nav-link ${activeHash === '#/login' ? 'active' : ''}">Login</a>
            <a href="#/signup" class="btn btn-sm btn-primary">Sign Up</a>
          `}

          <button id="theme-toggle-btn" class="btn-theme-toggle" title="Toggle Light/Dark Theme">
            ${store.state.theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  `;
}

export function bindNavbarEvents() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.onclick = () => store.toggleTheme();
  }

  const logoutBtn = document.getElementById('nav-logout-btn');
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      store.logout();
      window.location.hash = '#/login';
    };
  }
}
