import type { Metadata } from 'next';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { baseUrl } from '@/config';
import { pageAlternates, ogLocale } from '@/lib/seo';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import WeatherSection from '@/components/WeatherSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import RouteSection from '@/components/RouteSection';
import KnowledgeSection from '@/components/KnowledgeSection';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import HotelsSection from '@/components/HotelsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FAQSection from '@/components/FAQSection';
import SourcesSection from '@/components/SourcesSection';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';
import RelatedGuides from '@/components/RelatedGuides';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = (await getMessages()) as any;

  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const ptUrl = `${baseUrl}/pt`;
  const mwlUrl = `${baseUrl}/mwl`;
  const selfUrl = `${baseUrl}/${locale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        zh: zhUrl,
        en: enUrl,
        pt: ptUrl,
        mwl: mwlUrl,
        'x-default': ptUrl,
      } as Record<string, string>,
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: 'Jardim Luís de Camões',
      locale: ogLocale(locale),
      type: 'website',
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
      title: messages.meta.title,
      description: messages.meta.description,
      images: [`${baseUrl}/gallery/jardim-luis-de-camoes-1.jpg`],
    },
    other: {
      'og:image:alt': 'Jardim Luís de Camões, Leiria, Portugal',
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const msg = (await getMessages()) as any;
  const metaTitle: string = msg?.meta?.title || 'Jardim Luís de Camões';
  const metaDescription: string = msg?.meta?.description || '';
  const selfUrl = `${baseUrl}/${locale}`;

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${selfUrl}/#webpage`,
        url: selfUrl,
        name: metaTitle,
        description: metaDescription,
        inLanguage: ogLocale(locale).replace('_', '-'),
        isPartOf: { '@id': `${baseUrl}/#website` },
        about: { '@id': `${baseUrl}/#attraction` },
        dateModified: '2026-10-08',
      },
      {
        '@type': ['TouristAttraction', 'Park'],
        '@id': `${baseUrl}/#attraction`,
        name: 'Jardim Luís de Camões',
        description: metaDescription,
        url: selfUrl,
        image: `${baseUrl}/gallery/jardim-luis-de-camoes-1.jpg`,
        isAccessibleForFree: true,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Largo 5 de Outubro 48',
          addressLocality: 'Leiria',
          postalCode: '2400-137',
          addressRegion: 'Leiria',
          addressCountry: 'PT',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 39.7446309,
          longitude: -8.8063219,
        },
        telephone: '+351244839500',
        hasMap: 'https://maps.app.goo.gl/6WaNcoHmFRCSmj4s5',
        sameAs: ['https://maps.app.goo.gl/6WaNcoHmFRCSmj4s5'],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '00:00',
            closes: '23:59',
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.5',
          reviewCount: '6719',
          bestRating: '5',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <WeatherSection />
        <FacilitiesSection />
        <RouteSection />
        <KnowledgeSection />
        <PhotoSpotsSection />
        <HotelsSection />
        <Gallery />
        <Reviews />
        <FAQSection />
        <SourcesSection />
        <MapEmbed />
        <RelatedGuides />
      </main>
      <Footer />
    </>
  );
}
