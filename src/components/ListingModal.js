/* ==========================================================================
   Re-Source — Listing Modal Component
   ========================================================================== */

export function renderListingModal() {
  return `
    <div id="listing-modal-overlay" class="modal-overlay">
      <div class="modal-content">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
          <h3 style="font-size:1.4rem;font-weight:800;">➕ Add New Surplus Listing</h3>
          <button id="close-modal-btn" class="btn btn-sm btn-ghost" style="border:none;font-size:1.2rem;">✕</button>
        </div>
        <form id="add-listing-form">
          <div class="form-group">
            <label class="form-label">Item Title</label>
            <input type="text" id="modal-name" class="form-input" placeholder="e.g. Steel Beams & Structural Pipes" required />
          </div>
          <div class="form-group">
            <label class="form-label">Category</label>
            <select id="modal-category" class="form-select">
              <option value="Building Materials">Building Materials</option>
              <option value="Industrial Equipment">Industrial Equipment</option>
              <option value="Office Furniture">Office Furniture</option>
              <option value="IT Hardware">IT Hardware</option>
              <option value="Machinery">Machinery</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Tools">Tools</option>
              <option value="Electronics">Electronics</option>
              <option value="Medical Equipment">Medical Equipment</option>
            </select>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-group">
              <label class="form-label">Price (AED)</label>
              <input type="number" id="modal-price" class="form-input" placeholder="2500" min="1" required />
            </div>
            <div class="form-group">
              <label class="form-label">Quantity</label>
              <input type="number" id="modal-qty" class="form-input" placeholder="50" min="1" required />
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-group">
              <label class="form-label">Location (Emirate)</label>
              <select id="modal-location" class="form-select">
                <option value="Dubai">Dubai</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Sharjah">Sharjah</option>
                <option value="Ajman">Ajman</option>
                <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                <option value="Fujairah">Fujairah</option>
                <option value="Umm Al Quwain">Umm Al Quwain</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Condition</label>
              <select id="modal-condition" class="form-select">
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea id="modal-desc" class="form-textarea" rows="3" placeholder="Provide details on condition, origin, specifications..." required></textarea>
          </div>
          <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px;">
            <button type="button" id="cancel-modal-btn" class="btn btn-ghost">Cancel</button>
            <button type="submit" class="btn btn-primary">Save & Publish Listing</button>
          </div>
        </form>
      </div>
    </div>
  `;
}
