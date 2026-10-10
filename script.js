const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.toggle-label');
const metaTheme = document.querySelector('meta[name="theme-color"]');

const setTheme = (theme) => {
  root.dataset.theme = theme;
  const isLight = theme === 'light';
  toggle.setAttribute('aria-pressed', String(isLight));
  themeLabel.textContent = isLight ? 'Claro' : 'Escuro';
  metaTheme.setAttribute('content', isLight ? '#f2f2ef' : '#111112');
  localStorage.setItem('pm-theme', theme);
};

const savedTheme = localStorage.getItem('pm-theme');
if (savedTheme) setTheme(savedTheme);
toggle.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('.segmented button, .dashboard-tabs button').forEach((button) => {
  button.addEventListener('click', () => {
    button.parentElement.querySelectorAll('button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});

const copyToast = document.querySelector('.copy-toast');
let toastTimer;
document.querySelectorAll('.color-card button').forEach((button) => {
  button.addEventListener('click', async () => {
    const value = button.closest('.color-card').dataset.copy;
    try { await navigator.clipboard.writeText(value); }
    catch { /* Clipboard may be unavailable in restricted previews. */ }
    copyToast.textContent = `${value} copiado`;
    copyToast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => copyToast.classList.remove('show'), 1600);
  });
});
