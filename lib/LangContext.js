'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { translations, defaultLang } from '@/lib/translations';

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(defaultLang);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'id') setLang(saved);
    setMounted(true);
  }, []);

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'en' ? 'id' : 'en';
      localStorage.setItem('lang', next);
      return next;
    });
  };

  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, toggleLang, t, mounted }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
