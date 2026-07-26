const groups = [...document.querySelectorAll('[data-nav-group]')];
const mobile = document.querySelector('[data-mobile-menu]');
const desktopNav = document.querySelector('.desktop-nav');
const desktopItems = desktopNav
  ? [...desktopNav.querySelectorAll(':scope > a:not(.button), :scope > details > summary')]
  : [];
const desktopIndex = (node) => desktopItems.findIndex((item) => item === node);
const desktopHover = window.matchMedia('(min-width: 1201px) and (hover: hover) and (pointer: fine)');
const desktopLayout = window.matchMedia('(min-width: 1201px) and (hover: hover) and (pointer: fine)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const siteHeader = mobile?.closest('.site-header');
const mobileSummary = mobile?.querySelector(':scope > summary');
let hoverCloseTimer;
let mobileCloseTimer;
let mobileOpenFrame;
let scrollRestoreFrame;
let lockedScrollY = 0;
let previousBodyStyle;

const setMobileExpanded = (expanded) => {
  if (mobileSummary instanceof HTMLElement) mobileSummary.setAttribute('aria-expanded', String(expanded));
};

const lockPageScroll = () => {
  if (previousBodyStyle) return;
  window.cancelAnimationFrame(scrollRestoreFrame);
  lockedScrollY = window.scrollY;
  previousBodyStyle = {
    position: document.body.style.position,
    top: document.body.style.top,
    insetInline: document.body.style.insetInline,
    width: document.body.style.width,
    overflow: document.body.style.overflow,
  };
  document.body.classList.add('menu-open');
  document.body.style.position = 'fixed';
  document.body.style.top = `-${lockedScrollY}px`;
  document.body.style.insetInline = '0';
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';
};

const unlockPageScroll = () => {
  document.body.classList.remove('menu-open');
  if (!previousBodyStyle) return;
  const savedStyle = previousBodyStyle;
  previousBodyStyle = undefined;
  document.body.style.position = savedStyle.position;
  document.body.style.top = savedStyle.top;
  document.body.style.insetInline = savedStyle.insetInline;
  document.body.style.width = savedStyle.width;
  document.body.style.overflow = savedStyle.overflow;
  const restoreY = lockedScrollY;
  scrollRestoreFrame = window.requestAnimationFrame(() => {
    window.scrollTo({ top: restoreY, left: 0, behavior: 'auto' });
  });
};

const openMobileMenu = () => {
  if (!(mobile instanceof HTMLDetailsElement) || mobile.open) return;
  window.clearTimeout(mobileCloseTimer);
  window.cancelAnimationFrame(mobileOpenFrame);
  mobile.dataset.menuState = 'opening';
  mobile.setAttribute('open', '');
  setMobileExpanded(true);
  lockPageScroll();
  syncMobilePanelOffset();
  mobileOpenFrame = window.requestAnimationFrame(() => {
    mobileOpenFrame = window.requestAnimationFrame(() => {
      if (mobile.open && mobile.dataset.menuState === 'opening') mobile.dataset.menuState = 'open';
    });
  });
};

const closeMobileMenu = ({ animate = true, returnFocus = false } = {}) => {
  if (!(mobile instanceof HTMLDetailsElement) || !mobile.open) return;
  window.clearTimeout(mobileCloseTimer);
  window.cancelAnimationFrame(mobileOpenFrame);
  setMobileExpanded(false);
  const finish = () => {
    mobile.removeAttribute('open');
    mobile.dataset.menuState = 'closed';
    mobile.querySelectorAll('.mobile-panel details[open]').forEach((item) => item.removeAttribute('open'));
    unlockPageScroll();
    if (returnFocus && mobileSummary instanceof HTMLElement) mobileSummary.focus();
  };
  if (!animate || reducedMotion.matches) {
    finish();
    return;
  }
  mobile.dataset.menuState = 'closing';
  mobileCloseTimer = window.setTimeout(finish, 230);
};

const syncMobilePanelOffset = () => {
  if (!(siteHeader instanceof HTMLElement)) return;
  siteHeader.style.setProperty('--mobile-panel-top', `${Math.ceil(siteHeader.getBoundingClientRect().height)}px`);
};

const headerResizeObserver = typeof ResizeObserver === 'function' && siteHeader instanceof HTMLElement
  ? new ResizeObserver(syncMobilePanelOffset)
  : null;

headerResizeObserver?.observe(siteHeader);
syncMobilePanelOffset();

window.addEventListener('pagehide', () => headerResizeObserver?.disconnect(), { once: true });
const closeDesktopGroups = () => groups.forEach((group) => {
  group.removeAttribute('open');
  group.querySelector(':scope > summary')?.setAttribute('aria-expanded', 'false');
});

groups.forEach((group) => {
  if (!(group instanceof HTMLDetailsElement)) return;
  const summary = group.querySelector(':scope > summary');
  if (summary instanceof HTMLElement) summary.setAttribute('aria-expanded', String(group.open));
  const openOnHover = () => {
    if (!desktopHover.matches) return;
    window.clearTimeout(hoverCloseTimer);
    group.open = true;
  };
  summary?.addEventListener('mouseenter', openOnHover);
  summary?.addEventListener('mouseover', openOnHover);
  group.addEventListener('toggle', () => {
    const trigger = group.querySelector(':scope > summary');
    if (trigger instanceof HTMLElement) trigger.setAttribute('aria-expanded', String(group.open));
    if (group.open) groups.filter((item) => item !== group).forEach((item) => {
      item.removeAttribute('open');
      item.querySelector(':scope > summary')?.setAttribute('aria-expanded', 'false');
    });
  });
  group.addEventListener('pointerenter', () => {
    if (!desktopHover.matches) return;
    window.clearTimeout(hoverCloseTimer);
    groups.filter((item) => item !== group).forEach((item) => item.removeAttribute('open'));
    group.open = true;
  });
  group.addEventListener('pointerleave', () => {
    if (!desktopHover.matches) return;
    window.clearTimeout(hoverCloseTimer);
    hoverCloseTimer = window.setTimeout(() => {
      if (!group.matches(':focus-within')) group.open = false;
    }, 140);
  });
  group.addEventListener('focusin', openOnHover);
  group.addEventListener('focusout', (event) => {
    if (!desktopHover.matches || group.contains(event.relatedTarget)) return;
    group.open = false;
  });
});

if (desktopNav instanceof HTMLElement) {
  desktopNav.addEventListener('keydown', (event) => {
    const focused = document.activeElement;
    const currentIndex = desktopIndex(focused);
    const activeMenu = focused instanceof HTMLElement ? focused.closest('.mega-menu') : null;
    const focusItem = (index) => {
      const item = desktopItems.at((index + desktopItems.length) % desktopItems.length);
      if (item instanceof HTMLElement) item.focus();
    };
    if (activeMenu instanceof HTMLElement && focused instanceof HTMLAnchorElement) {
      const menuLinks = [...activeMenu.querySelectorAll('a')].filter((link) => link instanceof HTMLAnchorElement);
      const menuIndex = menuLinks.indexOf(focused);
      if (['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        const targetIndex = event.key === 'Home' ? 0
          : event.key === 'End' ? menuLinks.length - 1
            : menuIndex + (event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1);
        menuLinks.at((targetIndex + menuLinks.length) % menuLinks.length)?.focus();
      }
    }
    if (currentIndex >= 0 && ['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      if (event.key === 'Home') focusItem(0);
      else if (event.key === 'End') focusItem(desktopItems.length - 1);
      else focusItem(currentIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
    if (focused instanceof HTMLElement && focused.matches('.nav-group > summary')) {
      const parent = focused.parentElement;
      if (event.key === 'ArrowDown' && parent instanceof HTMLDetailsElement) {
        event.preventDefault();
        parent.open = true;
        const firstLink = parent.querySelector('.mega-menu a');
        if (firstLink instanceof HTMLElement) firstLink.focus();
      }
      if (event.key === 'ArrowUp' && parent instanceof HTMLDetailsElement) {
        event.preventDefault();
        parent.open = false;
      }
    }
    if (event.key === 'Escape' && desktopNav.contains(focused)) {
      const openGroup = groups.find((group) => group instanceof HTMLDetailsElement && group.open);
      closeDesktopGroups();
      const trigger = openGroup?.querySelector(':scope > summary');
      if (trigger instanceof HTMLElement) trigger.focus();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  closeDesktopGroups();
  if (mobile instanceof HTMLDetailsElement && mobile.open) {
    closeMobileMenu({ returnFocus: true });
  }
});

if (mobile instanceof HTMLDetailsElement) {
  mobile.dataset.menuState = mobile.open ? 'open' : 'closed';
  setMobileExpanded(mobile.open);
  mobileSummary?.addEventListener('click', (event) => {
    event.preventDefault();
    if (mobile.dataset.menuState === 'closing') return;
    if (mobile.open) closeMobileMenu();
    else openMobileMenu();
  });
  mobile.addEventListener('toggle', () => {
    if (mobile.open) {
      if (mobile.dataset.menuState !== 'opening') mobile.dataset.menuState = 'open';
      setMobileExpanded(true);
      lockPageScroll();
      syncMobilePanelOffset();
      return;
    }
    mobile.dataset.menuState = 'closed';
    setMobileExpanded(false);
    unlockPageScroll();
  });
  mobile.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || !mobile.open) return;
    const focusable = [...mobile.querySelectorAll('summary, a[href], button:not([disabled])')]
      .filter((node) => node instanceof HTMLElement && node.offsetParent !== null);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!(first instanceof HTMLElement) || !(last instanceof HTMLElement)) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  const closeMobileAtDesktop = () => {
    if (!desktopLayout.matches) return;
    closeMobileMenu({ animate: false });
  };
  desktopLayout.addEventListener?.('change', closeMobileAtDesktop);
  closeMobileAtDesktop();
}

window.addEventListener('pagehide', () => {
  window.clearTimeout(mobileCloseTimer);
  window.cancelAnimationFrame(mobileOpenFrame);
  window.cancelAnimationFrame(scrollRestoreFrame);
  unlockPageScroll();
}, { once: true });
