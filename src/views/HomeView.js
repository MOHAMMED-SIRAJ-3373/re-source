/* ==========================================================================
   Re-Source — Home View Page
   ========================================================================== */

import { showToast } from '../components/Toast.js';

export function HomeView() {
  return `
    <section class="hero">
      <div class="container hero-content">
        <span class="badge badge-teal" style="background:rgba(255,255,255,0.15);color:#fff;margin-bottom:16px;">
          🇦🇪 Proudly Serving the United Arab Emirates
        </span>
        <h1 class="hero-title">
          UAE's Go-To B2B Marketplace <span class="accent">For Surplus Inventory</span>
        </h1>
        <p class="hero-subtitle">
          Connecting verified enterprises, contractors, and suppliers across all seven Emirates. Buy and sell quality surplus stock with confidence, speed, and complete transparency.
        </p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
          <a href="#/marketplace" class="btn btn-primary">Browse Marketplace →</a>
          <a href="#/signup" class="btn btn-ghost" style="color:#fff;border-color:rgba(255,255,255,0.3);">Register Company</a>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="stats-grid">
        <div>
          <div class="stat-val">5,000+</div>
          <div class="stat-lbl">Active Listings</div>
        </div>
        <div>
          <div class="stat-val">800+</div>
          <div class="stat-lbl">Verified UAE Companies</div>
        </div>
        <div>
          <div class="stat-val">AED 20M+</div>
          <div class="stat-lbl">Transaction Volume</div>
        </div>
        <div>
          <div class="stat-val">98%</div>
          <div class="stat-lbl">Satisfaction Rate</div>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Why UAE Businesses Trade on Re-Source</h2>
        <p class="section-subtitle">
          Re-Source transforms how companies handle excess materials. Our platform bridges storage gaps and helps businesses monetize unused assets.
        </p>
        <div class="cards-grid">
          <div class="product-card" style="padding:24px;cursor:default;">
            <div style="font-size:2.5rem;margin-bottom:12px;">🌱</div>
            <h3 class="card-title">Sustainability & ESG</h3>
            <p class="card-desc">Encourages material reuse, supporting circular economy targets across the UAE construction and commercial sectors.</p>
          </div>
          <div class="product-card" style="padding:24px;cursor:default;">
            <div style="font-size:2.5rem;margin-bottom:12px;">🤝</div>
            <h3 class="card-title">SME Cost Savings</h3>
            <p class="card-desc">Allows local businesses to procure high-grade materials at discounts up to 60% below standard wholesale price.</p>
          </div>
          <div class="product-card" style="padding:24px;cursor:default;">
            <div style="font-size:2.5rem;margin-bottom:12px;">🔒</div>
            <h3 class="card-title">Verified B2B Network</h3>
            <p class="card-desc">Every seller and buyer submits valid UAE trade licenses to ensure authentic enterprise-level transactions.</p>
          </div>
          <div class="product-card" style="padding:24px;cursor:default;">
            <div style="font-size:2.5rem;margin-bottom:12px;">🚀</div>
            <h3 class="card-title">Fast Logistics</h3>
            <p class="card-desc">Optimized delivery routes across Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Emirates Interactive Region Section -->
    <section class="section" style="background:var(--bg-card);border-top:1px solid var(--border-light);border-bottom:1px solid var(--border-light);">
      <div class="container" style="text-align:center;">
        <h2 class="section-title">Serving All Seven Emirates</h2>
        <p class="section-subtitle">Click an Emirate to filter surplus inventory locally</p>
        <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:20px;">
          ${['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'].map(emirate => `
            <button class="btn btn-ghost emirate-pill-btn" data-emirate="${emirate}" style="border-radius:999px;">
              📍 ${emirate}
            </button>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Goals Timeline Section -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Our Vision for UAE Trade</h2>
        <p class="section-subtitle">Empowering smarter resource movement nationwide</p>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-icon">♻️</div>
            <div class="timeline-content">
              <h3>Circular Economy Integration</h3>
              <p>Ensuring excess construction, electrical, and commercial materials stay in motion rather than ending up in regional landfills.</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-icon">🏗️</div>
            <div class="timeline-content">
              <h3>Empower Local Contractors</h3>
              <p>Giving small and medium enterprises direct access to discounted surplus materials from major UAE infrastructure developments.</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-icon">🌍</div>
            <div class="timeline-content">
              <h3>UAE Vision 2031 Alignment</h3>
              <p>Pioneering sustainable economic practices and digital transparency across regional supply chains.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function bindHomeEvents() {
  document.querySelectorAll('.emirate-pill-btn').forEach(btn => {
    btn.onclick = () => {
      const emirate = btn.getAttribute('data-emirate');
      showToast(`Filtered marketplace by ${emirate}!`, 'info');
      window.location.hash = `#/marketplace?search=${encodeURIComponent(emirate)}`;
    };
  });
}
