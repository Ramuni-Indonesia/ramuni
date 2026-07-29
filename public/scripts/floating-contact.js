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
  const ensureChatStyles = () => new Promise((resolve) => {
    const existing = document.querySelector('link[data-floating-contact-style]');
    if (existing instanceof HTMLLinkElement) {
      if (existing.sheet || existing.dataset.loaded === 'true') resolve();
      else {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', resolve, { once: true });
      }
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/styles/floating-contact-chat.css';
    link.dataset.floatingContactStyle = 'true';
    link.addEventListener('load', () => {
      link.dataset.loaded = 'true';
      resolve();
    }, { once: true });
    link.addEventListener('error', resolve, { once: true });
    document.head.append(link);
  });
  if (scrollButton instanceof HTMLButtonElement) {
    if (scrollSentinel instanceof HTMLElement && 'IntersectionObserver' in window) {
      const scrollObserver = new IntersectionObserver(([entry]) => {
        scrollButton.hidden = entry?.isIntersecting ?? true;
      }, { rootMargin: `-${Math.min(320, Math.round(window.innerHeight * 0.42))}px 0px 0px 0px`, threshold: 0 });
      scrollObserver.observe(scrollSentinel);
    } else {
      scrollButton.hidden = false;
    }

    scrollButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    });
  }

  openButton?.addEventListener('click', async () => {
    if (!(dialog instanceof HTMLDialogElement) || dialog.open) return;
    await ensureChatStyles();
    openButton.setAttribute('aria-expanded', 'true');
    dialog.showModal();
    window.setTimeout(() => {
      const firstField = dialog.querySelector('input, select, textarea') || closeButton;
      if (firstField instanceof HTMLElement) firstField.focus({ preventScroll: true });
    }, 0);
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
