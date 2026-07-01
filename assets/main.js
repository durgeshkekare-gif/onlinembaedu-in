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

  // Auto-attach source + UTM data
  var params = new URLSearchParams(window.location.search);
  d.sourceDomain  = window.location.hostname;
  d.sourcePage    = window.location.pathname;
  d.utmSource     = params.get('utm_source')   || '';
  d.utmMedium     = params.get('utm_medium')   || '';
  d.utmCampaign   = params.get('utm_campaign') || '';

  fetch('https://script.google.com/a/macros/jaro.in/s/AKfycbwkP_F6VWsRwjEawqDTcaqSD7p9Yyb6MkGpW39R9zr-ZbSAte47aJL3XMnXEgVmG6V80g/exec', {
    method : 'POST',
    mode   : 'no-cors',          // Apps Script needs no-cors
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(d)
  })
  .then(function() {
    if (form)                              form.style.display = 'none';
    var s = document.getElementById(successId);
    if (s)                                 s.style.display = 'block';
  })
  .catch(function() {
    // Show success anyway — Apps Script with no-cors always resolves opaquely
    if (form)                              form.style.display = 'none';
    var s = document.getElementById(successId);
    if (s)                                 s.style.display = 'block';
  });
}
)
}
