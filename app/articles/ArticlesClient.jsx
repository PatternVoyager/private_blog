'use client';

import { FileText, Clock, Calendar, BookOpen, Sparkles } from 'lucide-react';
import { useGsapReveal, useGsapStagger } from '@/hooks/useGsapReveal';
import { useLang } from '@/lib/LangContext';

export default function ArticlesClient() {
  const headerRef = useGsapReveal();
  const cardRefs = useGsapStagger(6, 0.15);
  const bannerRef = useGsapReveal(0.2);
  const { t } = useLang();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="px-4 sm:px-6 pt-16 pb-10 sm:pt-28 sm:pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div ref={headerRef}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 shadow-lg shadow-primary/10">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="section-title mb-3">
            <span className="gradient-text">{t.articles.title}</span>
          </h1>
          <p className="section-subtitle">{t.articles.subtitle}</p>
        </div>
      </section>

      <section className="px-4 pb-16 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.articles.list.map((article, i) => (
            <article
              key={article.title}
              ref={el => cardRefs.current[i] = el}
              className="glass-card rounded-xl p-5 sm:p-6 group card-hover cursor-pointer"
              itemScope itemType="https://schema.org/Article"
            >
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-medium bg-primary/10 text-primary mb-4" itemProp="articleSection">
                {article.tag}
              </span>
              <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors duration-200" itemProp="headline">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3 sm:line-clamp-2" itemProp="description">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <time itemProp="datePublished">{article.date}</time>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  <span itemProp="timeRequired">{article.readTime}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24 max-w-4xl mx-auto">
        <div ref={bannerRef} className="glass-card rounded-2xl p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{t.articles.bannerTitle}</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">{t.articles.bannerDesc}</p>
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium shadow-sm">
            <BookOpen className="w-4 h-4" />
            {t.articles.bannerBtn}
          </span>
        </div>
      </section>
    </div>
  );
}
