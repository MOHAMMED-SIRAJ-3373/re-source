/* ==========================================================================
   Re-Source — Carbon Tracker Widget
   ========================================================================== */

export function renderCarbonTracker() {
  return `
    <div class="carbon-widget">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <h3 style="font-size:1.2rem;font-weight:800;display:flex;align-items:center;gap:8px;">
            🌿 Carbon Emissions & Impact Tracker
          </h3>
          <p style="font-size:0.9rem;color:var(--text-muted);margin-top:4px;">
            Estimated monthly business emissions saved through surplus reuse: <b>2.3 tonnes CO₂</b>
          </p>
        </div>
        <span class="badge badge-teal" style="font-size:0.9rem;">Goal: -20% by 2026</span>
      </div>
      <div class="bar-bg">
        <div class="bar-fill" style="width:68%;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--text-muted);margin-top:8px;">
        <span>Current Baseline: 3.4t</span>
        <span>Target Goal: 1.8t CO₂</span>
      </div>
    </div>
  `;
}
