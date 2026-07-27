const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const initRamuniParallaxMotion = () => {
  window.__ramuniParallaxMotion?.cleanup();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktopMotion = window.matchMedia('(min-width: 1201px) and (hover: hover) and (pointer: fine)');
  const saveData = Boolean(navigator.connection?.saveData);
  const nodes = Array.from(document.querySelectorAll('[data-parallax]'));

  if (nodes.length === 0) {
    window.__ramuniParallaxMotion = { cleanup: () => undefined };
    return;
  }

  const reset = () => nodes.forEach((node) => {
    node.style.removeProperty('translate');
    node.style.removeProperty('rotate');
    node.style.removeProperty('will-change');
    node.removeAttribute('data-parallax-active');
  });

  if (reduceMotion.matches || !desktopMotion.matches || saveData || !('IntersectionObserver' in window)) {
    reset();
    const recheck = () => initRamuniParallaxMotion();
    reduceMotion.addEventListener('change', recheck);
    desktopMotion.addEventListener('change', recheck);
    window.__ramuniParallaxMotion = {
      cleanup: () => {
        reduceMotion.removeEventListener('change', recheck);
        desktopMotion.removeEventListener('change', recheck);
      },
    };
    return;
  }

  const active = new Set();
  const records = nodes.map((element) => {
    const rawDistance = Number.parseFloat(element.dataset.parallaxDistance || element.dataset.parallax || '12');
    const rawRotate = Number.parseFloat(element.dataset.parallaxRotate || '0');
    const axis = element.dataset.parallaxAxis === 'x' || element.dataset.parallaxAxis === 'both'
      ? element.dataset.parallaxAxis
      : 'y';

    return {
      element,
      axis,
      distance: clamp(Number.isFinite(rawDistance) ? rawDistance : 12, -24, 24),
      rotate: clamp(Number.isFinite(rawRotate) ? rawRotate : 0, -1.5, 1.5),
    };
  });

  let frame = 0;
  let viewportHeight = window.innerHeight || 1;
  const cleanups = [];

  const update = () => {
    frame = 0;
    viewportHeight = window.innerHeight || viewportHeight;
    const viewportCenter = viewportHeight / 2;

    records.forEach(({ element, axis, distance, rotate }) => {
      if (!active.has(element)) return;
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const travel = Math.max(viewportHeight + rect.height, 1);
      const progress = clamp((viewportCenter - elementCenter) / travel, -1, 1);
      const offset = progress * distance;

      const x = axis === 'x' || axis === 'both' ? `${offset.toFixed(2)}px` : '0px';
      const y = axis === 'y' || axis === 'both' ? `${offset.toFixed(2)}px` : '0px';
      element.style.translate = `${x} ${y}`;
      element.style.rotate = `${(progress * rotate).toFixed(3)}deg`;
    });
  };

  const schedule = () => {
    if (frame || document.hidden) return;
    frame = window.requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const target = entry.target;
      if (entry.isIntersecting) {
        active.add(target);
        target.style.willChange = 'translate, rotate';
        target.setAttribute('data-parallax-active', '');
        schedule();
      } else {
        active.delete(target);
        target.style.removeProperty('will-change');
        target.removeAttribute('data-parallax-active');
      }
    });
  }, { rootMargin: '18% 0px 18% 0px', threshold: 0 });

  records.forEach(({ element }) => observer.observe(element));
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  document.addEventListener('visibilitychange', schedule);
  reduceMotion.addEventListener('change', initRamuniParallaxMotion);
  desktopMotion.addEventListener('change', initRamuniParallaxMotion);

  cleanups.push(() => observer.disconnect());
  cleanups.push(() => window.removeEventListener('scroll', schedule));
  cleanups.push(() => window.removeEventListener('resize', schedule));
  cleanups.push(() => document.removeEventListener('visibilitychange', schedule));
  cleanups.push(() => reduceMotion.removeEventListener('change', initRamuniParallaxMotion));
  cleanups.push(() => desktopMotion.removeEventListener('change', initRamuniParallaxMotion));
  cleanups.push(() => {
    if (frame) window.cancelAnimationFrame(frame);
    reset();
  });

  window.__ramuniParallaxMotion = {
    cleanup: () => cleanups.splice(0).forEach((cleanup) => cleanup()),
  };

  schedule();
};

initRamuniParallaxMotion();
document.addEventListener('astro:page-load', initRamuniParallaxMotion);
