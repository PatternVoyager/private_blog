'use client';

import { Briefcase, ExternalLink, GitBranch, Code2, ArrowRight, Sparkles, Layers, Database, Shield } from 'lucide-react';
import Link from 'next/link';
import { useGsapReveal, useGsapStagger } from '@/hooks/useGsapReveal';
import { useLang } from '@/lib/LangContext';

const projectIcons = [Layers, Code2, Shield, Database, Briefcase];
const projectColors = [
  'from-emerald-500/20 to-emerald-600/10',
  'from-blue-500/20 to-blue-600/10',
  'from-purple-500/20 to-purple-600/10',
  'from-orange-500/20 to-orange-600/10',
  'from-pink-500/20 to-pink-600/10',
];

export default function PortfolioClient() {
  const headerRef = useGsapReveal();
  const cardRefs = useGsapStagger(5, 0.12);
  const ctaRef = useGsapReveal(0.2);
  const { t } = useLang();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="px-4 sm:px-6 pt-16 pb-10 sm:pt-28 sm:pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div ref={headerRef}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 shadow-lg shadow-primary/10">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
          <h1 className="section-title mb-3">
            <span className="gradient-text">{t.portfolio.title}</span>
          </h1>
          <p className="section-subtitle">{t.portfolio.subtitle}</p>
        </div>
      </section>

      <section className="px-4 pb-16 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.portfolio.projects.map((project, i) => {
            const Icon = projectIcons[i];
            return (
              <div
                key={project.title}
                ref={el => cardRefs.current[i] = el}
                className="glass-card rounded-xl p-5 sm:p-6 group card-hover cursor-pointer relative overflow-hidden"
                itemScope itemType="https://schema.org/CreativeWork"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${projectColors[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <span className="relative z-10 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-primary" />
                </span>
                <div className="relative z-10">
                  <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors duration-200" itemProp="name">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5" itemProp="description">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-muted text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    {t.portfolio.viewLabel}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 pb-24 max-w-4xl mx-auto">
        <div ref={ctaRef} className="glass-card rounded-2xl p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          <GitBranch className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{t.portfolio.ctaTitle}</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">{t.portfolio.ctaDesc}</p>
          <Link href="https://github.com/azmifatani" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-all duration-200 shadow-sm">
            <GitBranch className="w-4 h-4" />
            {t.portfolio.ctaBtn}
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
