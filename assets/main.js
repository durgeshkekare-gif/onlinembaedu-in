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
  const form = document.getElementById(formId);
  const success = document.getElementById(successId);
  if (form) form.style.display = 'none';
  if (success) success.style.display = 'block';
  // PRODUCTION: replace with CRM endpoint
  // const data = Object.fromEntries(new FormData(e.target));
  // fetch('https://crm-endpoint.com/leads', {method:'POST', body:JSON.stringify(data)})
}
