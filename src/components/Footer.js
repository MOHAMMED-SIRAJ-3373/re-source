/* ==========================================================================
   Re-Source — Footer Component
   ========================================================================== */

export function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <h4>Re-Source UAE</h4>
            <p style="font-size:0.9rem;line-height:1.6;color:rgba(255,255,255,0.7);">
              The premier B2B surplus inventory marketplace connecting enterprises, contractors, and SMEs across all 7 Emirates.
            </p>
          </div>
          <div class="footer-col">
            <h4>Emirates Coverage</h4>
            <ul class="footer-links">
              <li>Dubai & Abu Dhabi</li>
              <li>Sharjah & Ajman</li>
              <li>Ras Al Khaimah</li>
              <li>Fujairah & Umm Al Quwain</li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Services</h4>
            <ul class="footer-links">
              <li>Surplus Inventory Trading</li>
              <li>Bulk Equipment Procurement</li>
              <li>Verified B2B Verification</li>
              <li>ESG Carbon Impact Audit</li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contact Support</h4>
            <ul class="footer-links">
              <li>📧 support@resource.ae</li>
              <li>📞 +971 4 800 SURPLUS</li>
              <li>📍 Business Bay, Dubai, UAE</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} Re-Source UAE — B2B Circular Economy Platform | Deployed on GitHub Pages</p>
        </div>
      </div>
    </footer>
  `;
}
