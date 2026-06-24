'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useLang } from '@/lib/LangContext';
import { useTheme } from '@/lib/ThemeContext';
import { Languages, Menu, X, Sun, Moon } from 'lucide-react';

const navLinksKey = ['home', 'about', 'articles', 'portfolio'];
const hrefMap = { home: '/', about: '/about_me', articles: '/articles', portfolio: '/portfolio' };

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef(null);
  const innerRef = useRef(null);
  const brandRef = useRef(null);
  const linksRef = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScroll = useRef(0);
  const ticking = useRef(false);
  const { lang, toggleLang, t, mounted: langMounted } = useLang();
  const { theme, toggleTheme, mounted: themeMounted } = useTheme();
  const isDark = theme === 'dark';

  const updateNav = useCallback(() => {
    const current = window.scrollY;
    lastScroll.current = current;
    ticking.current = false;

    const inner = innerRef.current;
    const brand = brandRef.current;
    if (!inner || !brand) return;

    if (current > 80) {
      gsap.to(inner, {
        height: 48, paddingTop: 4, paddingBottom: 4,
        duration: 0.4, ease: 'power2.out', overwrite: 'auto',
      });
      gsap.to(brand, { fontSize: 15, duration: 0.3, overwrite: 'auto' });
      gsap.to(linksRef.current.filter(Boolean), {
        paddingTop: 4, paddingBottom: 4, fontSize: 13,
        duration: 0.3, overwrite: 'auto',
      });
    } else {
      gsap.to(inner, {
        height: 64, paddingTop: 10, paddingBottom: 10,
        duration: 0.4, ease: 'power2.out', overwrite: 'auto',
      });
      gsap.to(brand, { fontSize: 18, duration: 0.3, overwrite: 'auto' });
      gsap.to(linksRef.current.filter(Boolean), {
        paddingTop: 8, paddingBottom: 8, fontSize: 14,
        duration: 0.3, overwrite: 'auto',
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => { updateNav(); });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateNav]);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (!langMounted || !themeMounted) return null;

  const btnBg = isDark ? 'bg-white/10' : 'bg-black/5';
  const btnHover = isDark ? 'hover:bg-white/15' : 'hover:bg-black/10';
  const linkHover = isDark ? 'hover:bg-white/5' : 'hover:bg-black/5';
  const mobileMenuBg = isDark ? 'bg-secondary/80 border-border/50' : 'bg-white/80 border-white/50';

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] sm:w-[calc(100%-48px)] max-w-6xl rounded-2xl glass-nav flex items-center justify-center transition-shadow duration-300 hover:shadow-xl hover:shadow-black/10"
      >
        <div
          ref={innerRef}
          className="w-full flex items-center justify-between gap-6 sm:gap-8 px-5 sm:px-6"
          style={{ height: 64, paddingTop: 10, paddingBottom: 10 }}
        >
          <Link
            ref={brandRef}
            href="/"
            className="font-bold tracking-tight gradient-text shrink-0"
            style={{ fontSize: 18 }}
          >
            {t.common.brand}
          </Link>

          <div className="hidden sm:flex items-center gap-1">
            {navLinksKey.map((key) => {
              const href = hrefMap[key];
              const isActive = pathname === href;
              return (
                <Link
                  key={key}
                  ref={el => { if (el) linksRef.current[key] = el; }}
                  href={href}
                  className={`rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : `text-muted-foreground/80 hover:text-foreground ${linkHover}`
                  }`}
                  style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 14, paddingRight: 14, fontSize: 14 }}
                >
                  {t.nav[key]}
                </Link>
              );
            })}
            <button
              onClick={toggleLang}
              className={`ml-2 w-8 h-8 rounded-xl ${btnBg} flex items-center justify-center text-muted-foreground hover:text-foreground ${btnHover} transition-all duration-200 shrink-0`}
              title={t.common.switchLang}
            >
              <Languages className="w-3.5 h-3.5" />
              <span className="text-[9px] font-bold ml-0.5">{lang === 'en' ? t.common.langId : t.common.langEn}</span>
            </button>
            <button
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-xl ${btnBg} flex items-center justify-center text-muted-foreground hover:text-foreground ${btnHover} transition-all duration-200 shrink-0`}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-xl ${btnBg} flex items-center justify-center text-muted-foreground hover:text-foreground ${btnHover} transition-all duration-200 shrink-0`}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={toggleLang}
              className={`w-8 h-8 rounded-xl ${btnBg} flex items-center justify-center text-muted-foreground hover:text-foreground ${btnHover} transition-all duration-200 shrink-0`}
              title={t.common.switchLang}
            >
              <Languages className="w-3.5 h-3.5" />
              <span className="text-[9px] font-bold ml-0.5">{lang === 'en' ? t.common.langId : t.common.langEn}</span>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`w-8 h-8 rounded-xl ${btnBg} flex items-center justify-center text-muted-foreground hover:text-foreground ${btnHover} transition-all duration-200 shrink-0`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className={`absolute top-[72px] left-4 right-4 p-2 ${mobileMenuBg} backdrop-blur-2xl border rounded-2xl shadow-xl shadow-black/10`}>
            {navLinksKey.map((key) => {
              const href = hrefMap[key];
              const isActive = pathname === href;
              return (
                <Link
                  key={key}
                  href={href}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : `text-muted-foreground hover:text-foreground ${linkHover}`
                  }`}
                >
                  {t.nav[key]}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
