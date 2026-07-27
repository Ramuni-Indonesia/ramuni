const workflowCopy = [
  ['Catatan masuk', 'Empat sumber dibaca bersama.', 'RAMUNI menyatukan konteks tanpa menyembunyikan data yang belum lengkap.'],
  ['Metrik dihitung', 'Periode yang sama mencegah salah banding.', 'Definisi omzet, stok, biaya, dan kas tetap konsisten saat dibaca.'],
  ['Sinyal disusun', 'Perubahan penting muncul lebih dulu.', 'Urutan membantu Anda memilih apa yang perlu diperiksa, bukan langsung bertindak.'],
  ['Bukti dibuka', 'Kesimpulan tetap punya jejak.', 'Periode, sumber, dan data pendukung tersedia untuk ditelusuri.'],
  ['Keputusan manusia', 'Anda menentukan langkah akhirnya.', 'RAMUNI memberi bahan pertimbangan. Tindakan tetap membutuhkan keputusan manusia.'],
];

document.querySelectorAll('[data-workflow-explorer]').forEach((explorer) => {
  const tabs = Array.from(explorer.querySelectorAll('[data-workflow-tab]'));
  const focus = explorer.querySelector('.workflow-focus');
  const label = explorer.querySelector('[data-workflow-label]');
  const title = explorer.querySelector('[data-workflow-title]');
  const copy = explorer.querySelector('[data-workflow-copy]');
  const state = explorer.querySelector('[data-workflow-state]');
  const activate = (tab) => {
    const index = Number(tab.dataset.workflowTab || 0);
    tabs.forEach((item) => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    if (!focus || !label || !title || !copy || !state) return;
    focus.dataset.changing = 'false';
    void focus.offsetWidth;
    [label.textContent, title.textContent, copy.textContent] = workflowCopy[index];
    state.textContent = `${String(index + 1).padStart(2, '0')} / 05`;
    focus.dataset.changing = 'true';
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
      tabs[next].focus();
      activate(tabs[next]);
    });
  });
});

document.querySelectorAll('[data-industry-room]').forEach((room) => {
  const tabs = Array.from(room.querySelectorAll('[data-industry-tab]'));
  const code = room.querySelector('[data-industry-code]');
  const scene = room.querySelector('[data-industry-scene]');
  const question = room.querySelector('[data-industry-question]');
  const link = room.querySelector('[data-industry-link]');
  const name = room.querySelector('[data-industry-name]');
  const activate = (tab) => {
    tabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
    if (code) code.textContent = tab.dataset.code || '';
    if (scene) scene.dataset.scene = tab.dataset.scene || '';
    if (question) question.textContent = tab.dataset.question || '';
    if (link) link.href = tab.dataset.href || '/industri';
    if (name) name.textContent = tab.dataset.name || '';
    room.dataset.changing = 'false';
    void room.offsetWidth;
    room.dataset.changing = 'true';
  };
  tabs.forEach((tab) => tab.addEventListener('click', () => activate(tab)));
});

const problemCanvas = document.querySelector('.problem-canvas');
const problemMascot = document.querySelector('[data-problem-mascot]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (problemCanvas && problemMascot && !reducedMotion.matches) {
  const problemPoints = Array.from(problemCanvas.querySelectorAll('.problem-point'));
  let canvasVisible = false;
  let activeProblemIndex = -1;
  let scrollFrame = 0;

  const focusProblem = (index) => {
    if (!problemPoints.length || index === activeProblemIndex) return;
    activeProblemIndex = index;
    problemPoints.forEach((point, pointIndex) => point.classList.toggle('is-mascot-focus', pointIndex === index));
    const point = problemPoints[index];
    if (!point) return;
    const mascotBounds = problemMascot.getBoundingClientRect();
    const pointBounds = point.getBoundingClientRect();
    const deltaX = pointBounds.left + pointBounds.width / 2 - (mascotBounds.left + mascotBounds.width / 2);
    const deltaY = pointBounds.top + pointBounds.height / 2 - (mascotBounds.top + mascotBounds.height / 2);
    const direction = Math.max(-1, Math.min(1, deltaX / Math.max(1, problemCanvas.clientWidth * .34)));
    const targetX = Math.max(-1, Math.min(1, deltaX / Math.max(1, problemCanvas.clientWidth * .5)));
    const targetY = Math.max(-1, Math.min(1, deltaY / Math.max(1, problemCanvas.clientHeight * .5)));
    problemMascot.dataset.activeProblem = String(index);
    problemMascot.dataset.mascotTargetX = targetX.toFixed(3);
    problemMascot.dataset.mascotTargetY = targetY.toFixed(3);
    problemMascot.style.setProperty('--mascot-look-x', `${(direction * 9).toFixed(1)}px`);
    problemMascot.style.setProperty('--mascot-look-y', `${Math.max(-5, Math.min(5, deltaY / 38)).toFixed(1)}px`);
    problemMascot.style.setProperty('--mascot-tilt', `${(direction * 2.4).toFixed(1)}deg`);
    problemMascot.style.setProperty('--mascot-ry', `${(direction * 5).toFixed(1)}deg`);
    problemMascot.style.setProperty('--mascot-shadow', String(1 - Math.abs(direction) * .08));
    problemMascot.dispatchEvent(new CustomEvent('ramuni:mascot-focus', {
      detail: { index, targetX, targetY },
    }));
  };

  const updateProblemScroll = () => {
    if (!canvasVisible || !problemPoints.length) return;
    const bounds = problemCanvas.getBoundingClientRect();
    const viewportAnchor = window.innerHeight * .56;
    const progress = Math.max(0, Math.min(1, (viewportAnchor - bounds.top) / Math.max(1, bounds.height)));
    const index = Math.min(problemPoints.length - 1, Math.floor(progress * problemPoints.length));
    focusProblem(index);
    problemMascot.style.setProperty('--mascot-scroll-y', `${(Math.sin(progress * Math.PI * 2) * 4).toFixed(1)}px`);
  };

  const visibilityObserver = new IntersectionObserver((entries) => {
    canvasVisible = entries.some((entry) => entry.isIntersecting);
    if (canvasVisible) updateProblemScroll();
  }, { rootMargin: '10% 0px' });
  visibilityObserver.observe(problemCanvas);

  const handleScroll = () => {
    if (!canvasVisible || scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      updateProblemScroll();
    });
  };

  const pointBindings = problemPoints.map((point, index) => {
    const handleIntent = () => focusProblem(index);
    const handleLeave = () => updateProblemScroll();
    point.addEventListener('mouseenter', handleIntent);
    point.addEventListener('focus', handleIntent);
    point.addEventListener('mouseleave', handleLeave);
    point.addEventListener('blur', handleLeave);
    return { point, handleIntent, handleLeave };
  });

  const cleanupProblemMotion = () => {
    visibilityObserver.disconnect();
    window.removeEventListener('scroll', handleScroll);
    pointBindings.forEach(({ point, handleIntent, handleLeave }) => {
      point.removeEventListener('mouseenter', handleIntent);
      point.removeEventListener('focus', handleIntent);
      point.removeEventListener('mouseleave', handleLeave);
      point.removeEventListener('blur', handleLeave);
    });
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('pagehide', cleanupProblemMotion, { once: true });
  document.addEventListener('astro:before-swap', cleanupProblemMotion, { once: true });
}
