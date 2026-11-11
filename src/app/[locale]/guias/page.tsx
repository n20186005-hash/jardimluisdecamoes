import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { expandedGuides } from '@/lib/expanded-guides';
import { guideDetails } from '@/lib/guide-details';
import { baseUrl } from '@/config';
import { langTag } from '@/lib/seo';
import { lt } from '@/lib/guide-i18n';
import { notFound } from 'next/navigation';

// Guides are published in pt/en/zh. Mirandese (mwl) is not generated: mwl visitors
// are linked to the Portuguese source so we never mislabel Portuguese as Mirandese.
const GUIDE_LOCALES = ['pt', 'en', 'zh'];

const indexMeta: Record<string, { title: string; description: string; kindPlace: string; kindPlan: string; back: string; intro: string }> = {
  pt: {
    title: 'Guias de Leiria',
    description: 'Explore património, jardins, roteiros a pé, transportes e visitas ao centro de Leiria.',
    kindPlace: 'Locais a visitar',
    kindPlan: 'Roteiros e informações práticas',
    back: 'Jardim Luís de Camões',
    intro: 'Descubra pontos de interesse e planeie passeios pelo centro histórico, jardins e margens do Rio Lis.',
  },
  en: {
    title: 'Leiria Guides',
    description: 'Explore heritage, gardens, walking routes, transport and visits in the centre of Leiria.',
    kindPlace: 'Places to visit',
    kindPlan: 'Routes and practical information',
    back: 'Jardim Luís de Camões',
    intro: 'Discover points of interest and plan walks through the historic centre, gardens and banks of the Lis river.',
  },
  zh: {
    title: '莱里亚游览指南',
    description: '探索莱里亚中心的遗产、花园、步行路线、交通与游览去处。',
    kindPlace: '值得游览的地点',
    kindPlan: '路线与实用信息',
    back: 'Jardim Luís de Camões',
    intro: '发现值得一游的景点，并规划穿越历史中心、花园与 Lis 河岸的步行行程。',
  },
  mwl: {
    title: 'Guies de Leiria',
    description: 'Splore património, jardins, roteiros a pie, trasporte i bejitas ne l centro de Leiria.',
    kindPlace: 'Locales a bisitar',
    kindPlan: 'Roteiros i anformaçon prática',
    back: 'Jardim Luís de Camões',
    intro: 'Çcubra pontos de antresse i planeie passeios pul centro stórico, jardins i margens de l Riu Lis.',
  },
};

export function generateStaticParams() {
  return GUIDE_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!GUIDE_LOCALES.includes(locale)) return {};
  const m = indexMeta[locale];
  const title = `${m.title} | Jardim Luís de Camões`;
  const selfUrl = `${baseUrl}/${locale}/guias`;
  const languages: Record<string, string> = {
    pt: `${baseUrl}/pt/guias`,
    en: `${baseUrl}/en/guias`,
    zh: `${baseUrl}/zh/guias`,
  };
  return {
    title, description: m.description,
    alternates: { canonical: selfUrl, languages: { ...languages, 'x-default': languages.pt } },
    openGraph: { title, description: m.description, url: selfUrl, type: 'website', locale: langTag(locale) },
  };
}

export default async function GuidesIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Mirandese (mwl) guides are not fabricated; redirect mwl visitors to the Portuguese source.
  if (!GUIDE_LOCALES.includes(locale)) redirect('/pt/guias');
  const m = indexMeta[locale];
  return <><Header /><main className="pt-16" style={{ color: 'var(--text-primary)' }}><section className="section-padding" style={{ background: 'var(--bg-secondary)' }}><div className="max-w-5xl mx-auto"><a className="text-sm underline" href={`/${locale}`}>{m.back}</a><h1 className="font-display text-4xl font-semibold mt-5 mb-4">{m.title}</h1><p style={{ color: 'var(--text-secondary)' }}>{m.intro}</p></div></section><div className="max-w-5xl mx-auto px-6 py-12 space-y-12">{(['place', 'plan'] as const).map((kind) => <section key={kind}><h2 className="font-display text-3xl font-semibold mb-6">{kind === 'place' ? m.kindPlace : m.kindPlan}</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{expandedGuides.filter((g) => g.kind === kind).map((g) => <a key={g.slug} href={`/${locale}/guias/${g.slug}`} className="rounded-xl overflow-hidden hover:shadow-md transition-shadow" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>{kind === 'place' && guideDetails[g.slug]?.photo && <img src={`/guide-photos/${guideDetails[g.slug].photo}.jpg`} alt={`${g.title}, Leiria`} className="w-full h-40 object-cover" loading="lazy" />}<div className="p-6"><h3 className="font-semibold text-lg mb-3">{g.title}</h3><p className="text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>{lt(g.focus, locale)}</p></div></a>)}</div></section>)}</div></main><Footer /></>;
}
