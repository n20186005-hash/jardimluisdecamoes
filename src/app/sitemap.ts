import type { MetadataRoute } from 'next';
import { baseUrl } from '@/config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['zh', 'en', 'pt', 'mwl'];
  const routes = [
    '',
    '/o-que-visitar-em-leiria',
    '/leiria-em-1-dia',
    '/jardim-luis-de-camoes-historia',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-settings',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      const url = `${baseUrl}/${locale}${route}`;
      const languages: Record<string, string> = {
        zh: `${baseUrl}/zh${route}`,
        en: `${baseUrl}/en${route}`,
        pt: `${baseUrl}/pt${route}`,
        mwl: `${baseUrl}/mwl${route}`,
        'x-default': `${baseUrl}/pt${route}`,
      };

      sitemap.push({
        url,
        lastModified: new Date('2026-10-08'),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority:
          route === ''
            ? 1
            : route.startsWith('/o-que-visitar') ||
                route.startsWith('/leiria-em-1-dia') ||
                route.startsWith('/jardim-luis-de-camoes-historia')
              ? 0.7
              : 0.5,
        alternates: {
          languages,
        },
      });
    }
  }

  return sitemap;
}
