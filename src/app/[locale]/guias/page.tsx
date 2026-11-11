import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { expandedGuides } from '@/lib/expanded-guides';
import { baseUrl } from '@/config';
import { notFound } from 'next/navigation';
export const metadata: Metadata = { title: 'Guias de Leiria | Jardim Luís de Camões', description: 'Explore património, jardins, roteiros a pé, transportes e visitas ao centro de Leiria.', alternates: { canonical: `${baseUrl}/pt/guias` } };
export default async function GuidesIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'pt') notFound();
  return <><Header /><main className="pt-16" style={{ color: 'var(--text-primary)' }}><section className="section-padding" style={{ background: 'var(--bg-secondary)' }}><div className="max-w-5xl mx-auto"><a className="text-sm underline" href={`/${locale}`}>Jardim Luís de Camões</a><h1 className="font-display text-4xl font-semibold mt-5 mb-4">Guias de Leiria</h1><p style={{ color: 'var(--text-secondary)' }}>Descubra pontos de interesse e planeie passeios pelo centro histórico, jardins e margens do Rio Lis.</p></div></section><div className="max-w-5xl mx-auto px-6 py-12 space-y-12">{(['place', 'plan'] as const).map((kind) => <section key={kind}><h2 className="font-display text-3xl font-semibold mb-6">{kind === 'place' ? 'Locais a visitar' : 'Roteiros e informações práticas'}</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{expandedGuides.filter((g) => g.kind === kind).map((g) => <a key={g.slug} href={`/${locale}/guias/${g.slug}`} className="rounded-xl p-6 hover:shadow-md transition-shadow" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}><h3 className="font-semibold text-lg mb-3">{g.title}</h3><p className="text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>{g.focus}</p></a>)}</div></section>)}</div></main><Footer /></>;
}
