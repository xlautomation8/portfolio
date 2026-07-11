// ---- Typing effect for hero name ----
const typedNameEl = document.getElementById('typedName');
const fullName = 'Utkarsh Sinha';
let charIndex = 0;

function typeName(){
  if (!typedNameEl) return;
  if (charIndex <= fullName.length){
    typedNameEl.textContent = fullName.slice(0, charIndex) + (charIndex < fullName.length ? '▌' : '');
    charIndex++;
    setTimeout(typeName, 90);
  } else {
    typedNameEl.textContent = fullName;
  }
}
typeName();

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks){
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ---- Active nav link on scroll ----
const sections = Array.from(document.querySelectorAll('section[id]'));
const navAnchors = Array.from(document.querySelectorAll('.nav-link'));

function setActiveLink(id){
  navAnchors.forEach(a => {
    const href = a.getAttribute('href');
    const isSectionLink = href && href.startsWith('#');
    a.classList.toggle('active', isSectionLink && href === '#' + id);
  });
}

function onScroll(){
  const headerHeight = document.querySelector('.nav')?.offsetHeight || 90;
  let current = '';
  let closestDistance = Infinity;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top - headerHeight);

    if (distance < closestDistance) {
      closestDistance = distance;
      current = section.getAttribute('id');
    }
  });

  setActiveLink(current);
}

navAnchors.forEach(a => {
  const href = a.getAttribute('href');
  if (href && href.startsWith('#')) {
    a.addEventListener('click', () => setActiveLink(href.slice(1)));
  }
});

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();

// ---- Footer year ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Lightbox for certificates page ----
document.addEventListener('DOMContentLoaded', () => {
  const thumbs = document.querySelectorAll('.cert-thumb');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbClose = document.getElementById('lightboxClose');
  const lbDownload = document.getElementById('lightboxDownload');

  if (!thumbs || thumbs.length === 0 || !lightbox) return;

  thumbs.forEach(t => {
    t.addEventListener('click', (e) => {
      const src = e.currentTarget.getAttribute('src');
      lbImg.src = src;
      lbDownload.href = src;
      lightbox.style.display = 'flex';
    });
  });

  function closeLb(){
    lightbox.style.display = 'none';
    lbImg.src = '';
  }

  if (lbClose) lbClose.addEventListener('click', closeLb);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLb();
  });
});
