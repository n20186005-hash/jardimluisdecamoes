import type { Metadata } from 'next';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { baseUrl } from '@/config';
import { pageAlternates, ogLocale } from '@/lib/seo';
import TopicPage from '@/components/TopicPage';

export function createTopicPage(key: string, path: string) {
  function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
  }

  async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    const messages = (await getMessages()) as any;
    const topic = messages?.topics?.[key];
    const metaTitle = topic?.metaTitle || 'Jardim Luís de Camões';
    const metaDescription = topic?.metaDescription || '';
    const alt = pageAlternates(locale, path);
    const selfUrl = `${baseUrl}/${locale}${path}`;

    return {
      metadataBase: new URL(baseUrl),
      title: metaTitle,
      description: metaDescription,
      alternates: alt,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        url: selfUrl,
        siteName: 'Jardim Luís de Camões',
        locale: ogLocale(locale),
        type: 'article',
        images: [
          {
            url: `${baseUrl}/gallery/jardim-luis-de-camoes-1.jpg`,
            width: 1200,
            height: 900,
            alt: 'Jardim Luís de Camões, Leiria, Portugal',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: metaTitle,
        description: metaDescription,
        images: [`${baseUrl}/gallery/jardim-luis-de-camoes-1.jpg`],
      },
    };
  }

  async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <TopicPage locale={locale} path={path} topicKey={key} />;
  }

  return { generateStaticParams, generateMetadata, Page };
}
