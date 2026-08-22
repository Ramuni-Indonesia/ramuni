const initialiseLeadPopup = () => {
  const dialog = document.querySelector('[data-lead-popup]');
  if (!(dialog instanceof HTMLDialogElement) || dialog.dataset.leadPopupBound === 'true') return;
  dialog.dataset.leadPopupBound = 'true';

  const form = dialog.querySelector('[data-lead-form]');
  const flowButtons = Array.from(dialog.querySelectorAll('[data-lead-popup-flow]'));
  const closeButton = dialog.querySelector('[data-lead-popup-close]');
  const submitButton = form?.querySelector('button[type="submit"]');
  const intent = form?.querySelector('select[name="intent"]');

  const setFlow = (flow = 'trial') => {
    const nextFlow = flow === 'consultation' ? 'consultation' : 'trial';
    flowButtons.forEach((button) => {
      if (button instanceof HTMLButtonElement) button.setAttribute('aria-pressed', String(button.dataset.leadPopupFlow === nextFlow));
    });
    if (form instanceof HTMLFormElement) {
      form.dataset.leadFlow = nextFlow;
      if (intent instanceof HTMLSelectElement) intent.value = nextFlow === 'consultation' ? 'support' : 'overview';
    }
    if (submitButton instanceof HTMLButtonElement) submitButton.textContent = nextFlow === 'consultation' ? 'Mulai konsultasi' : 'Coba gratis';
    dialog.dataset.leadPopupFlow = nextFlow;
  };

  setFlow(form instanceof HTMLFormElement && form.dataset.leadFlow === 'consultation' ? 'consultation' : 'trial');
  flowButtons.forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) return;
    button.addEventListener('click', () => setFlow(button.dataset.leadPopupFlow));
  });
  closeButton?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
};

initialiseLeadPopup();
document.addEventListener('astro:page-load', initialiseLeadPopup);
