/* ==========================================================================
   Re-Source — Profile / Company Dashboard View Page
   ========================================================================== */

import { store } from '../store/state.js';
import { renderCarbonTracker } from '../components/CarbonTracker.js';
import { renderListingModal } from '../components/ListingModal.js';
import { showToast } from '../components/Toast.js';

export function ProfileView() {
  const user = store.state.user || {
    company: 'Versatile Global Trading LLC',
    email: 'contact@versatileglobal.ae',
    tradeLicense: 'TRD-98421-AE (Verified)',
    username: 'versatile_global'
  };

  const listings = store.state.userListings;

  return `
    <section class="section">
      <div class="container" style="max-width:1000px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:30px;flex-wrap:wrap;gap:16px;">
          <div>
            <h1 style="font-size:2.2rem;font-weight:800;">${user.company}</h1>
            <span class="badge badge-teal" style="margin-top:6px;">Verified UAE Trade Entity</span>
          </div>
          <div style="display:flex;gap:12px;">
            <button id="add-listing-modal-trigger" class="btn btn-orange">➕ Post New Listing</button>
            <button id="profile-logout-btn" class="btn btn-ghost">Logout</button>
          </div>
        </div>

        <!-- Account Info Card -->
        <div style="background:var(--bg-card);padding:24px;border-radius:var(--radius-lg);border:1px solid var(--border-light);box-shadow:var(--shadow-sm);margin-bottom:30px;">
          <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:16px;border-left:4px solid var(--accent-teal);padding-left:10px;">
            🏢 Corporate Identity & Trade License
          </h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:16px;font-size:0.95rem;">
            <div><span style="color:var(--text-muted);">Company Name:</span><br><b>${user.company}</b></div>
            <div><span style="color:var(--text-muted);">Email Address:</span><br><b>${user.email}</b></div>
            <div><span style="color:var(--text-muted);">Trade License No:</span><br><b style="color:var(--accent-teal);">${user.tradeLicense || 'TRD-88912-AE'}</b></div>
            <div><span style="color:var(--text-muted);">Account Role:</span><br><b>Surplus Supplier & Buyer</b></div>
          </div>
        </div>

        <!-- ESG Carbon Tracker Widget -->
        ${renderCarbonTracker()}

        <!-- User Listings Section -->
        <div style="background:var(--bg-card);padding:24px;border-radius:var(--radius-lg);border:1px solid var(--border-light);box-shadow:var(--shadow-sm);margin-top:30px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
            <h3 style="font-size:1.2rem;font-weight:700;border-left:4px solid var(--accent-orange);padding-left:10px;">
              📦 Your Active Surplus Listings
            </h3>
            <span style="font-size:0.9rem;color:var(--text-muted);">${listings.length} Active Items</span>
          </div>

          <div class="cards-grid">
            ${listings.map(item => `
              <div class="product-card" style="cursor:default;">
                <div class="card-img-wrap" style="background-image:url('${item.img}');height:160px;">
                  <span class="badge ${item.sold ? 'badge-orange' : 'badge-teal'}" style="position:absolute;top:10px;right:10px;">
                    ${item.sold ? 'SOLD' : 'ACTIVE'}
                  </span>
                </div>
                <div class="card-body" style="padding:14px;">
                  <h4 style="font-size:1.05rem;font-weight:700;">${item.name}</h4>
                  <p style="font-size:0.85rem;color:var(--text-muted);margin:4px 0;">Qty: ${item.qty} | 📍 ${item.loc}</p>
                  <button class="btn btn-sm btn-ghost toggle-sold-btn" data-id="${item.id}" style="margin-top:10px;width:100%;">
                    Toggle Status (${item.sold ? 'Mark Available' : 'Mark Sold'})
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    ${renderListingModal()}
  `;
}

export function bindProfileEvents() {
  const triggerBtn = document.getElementById('add-listing-modal-trigger');
  const modalOverlay = document.getElementById('listing-modal-overlay');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-modal-btn');
  const addForm = document.getElementById('add-listing-form');
  const logoutBtn = document.getElementById('profile-logout-btn');

  if (triggerBtn && modalOverlay) {
    triggerBtn.onclick = () => modalOverlay.classList.add('active');
  }

  function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove('active');
  }

  if (closeModalBtn) closeModalBtn.onclick = closeModal;
  if (cancelModalBtn) cancelModalBtn.onclick = closeModal;

  if (addForm) {
    addForm.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('modal-name').value;
      const category = document.getElementById('modal-category').value;
      const price = parseFloat(document.getElementById('modal-price').value) || 100;
      const quantity = parseInt(document.getElementById('modal-qty').value) || 1;
      const location = document.getElementById('modal-location').value;
      const condition = document.getElementById('modal-condition').value;
      const description = document.getElementById('modal-desc').value;

      store.addProduct({
        name, category, price, quantity, location, condition, description,
        image: '/assets/build.jpg'
      });

      closeModal();
      showToast(`New surplus listing "${name}" published successfully!`, 'success');
      window.location.hash = '#/marketplace';
    };
  }

  document.querySelectorAll('.toggle-sold-btn').forEach(btn => {
    btn.onclick = () => {
      const id = parseInt(btn.getAttribute('data-id'));
      store.toggleListingSold(id);
      showToast('Listing status updated!', 'info');
      // Re-render
      window.dispatchEvent(new Event('hashchange'));
    };
  });

  if (logoutBtn) {
    logoutBtn.onclick = () => {
      store.logout();
      showToast('Logged out of Re-Source Dashboard', 'info');
      window.location.hash = '#/login';
    };
  }
}
