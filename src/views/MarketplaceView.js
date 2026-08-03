/* ==========================================================================
   Re-Source — Marketplace View Page
   ========================================================================== */

import { store } from '../store/state.js';
import { renderProductCard } from '../components/ProductCard.js';

export function MarketplaceView(params) {
  const initialSearch = params.get('search') || '';
  const initialCategory = params.get('category') || 'all';

  return `
    <section class="section" style="padding-top:40px;">
      <div class="container">
        <div style="text-align:center;margin-bottom:30px;">
          <h1 style="font-size:2.4rem;font-weight:800;">Browse UAE Surplus Marketplace</h1>
          <p style="color:var(--text-muted);">Explore quality verified inventory from businesses across all seven Emirates</p>
        </div>

        <!-- Filter Controls Bar -->
        <div style="background:var(--bg-card);padding:20px;border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);border:1px solid var(--border-light);margin-bottom:30px;">
          <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:center;">
            <div style="flex:1;min-width:240px;">
              <input type="search" id="marketplace-search" class="form-input" placeholder="Search by title, location, description..." value="${initialSearch}" />
            </div>
            <div style="width:200px;">
              <select id="marketplace-category" class="form-select">
                <option value="all" ${initialCategory === 'all' ? 'selected' : ''}>All Categories</option>
                <option value="Building Materials" ${initialCategory === 'Building Materials' ? 'selected' : ''}>Building Materials</option>
                <option value="Industrial Equipment" ${initialCategory === 'Industrial Equipment' ? 'selected' : ''}>Industrial Equipment</option>
                <option value="Office Furniture" ${initialCategory === 'Office Furniture' ? 'selected' : ''}>Office Furniture</option>
                <option value="IT Hardware" ${initialCategory === 'IT Hardware' ? 'selected' : ''}>IT Hardware</option>
                <option value="Machinery" ${initialCategory === 'Machinery' ? 'selected' : ''}>Machinery</option>
                <option value="Vehicles" ${initialCategory === 'Vehicles' ? 'selected' : ''}>Vehicles</option>
                <option value="Tools" ${initialCategory === 'Tools' ? 'selected' : ''}>Tools</option>
                <option value="Electronics" ${initialCategory === 'Electronics' ? 'selected' : ''}>Electronics</option>
                <option value="Medical Equipment" ${initialCategory === 'Medical Equipment' ? 'selected' : ''}>Medical Equipment</option>
              </select>
            </div>
            <div style="width:180px;">
              <select id="marketplace-sort" class="form-select">
                <option value="default">Sort by: Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </div>
            <button id="marketplace-reset-btn" class="btn btn-ghost">Clear Filters</button>
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;font-size:0.9rem;color:var(--text-muted);">
          <span id="results-count">Showing products...</span>
          <span>Verified B2B Direct Trade</span>
        </div>

        <!-- Products Grid -->
        <div id="products-grid-container" class="cards-grid"></div>

        <!-- Empty State -->
        <div id="empty-state" style="display:none;text-align:center;padding:60px 20px;background:var(--bg-card);border-radius:var(--radius-lg);margin-top:20px;">
          <div style="font-size:3rem;margin-bottom:10px;">🔍</div>
          <h3 style="font-size:1.4rem;font-weight:700;">No products match your criteria</h3>
          <p style="color:var(--text-muted);margin-top:6px;">Try adjusting your search terms or clearing category filters.</p>
        </div>
      </div>
    </section>
  `;
}

export function bindMarketplaceEvents() {
  const searchInput = document.getElementById('marketplace-search');
  const categorySelect = document.getElementById('marketplace-category');
  const sortSelect = document.getElementById('marketplace-sort');
  const resetBtn = document.getElementById('marketplace-reset-btn');
  const gridContainer = document.getElementById('products-grid-container');
  const emptyState = document.getElementById('empty-state');
  const resultsCount = document.getElementById('results-count');

  function renderGrid() {
    const q = (searchInput.value || '').toLowerCase().trim();
    const cat = (categorySelect.value || 'all').toLowerCase();
    const sort = sortSelect.value;

    let filtered = store.state.products.filter(p => {
      const matchText = (p.name + ' ' + p.description + ' ' + p.location + ' ' + p.category).toLowerCase();
      const textMatches = q === '' || matchText.includes(q);
      const categoryMatches = cat === 'all' || p.category.toLowerCase() === cat;
      return textMatches && categoryMatches;
    });

    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);

    resultsCount.textContent = `Showing ${filtered.length} surplus product${filtered.length === 1 ? '' : 's'}`;

    if (filtered.length === 0) {
      gridContainer.innerHTML = '';
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
      gridContainer.innerHTML = filtered.map(renderProductCard).join('');
    }
  }

  [searchInput, categorySelect, sortSelect].forEach(el => {
    if (el) el.oninput = renderGrid;
  });

  if (resetBtn) {
    resetBtn.onclick = () => {
      searchInput.value = '';
      categorySelect.value = 'all';
      sortSelect.value = 'default';
      renderGrid();
    };
  }

  renderGrid();
}
