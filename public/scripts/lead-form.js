const initialiseLeadForms = () => {
  const officialWhatsAppUrl = 'https://wa.me/message/K35W6X6WT7YMJ1';
  const allowedIntents = new Set(['overview', 'catalog', 'sales', 'stock', 'finance', 'customer', 'report', 'support']);
  const attributionKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'];
  const clickIdKeys = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'ttclid', 'li_fat_id'];
  const piiPattern = /(?:[^\s@]+@[^\s@]+\.[^\s@]+)|(?:\+?\d[\d\s().-]{7,}\d)/i;

  const clean = (value, max = 200) => String(value || '').replace(/[\u0000-\u001f\u007f<>]/g, '').trim().slice(0, max);
  const key = (value, fallback) => clean(value, 80).toLowerCase().replace(/&/g, ' and ').replace(/\+/g, ' plus ')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || fallback;
  const randomId = (prefix) => {
    const raw = typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
    return (prefix + '-' + raw.replace(/[^A-Za-z0-9._~-]/g, '')).slice(0, 128);
  };
  const persistentId = (storage, storageKey, prefix) => {
    try {
      const stored = storage.getItem(storageKey);
      if (stored && /^[A-Za-z0-9][A-Za-z0-9._~-]{5,127}$/.test(stored)) return stored;
      const created = randomId(prefix);
      storage.setItem(storageKey, created);
      return created;
    } catch {
      return randomId(prefix);
    }
  };
  const normalizePhone = (value) => {
    let phone = clean(value, 24).replace(/[\s().-]/g, '');
    if (phone.startsWith('00')) phone = '+' + phone.slice(2);
    if (phone.startsWith('0')) phone = '+62' + phone.slice(1);
    if (phone.startsWith('62')) phone = '+' + phone;
    return /^\+[1-9]\d{7,14}$/.test(phone) ? phone : '';
  };
  const safeValue = (value, max = 200) => {
    const result = clean(value, max);
    return result && !piiPattern.test(result) ? result : undefined;
  };
  const attributionPayload = () => {
    const params = new URLSearchParams(window.location.search);
    const current = {};
    attributionKeys.forEach((name) => {
      const value = safeValue(params.get(name));
      if (value) current[name] = value;
    });
    const clickIds = {};
    clickIdKeys.forEach((name) => {
      const value = safeValue(params.get(name), 256);
      if (value) clickIds[name] = value;
    });
    if (Object.keys(clickIds).length) current.click_ids = clickIds;
    if (document.referrer) {
      try {
        const referrer = new URL(document.referrer);
        referrer.username = '';
        referrer.password = '';
        referrer.search = '';
        referrer.hash = '';
        const value = safeValue(referrer.toString(), 500);
        if (value) current.referrer = value;
      } catch {
        // Invalid referrers are ignored.
      }
    }
    let firstTouchToken = '';
    try {
      const stored = JSON.parse(localStorage.getItem('ramuni-attribution-v2') || 'null');
      if (typeof stored?.first_touch_token === 'string') firstTouchToken = stored.first_touch_token;
    } catch {
      // Attribution storage is optional.
    }
    if (!firstTouchToken) firstTouchToken = randomId('touch');
    const payload = {
      first_touch_token: firstTouchToken,
      ...(Object.keys(current).length ? { current_touch: current } : {}),
    };
    try { localStorage.setItem('ramuni-attribution-v2', JSON.stringify(payload)); } catch { /* optional */ }
    return payload;
  };
  const requestedIntent = key(new URLSearchParams(window.location.search).get('intent'), '');

  document.querySelectorAll('[data-lead-form]').forEach((form) => {
    if (!(form instanceof HTMLFormElement) || form.dataset.leadBound === 'true') return;
    form.dataset.leadBound = 'true';

    const steps = Array.from(form.querySelectorAll('[data-form-step]'));
    const indicators = Array.from(form.querySelectorAll('[data-step-indicator]'));
    const nextButtons = Array.from(form.querySelectorAll('[data-progress-next]'));
    const backButton = form.querySelector('[data-progress-back]');
    const submitButton = form.querySelector('button[type="submit"]');
    const status = form.querySelector('.form-status');
    const chatHistory = form.querySelector('[data-chat-history]');
    let stepIndex = 0;
    let retryPayload = null;

    if (allowedIntents.has(requestedIntent)) {
      const intent = form.querySelector('select[name="intent"]');
      if (intent instanceof HTMLSelectElement) intent.value = requestedIntent;
    }

    const setStatus = (message, state) => {
      if (!(status instanceof HTMLElement)) return;
      status.textContent = message;
      status.dataset.state = state;
    };
    const fieldsForStep = (index) => Array.from(steps[index]?.querySelectorAll('input, select, textarea') || []);
    const focusStep = (index) => {
      const target = steps[index]?.querySelector('input:not([type="hidden"]), select, textarea, button:not([hidden])');
      if (target instanceof HTMLElement) target.focus();
    };
    const renderChatHistory = () => {
      if (!(chatHistory instanceof HTMLElement) || form.dataset.leadVariant !== 'chat') return;
      chatHistory.replaceChildren();
      if (stepIndex > 0) {
        const nameReply = document.createElement('p');
        const nameField = form.querySelector('input[name="name"]');
        nameReply.textContent = nameField instanceof HTMLInputElement && nameField.value.trim()
          ? nameField.value.trim()
          : 'Nama sudah saya isi.';
        chatHistory.append(nameReply);
      }
      if (stepIndex > 1) {
        const phoneReply = document.createElement('p');
        phoneReply.textContent = 'Nomor WhatsApp sudah siap.';
        chatHistory.append(phoneReply);
      }
      if (stepIndex > 2) {
        const emailReply = document.createElement('p');
        emailReply.textContent = 'Email sudah saya isi.';
        chatHistory.append(emailReply);
      }
      if (stepIndex > 3) {
        const needField = form.querySelector('textarea[name="need"]');
        const intentReply = document.createElement('p');
        const need = needField instanceof HTMLTextAreaElement ? needField.value.trim() : '';
        intentReply.textContent = need || 'Kebutuhan usaha sudah saya tulis.';
        chatHistory.append(intentReply);
      }
    };
    const validate = (fields) => {
      for (const field of fields) {
        if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) continue;
        field.setCustomValidity('');
        if (field.name === 'phone' && !normalizePhone(field.value)) {
          field.setCustomValidity('Masukkan nomor WhatsApp aktif, contoh 08123456789 atau +628123456789.');
        }
        if (!field.checkValidity()) {
          field.reportValidity();
          field.focus();
          return false;
        }
      }
      return true;
    };
    const renderStep = () => {
      if (form.dataset.leadMode !== 'progressive') return;
      steps.forEach((step, index) => step.toggleAttribute('data-active', index === stepIndex));
      indicators.forEach((indicator, index) => {
        const active = index === stepIndex;
        indicator.toggleAttribute('data-active', active);
        if (active) indicator.setAttribute('aria-current', 'step');
        else indicator.removeAttribute('aria-current');
      });
      if (backButton instanceof HTMLButtonElement) backButton.hidden = stepIndex === 0;
      nextButtons.forEach((button) => {
        if (button instanceof HTMLButtonElement) button.hidden = stepIndex === steps.length - 1;
      });
      if (submitButton instanceof HTMLButtonElement) submitButton.hidden = stepIndex !== steps.length - 1;
      renderChatHistory();
    };
    const advanceStep = () => {
      if (!validate(fieldsForStep(stepIndex))) return false;
      stepIndex = Math.min(stepIndex + 1, steps.length - 1);
      renderStep();
      focusStep(stepIndex);
      return true;
    };
    renderStep();

    nextButtons.forEach((button) => button.addEventListener('click', () => {
      advanceStep();
    }));
    backButton?.addEventListener('click', () => {
      stepIndex = Math.max(stepIndex - 1, 0);
      renderStep();
      focusStep(stepIndex);
    });
    form.addEventListener('input', () => {
      if (form.dataset.submitting !== 'true') {
        delete form.dataset.idempotencyKey;
        retryPayload = null;
      }
    });

    if (form.dataset.enabled !== 'true') {
      form.addEventListener('submit', (event) => event.preventDefault());
      return;
    }
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!(submitButton instanceof HTMLButtonElement) || form.dataset.submitting === 'true') return;
      if (form.dataset.leadMode === 'progressive' && stepIndex < steps.length - 1) {
        advanceStep();
        return;
      }
      if (!validate(steps.flatMap((_, index) => fieldsForStep(index)))) return;

      const data = new FormData(form);
      const kind = form.dataset.leadForm || 'contact';
      const location = key(form.dataset.leadLocation, 'inline');
      const captureId = form.dataset.captureId || randomId('capture');
      const idempotencyKey = form.dataset.idempotencyKey || randomId('lead-key');
      const intent = key(data.get('intent'), 'support');
      const need = clean(data.get('need'), 2000);
      form.dataset.captureId = captureId;
      form.dataset.idempotencyKey = idempotencyKey;

      const payload = retryPayload || {
        full_name: clean(data.get('name'), 150),
        email: clean(data.get('email'), 254).toLowerCase(),
        phone_e164: normalizePhone(data.get('phone')),
        company_name: clean(data.get('business'), 150),
        industry_key: key(data.get('industry'), 'unknown'),
        business_size_key: key(data.get('businessSize'), 'unknown'),
        intent_key: intent,
        ...(need ? { need_summary: need } : {}),
        lead_type: kind,
        contact_consent: data.get('consent') === 'yes',
        contact_consent_version: clean(data.get('consentVersion'), 80),
        marketing_consent: data.get('marketingConsent') === 'yes',
        form_contract_version: 1,
        form_id: key(kind + '-' + location, 'public-lead'),
        form_location: location,
        page_path: window.location.pathname,
        page_type: key(window.location.pathname.split('/').filter(Boolean)[0], 'home'),
        cta_id: key(kind + '-' + location + '-submit', 'lead-submit'),
        cta_text_key: key(submitButton.textContent, 'submit'),
        cta_intent: intent,
        locale: 'id-ID',
        site_id: 'ramuni-id',
        product_interest_key: 'ramuni',
        solution_interest_key: intent,
        visitor_id: persistentId(localStorage, 'ramuni-visitor-id-v1', 'visitor'),
        session_id: persistentId(sessionStorage, 'ramuni-session-id-v1', 'session'),
        lead_capture_session_id: captureId,
        submitted_at_client: new Date().toISOString(),
        attribution_payload: attributionPayload(),
      };
      retryPayload = payload;

      form.dataset.submitting = 'true';
      const originalLabel = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Mengirim...';
      setStatus('Sedang mengirim permintaan Anda.', 'loading');

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Idempotency-Key': idempotencyKey,
            'X-Form-Contract-Version': '1',
          },
        });
        let receipt = null;
        try { receipt = await response.json(); } catch { receipt = null; }
        if (response.status !== 201 || receipt?.status !== 'accepted' || typeof receipt?.submission_id !== 'string') {
          throw new Error('lead_not_accepted');
        }
        window.dispatchEvent(new CustomEvent('ramuni:lead:accepted', {
          detail: { leadType: kind, attributionPresent: true, acceptedAt: new Date().toISOString() },
        }));
        delete form.dataset.idempotencyKey;
        retryPayload = null;
        if (form.dataset.leadHandoff === 'whatsapp') {
          setStatus('Permintaan terkirim. Membuka WhatsApp RAMUNI...', 'success');
          window.location.assign(officialWhatsAppUrl);
          return;
        }
        setStatus('Terkirim. Mengarahkan ke halaman konfirmasi...', 'success');
        const nextPath = typeof receipt.next?.path === 'string' && receipt.next.path.startsWith('/')
          ? receipt.next.path
          : '/terima-kasih/' + (kind === 'contact' ? 'kontak' : kind);
        window.location.assign(nextPath);
      } catch {
        form.dataset.submitting = 'false';
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
        setStatus('Belum terkirim. Periksa koneksi atau coba lagi sebentar lagi.', 'error');
      }
    });
  });
};

initialiseLeadForms();
document.addEventListener('astro:page-load', initialiseLeadForms);
