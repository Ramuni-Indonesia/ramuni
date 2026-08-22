const initialiseFloatingContact = () => {
  const actions = document.querySelector('[data-floating-actions]');
  if (!(actions instanceof HTMLElement) || actions.dataset.floatingBound === 'true') return;

  actions.dataset.floatingBound = 'true';

  const scrollButton = actions.querySelector('[data-scroll-top]');
  const scrollProgress = actions.querySelector('[data-scroll-progress]');
  const scrollSentinel = document.querySelector('[data-scroll-top-sentinel]');
  const openButton = actions.querySelector('[data-contact-open]');
  const dialog = document.querySelector('[data-contact-dialog]');
  const closeButton = dialog?.querySelector('[data-contact-close]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const autoOpenKey = 'ramuni-floating-contact-auto-opened-v3';
  const autoOpenDelayMs = 60000;
  const excludedAutoPaths = ['/tour-produk-gratis/', '/terima-kasih/', '/masuk/'];
  const officialWhatsAppUrl = 'https://wa.me/message/K35W6X6WT7YMJ1';
  let restoreFocusOnClose = false;
  let chatStylePromise;
  let chatStylesFailed = false;
  let openingPromise;
  let openingSource;
  let progressFrame;
  const progressCircumference = 2 * Math.PI * 22;
  const track = (eventName, properties = {}) => {
    const detail = { ...properties };
    window.dispatchEvent(new CustomEvent(`ramuni:analytics:${eventName}`, { detail }));
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: eventName, ...detail });
    if (typeof window.clarity === 'function') window.clarity('event', eventName);
  };

  const updateScrollProgress = () => {
    if (!(scrollProgress instanceof SVGCircleElement)) return;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    scrollProgress.style.strokeDasharray = `${progressCircumference}`;
    scrollProgress.style.strokeDashoffset = `${progressCircumference * (1 - progress)}`;
  };
  const scheduleScrollProgress = () => {
    if (progressFrame) return;
    progressFrame = window.requestAnimationFrame(() => {
      progressFrame = undefined;
      updateScrollProgress();
    });
  };

  const ensureChatStyles = () => {
    if (chatStylePromise) return chatStylePromise;
    chatStylePromise = new Promise((resolve) => {
      const existing = document.querySelector('link[data-floating-contact-style]');
      if (existing instanceof HTMLLinkElement) {
        if (existing.sheet || existing.dataset.loaded === 'true') resolve(true);
        else if (existing.dataset.failed === 'true') {
          chatStylesFailed = true;
          resolve(false);
        } else {
          existing.addEventListener('load', () => resolve(true), { once: true });
          existing.addEventListener('error', () => {
            chatStylesFailed = true;
            resolve(false);
          }, { once: true });
        }
        return;
      }
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/styles/floating-contact-chat.css';
      link.dataset.floatingContactStyle = 'true';
      link.addEventListener('load', () => {
        link.dataset.loaded = 'true';
        resolve(true);
      }, { once: true });
      link.addEventListener('error', () => {
        chatStylesFailed = true;
        link.dataset.failed = 'true';
        resolve(false);
      }, { once: true });
      document.head.append(link);
    });
    return chatStylePromise;
  };

  const storageGet = (key) => {
    try { return sessionStorage.getItem(key); } catch { return null; }
  };
  const storageSet = (key, value) => {
    try { sessionStorage.setItem(key, value); } catch { /* optional */ }
  };
  const isAutoOpenExcluded = () => {
    const path = window.location.pathname.endsWith('/') ? window.location.pathname : window.location.pathname + '/';
    return storageGet(autoOpenKey) === 'true'
      || excludedAutoPaths.some((prefix) => path.startsWith(prefix));
  };
  const hasAutoOpenBlocker = () => document.hidden
    || document.body.classList.contains('menu-open')
    || document.body.classList.contains('consent-banner-open')
    || Boolean(document.querySelector('dialog[open]:not([data-contact-dialog])'));
  const focusContactField = () => {
    const firstField = dialog?.querySelector('.lead-form__step[data-active] input:not([type="hidden"]), .lead-form__step[data-active] textarea, .lead-form__step[data-active] button') || closeButton;
    if (firstField instanceof HTMLElement) firstField.focus({ preventScroll: true });
  };
  const openContact = ({ modal = true, focus = true, source = 'manual' } = {}) => {
    if (!(dialog instanceof HTMLDialogElement)) return Promise.resolve(false);
    if (dialog.open) {
      if (source === 'manual') {
        restoreFocusOnClose = true;
        openButton?.setAttribute('aria-expanded', 'true');
        focusContactField();
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    }
    if (openingPromise) {
      if (source === 'manual' && openingSource !== 'manual') {
        return openingPromise.then(() => openContact({ modal, focus, source }));
      }
      return openingPromise;
    }
    if (typeof dialog.showModal !== 'function' || typeof dialog.show !== 'function') {
      if (source === 'manual') window.location.assign(officialWhatsAppUrl);
      return Promise.resolve(false);
    }
    openingSource = source;
    openingPromise = (async () => {
      const stylesReady = await ensureChatStyles();
      if (!stylesReady) {
        if (source === 'manual') window.location.assign(officialWhatsAppUrl);
        return false;
      }
      if (dialog.open) {
        if (source === 'manual' && focus) focusContactField();
        return source === 'manual';
      }
      if (source !== 'manual' && (isAutoOpenExcluded() || hasAutoOpenBlocker())) return false;
      restoreFocusOnClose = source === 'manual';
      openButton?.setAttribute('aria-expanded', 'true');
      dialog.dataset.openSource = source;
      try {
        if (modal) dialog.showModal();
        else dialog.show();
      } catch {
        delete dialog.dataset.openSource;
        openButton?.setAttribute('aria-expanded', 'false');
        return false;
      }
      track('lead_popup_opened', { source });
      storageSet(autoOpenKey, 'true');
      if (focus) window.setTimeout(focusContactField, 0);
      return true;
    })().finally(() => {
      openingPromise = undefined;
      openingSource = undefined;
    });
    return openingPromise;
  };

  let scrollObserver;
  if (scrollButton instanceof HTMLButtonElement) {
    updateScrollProgress();
    window.addEventListener('scroll', scheduleScrollProgress, { passive: true });
    window.addEventListener('resize', scheduleScrollProgress, { passive: true });
    if (scrollSentinel instanceof HTMLElement && 'IntersectionObserver' in window) {
      scrollObserver = new IntersectionObserver(([entry]) => {
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

  let autoResizeObserver;
  let bodyStateObserver;
  let autoCheckFrame;
  let autoOpenTimer;
  let autoOpenReady = false;
  let autoOpenTrigger = 'scroll-depth';
  let autoTracking = false;
  const isHalfwayDownPage = () => {
    const pageHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const maxScroll = Math.max(0, pageHeight - window.innerHeight);
    if (maxScroll < 360 || pageHeight <= 0) return false;
    return window.scrollY / maxScroll >= 0.5;
  };
  const stopAutoTracking = () => {
    if (!autoTracking) return;
    autoTracking = false;
    window.removeEventListener('scroll', scheduleAutoOpenCheck);
    window.removeEventListener('resize', scheduleAutoOpenCheck);
    document.removeEventListener('visibilitychange', scheduleAutoOpenCheck);
    document.removeEventListener('close', scheduleAutoOpenCheck, true);
    autoResizeObserver?.disconnect();
    bodyStateObserver?.disconnect();
    if (autoOpenTimer) window.clearTimeout(autoOpenTimer);
    autoOpenTimer = undefined;
    if (autoCheckFrame) window.cancelAnimationFrame(autoCheckFrame);
    autoCheckFrame = undefined;
  };
  const checkAutoOpen = async () => {
    autoCheckFrame = undefined;
    if (isAutoOpenExcluded()) {
      stopAutoTracking();
      return;
    }
    if (isHalfwayDownPage()) {
      autoOpenReady = true;
      autoOpenTrigger = 'scroll-depth';
    }
    if (!autoOpenReady || hasAutoOpenBlocker()) return;
    const opened = await openContact({ modal: false, focus: false, source: autoOpenTrigger });
    if (opened || isAutoOpenExcluded() || chatStylesFailed) stopAutoTracking();
  };
  function scheduleAutoOpenCheck() {
    if (!autoTracking || autoCheckFrame) return;
    autoCheckFrame = window.requestAnimationFrame(() => { void checkAutoOpen(); });
  }
  const setupAutoOpen = () => {
    if (document.body.dataset.whatsappAutoOpen !== 'true' || isAutoOpenExcluded()) return;
    autoTracking = true;
    window.addEventListener('scroll', scheduleAutoOpenCheck, { passive: true });
    window.addEventListener('resize', scheduleAutoOpenCheck, { passive: true });
    document.addEventListener('visibilitychange', scheduleAutoOpenCheck);
    document.addEventListener('close', scheduleAutoOpenCheck, true);
    autoResizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(scheduleAutoOpenCheck) : undefined;
    autoResizeObserver?.observe(document.documentElement);
    bodyStateObserver = typeof MutationObserver === 'function'
      ? new MutationObserver(scheduleAutoOpenCheck)
      : undefined;
    bodyStateObserver?.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    autoOpenTimer = window.setTimeout(() => {
      autoOpenReady = true;
      autoOpenTrigger = 'time-60s';
      scheduleAutoOpenCheck();
    }, autoOpenDelayMs);
    scheduleAutoOpenCheck();
  };

  openButton?.addEventListener('click', () => {
    void openContact({ modal: true, focus: true, source: 'manual' });
  });

  closeButton?.addEventListener('click', () => {
    if (dialog instanceof HTMLDialogElement) dialog.close();
  });

  dialog?.addEventListener('close', () => {
    openButton?.setAttribute('aria-expanded', 'false');
    delete dialog.dataset.openSource;
    if (restoreFocusOnClose && openButton instanceof HTMLElement) openButton.focus({ preventScroll: true });
    restoreFocusOnClose = false;
  });

  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog?.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialog instanceof HTMLDialogElement && dialog.open) {
      event.preventDefault();
      dialog.close();
    }
  });

  document.addEventListener('astro:before-swap', () => {
    stopAutoTracking();
    scrollObserver?.disconnect();
    window.removeEventListener('scroll', scheduleScrollProgress);
    window.removeEventListener('resize', scheduleScrollProgress);
    if (progressFrame) window.cancelAnimationFrame(progressFrame);
  }, { once: true });

  window.requestAnimationFrame(() => window.requestAnimationFrame(setupAutoOpen));
};

initialiseFloatingContact();
document.addEventListener('astro:page-load', initialiseFloatingContact);
