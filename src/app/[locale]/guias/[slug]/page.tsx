import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { expandedGuides, expandedGuideBySlug } from '@/lib/expanded-guides';
import { baseUrl } from '@/config';

type Props = { params: Promise<{ locale: string; slug: string }> };
// Portuguese originals only; do not advertise untranslated copies as hreflang alternatives.
const locales = ['pt'];
export function generateStaticParams() {
  return locales.flatMap((locale) => expandedGuides.map(({ slug }) => ({ locale, slug })));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = expandedGuideBySlug.get(slug);
  if (!guide) return {};
  const title = `${guide.title} | Guia de visita em Leiria`;
  const description = `${guide.focus} História, pontos de observação, percurso a pé, conselhos e mapa para planear a visita a Leiria.`;
  return {
    title, description,
    alternates: { canonical: `${baseUrl}/pt/guias/${slug}` },
    openGraph: { title, description, url: `${baseUrl}/${locale}/guias/${slug}`, type: 'article' },
  };
}
export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  const guide = expandedGuideBySlug.get(slug);
  if (!guide || !locales.includes(locale)) notFound();
  const url = `${baseUrl}/${locale}/guias/${slug}`;
  const related = expandedGuides.filter((item) => item.slug !== slug && item.kind === guide.kind).slice(0, 6);
  const faq = [
    { q: `O que vale a pena observar em ${guide.title}?`, a: guide.observe },
    { q: `Como organizar a visita a ${guide.title}?`, a: guide.route },
    { q: `Que cuidados devo ter antes de visitar ${guide.title}?`, a: guide.visit },
  ];
  const jsonLd = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'Article', headline: guide.title, description: guide.focus, mainEntityOfPage: url, inLanguage: 'pt-PT', dateModified: '2026-11-11' },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Jardim Luís de Camões', item: `${baseUrl}/${locale}` },
        { '@type': 'ListItem', position: 2, name: 'Guias de Leiria', item: `${baseUrl}/${locale}/guias` },
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
          <nav className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}><a href={`/${locale}`}>Jardim Luís de Camões</a> / <a href={`/${locale}/guias`}>Guias de Leiria</a></nav>
          <p className="text-sm uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>{guide.kind === 'place' ? 'Pontos de interesse em Leiria' : 'Planeie o seu passeio'}</p>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold mb-5">{guide.title}</h1>
          <p className="text-lg leading-relaxed mb-7" style={{ color: 'var(--text-secondary)' }}>{guide.focus}</p>
          <a className="inline-block rounded-lg px-5 py-3 font-medium" style={{ background: 'var(--accent)', color: '#fff' }} href={guide.map} target="_blank" rel="noopener noreferrer">Ver {guide.kind === 'place' ? guide.title : 'o Jardim Luís de Camões'} no Google Maps ↗</a>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-14">
        <section><h2 className="font-display text-3xl font-semibold mb-4">Sobre {guide.title}</h2><p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{guide.context}</p><p className="leading-8 mt-4" style={{ color: 'var(--text-secondary)' }}>Este guia parte do Jardim Luís de Camões, uma referência verde no centro de Leiria junto ao Rio Lis. A visita permite relacionar o espaço público com a história e a vida quotidiana da cidade, sem exigir que todo o roteiro seja feito de uma só vez.</p></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">História, paisagem e pontos de observação</h2><p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{guide.observe}</p><p className="leading-8 mt-4" style={{ color: 'var(--text-secondary)' }}>Olhe também para os materiais, a vegetação, as mudanças de nível e a forma como as pessoas usam os espaços. Estes pormenores ajudam a distinguir esta paragem dos restantes lugares do circuito.</p></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">Percurso sugerido a pé</h2><p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{guide.route}</p><p className="leading-8 mt-4" style={{ color: 'var(--text-secondary)' }}>Use o mapa para ajustar o trajeto à sua posição, às passagens disponíveis e à mobilidade do grupo. As distâncias e os tempos dependem do percurso escolhido e das pausas.</p></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">Conselhos para a visita</h2><p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{guide.visit}</p><p className="leading-8 mt-4" style={{ color: 'var(--text-secondary)' }}>Para fotografar, dê prioridade a pontos de observação públicos e evite bloquear acessos. Se estiver a planear várias paragens, confirme a abertura de interiores e serviços no próprio dia.</p></section>
        <section className="rounded-2xl p-6 sm:p-8" style={{ background: 'var(--bg-secondary)' }}><h2 className="font-display text-2xl font-semibold mb-4">Informações essenciais</h2><dl className="grid sm:grid-cols-2 gap-6"><div><dt className="text-sm" style={{ color: 'var(--text-muted)' }}>Localização</dt><dd>Leiria, Portugal</dd></div><div><dt className="text-sm" style={{ color: 'var(--text-muted)' }}>Tipo de experiência</dt><dd>{guide.kind === 'place' ? 'Património / passeio urbano' : 'Itinerário / conselhos práticos'}</dd></div><div><dt className="text-sm" style={{ color: 'var(--text-muted)' }}>Ponto de partida sugerido</dt><dd>Jardim Luís de Camões</dd></div><div><dt className="text-sm" style={{ color: 'var(--text-muted)' }}>Bilhetes e horários</dt><dd>Consulte o local ou entidade responsável para espaços com acesso condicionado</dd></div></dl></section>
        <section><h2 className="font-display text-3xl font-semibold mb-6">Perguntas frequentes</h2><div className="space-y-4">{faq.map(({ q, a }) => <details key={q} className="rounded-xl p-5" style={{ border: '1px solid var(--border-color)' }}><summary className="cursor-pointer font-semibold">{q}</summary><p className="leading-7 mt-4" style={{ color: 'var(--text-secondary)' }}>{a}</p></details>)}</div></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">Outros guias relacionados</h2><div className="grid sm:grid-cols-2 gap-4">{related.map((item) => <a className="rounded-xl p-5 hover:underline" style={{ border: '1px solid var(--border-color)' }} key={item.slug} href={`/${locale}/guias/${item.slug}`}>{item.title}</a>)}</div><p className="mt-5"><a className="underline" href={`/${locale}/guias`}>Ver todos os guias de Leiria</a></p></section>
        <section className="text-sm leading-7" style={{ color: 'var(--text-muted)' }}><h2 className="font-semibold text-lg mb-2">Fontes para aprofundar</h2><a className="underline block" href="https://www.visiteleiria.pt/pontos-de-interesse/patrimonio-natural/jardins-e-espacos-verdes/" target="_blank" rel="noopener noreferrer">Visit Leiria — Jardins e espaços verdes</a><a className="underline block" href="https://www.visiteleiria.pt/media/2020/06/Percurso-Urbano_visite.pdf" target="_blank" rel="noopener noreferrer">Município de Leiria — Percurso Urbano (PDF)</a></section>
      </div>
    </main><Footer />
  </>;
}
