import { baseUrl } from '@/config';
import { routing } from '@/i18n/routing';

const localeMap: Record<string, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  pt: 'pt_PT',
  mwl: 'mwl',
};

const langTagMap: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en',
  pt: 'pt-PT',
  mwl: 'mwl',
};

export function pageUrl(locale: string, path = ''): string {
  return `${baseUrl}/${locale}${path}`;
}

export function ogLocale(locale: string): string {
  return localeMap[locale] || 'pt_PT';
}

export function langTag(locale: string): string {
  return langTagMap[locale] || 'pt-PT';
}

// 生成 per-page 的 canonical + hreflang（含 x-default → pt）。
// path 为子页面路径，例如 '/o-que-visitar-em-leiria'，首页留空。
export function pageAlternates(locale: string, path = ''): {
  canonical: string;
  languages: Record<string, string>;
} {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = pageUrl(l, path);
  }
  languages['x-default'] = pageUrl('pt', path);

  return {
    canonical: pageUrl(locale, path),
    languages,
  };
}
