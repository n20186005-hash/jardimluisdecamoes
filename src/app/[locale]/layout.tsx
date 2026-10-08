import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { baseUrl } from '@/config';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const langMap: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en',
  pt: 'pt',
  mwl: 'mwl',
};

const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    } catch(e) {}
  })();
`;

const gaScript = `
  (function() {
    var GA_ID = 'G-HXM22WWPKP';
    function readConsent() {
      try {
        var p = JSON.parse(localStorage.getItem('cookiePrefs') || '{}');
        return !!p.analytics;
      } catch (e) { return false; }
    }
    function loadGA() {
      if (window.__gaLoaded) return;
      window.__gaLoaded = true;
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', GA_ID, { anonymize_ip: true });
    }
    if (readConsent()) { loadGA(); }
    window.addEventListener('consent-updated', function() {
      if (readConsent()) loadGA();
    });
  })();
`;

const swScript = `
  (function() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').catch(function() {});
      });
    }
  })();
`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const msg: any = messages;
  const metaTitle: string = msg?.meta?.title || 'Jardim Luís de Camões';

  // 站点级结构化数据（Organization + WebSite），对所有 [locale] 页面通用。
  // 页面级数据（WebPage / TouristAttraction / Article 等）由各页面自行输出。
  const siteJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'Jardim Luís de Camões',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/icons/icon.svg`,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'Jardim Luís de Camões',
        description: metaTitle,
        inLanguage: ['pt-PT', 'en', 'zh-CN', 'mwl'],
        publisher: { '@id': `${baseUrl}/#organization` },
      },
    ],
  };

  return (
    <html lang={langMap[locale] || 'pt'} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <meta name="theme-color" content="#3a7a8d" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <script dangerouslySetInnerHTML={{ __html: gaScript }} />
        <script dangerouslySetInnerHTML={{ __html: swScript }} />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
