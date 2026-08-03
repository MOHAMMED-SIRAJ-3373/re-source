/* ==========================================================================
   Re-Source — Product Card Component
   ========================================================================== */

export function renderProductCard(product) {
  return `
    <div class="product-card" onclick="window.location.hash='#/product?id=${product.id}'">
      <div class="card-img-wrap" style="background-image: url('${product.image || '/assets/build.jpg'}');">
        <span class="badge badge-teal" style="position:absolute;top:12px;left:12px;background:rgba(15,23,42,0.85);color:#fff;">
          📍 ${product.location}
        </span>
        <span class="badge badge-verified" style="position:absolute;top:12px;right:12px;">
          Verified
        </span>
      </div>
      <div class="card-body">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span class="badge badge-orange">${product.category}</span>
          <span style="font-size:0.8rem;color:var(--text-muted);font-weight:600;">Qty: ${product.quantity}</span>
        </div>
        <h3 class="card-title">${product.name}</h3>
        <p class="card-desc">${product.description}</p>
        <div class="card-footer">
          <div>
            <span style="font-size:0.75rem;color:var(--text-muted);display:block;">Price</span>
            <span class="card-price">AED ${Number(product.price).toLocaleString()}</span>
          </div>
          <button class="btn btn-sm btn-primary">View Details →</button>
        </div>
      </div>
    </div>
  `;
}
