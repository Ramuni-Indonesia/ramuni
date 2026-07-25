const actions = document.querySelector('[data-floating-actions]');
const scrollButton = actions?.querySelector('[data-scroll-top]');
const openButton = actions?.querySelector('[data-contact-open]');
const dialog = document.querySelector('[data-contact-dialog]');
const closeButton = dialog?.querySelector('[data-contact-close]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const updateScrollButton = () => {
  if (scrollButton instanceof HTMLButtonElement) scrollButton.hidden = window.scrollY < Math.min(560, window.innerHeight * .72);
};
let scrollQueued = false;
updateScrollButton();
window.addEventListener('scroll', () => {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(() => { updateScrollButton(); scrollQueued = false; });
}, { passive: true });
scrollButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' }));
openButton?.addEventListener('click', () => {
  if (!(dialog instanceof HTMLDialogElement)) return;
  openButton.setAttribute('aria-expanded', 'true');
  dialog.showModal();
});
closeButton?.addEventListener('click', () => dialog instanceof HTMLDialogElement && dialog.close());
dialog?.addEventListener('close', () => {
  openButton?.setAttribute('aria-expanded', 'false');
  if (openButton instanceof HTMLElement) openButton.focus();
});
dialog?.addEventListener('click', (event) => event.target === dialog && dialog.close());
