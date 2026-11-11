import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { expandedGuides, expandedGuideBySlug } from '@/lib/expanded-guides';
import { guideDetails, guideMap, planDestinations } from '@/lib/guide-details';
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
  const detail = guideDetails[slug];
  const place = guide.kind === 'place';
  const map = guideMap(slug, guide.map, place);
  const photo = place ? (detail?.photo ? `/guide-photos/${detail.photo}.jpg` : undefined) : '/gallery/jardim-luis-de-camoes-1.jpg';
  const stops = guide.route.split(/\s*→\s*/).filter(Boolean);
  const faq = [
    { q: `O que vale a pena observar em ${guide.title}?`, a: guide.observe },
    { q: `Como organizar a visita a ${guide.title}?`, a: guide.route },
    { q: `Que cuidados devo ter antes de visitar ${guide.title}?`, a: guide.visit },
    { q: `Qual é o melhor local para fotografar ${guide.title}?`, a: detail?.photoTip || `Comece pelo Jardim Luís de Camões e procure ângulos sobre ${planDestinations[slug] || 'o centro de Leiria'}; evite obstruir percursos públicos.` },
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
          <a className="inline-block rounded-lg px-5 py-3 font-medium" style={{ background: 'var(--accent)', color: '#fff' }} href={map} target="_blank" rel="noopener noreferrer">{place ? `Ver ${guide.title} no Google Maps` : `Ver percurso: Jardim Luís de Camões → ${planDestinations[slug] || 'centro de Leiria'}`} ↗</a>
        </div>
      </section>
      <section className="section-padding" style={{ background: 'var(--card-bg)' }}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3">
            <h2 className="font-display text-3xl font-semibold mb-4">Sobre {place ? guide.title : 'o Jardim Luís de Camões'}</h2>
            <p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{detail?.management || 'O Jardim Luís de Camões é um espaço público da cidade de Leiria divulgado nos roteiros da Câmara Municipal de Leiria. A gestão dos monumentos, museus e estabelecimentos incluídos neste passeio pertence às respetivas entidades responsáveis.'}</p>
            <p className="leading-8 mt-4" style={{ color: 'var(--text-secondary)' }}>{place ? guide.context : `O jardim participou na Exposição Distrital do Bicentenário de 1940, segundo o portal turístico municipal. A partir deste espaço verde junto ao Rio Lis, ${guide.title.toLowerCase()} permite descobrir diferentes camadas da cidade: ruas históricas, equipamentos culturais e espaços públicos usados diariamente.`}</p>
          </div>
          <aside className="md:col-span-2 rounded-2xl p-5" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
            <h3 className="font-semibold text-lg mb-3" style={{ color: 'var(--text-primary)' }}>Antes de sair</h3>
            <p className="text-sm leading-7">{guide.visit}</p>
            <a href={map} target="_blank" rel="noopener noreferrer" className="block underline mt-4 font-medium" style={{ color: 'var(--accent)' }}>Localização e navegação específica ↗</a>
          </aside>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-14">
        {photo && <figure className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-secondary)' }}><img src={photo} alt={place ? `Fotografia de ${guide.title}, Leiria` : 'Jardim Luís de Camões, ponto de partida deste roteiro em Leiria'} loading="lazy" className="w-full max-h-[470px] object-cover" /><figcaption className="text-sm px-5 py-3" style={{ color: 'var(--text-muted)' }}>{place ? `${guide.title} · Imagem: ${detail?.source || 'Leiria'}` : `Jardim Luís de Camões · Ponto de partida para ${guide.title}`}</figcaption></figure>}
        <section><h2 className="font-display text-3xl font-semibold mb-4">História, arquitetura e paisagem</h2><p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{place ? detail?.architecture : guide.context}</p><p className="leading-8 mt-4" style={{ color: 'var(--text-secondary)' }}>{guide.observe}</p></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">O que observar durante a visita</h2><div className="grid sm:grid-cols-2 gap-5"><div className="rounded-xl p-6" style={{ background: 'var(--bg-secondary)' }}><h3 className="font-semibold mb-3">Elementos de interesse</h3><p className="leading-7" style={{ color: 'var(--text-secondary)' }}>{place ? detail?.architecture : guide.focus}</p></div><div className="rounded-xl p-6" style={{ background: 'var(--bg-secondary)' }}><h3 className="font-semibold mb-3">Experiência no local</h3><p className="leading-7" style={{ color: 'var(--text-secondary)' }}>{guide.observe}</p></div></div></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">Percurso recomendado a pé</h2><p className="leading-8 mb-6" style={{ color: 'var(--text-secondary)' }}>{guide.route}</p>{stops.length > 1 && <ol className="space-y-4">{stops.map((stop, index) => <li key={`${index}-${stop}`} className="flex gap-4 items-start"><span className="rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>{index + 1}</span><span className="pt-1 leading-7">{stop}</span></li>)}</ol>}<p className="text-sm mt-6" style={{ color: 'var(--text-muted)' }}>Ajuste o trajeto ao relevo, pavimentos e acessos abertos no dia. A rota no Google Maps indica o destino desta página, não substitui a sinalização local.</p><a href={map} target="_blank" rel="noopener noreferrer" className="underline inline-block mt-3" style={{ color: 'var(--accent)' }}>Abrir trajeto no Google Maps ↗</a></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">Fotografia e melhores enquadramentos</h2><p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{detail?.photoTip || `Comece pela vegetação do Jardim Luís de Camões e prossiga até ${planDestinations[slug] || 'o centro histórico'}; combine paisagem urbana e detalhes do percurso.`}</p><p className="leading-8 mt-4" style={{ color: 'var(--text-secondary)' }}>A luz lateral do início da manhã e do final da tarde pode valorizar texturas e volumes. Respeite os acessos, as cerimónias e a privacidade de quem circula.</p></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">Conselhos de visita e transportes</h2><p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{guide.visit}</p><p className="leading-8 mt-4" style={{ color: 'var(--text-secondary)' }}>Para chegar de transportes públicos, consulte o operador que serve Leiria e conclua a última etapa a pé. Quem vem de carro deve respeitar a sinalização e verificar o estacionamento local. Serviços e entradas de edifícios podem ter horários próprios.</p></section>
        <section className="rounded-2xl p-6 sm:p-8" style={{ background: 'var(--bg-secondary)' }}><h2 className="font-display text-2xl font-semibold mb-4">Informações essenciais</h2><dl className="grid sm:grid-cols-2 gap-6"><div><dt className="text-sm" style={{ color: 'var(--text-muted)' }}>Localização</dt><dd>{place ? guide.title : planDestinations[slug] || 'Jardim Luís de Camões'}, Leiria, Portugal</dd></div><div><dt className="text-sm" style={{ color: 'var(--text-muted)' }}>Tipo de experiência</dt><dd>{place ? 'Património / passeio urbano' : 'Itinerário / conselhos práticos'}</dd></div><div><dt className="text-sm" style={{ color: 'var(--text-muted)' }}>Ponto de partida sugerido</dt><dd>Jardim Luís de Camões</dd></div><div><dt className="text-sm" style={{ color: 'var(--text-muted)' }}>Bilhetes e horários</dt><dd>Consulte o local ou entidade responsável para espaços com acesso condicionado</dd></div></dl></section>
        <section><h2 className="font-display text-3xl font-semibold mb-6">Perguntas frequentes</h2><div className="space-y-4">{faq.map(({ q, a }) => <details key={q} className="rounded-xl p-5" style={{ border: '1px solid var(--border-color)' }}><summary className="cursor-pointer font-semibold">{q}</summary><p className="leading-7 mt-4" style={{ color: 'var(--text-secondary)' }}>{a}</p></details>)}</div></section>
        <section><h2 className="font-display text-3xl font-semibold mb-4">Outros guias relacionados</h2><div className="grid sm:grid-cols-2 gap-4">{related.map((item) => <a className="rounded-xl p-5 hover:underline" style={{ border: '1px solid var(--border-color)' }} key={item.slug} href={`/${locale}/guias/${item.slug}`}>{item.title}</a>)}</div><p className="mt-5"><a className="underline" href={`/${locale}/guias`}>Ver todos os guias de Leiria</a></p></section>
        <section className="text-sm leading-7" style={{ color: 'var(--text-muted)' }}><h2 className="font-semibold text-lg mb-2">Fontes para aprofundar</h2><a className="underline block" href="https://www.visiteleiria.pt/pontos-de-interesse/patrimonio-natural/jardins-e-espacos-verdes/" target="_blank" rel="noopener noreferrer">Visit Leiria — Jardins e espaços verdes</a><a className="underline block" href="https://www.visiteleiria.pt/media/2020/06/Percurso-Urbano_visite.pdf" target="_blank" rel="noopener noreferrer">Município de Leiria — Percurso Urbano (PDF)</a></section>
      </div>
    </main><Footer />
  </>;
}
