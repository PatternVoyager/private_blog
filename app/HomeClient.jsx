'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Code2, Bug, Sparkles, ExternalLink } from 'lucide-react';
import { useLang } from '@/lib/LangContext';

function Particles({ count = 30 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dots = Array.from({ length: count }, () => {
      const dot = document.createElement('div');
      dot.className = 'particle-dot';
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;
      dot.style.width = `${2 + Math.random() * 4}px`;
      dot.style.height = dot.style.width;
      dot.style.opacity = 0.1 + Math.random() * 0.3;
      dot.style.animation = `float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`;
      container.appendChild(dot);
      return dot;
    });

    return () => dots.forEach(d => d.remove());
  }, [count]);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden" />;
}

export default function HomeClient() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRef = useRef(null);
  const badgeRef = useRef(null);
  const rolesRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [, setDeleting] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(badgeRef.current, { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6 })
      .fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.3')
      .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
      .fromTo(rolesRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
      .fromTo(cardRef.current, { y: 60, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.2)' }, '-=0.2');
  }, []);

  const type = useCallback((fullText, index = 0, isDelete = false) => {
    if (isDelete) {
      if (index < 0) { setDeleting(false); setRoleIndex(prev => (prev + 1) % t.home.typewriter.length); return; }
      setText(fullText.slice(0, index));
      setTimeout(() => type(fullText, index - 1, true), 30);
    } else {
      if (index > fullText.length) { setTimeout(() => type(fullText, fullText.length - 1, true), 2000); return; }
      setText(fullText.slice(0, index));
      setTimeout(() => type(fullText, index + 1, false), 60 + Math.random() * 40);
    }
  }, [t.home.typewriter.length]);

  useEffect(() => {
    const current = t.home.typewriter[roleIndex];
    setText('');
    const timeout = setTimeout(() => type(current, 0, false), 300);
    return () => clearTimeout(timeout);
  }, [roleIndex, t.home.typewriter, type]);

  const handleCardMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, { rotateX: y * -8, rotateY: x * 8, transformPerspective: 1200, duration: 0.5, ease: 'power2.out' });
  }, []);

  const handleCardLeave = useCallback(() => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
  }, []);

  return (
    <section className="hero-gradient min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24 relative overflow-hidden">
      <Particles count={40} />
      <div ref={badgeRef} className="mb-4 sm:mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium bg-primary/10 text-primary border border-primary/20 shadow-sm">
          <Sparkles className="w-3 h-3" />
          {t.home.badge}
        </span>
      </div>
      <div ref={titleRef} className="text-center max-w-4xl">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6">
          {t.home.hello}{' '}
          <span className="gradient-text">{t.home.name}</span>
        </h1>
      </div>
      <div ref={rolesRef} className="h-6 sm:h-8 mb-3 sm:mb-4">
        <span className="text-lg sm:text-xl text-muted-foreground font-mono">
          {text}<span className="animate-pulse">|</span>
        </span>
      </div>
      <p ref={subtitleRef} className="text-sm sm:text-lg text-muted-foreground text-center max-w-xl mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0">
        {t.home.tagline}
      </p>
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-12 sm:mb-16">
        <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-secondary text-secondary-foreground text-xs sm:text-sm font-medium shadow-sm card-hover cursor-default">
          <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {t.home.role1}
        </span>
        <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-secondary text-secondary-foreground text-xs sm:text-sm font-medium shadow-sm card-hover cursor-default">
          <Bug className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {t.home.role2}
        </span>
      </div>
      <div
        ref={cardRef}
        className="glass-card rounded-2xl p-6 sm:p-10 max-w-sm w-full shadow-xl shadow-primary/5 premium-border cursor-default"
        style={{ transformStyle: 'preserve-3d' }}
        onMouseMove={handleCardMove}
        onMouseLeave={handleCardLeave}
        itemScope itemType="https://schema.org/Person"
      >
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="w-32 h-40 rounded-xl overflow-hidden border-2 border-primary/20 shadow-lg shadow-primary/10 premium-border">
              <img src="img/empty_profile.png" alt={t.home.nameLabel} className="w-full h-full object-cover object-center" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-1" itemProp="name">{t.home.nameLabel}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-5" itemProp="description" dangerouslySetInnerHTML={{ __html: t.home.desc }} />
          <a href="/about_me" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-all duration-200 shadow-md shadow-primary/20">
            {t.home.cta}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
      <div className="scroll-indicator">
        <span className="text-xs text-muted-foreground/40 uppercase tracking-widest">{t.common.scroll}</span>
        <ArrowDown className="w-4 h-4 text-muted-foreground/30" />
      </div>
    </section>
  );
}
