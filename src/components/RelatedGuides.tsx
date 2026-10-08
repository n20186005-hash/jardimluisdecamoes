import { getLocale, getMessages } from 'next-intl/server';

const GUIDES = [
  { key: 'oQueVisitar', path: '/o-que-visitar-em-leiria' },
  { key: 'leiria1Dia', path: '/leiria-em-1-dia' },
  { key: 'historia', path: '/jardim-luis-de-camoes-historia' },
] as const;

export default async function RelatedGuides() {
  const locale = await getLocale();
  const messages = (await getMessages()) as any;
  const topics = messages?.topics;
  const t = messages?.relatedGuides;
  if (!topics) return null;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t?.title || 'Guias de Leiria'}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {GUIDES.map((g) => {
            const topic = topics[g.key];
            if (!topic) return null;
            return (
              <a
                key={g.key}
                href={`/${locale}${g.path}`}
                className="block rounded-xl p-6 transition-shadow hover:shadow-md"
                style={{
                  background: 'var(--card-bg)',
                  boxShadow: 'var(--card-shadow)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {topic.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {topic.intro}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
