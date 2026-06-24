'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Code2, Bug, MapPin, Heart, Globe, Terminal, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useGsapReveal, useGsapStagger } from '@/hooks/useGsapReveal';
import { useLang } from '@/lib/LangContext';

gsap.registerPlugin(ScrollTrigger);

const infoIcons = [User, MapPin, Code2, Bug, Globe, Heart];

export default function AboutClient() {
  const headerRef = useGsapReveal();
  const infoRefs = useGsapStagger(6, 0.2);
  const skillBarRefs = useRef([]);
  const skillSectionRef = useGsapReveal(0.1);
  const journeyRefs = useGsapStagger(4, 0.15);
  const ctaRef = useGsapReveal(0.2);
  const { t } = useLang();

  useEffect(() => {
    skillBarRefs.current.forEach((bar, i) => {
      if (!bar) return;
      gsap.fromTo(bar,
        { width: '0%' },
        {
          width: `${t.about.skills[i].level}%`,
          duration: 1.2,
          delay: 0.3 + i * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: bar.closest('.skill-card'), start: 'top 80%' },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [t.about.skills]);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="px-4 sm:px-6 pt-16 pb-12 sm:pt-28 sm:pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div ref={headerRef} className="relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 shadow-lg shadow-primary/10">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h1 className="section-title mb-3">
            {t.about.title} <span className="gradient-text">{t.about.titleSpan}</span>
          </h1>
          <p className="section-subtitle">{t.about.subtitle}</p>
        </div>
      </section>

      <section className="px-4 pb-16 max-w-6xl mx-auto">
        <div ref={el => { infoRefs.current[0] = el }} className="glass-card rounded-2xl p-6 sm:p-10 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><Code2 className="w-4 h-4 text-primary" /></span>
            {t.about.whoTitle}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-[15px]">{t.about.whoDesc}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {t.about.info.map((item, i) => {
            const Icon = infoIcons[i];
            return (
              <div key={item.label} ref={el => infoRefs.current[i + 1] = el} className="glass-card rounded-xl p-5 flex items-start gap-4 card-hover">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </span>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-widest mb-0.5">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 pb-20 max-w-6xl mx-auto">
        <div ref={skillSectionRef} className="glass-card rounded-2xl p-6 sm:p-10">
          <h2 className="text-xl font-semibold mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><Terminal className="w-4 h-4 text-primary" /></span>
            {t.about.skillsTitle}
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
            {t.about.skills.map((skill, i) => (
              <div key={skill.name} className="skill-card">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div ref={el => skillBarRefs.current[i] = el} className="skill-bar-fill" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 max-w-4xl mx-auto">
        <h2 className="section-title text-center mb-2">
          {t.about.journeyTitle} <span className="gradient-text">{t.about.journeySpan}</span>
        </h2>
        <p className="section-subtitle mb-12">{t.about.journeySub}</p>
        <div className="relative">
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />
          <div className="space-y-8">
            {t.about.journey.map((item, i) => (
              <div key={item.year} ref={el => journeyRefs.current[i] = el} className="relative">
                <div className={`flex flex-col sm:flex-row items-start gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  <div className={`flex-1 pl-10 sm:pl-0 ${i % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                    <div className="glass-card rounded-xl p-4 sm:p-5 inline-block max-w-md w-full sm:w-auto">
                      <time className="text-xs font-bold text-primary tracking-widest">{item.year}</time>
                      <h3 className="text-base font-semibold mt-1 mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background shadow-sm shadow-primary/30 z-10" style={{ top: '24px' }} />
                  <div className="flex-1 hidden sm:block" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 max-w-3xl mx-auto text-center">
        <div ref={ctaRef} className="glass-card rounded-2xl p-8 sm:p-14">
          <BookOpen className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">{t.about.ctaTitle}</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">{t.about.ctaDesc}</p>
          <Link href="/portfolio" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-all duration-200 shadow-md shadow-primary/20">
            {t.about.ctaBtn}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
