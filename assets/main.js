/* onlinembaedu.in — shared JS */
document.addEventListener('DOMContentLoaded', function () {
  // ── NAV HAMBURGER ──
  const ham = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  if (ham && links) {
    ham.addEventListener('click', function () {
      const open = links.classList.toggle('nav-open');
      ham.setAttribute('aria-expanded', open);
      Object.assign(links.style, open ? {
        display:'flex', flexDirection:'column', position:'absolute',
        top:'64px', left:'0', right:'0', background:'#fff',
        padding:'1rem 5%', gap:'1rem', zIndex:'199',
        borderBottom:'1px solid #D4E4E8', boxShadow:'0 8px 24px rgba(13,79,92,0.1)'
      } : { display:'none' });
    });
  }

  // ── ACTIVE NAV ──
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    const href = a.getAttribute('href') || '';
    if (href !== '/' && path.includes(href.replace(/\/index\.html$/, '').replace(/\.html$/, ''))) {
      a.classList.add('active');
    }
  });
});

// ── FAQ ──
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── LEAD FORM SUBMIT ──
function submitLead(e, formId, successId) {
  e.preventDefault();
  var form = document.getElementById(formId);
  var btn  = form.querySelector('button[type="submit"]');
  if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }

  // Collect all named fields
  var d = {};
  form.querySelectorAll('input[name], select[name]').forEach(function(el) {
    d[el.name] = el.value;
  });

  // Auto-attach source + UTM tracking
  var params = new URLSearchParams(window.location.search);
  d.sourceDomain  = window.location.hostname;
  d.sourcePage    = window.location.pathname;
  d.utmSource     = params.get('utm_source')   || '';
  d.utmMedium     = params.get('utm_medium')   || '';
  d.utmCampaign   = params.get('utm_campaign') || '';

  // POST to Vercel serverless function → Google Sheets
  fetch('/api/lead', {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(d)
  })
  .then(function(r) {
    if (!r.ok) {
      return r.json().then(function(errData) {
        throw new Error(errData.detail || errData.error || 'Server error ' + r.status);
      });
    }
    return r.json();
  })
  .then(function(res) {
    if (form) form.style.display = 'none';
    var s = document.getElementById(successId);
    if (s)   s.style.display = 'block';
    if (btn) { btn.textContent = 'Done'; btn.disabled = false; }
  })
  .catch(function(err) {
    console.error('Lead capture error:', err);
    if (btn) { btn.textContent = 'Submit'; btn.disabled = false; }
    alert('Something went wrong: ' + err.message + '

Please call us directly at +91 80800 89898');
  });
}
)
}
