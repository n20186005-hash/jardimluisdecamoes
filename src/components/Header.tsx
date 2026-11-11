'use client';

import { useTranslations, useLocale } from 'next-intl';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const pathname = usePathname();
  const home = pathname === `/${locale}` || pathname === `/${locale}/` || pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const solidHeader = scrolled || !home;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: solidHeader ? 'var(--bg-secondary)' : 'transparent',
        borderBottom: solidHeader ? '1px solid var(--border-color)' : 'none',
        backdropFilter: solidHeader ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href={`/${locale}`} className="font-display text-lg font-semibold tracking-tight" style={{ color: solidHeader ? 'var(--text-primary)' : '#fff' }}>
          Jardim Luís de Camões
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {(['gallery', 'reviews', 'map'] as const).map((section) => (
            <a
              key={section}
              href={`/${locale}/#${section}`}
              className="text-sm font-medium transition-colors"
              style={{ color: solidHeader ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}
            >
              {t(section)}
            </a>
          ))}
          <a href="/pt/guias" className="text-sm font-medium transition-colors" style={{ color: solidHeader ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}>Guias de Leiria</a>
        </nav>

        <div className="flex items-center gap-2">
          <a href="/pt/guias" className="md:hidden text-xs font-medium px-2 py-2" style={{ color: solidHeader ? 'var(--text-secondary)' : '#fff' }}>Guias</a>
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
