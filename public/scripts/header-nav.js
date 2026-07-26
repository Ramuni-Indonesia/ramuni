const groups = [...document.querySelectorAll('[data-nav-group]')];
const mobile = document.querySelector('[data-mobile-menu]');
const desktopNav = document.querySelector('.desktop-nav');
const desktopItems = desktopNav
  ? [...desktopNav.querySelectorAll(':scope > a:not(.button), :scope > details > summary')]
  : [];
const desktopIndex = (node) => desktopItems.findIndex((item) => item === node);
const desktopHover = window.matchMedia('(min-width: 1101px) and (hover: hover)');
const desktopLayout = window.matchMedia('(min-width: 1101px)');
let hoverCloseTimer;
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
    mobile.removeAttribute('open');
    document.body.classList.remove('menu-open');
    const trigger = mobile.querySelector(':scope > summary');
    if (trigger instanceof HTMLElement) trigger.focus();
  }
});

if (mobile instanceof HTMLDetailsElement) {
  mobile.addEventListener('toggle', () => document.body.classList.toggle('menu-open', mobile.open));
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
    mobile.removeAttribute('open');
    document.body.classList.remove('menu-open');
  };
  desktopLayout.addEventListener?.('change', closeMobileAtDesktop);
  closeMobileAtDesktop();
}
