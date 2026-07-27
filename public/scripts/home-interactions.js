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
