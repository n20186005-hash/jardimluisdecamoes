import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { expandedGuides, expandedGuideBySlug } from '@/lib/expanded-guides';
import { guideDetails, guideMap, planDestinations } from '@/lib/guide-details';
import { baseUrl } from '@/config';
import { langTag } from '@/lib/seo';
import { lt, guideLabel } from '@/lib/guide-i18n';

type Props = { params: Promise<{ locale: string; slug: string }> };

// Guides are published in pt/en/zh. Mirandese (mwl) is intentionally not generated:
// mwl visitors are linked to the Portuguese source so we never mislabel Portuguese as Mirandese.
const GUIDE_LOCALES = ['pt', 'en', 'zh'];

const metaSuffix: Record<string, string> = {
  pt: 'Guia de visita em Leiria',
  en: 'Leiria visitor guide',
  zh: '莱里亚游览指南',
  mwl: 'Guia de visita em Leiria',
};
const metaTail: Record<string, string> = {
  pt: 'História, pontos de observação, percurso a pé, conselhos e mapa para planear a visita a Leiria.',
  en: 'History, things to observe, a walking route, tips and a map to plan your visit to Leiria.',
  zh: '历史、可观之处、步行路线、实用建议与地图，助你规划莱里亚之行。',
  mwl: 'História, pontos de observação, percurso a pé, conselhos e mapa para planear a visita a Leiria.',
};
const tagText: Record<string, string> = {
  place: 'Património e cultura',
  plan: 'Roteiro de viagem',
};
const tagTextEn: Record<string, string> = { place: 'Heritage & culture', plan: 'Travel itinerary' };
const tagTextZh: Record<string, string> = { place: '遗产与文化', plan: '旅行路线' };
const checkConditions: Record<string, string> = {
  pt: 'Consulte as condições de visita antes de sair',
  en: 'Check visiting conditions before you leave',
  zh: '出发前请查询参观条件',
  mwl: 'Consulte as condições de visita antes de sair',
};
const sourcesTitle: Record<string, string> = {
  pt: 'Fontes para aprofundar',
  en: 'Sources to go deeper',
  zh: '深入了解的资料来源',
  mwl: 'Fontes para aprofundar',
};
const sourceLinks = [
  { label: 'Visit Leiria — Jardins e espaços verdes', url: 'https://www.visiteleiria.pt/pontos-de-interesse/patrimonio-natural/jardins-e-espacos-verdes/' },
  { label: 'Município de Leiria — Percurso Urbano (PDF)', url: 'https://www.visiteleiria.pt/media/2020/06/Percurso-Urbano_visite.pdf' },
];

export function generateStaticParams() {
  return GUIDE_LOCALES.flatMap((locale) => expandedGuides.map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = expandedGuideBySlug.get(slug);
  if (!guide || !GUIDE_LOCALES.includes(locale)) return {};
  const title = `${guide.title} | ${metaSuffix[locale]}`;
  const description = `${lt(guide.focus, locale)} ${metaTail[locale]}`;
  const selfUrl = `${baseUrl}/${locale}/guias/${slug}`;
  const languages: Record<string, string> = {
    pt: `${baseUrl}/pt/guias/${slug}`,
    en: `${baseUrl}/en/guias/${slug}`,
    zh: `${baseUrl}/zh/guias/${slug}`,
  };
  return {
    title, description,
    alternates: { canonical: selfUrl, languages: { ...languages, 'x-default': languages.pt } },
    openGraph: { title, description, url: selfUrl, type: 'article', locale: langTag(locale) },
  };
}

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  const guide = expandedGuideBySlug.get(slug);
  if (!guide) notFound();
  // Mirandese (mwl) guides are not fabricated; redirect mwl visitors to the Portuguese source.
  if (!GUIDE_LOCALES.includes(locale)) redirect(`/pt/guias/${slug}`);
  const L = guideLabel(locale);
  const url = `${baseUrl}/${locale}/guias/${slug}`;
  const related = expandedGuides.filter((item) => item.slug !== slug && item.kind === guide.kind).slice(0, 6);
  const detail = guideDetails[slug];
  const place = guide.kind === 'place';
  const map = guideMap(slug, guide.map, place);
  const photo = place ? (detail?.photo ? `/guide-photos/${detail.photo}.jpg` : undefined) : '/gallery/jardim-luis-de-camoes-1.jpg';
  const stops = lt(guide.route, locale).split(/\s*→\s*/).filter(Boolean);
  const highlights = [lt(guide.focus, locale), lt(detail?.architecture ?? guide.context, locale), lt(guide.observe, locale), lt(guide.visit, locale)];
  const photoTip = detail?.photoTip ? lt(detail.photoTip, locale) : lt(guide.context, locale);
  const faqTemplate = L.faq(guide.title, photoTip);
  const faq = [
    { q: faqTemplate[0].q, a: lt(guide.observe, locale) },
    { q: faqTemplate[1].q, a: lt(guide.route, locale) },
    { q: faqTemplate[2].q, a: lt(guide.visit, locale) },
    { q: faqTemplate[3].q, a: photoTip },
  ];
  const tag = place ? (locale === 'en' ? tagTextEn.place : locale === 'zh' ? tagTextZh.place : tagText.place)
    : (locale === 'en' ? tagTextEn.plan : locale === 'zh' ? tagTextZh.plan : tagText.plan);
  const mapLabel = place ? L.seeOnMaps(guide.title) : L.routeMapLabel(planDestinations[slug] || (locale === 'en' ? 'city centre' : locale === 'zh' ? '市中心' : 'centro de Leiria'));
  const jsonLd = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'Article', headline: guide.title, description: lt(guide.focus, locale), mainEntityOfPage: url, inLanguage: langTag(locale), dateModified: '2026-11-11' },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Jardim Luís de Camões', item: `${baseUrl}/${locale}` },
        { '@type': 'ListItem', position: 2, name: L.allGuides, item: `${baseUrl}/${locale}/guias` },
        { '@type': 'ListItem', position: 3, name: guide.title, item: url },
      ] },
      { '@type': 'FAQPage', mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Header />
    <main className="pt-16" style={{ color: 'var(--text-primary)' }}>
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}><a href={`/${locale}`}>Jardim Luís de Camões</a> / <a href={`/${locale}/guias`}>{L.allGuides}</a></nav>
          <p className="text-sm uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>{place ? L.eyebrowPlace : L.eyebrowPlan}</p>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold mb-5">{guide.title}</h1>
          <p className="text-lg leading-relaxed mb-7" style={{ color: 'var(--text-secondary)' }}>{lt(guide.focus, locale)}</p>
          <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>Leiria, Portugal · {tag} · {checkConditions[locale]}</p>
          <a className="inline-block rounded-lg px-5 py-3 font-medium" style={{ background: 'var(--accent)', color: '#fff' }} href={map} target="_blank" rel="noopener noreferrer">{mapLabel} ↗</a>
        </div>
      </section>
      <section className="section-padding" style={{ background: 'var(--card-bg)' }}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3">
            <h2 className="font-display text-3xl font-semibold mb-4">{L.aboutTitle(place ? guide.title : (locale === 'en' ? 'Jardim Luís de Camões' : locale === 'zh' ? 'Jardim Luís de Camões' : 'o Jardim Luís de Camões'))}</h2>
            <p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{detail ? lt(detail.management, locale) : lt(guide.context, locale)}</p>
            <p className="leading-8 mt-4" style={{ color: 'var(--text-secondary)' }}>{place ? lt(guide.context, locale) : lt(guide.context, locale)}</p>
          </div>
          <aside className="md:col-span-2 rounded-2xl p-5" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
            <h3 className="font-semibold text-lg mb-3" style={{ color: 'var(--text-primary)' }}>{L.navLocation}</h3>
            <p className="text-sm leading-7">{lt(guide.visit, locale)}</p>
            <a href={map} target="_blank" rel="noopener noreferrer" className="block underline mt-4 font-medium" style={{ color: 'var(--accent)' }}>{L.viewRoute} ↗</a>
          </aside>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-14">
        <section><h2 className="font-display text-3xl font-semibold mb-4">{L.discoverTitle(guide.title)}</h2><p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{lt(guide.context, locale)}</p></section>
        {photo && <figure className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-secondary)' }}><img src={photo} alt={place ? `${guide.title}, Leiria` : 'Jardim Luís de Camões, Leiria'} loading="lazy" className="w-full max-h-[470px] object-cover" /><figcaption className="text-sm px-5 py-3" style={{ color: 'var(--text-muted)' }}>{place ? `${guide.title} · Leiria` : (locale === 'en' ? `Jardim Luís de Camões · Starting point for ${guide.title}` : locale === 'zh' ? `Jardim Luís de Camões · ${guide.title} 的起点` : `Jardim Luís de Camões · Ponto de partida para ${guide.title}`)}</figcaption></figure>}
        <section><h2 className="font-display text-3xl font-semibold mb-4">{L.organizeTitle}</h2><div className="grid sm:grid-cols-3 gap-4"><div className="rounded-xl p-5" style={{ background: 'var(--bg-secondary)' }}><h3 className="font-semibold mb-2">{L.durationTitle}</h3><p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>{place ? (['castelo-de-leiria', 'museu-de-leiria'].includes(slug) ? (locale === 'en' ? 'Allow extra time to explore the interior and surroundings.' : locale === 'zh' ? '请预留额外时间探索内部与周边。' : 'Reserve mais tempo para explorar o interior e a envolvente.') : (locale === 'en' ? 'A short stop or a relaxed walk, depending on your interest.' : locale === 'zh' ? '短暂停留或轻松散步，视兴趣而定。' : 'Paragem breve ou passeio tranquilo, conforme o seu interesse.')) : (locale === 'en' ? 'A flexible route; adapt the stops to your pace.' : locale === 'zh' ? '灵活路线；按自己的节奏调整停留点。' : 'Percurso flexível; adapte as paragens ao seu ritmo.')}</p></div><div className="rounded-xl p-5" style={{ background: 'var(--bg-secondary)' }}><h3 className="font-semibold mb-2">{L.forWhomTitle}</h3><p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>{place ? (locale === 'en' ? 'Interest in heritage, culture, photography and urban walks.' : locale === 'zh' ? '对遗产、文化、摄影与城市步行感兴趣者。' : 'Interesse em património, cultura, fotografia e passeios urbanos.') : (locale === 'en' ? 'Visitors who want to combine different places in one outing.' : locale === 'zh' ? '希望一次行程串联多个地点的人。' : 'Visitantes que procuram combinar diferentes locais numa mesma saída.')}</p></div><div className="rounded-xl p-5" style={{ background: 'var(--bg-secondary)' }}><h3 className="font-semibold mb-2">{L.orderTitle}</h3><p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>{lt(guide.route, locale)}</p></div></div></section>
        <section><h2 className="font-display text-3xl font-semibold mb-5">{L.highlightsTitle}</h2><div className="grid sm:grid-cols-2 gap-4">{highlights.map((item, i) => <div key={i} className="rounded-xl p-5" style={{ border: '1px solid var(--border-color)' }}><h3 className="font-semibold mb-3">{L.highlights[i]}</h3><p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>{item}</p></div>)}</div></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">{L.histArchTitle}</h2><p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{place ? (detail ? lt(detail.architecture, locale) : lt(guide.context, locale)) : lt(guide.context, locale)}</p><p className="leading-8 mt-4" style={{ color: 'var(--text-secondary)' }}>{lt(guide.observe, locale)}</p></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">{L.observeTitle}</h2><div className="grid sm:grid-cols-2 gap-5"><div className="rounded-xl p-6" style={{ background: 'var(--bg-secondary)' }}><h3 className="font-semibold mb-3">{L.highlights[2]}</h3><p className="leading-7" style={{ color: 'var(--text-secondary)' }}>{place ? (detail ? lt(detail.architecture, locale) : lt(guide.focus, locale)) : lt(guide.focus, locale)}</p></div><div className="rounded-xl p-6" style={{ background: 'var(--bg-secondary)' }}><h3 className="font-semibold mb-3">{L.highlights[3]}</h3><p className="leading-7" style={{ color: 'var(--text-secondary)' }}>{lt(guide.observe, locale)}</p></div></div></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">{L.routeTitle}</h2><p className="leading-8 mb-6" style={{ color: 'var(--text-secondary)' }}>{lt(guide.route, locale)}</p>{stops.length > 1 && <ol className="space-y-4">{stops.map((stop, index) => <li key={`${index}-${stop}`} className="flex gap-4 items-start"><span className="rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>{index + 1}</span><span className="pt-1 leading-7">{stop}</span></li>)}</ol>}<p className="text-sm mt-6" style={{ color: 'var(--text-muted)' }}>{L.highlightsLabelsNote}</p><a href={map} target="_blank" rel="noopener noreferrer" className="underline inline-block mt-3" style={{ color: 'var(--accent)' }}>{L.viewRoute} ↗</a></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">{L.photoTitle}</h2><p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{photoTip}</p><p className="leading-8 mt-4" style={{ color: 'var(--text-secondary)' }}>{locale === 'en' ? 'Side light in the early morning and late afternoon can highlight textures and volumes. Respect accesses, ceremonies and the privacy of people moving around.' : locale === 'zh' ? '清晨与傍晚的侧向光线能凸显质感与体量。请尊重通行、仪式活动与往来行人的隐私。' : 'A luz lateral do início da manhã e do final da tarde pode valorizar texturas e volumes. Respeite os acessos, as cerimónias e a privacidade de quem circula.'}</p></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">{L.tipsTitle}</h2><p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{lt(guide.visit, locale)}</p><p className="leading-8 mt-4" style={{ color: 'var(--text-secondary)' }}>{L.transportNote}</p></section>
        <section className="rounded-2xl p-6 sm:p-8" style={{ background: 'var(--bg-secondary)' }}><h2 className="font-display text-2xl font-semibold mb-4">{L.essentialsTitle}</h2><dl className="grid sm:grid-cols-2 gap-6"><div><dt className="text-sm" style={{ color: 'var(--text-muted)' }}>{L.infoLocation}</dt><dd>{place ? guide.title : (planDestinations[slug] || 'Jardim Luís de Camões')}, Leiria, Portugal</dd></div><div><dt className="text-sm" style={{ color: 'var(--text-muted)' }}>{L.infoExperience}</dt><dd>{place ? (locale === 'en' ? 'Heritage / urban walk' : locale === 'zh' ? '遗产 / 城市步行' : 'Património / passeio urbano') : (locale === 'en' ? 'Itinerary / practical tips' : locale === 'zh' ? '行程 / 实用建议' : 'Itinerário / conselhos práticos')}</dd></div><div><dt className="text-sm" style={{ color: 'var(--text-muted)' }}>{L.infoStart}</dt><dd>Jardim Luís de Camões</dd></div><div><dt className="text-sm" style={{ color: 'var(--text-muted)' }}>{L.infoTickets}</dt><dd>{locale === 'en' ? 'Check the venue or responsible entity for spaces with restricted access' : locale === 'zh' ? '受控进入的空间请向场地或负责单位查询' : 'Consulte o local ou entidade responsável para espaços com acesso condicionado'}</dd></div></dl></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">{L.openingTitle}</h2><div className="grid sm:grid-cols-2 gap-5"><div className="rounded-xl p-6" style={{ border: '1px solid var(--border-color)' }}><h3 className="font-semibold mb-3">{L.openingHours}</h3><p className="leading-7" style={{ color: 'var(--text-secondary)' }}>{L.openingHoursText}</p></div><div className="rounded-xl p-6" style={{ border: '1px solid var(--border-color)' }}><h3 className="font-semibold mb-3">{L.openingPrice}</h3><p className="leading-7" style={{ color: 'var(--text-secondary)' }}>{L.openingPriceText}</p></div></div></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">{L.accessTitle}</h2><ul className="list-disc pl-6 space-y-3 leading-7" style={{ color: 'var(--text-secondary)' }}><li>{lt(guide.visit, locale)}</li>{L.accessItems.map((item, i) => <li key={i}>{item}</li>)}</ul></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">{L.lodgingTitle}</h2><p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{L.lodgingText(guide.title)}</p></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">{L.reviewsTitle}</h2><p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{L.reviewsText}</p><a href={map} target="_blank" rel="noopener noreferrer" className="underline inline-block mt-3" style={{ color: 'var(--accent)' }}>{L.seeOnMaps(guide.title)} ↗</a></section>
        <section><h2 className="font-display text-3xl font-semibold mb-6">{L.faqTitle}</h2><div className="space-y-4">{faq.map(({ q, a }) => <details key={q} className="rounded-xl p-5" style={{ border: '1px solid var(--border-color)' }}><summary className="cursor-pointer font-semibold">{q}</summary><p className="leading-7 mt-4" style={{ color: 'var(--text-secondary)' }}>{a}</p></details>)}</div></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">{L.relatedTitle}</h2><div className="grid sm:grid-cols-2 gap-4">{related.map((item) => <a className="rounded-xl p-5 hover:underline" style={{ border: '1px solid var(--border-color)' }} key={item.slug} href={`/${locale}/guias/${item.slug}`}>{item.title}</a>)}</div><p className="mt-5"><a className="underline" href={`/${locale}/guias`}>{L.allGuides}</a></p></section>
        <section className="text-sm leading-7" style={{ color: 'var(--text-muted)' }}><h2 className="font-semibold text-lg mb-2">{sourcesTitle[locale]}</h2>{sourceLinks.map((s) => <a className="underline block" key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>)}</section>
      </div>
    </main><Footer />
  </>;
}
