import { expect } from 'chai';
import { applyDocumentLocale, normalizeLocale } from '@/plugins/i18';

describe('document locale direction', () => {
  afterEach(() => {
    applyDocumentLocale('en');
  });

  it('uses RTL and the Hebrew language for Hebrew locales', () => {
    applyDocumentLocale('he-IL');

    expect(document.documentElement.lang).to.equal('he');
    expect(document.documentElement.dir).to.equal('rtl');
  });

  it('restores LTR when switching from Hebrew to English', () => {
    applyDocumentLocale('he');
    applyDocumentLocale('en');

    expect(document.documentElement.lang).to.equal('en');
    expect(document.documentElement.dir).to.equal('ltr');
  });

  it('falls back unknown locales to English LTR', () => {
    expect(normalizeLocale('unknown-LOCALE')).to.equal('en');

    applyDocumentLocale('unknown-LOCALE');
    expect(document.documentElement.lang).to.equal('en');
    expect(document.documentElement.dir).to.equal('ltr');
  });
});
