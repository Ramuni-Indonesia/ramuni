const initialiseFloatingContact = () => {
  const actions = document.querySelector('[data-floating-actions]');
  if (!(actions instanceof HTMLElement) || actions.dataset.floatingBound === 'true') return;

  actions.dataset.floatingBound = 'true';

  const scrollButton = actions.querySelector('[data-scroll-top]');
  const scrollSentinel = document.querySelector('[data-scroll-top-sentinel]');
  const openButton = actions.querySelector('[data-contact-open]');
  const dialog = document.querySelector('[data-contact-dialog]');
  const closeButton = dialog?.querySelector('[data-contact-close]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let scrollFrame = 0;

  const setScrollButtonState = () => {
    if (!(scrollButton instanceof HTMLButtonElement)) return;
    scrollButton.hidden = window.scrollY < Math.min(420, window.innerHeight * 0.55);
  };

  const queueScrollButtonState = () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = 0;
      setScrollButtonState();
    });
  };

  if (scrollButton instanceof HTMLButtonElement) {
    setScrollButtonState();
    window.addEventListener('scroll', queueScrollButtonState, { passive: true });
    window.addEventListener('resize', queueScrollButtonState, { passive: true });

    if (scrollSentinel instanceof HTMLElement && 'IntersectionObserver' in window) {
      const scrollObserver = new IntersectionObserver(() => queueScrollButtonState());
      scrollObserver.observe(scrollSentinel);
    }

    scrollButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    });
  }

  openButton?.addEventListener('click', () => {
    if (!(dialog instanceof HTMLDialogElement) || dialog.open) return;
    openButton.setAttribute('aria-expanded', 'true');
    dialog.showModal();
  });

  closeButton?.addEventListener('click', () => {
    if (dialog instanceof HTMLDialogElement) dialog.close();
  });

  dialog?.addEventListener('close', () => {
    openButton?.setAttribute('aria-expanded', 'false');
    if (openButton instanceof HTMLElement) openButton.focus({ preventScroll: true });
  });

  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
};

initialiseFloatingContact();
document.addEventListener('astro:page-load', initialiseFloatingContact);
