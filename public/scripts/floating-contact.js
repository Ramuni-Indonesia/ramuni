const actions = document.querySelector('[data-floating-actions]');
const scrollButton = actions?.querySelector('[data-scroll-top]');
const scrollSentinel = document.querySelector('[data-scroll-top-sentinel]');
const openButton = actions?.querySelector('[data-contact-open]');
const dialog = document.querySelector('[data-contact-dialog]');
const closeButton = dialog?.querySelector('[data-contact-close]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (scrollButton instanceof HTMLButtonElement && scrollSentinel instanceof HTMLElement) {
  if ('IntersectionObserver' in window) {
    const scrollObserver = new IntersectionObserver(([entry]) => {
      scrollButton.hidden = entry.isIntersecting;
    });
    scrollObserver.observe(scrollSentinel);
  } else {
    scrollButton.hidden = false;
  }
}
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
