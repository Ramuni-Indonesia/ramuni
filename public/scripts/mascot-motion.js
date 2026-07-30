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
    const motionTarget = node.matches('[data-animated-muni-work]')
      ? node.querySelector('video, img')
      : node;
    if (!(motionTarget instanceof HTMLElement)) {
      delete node.dataset.mascotMotionBound;
      return;
    }
    const motionVideo = motionTarget instanceof HTMLVideoElement ? motionTarget : null;

    let inView = false;
    let motion;
    const createMotion = () => {
      motion?.cancel();
      motion = undefined;
      if (typeof motionTarget.animate !== 'function' || reducedMotion.matches || saveData) {
        motionTarget.style.translate = '0 0';
        motionTarget.style.rotate = '0deg';
        motionTarget.style.scale = '1';
        return;
      }

      const compact = compactViewport.matches;
      const mode = node.dataset.mascotMotion || 'observe';
      const x = compact ? 4 : (mode === 'work' ? 10 : mode === 'guide' ? 9 : 6);
      const y = compact ? 6 : (mode === 'work' ? 10 : mode === 'guide' ? 12 : 8);
      const turn = compact ? 1.2 : (mode === 'work' ? 2.4 : mode === 'guide' ? 2.8 : 1.8);
      const duration = compact ? 7600 : (mode === 'work' ? 6200 : mode === 'guide' ? 7000 : 7800);
      const keyframes = mode === 'work'
        ? [
            { translate: '0 0', rotate: '0deg', scale: 1 },
            { translate: `${x * 0.35}px ${y * -0.75}px`, rotate: `${turn * -0.6}deg`, scale: 1.012, offset: 0.2 },
            { translate: `${x}px ${y * -0.2}px`, rotate: `${turn}deg`, scale: 1.006, offset: 0.46 },
            { translate: `${x * -0.55}px ${y * -1.04}px`, rotate: `${turn * -0.85}deg`, scale: 1.018, offset: 0.72 },
            { translate: '0 0', rotate: '0deg', scale: 1 },
          ]
        : [
            { translate: '0 0', rotate: '0deg', scale: 1 },
            { translate: `${x * -0.5}px ${y * -0.44}px`, rotate: `${turn * 0.55}deg`, scale: 1.006, offset: 0.16 },
            { translate: `${x}px ${y * -1.04}px`, rotate: `${turn * -1}deg`, scale: 1.018, offset: 0.42 },
            { translate: `${x * 0.35}px ${y * -0.5}px`, rotate: `${turn * 0.35}deg`, scale: 1.01, offset: 0.66 },
            { translate: `${x * -0.36}px ${y * -0.76}px`, rotate: `${turn * 0.8}deg`, scale: 1.012, offset: 0.84 },
            { translate: '0 0', rotate: '0deg', scale: 1 },
          ];
      try {
        motion = motionTarget.animate(keyframes, {
          duration,
          iterations: Infinity,
          easing: 'cubic-bezier(.45,.05,.3,.96)',
        });
        motion.currentTime = (index * 630) % duration;
        motion.pause();
      } catch {
        motionTarget.style.translate = '0 0';
      }
    };
    const update = () => {
      const active = inView && !document.hidden && !reducedMotion.matches && !saveData;
      node.dataset.mascotActive = active ? 'true' : 'false';
      if (active) {
        motion?.play();
        motionVideo?.play()?.catch?.(() => {});
      } else {
        motion?.pause();
        motionVideo?.pause();
        if (motionVideo && (reducedMotion.matches || saveData)) {
          try { motionVideo.currentTime = 0; } catch { /* Media may not be ready yet. */ }
        }
      }
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
      motionVideo?.pause();
      delete node.dataset.mascotActive;
      delete node.dataset.mascotMotionBound;
      motionTarget.style.removeProperty('translate');
      motionTarget.style.removeProperty('rotate');
      motionTarget.style.removeProperty('scale');
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
