const nodes = document.querySelectorAll('.reveal');

nodes.forEach((node) => {
  node.addEventListener('animationend', (event) => {
    if (event instanceof AnimationEvent && event.target === node) node.classList.add('is-settled');
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  nodes.forEach((node) => observer.observe(node));
} else {
  nodes.forEach((node) => node.classList.add('is-visible'));
}

const activeNodes = document.querySelectorAll('[data-observe-active]');
if ('IntersectionObserver' in window && activeNodes.length) {
  const activeObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.setAttribute('data-active', '');
      activeObserver.unobserve(entry.target);
    }
  }, { rootMargin: '-38% 0px -38% 0px', threshold: 0 });
  activeNodes.forEach((node) => activeObserver.observe(node));
}
