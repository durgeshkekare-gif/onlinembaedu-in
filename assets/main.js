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
  console.log('[Lead] submitLead called formId=' + formId + ' successId=' + successId);

  var wrapper = document.getElementById(formId);
  var btn = wrapper ? wrapper.querySelector('button[type="submit"]') : null;

  console.log('[Lead] wrapper found:', wrapper ? 'YES id=' + wrapper.id : 'NO - NULL');

  if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }

  // Collect fields
  var d = {};
  if (wrapper) {
    wrapper.querySelectorAll('input[name], select[name]').forEach(function(el) {
      d[el.name] = el.value;
      console.log('[Lead] field:', el.name, '=', el.value);
    });
  }

  // Source tracking
  var params = new URLSearchParams(window.location.search);
  d.sourceDomain  = window.location.hostname;
  d.sourcePage    = window.location.pathname;
  d.utmSource     = params.get('utm_source')   || '';
  d.utmMedium     = params.get('utm_medium')   || '';
  d.utmCampaign   = params.get('utm_campaign') || '';

  console.log('[Lead] Posting data:', JSON.stringify(d));

  fetch('/api/lead', {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(d)
  })
  .then(function(r) {
    console.log('[Lead] HTTP status:', r.status);
    return r.text().then(function(txt) {
      console.log('[Lead] Response body:', txt);
      if (!r.ok) throw new Error('HTTP ' + r.status + ': ' + txt);
      return txt;
    });
  })
  .then(function() {
    console.log('[Lead] Success - showing confirmation');
    if (wrapper) wrapper.style.display = 'none';
    var s = document.getElementById(successId);
    console.log('[Lead] success div:', s ? 'FOUND id=' + s.id : 'NOT FOUND');
    if (s) s.style.display = 'block';
    if (btn) { btn.textContent = 'Done'; btn.disabled = false; }
  })
  .catch(function(err) {
    console.error('[Lead] ERROR:', err.message);
    if (btn) { btn.textContent = 'Submit'; btn.disabled = false; }
    alert('Error: ' + err.message);
  });
}

)
}
