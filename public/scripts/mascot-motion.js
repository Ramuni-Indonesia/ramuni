(() => {
const registry = window.__ramuniMascotMotion || { cleanups: new Map(), initialized: false };
window.__ramuniMascotMotion = registry;
const mascotMotionCleanups = registry.cleanups;

const bindMascotMotion = () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compactViewport = window.matchMedia('(max-width: 960px)');
  const saveData = Boolean(navigator.connection?.saveData);
  const selectors = [
    '[data-mascot-motion]',
    '[data-audience-mascot]',
    '[data-decision-mascot]',
    '[data-blog-mascot]',
    '.blog-hero-signal__mascot',
    '.company-story__scene img',
    '.learning-close__mascot img',
    '.resource-navigator__orbit img',
    '.tools-hero__mascot',
  ].join(',');

  document.querySelectorAll(selectors).forEach((node, index) => {
    if (!(node instanceof HTMLElement) || node.dataset.mascotMotionBound === 'true') return;
    node.dataset.mascotMotionBound = 'true';
    if (!node.dataset.mascotMotion) node.dataset.mascotMotion = 'observe';

    let inView = false;
    let motion;
    const createMotion = () => {
      motion?.cancel();
      motion = undefined;
      if (typeof node.animate !== 'function' || reducedMotion.matches || saveData) {
        node.style.translate = '0 0';
        return;
      }

      const compact = compactViewport.matches;
      const mode = node.dataset.mascotMotion || 'observe';
      const x = compact ? 2.5 : (mode === 'work' ? 5 : mode === 'guide' ? 4 : 3);
      const y = compact ? 4.5 : (mode === 'work' ? 5 : mode === 'guide' ? 8 : 6);
      const duration = compact ? 8200 : (mode === 'work' ? 6800 : mode === 'guide' ? 7800 : 8200);
      const keyframes = mode === 'work'
        ? [
            { translate: '0 0' },
            { translate: `${x * 0.35}px ${y * -0.6}px`, offset: 0.24 },
            { translate: `${x}px ${y * -0.18}px`, offset: 0.48 },
            { translate: `${x * -0.45}px ${y * -0.92}px`, offset: 0.72 },
            { translate: '0 0' },
          ]
        : [
            { translate: '0 0' },
            { translate: `${x * -0.45}px ${y * -0.38}px`, offset: 0.18 },
            { translate: `${x}px ${y * -1}px`, offset: 0.43 },
            { translate: `${x * 0.25}px ${y * -0.42}px`, offset: 0.67 },
            { translate: `${x * -0.32}px ${y * -0.7}px`, offset: 0.84 },
            { translate: '0 0' },
          ];
      try {
        motion = node.animate(keyframes, {
          duration,
          iterations: Infinity,
          easing: 'cubic-bezier(.45,.05,.3,.96)',
        });
        motion.currentTime = (index * 630) % duration;
        motion.pause();
      } catch {
        node.style.translate = '0 0';
      }
    };
    const update = () => {
      const active = inView && !document.hidden && !reducedMotion.matches && !saveData;
      node.dataset.mascotActive = active ? 'true' : 'false';
      if (active) motion?.play();
      else motion?.pause();
    };

    createMotion();

    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        inView = entry?.isIntersecting ?? false;
        update();
      }, { rootMargin: '160px 0px', threshold: 0.04 });
      observer.observe(node);
    } else {
      inView = true;
      update();
    }

    document.addEventListener('visibilitychange', update);
    const refreshMotion = () => {
      createMotion();
      update();
    };
    reducedMotion.addEventListener?.('change', refreshMotion);
    compactViewport.addEventListener?.('change', refreshMotion);
    mascotMotionCleanups.set(node, () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', update);
      reducedMotion.removeEventListener?.('change', refreshMotion);
      compactViewport.removeEventListener?.('change', refreshMotion);
      motion?.cancel();
      delete node.dataset.mascotActive;
      delete node.dataset.mascotMotionBound;
      node.style.removeProperty('translate');
    });
  });
};

bindMascotMotion();
if (registry.initialized) return;
registry.initialized = true;
document.addEventListener('astro:page-load', bindMascotMotion);
document.addEventListener('astro:before-swap', () => {
  mascotMotionCleanups.forEach((cleanup) => cleanup());
  mascotMotionCleanups.clear();
});
})();
