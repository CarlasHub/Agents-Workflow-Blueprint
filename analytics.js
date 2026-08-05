const MEASUREMENT_ID = 'G-PZEC365PCE';
const CONSENT_KEY = 'agent-workflow-blueprint.analytics-consent.v1';
const GRANTED = 'granted';
const DENIED = 'denied';
const SCRIPT_SELECTOR = 'script[data-agent-workflow-analytics]';

function queueGtag(windowRef, ...args) {
  windowRef.dataLayer = windowRef.dataLayer || [];
  windowRef.dataLayer.push(args);
}

function readStoredConsent(windowRef) {
  try {
    const value = windowRef.localStorage.getItem(CONSENT_KEY);
    return value === GRANTED || value === DENIED ? value : null;
  } catch {
    return null;
  }
}

function storeConsent(windowRef, value) {
  try {
    windowRef.localStorage.setItem(CONSENT_KEY, value);
    return true;
  } catch {
    return false;
  }
}

function consentPayload(analyticsStorage) {
  return {
    ad_storage: DENIED,
    ad_user_data: DENIED,
    ad_personalization: DENIED,
    analytics_storage: analyticsStorage
  };
}

function removeAnalyticsCookies(documentRef) {
  const cookieNames = documentRef.cookie
    .split(';')
    .map((cookie) => cookie.split('=', 1)[0].trim())
    .filter((name) => /^_ga(?:_|$)/.test(name));

  for (const name of cookieNames) {
    documentRef.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
  }
}

function loadAnalytics(documentRef, windowRef) {
  windowRef[`ga-disable-${MEASUREMENT_ID}`] = false;
  queueGtag(windowRef, 'consent', 'update', consentPayload(GRANTED));
  queueGtag(windowRef, 'set', 'ads_data_redaction', true);

  if (!documentRef.querySelector(SCRIPT_SELECTOR)) {
    queueGtag(windowRef, 'js', new Date());
    queueGtag(windowRef, 'config', MEASUREMENT_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    const script = documentRef.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    script.dataset.agentWorkflowAnalytics = MEASUREMENT_ID;
    documentRef.head.append(script);
  }
}

function disableAnalytics(documentRef, windowRef) {
  queueGtag(windowRef, 'consent', 'update', consentPayload(DENIED));
  windowRef[`ga-disable-${MEASUREMENT_ID}`] = true;
  removeAnalyticsCookies(documentRef);
}

function analyticsMarkup(privacyHref) {
  return `
    <section class="analytics-consent" data-analytics-consent hidden>
      <div class="analytics-consent-panel" role="region" aria-labelledby="analytics-consent-title" aria-describedby="analytics-consent-description">
        <p class="eyebrow">Optional analytics</p>
        <h2 id="analytics-consent-title">Help improve this project?</h2>
        <p id="analytics-consent-description">
          Allow privacy-limited Google Analytics page-view measurement. Advertising storage, signals, and personalisation stay disabled.
          <a class="inline-link" href="${privacyHref}">Read the privacy details</a>.
        </p>
        <p class="analytics-consent-current" data-analytics-consent-current></p>
        <div class="analytics-consent-actions">
          <button class="button button-secondary" type="button" data-analytics-deny>Continue without analytics</button>
          <button class="button button-primary" type="button" data-analytics-allow>Allow analytics</button>
        </div>
      </div>
    </section>
    <button class="analytics-preferences-button" type="button" data-analytics-preferences hidden>Analytics settings</button>
    <div class="visually-hidden" role="status" aria-live="polite" aria-atomic="true" data-analytics-status></div>`;
}

export function createAnalyticsConsent(documentRef = document, windowRef = window) {
  const loader = documentRef.querySelector('script[data-analytics-consent]');
  const privacyHref = loader?.dataset.privacyHref || 'privacy.html';
  const container = documentRef.createElement('div');
  container.dataset.analyticsUi = '';
  container.innerHTML = analyticsMarkup(privacyHref);
  const header = documentRef.querySelector('.site-header');
  if (header) {
    header.after(container);
  } else {
    documentRef.body.prepend(container);
  }

  const consent = container.querySelector('[data-analytics-consent]');
  const current = container.querySelector('[data-analytics-consent-current]');
  const allow = container.querySelector('[data-analytics-allow]');
  const deny = container.querySelector('[data-analytics-deny]');
  const preferences = container.querySelector('[data-analytics-preferences]');
  const status = container.querySelector('[data-analytics-status]');
  let choice = readStoredConsent(windowRef);

  queueGtag(windowRef, 'consent', 'default', consentPayload(DENIED));

  function updateCurrentMessage() {
    current.textContent = choice === GRANTED
      ? 'Analytics is currently allowed. You can withdraw consent at any time.'
      : choice === DENIED
        ? 'Analytics is currently disabled.'
        : 'No analytics choice has been saved.';
  }

  function showConsent({ focus = false } = {}) {
    updateCurrentMessage();
    consent.hidden = false;
    preferences.hidden = true;
    if (focus) {
      (choice === GRANTED ? deny : allow).focus();
    }
  }

  function hideConsent(message, returnFocus = false) {
    consent.hidden = true;
    preferences.hidden = false;
    status.textContent = '';
    windowRef.setTimeout(() => { status.textContent = message; }, 10);
    if (returnFocus) preferences.focus();
  }

  function choose(value) {
    choice = value;
    const persisted = storeConsent(windowRef, value);
    if (value === GRANTED) {
      loadAnalytics(documentRef, windowRef);
      hideConsent(`Analytics allowed${persisted ? '' : ' for this page only'}.`, true);
      return;
    }
    disableAnalytics(documentRef, windowRef);
    hideConsent(`Analytics disabled${persisted ? '' : ' for this page only'}.`, true);
  }

  allow.addEventListener('click', () => choose(GRANTED));
  deny.addEventListener('click', () => choose(DENIED));
  preferences.addEventListener('click', () => showConsent({ focus: true }));

  consent.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && choice) {
      event.preventDefault();
      hideConsent('Analytics preference unchanged.', true);
    }
  });

  if (choice === GRANTED) {
    loadAnalytics(documentRef, windowRef);
    preferences.hidden = false;
  } else if (choice === DENIED) {
    disableAnalytics(documentRef, windowRef);
    preferences.hidden = false;
  } else {
    showConsent();
  }

  return {
    get choice() { return choice; },
    measurementId: MEASUREMENT_ID,
    showConsent,
    disable: () => choose(DENIED),
    allow: () => choose(GRANTED)
  };
}

if (typeof document !== 'undefined') {
  createAnalyticsConsent();
}

export { CONSENT_KEY, DENIED, GRANTED, MEASUREMENT_ID };
