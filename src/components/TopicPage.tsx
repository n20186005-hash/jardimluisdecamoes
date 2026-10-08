import { getMessages, setRequestLocale } from 'next-intl/server';
import Header from './Header';
import Footer from './Footer';
import SourcesSection from './SourcesSection';
import MapEmbed from './MapEmbed';
import { baseUrl } from '@/config';
import { langTag } from '@/lib/seo';

type TopicFaq = { q: string; a: string };
type TopicSection = { id: string; title: string; content: string };
type Topic = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  faqTitle: string;
  faqSubtitle: string;
  sections: TopicSection[];
  faq: TopicFaq[];
};

export default async function TopicPage({
  locale,
  path,
  topicKey,
}: {
  locale: string;
  path: string;
  topicKey: string;
}) {
  setRequestLocale(locale);
  const messages = (await getMessages()) as any;
  const topic: Topic | undefined = messages?.topics?.[topicKey];
  if (!topic) return null;

  const selfUrl = `${baseUrl}/${locale}${path}`;
  const lt = langTag(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${selfUrl}/#webpage`,
        url: selfUrl,
        name: topic.metaTitle,
        description: topic.metaDescription,
        inLanguage: lt,
        isPartOf: { '@id': `${baseUrl}/#website` },
        about: { '@id': `${baseUrl}/#attraction` },
        dateModified: '2026-10-08',
      },
      {
        '@type': 'Article',
        '@id': `${selfUrl}/#article`,
        headline: topic.title,
        description: topic.metaDescription,
        inLanguage: lt,
        isPartOf: { '@id': `${selfUrl}/#webpage` },
        publisher: { '@id': `${baseUrl}/#organization` },
        mainEntity: { '@id': `${baseUrl}/#attraction` },
        dateModified: '2026-10-08',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Jardim Luís de Camões',
            item: `${baseUrl}/${locale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: topic.title,
            item: selfUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: topic.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-16">
        <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto">
            <h1
              className="font-display text-3xl sm:text-4xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {topic.title}
            </h1>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {topic.intro}
            </p>
          </div>
        </section>

        {topic.sections.map((s) => (
          <section key={s.id} id={s.id} className="section-padding">
            <div className="max-w-4xl mx-auto">
              <h2
                className="font-display text-2xl sm:text-3xl font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                {s.title}
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {s.content}
              </p>
            </div>
          </section>
        ))}

        <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {topic.faqTitle}
            </h2>
            <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
            <p className="mb-10" style={{ color: 'var(--text-secondary)' }}>
              {topic.faqSubtitle}
            </p>
            <div className="space-y-4">
              {topic.faq.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl overflow-hidden"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <summary
                    className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <span>{f.q}</span>
                    <span
                      className="flex-shrink-0 transition-transform duration-200 group-open:rotate-45"
                      style={{ color: 'var(--accent)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </summary>
                  <p
                    className="px-5 pb-5 text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <SourcesSection />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
