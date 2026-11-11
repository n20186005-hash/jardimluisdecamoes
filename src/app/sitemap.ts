import type { MetadataRoute } from 'next';
import { baseUrl } from '@/config';
import { expandedGuides } from '@/lib/expanded-guides';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // Guides are published in pt/en/zh. Mirandese (mwl) is redirected to the
  // Portuguese source, so it is not listed as a separate guide URL.
  const locales = ['zh', 'en', 'pt'];
  const routes = [
    '',
    '/o-que-visitar-em-leiria',
    '/leiria-em-1-dia',
    '/jardim-luis-de-camoes-historia',
    '/guias',
    ...expandedGuides.map((g) => `/guias/${g.slug}`),
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-settings',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      const isGuia = route.startsWith('/guias');
      const url = `${baseUrl}/${locale}${route}`;
      const languages: Record<string, string> = {
        zh: `${baseUrl}/zh${route}`,
        en: `${baseUrl}/en${route}`,
        pt: `${baseUrl}/pt${route}`,
        // Mirandese visitors are redirected to the Portuguese source for guides.
        mwl: isGuia ? `${baseUrl}/pt${route}` : `${baseUrl}/mwl${route}`,
        'x-default': `${baseUrl}/pt${route}`,
      };

      sitemap.push({
        url,
        lastModified: new Date(isGuia ? '2026-11-11' : '2026-10-08'),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority:
          route === ''
            ? 1
            : route.startsWith('/o-que-visitar') ||
                route.startsWith('/leiria-em-1-dia') ||
                route.startsWith('/jardim-luis-de-camoes-historia')
              ? 0.7
              : 0.5,
        alternates: { languages },
      });
    }
  }

  return sitemap;
}
