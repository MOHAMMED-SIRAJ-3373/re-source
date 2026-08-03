/* ==========================================================================
   Re-Source — Login & Authentication View Page
   ========================================================================== */

import { store } from '../store/state.js';
import { showToast } from '../components/Toast.js';

export function LoginView() {
  return `
    <section class="section" style="min-height:80vh;display:flex;align-items:center;">
      <div class="container" style="max-width:450px;">
        <div style="background:var(--bg-card);padding:36px;border-radius:var(--radius-lg);box-shadow:var(--shadow-md);border:1px solid var(--border-light);">
          <div style="text-align:center;margin-bottom:24px;">
            <h1 style="font-size:1.8rem;font-weight:800;margin-bottom:6px;">Login to Re-Source</h1>
            <p style="color:var(--text-muted);font-size:0.9rem;">Access your UAE B2B Surplus Account</p>
          </div>

          <form id="login-form">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" id="login-email" class="form-input" placeholder="company@domain.ae" value="contact@versatileglobal.ae" required />
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" id="login-password" class="form-input" placeholder="••••••••" value="password123" required />
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;margin-top:10px;">Login to Dashboard →</button>
          </form>

          <div style="text-align:center;margin-top:20px;font-size:0.9rem;color:var(--text-muted);">
            Don't have a verified enterprise account? <a href="#/signup" style="color:var(--accent-teal);font-weight:700;">Sign Up</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function bindLoginEvents() {
  const form = document.getElementById('login-form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      
      store.setUser({
        company: 'Versatile Global Trading LLC',
        email: email,
        tradeLicense: 'TRD-98421-AE (Verified)',
        username: email.split('@')[0]
      });

      showToast('Login successful! Welcome back.', 'success');
      window.location.hash = '#/profile';
    };
  }
}
