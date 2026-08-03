/* ==========================================================================
   Re-Source — Product Detail View Page
   ========================================================================== */

import { store } from '../store/state.js';
import { showToast } from '../components/Toast.js';

export function ProductDetailView(params) {
  const productId = parseInt(params.get('id')) || 1;
  const product = store.state.products.find(p => p.id === productId) || store.state.products[0];

  if (!product) {
    return `
      <div class="container section" style="text-align:center;">
        <h2>Product Not Found</h2>
        <a href="#/marketplace" class="btn btn-primary" style="margin-top:20px;">Back to Marketplace</a>
      </div>
    `;
  }

  return `
    <section class="section">
      <div class="container">
        <a href="#/marketplace" class="btn btn-ghost" style="margin-bottom:24px;">← Back to Marketplace</a>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:40px;background:var(--bg-card);padding:30px;border-radius:var(--radius-lg);border:1px solid var(--border-light);box-shadow:var(--shadow-sm);">
          <div>
            <div style="width:100%;height:380px;border-radius:var(--radius-md);background-size:cover;background-position:center;background-image:url('${product.image || '/assets/build.jpg'}');border:1px solid var(--border-light);"></div>
          </div>
          <div style="display:flex;flex-direction:column;">
            <div style="display:flex;gap:10px;margin-bottom:12px;">
              <span class="badge badge-orange">${product.category}</span>
              <span class="badge badge-teal">📍 ${product.location}</span>
              <span class="badge badge-verified">Verified Supplier</span>
            </div>
            <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:14px;color:var(--text-main);">${product.name}</h1>
            <p style="color:var(--text-muted);font-size:1.05rem;line-height:1.6;margin-bottom:20px;">${product.description}</p>
            
            <div style="background:var(--bg-surface);padding:16px;border-radius:var(--radius-md);margin-bottom:24px;">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:0.95rem;">
                <div><span style="color:var(--text-muted);">Condition:</span> <b>${product.condition || 'Good'}</b></div>
                <div><span style="color:var(--text-muted);">Stock Available:</span> <b>${product.quantity} units</b></div>
                <div><span style="color:var(--text-muted);">Posted Date:</span> <b>${product.created_date || '2025-10-01'}</b></div>
                <div><span style="color:var(--text-muted);">Verification:</span> <b style="color:#22c55e;">Trade License Approved</b></div>
              </div>
            </div>

            <div style="margin-top:auto;padding-top:20px;border-top:1px solid var(--border-light);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;">
              <div>
                <span style="font-size:0.85rem;color:var(--text-muted);display:block;">Unit Price</span>
                <span style="font-size:2rem;font-weight:900;color:var(--accent-orange);">AED ${Number(product.price).toLocaleString()}</span>
              </div>
              <div style="display:flex;align-items:center;gap:12px;">
                <label for="order-qty" style="font-weight:600;font-size:0.9rem;">Qty:</label>
                <input type="number" id="order-qty" class="form-input" style="width:80px;text-align:center;" value="1" min="1" max="${product.quantity}" />
                <button id="buy-now-btn" class="btn btn-primary">Procure Surplus Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function bindProductDetailEvents(params) {
  const productId = parseInt(params.get('id')) || 1;
  const product = store.state.products.find(p => p.id === productId) || store.state.products[0];
  const buyBtn = document.getElementById('buy-now-btn');
  const qtyInput = document.getElementById('order-qty');

  if (buyBtn && product) {
    buyBtn.onclick = () => {
      const qty = Math.min(Math.max(1, parseInt(qtyInput.value) || 1), product.quantity);
      const total = qty * product.price;

      store.addOrder({
        productName: product.name,
        quantity: qty,
        totalPrice: total,
        sellerLocation: product.location
      });

      showToast(`Order Placed! Purchased ${qty} × ${product.name} for AED ${total.toLocaleString()}`, 'success');
      setTimeout(() => {
        window.location.hash = '#/marketplace';
      }, 1500);
    };
  }
}
