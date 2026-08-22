const initialiseLeadPopup = () => {
  const dialog = document.querySelector('[data-lead-popup]');
  if (!(dialog instanceof HTMLDialogElement) || dialog.dataset.leadPopupBound === 'true') return;
  dialog.dataset.leadPopupBound = 'true';

  const closeButton = dialog.querySelector('[data-lead-popup-close]');
  closeButton?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
};

initialiseLeadPopup();
document.addEventListener('astro:page-load', initialiseLeadPopup);
