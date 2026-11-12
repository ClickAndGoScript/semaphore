import { createI18n } from 'vue-i18n';
import { messages } from '../lang';

let locale = localStorage.getItem('lang');

if (!locale) {
  locale = navigator.language.replace('-', '_').toLocaleLowerCase();
}

export function normalizeLocale(value) {
  const normalized = String(value || 'en').replace('-', '_').toLocaleLowerCase();
  if (messages[normalized]) {
    return normalized;
  }

  const shortLocale = normalized.split('_')[0];
  return messages[shortLocale] ? shortLocale : 'en';
}

export function applyDocumentLocale(value) {
  const normalized = normalizeLocale(value);
  document.documentElement.lang = normalized.replace('_', '-');
  document.documentElement.dir = normalized === 'he' ? 'rtl' : 'ltr';
}

locale = normalizeLocale(locale);
applyDocumentLocale(locale);

// Composition mode: `$t`, `$te` and `$i18n.locale` are injected into every component.
export default createI18n({
  legacy: false,
  globalInjection: true,
  fallbackLocale: 'en',
  locale,
  messages,
  fallbackWarn: false,
  warnHtmlMessage: false,
});
