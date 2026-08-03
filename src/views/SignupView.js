/* ==========================================================================
   Re-Source — Signup & Trade License Verification Page
   ========================================================================== */

import { store } from '../store/state.js';
import { showToast } from '../components/Toast.js';

export function SignupView() {
  return `
    <section class="section" style="min-height:80vh;display:flex;align-items:center;">
      <div class="container" style="max-width:550px;">
        <div style="background:var(--bg-card);padding:36px;border-radius:var(--radius-lg);box-shadow:var(--shadow-md);border:1px solid var(--border-light);">
          <div style="text-align:center;margin-bottom:24px;">
            <span class="badge badge-teal" style="margin-bottom:8px;">B2B Enterprise Onboarding</span>
            <h1 style="font-size:1.8rem;font-weight:800;margin-bottom:6px;">Create Re-Source Account</h1>
            <p style="color:var(--text-muted);font-size:0.9rem;">Trade License verification is required for security</p>
          </div>

          <form id="signup-form">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" id="signup-name" class="form-input" placeholder="e.g. Mohammed Siraj" required />
            </div>

            <div class="form-group">
              <label class="form-label">Company Name (LLC / FZ / Establishment)</label>
              <input type="text" id="signup-company" class="form-input" placeholder="e.g. Emirates General Trading LLC" required />
            </div>

            <div class="form-group">
              <label class="form-label">Official Business Email</label>
              <input type="email" id="signup-email" class="form-input" placeholder="info@company.ae" required />
            </div>

            <div class="form-group">
              <label class="form-label">Upload Valid Trade License (PDF / JPG)</label>
              <input type="file" id="signup-license" class="form-input" accept=".pdf,image/*" required />
              <small style="color:var(--text-muted);font-size:0.8rem;display:block;margin-top:4px;">
                Verified against DED / Free Zone Economic Registers within 24 hours.
              </small>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div class="form-group">
                <label class="form-label">Password</label>
                <input type="password" id="signup-pass" class="form-input" placeholder="••••••••" required />
              </div>
              <div class="form-group">
                <label class="form-label">Confirm Password</label>
                <input type="password" id="signup-confirm" class="form-input" placeholder="••••••••" required />
              </div>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%;margin-top:10px;">Submit for Trade License Verification →</button>
          </form>

          <div style="text-align:center;margin-top:20px;font-size:0.9rem;color:var(--text-muted);">
            Already verified? <a href="#/login" style="color:var(--accent-teal);font-weight:700;">Log In</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function bindSignupEvents() {
  const form = document.getElementById('signup-form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const company = document.getElementById('signup-company').value;
      const email = document.getElementById('signup-email').value;
      const pass = document.getElementById('signup-pass').value;
      const confirm = document.getElementById('signup-confirm').value;

      if (pass !== confirm) {
        showToast('Passwords do not match!', 'error');
        return;
      }

      store.setUser({
        company: company,
        email: email,
        tradeLicense: 'TRD-PENDING-AE (Under Verification)',
        username: email.split('@')[0]
      });

      showToast(`Account created for ${company}! Redirecting...`, 'success');
      setTimeout(() => {
        window.location.hash = '#/profile';
      }, 1200);
    };
  }
}
