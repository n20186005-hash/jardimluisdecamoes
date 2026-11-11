import { getLocale, getMessages } from 'next-intl/server';
import { expandedGuides } from '@/lib/expanded-guides';
import { guideDetails } from '@/lib/guide-details';

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

  const guideHref = (slug: string) =>
    locale === 'mwl' ? `/pt/guias/${slug}` : `/${locale}/guias/${slug}`;
  const guidesIndexHref = locale === 'mwl' ? '/pt/guias' : `/${locale}/guias`;

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
        <div className="mt-14" id="passeios-perto-do-jardim">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>{t?.eyebrow}</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{t?.heading}</h2>
          <p className="max-w-3xl mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t?.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {expandedGuides.filter((guide) => guide.kind === 'place').slice(0, 9).map((guide) => {
              const photo = guideDetails[guide.slug]?.photo;
              const focus = typeof guide.focus === 'string' ? guide.focus : (guide.focus as any)[locale] ?? (guide.focus as any).pt;
              return <a href={guideHref(guide.slug)} key={guide.slug} className="block overflow-hidden rounded-xl hover:shadow-lg transition-shadow" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                {photo && <img src={`/guide-photos/${photo}.jpg`} alt={`${guide.title}, Leiria`} className="w-full h-40 object-cover" loading="lazy" />}
                <div className="p-5"><h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{guide.title}</h3><p className="text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>{focus}</p><span className="inline-block mt-4 text-sm font-medium" style={{ color: 'var(--accent)' }}>{t?.cardCta} →</span></div>
              </a>;
            })}
          </div>
          <a href={guidesIndexHref} className="inline-block mt-8 rounded-lg px-6 py-3 font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>{t?.cta} →</a>
        </div>
      </div>
    </section>
  );
}
