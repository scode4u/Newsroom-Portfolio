import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail, Phone, Download } from 'lucide-react';

const TYPED_ROLES = ['Full Stack AI Engineer','Data Engineer','ML Engineer','Backend Engineer'];

export default function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed,   setTyped]   = useState('');
  const [typing,  setTyping]  = useState(true);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const target = TYPED_ROLES[roleIdx];
    let i = 0; let deleting = false;
    const iv = setInterval(() => {
      if (!deleting) {
        setTyped(target.slice(0, i + 1)); i++;
        if (i === target.length) { deleting = true; setTimeout(() => {}, 1500); }
      } else {
        setTyped(target.slice(0, i - 1)); i--;
        if (i === 0) { deleting = false; setRoleIdx(r => (r + 1) % TYPED_ROLES.length); }
      }
    }, deleting ? 40 : 80);
    return () => clearInterval(iv);
  }, [roleIdx]);

  return (
    <section id="front-page" ref={ref} style={{ padding: '32px 0', display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 32 }}>

      {/* LEFT — Main story */}
      <div>
        {/* Dateline */}
        <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--t-caption)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
          📍 India &nbsp;|&nbsp; Technology Desk &nbsp;|&nbsp; {new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}
        </div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, color: 'var(--t-headline)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 12 }}
        >
          Engineer Builds AI Systems That "Actually Work in Production," Sources Say
        </motion.h1>

        {/* Deck */}
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          style={{ fontFamily: 'var(--body)', fontSize: 17, color: 'var(--t-body)', lineHeight: 1.65, marginBottom: 16, fontWeight: 400, borderLeft: '3px solid #C0392B', paddingLeft: 14 }}>
          <strong style={{ color: 'var(--t-headline)' }}>SURYANSH SINGH</strong>, identified as a{' '}
          <span style={{ color: '#C0392B', fontWeight: 600, fontStyle: 'italic' }}>{typed}</span>
          <span style={{ animation: 'blink .8s step-end infinite', color: '#C0392B' }}>|</span>
          , has reportedly deployed multiple AI-powered systems to production — including a RAG pipeline,
          an ETL normalizer, and a semantic segmentation model — with no recorded downtime.
        </motion.p>

        {/* Byline */}
        <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--t-byline)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>By <strong>SNN Technology Desk</strong></span>
          <span>|</span>
          <span>Updated {new Date().toLocaleTimeString()}</span>
          <span>|</span>
          <span style={{ color: '#C0392B', fontWeight: 600 }}>3 min read</span>
        </div>

        {/* Body copy */}
        <div style={{ columns: 2, columnGap: 28, columnRule: '1px solid var(--ink-light)' }}>
          {[
            'Singh, who began his career in data analysis before transitioning to full-stack AI engineering, has demonstrated a rare ability to move between the theoretical and the practical.',
            'His most recent work — an AI DevOps Copilot built with FastAPI, OpenAI, and LangChain — achieved a retrieval accuracy of 94.1% while maintaining sub-180ms API latency, according to internal benchmarks.',
            'The engineer\'s ETL pipeline, which normalizes heterogeneous data to MySQL 3NF schema, reportedly processes over 250,000 records per hour — a 2.8x improvement over the previous system.',
            '"He doesn\'t just use the tools," one anonymous colleague told SNN. "He understands why they exist."',
            'Singh is currently available for full-time positions, internships, and freelance engagements, the newsroom has confirmed.',
          ].map((p, i) => (
            <p key={i} style={{ fontFamily: 'var(--body)', fontSize: 14.5, lineHeight: 1.72, marginBottom: 14, color: 'var(--t-body)', breakInside: 'avoid' }}>
              {i === 3 ? <><span style={{ fontSize: 22, lineHeight: 1, float: 'left', marginRight: 4, marginTop: 2, fontFamily: 'var(--serif)', fontWeight: 700, color: 'var(--t-headline)' }}>"</span>{p}</> : p}
            </p>
          ))}
        </div>

        {/* CTA links */}
        <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
          {[
            { icon: <Github size={14}/>,   label: 'github.com/scode4u',   href: 'https://github.com/scode4u',                          color: 'var(--t-headline)' },
            { icon: <Linkedin size={14}/>, label: 'LinkedIn Profile',     href: 'https://linkedin.com/in/suryansh-singh-code',          color: 'var(--p-blue)'    },
            { icon: <Mail size={14}/>,     label: 'code4ssr@gmail.com',   href: 'mailto:code4ssr@gmail.com',                           color: '#C0392B'           },
            { icon: <Phone size={14}/>,    label: '+91 7987839954',       href: 'tel:+917987839954',                                   color: 'var(--p-green)'   },
            { icon: <Download size={14}/>, label: 'Download Resume',      href: '/resume.pdf',                                         color: 'var(--p-amber)'   },
          ].map((l, i) => (
            <a key={i} href={l.href} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 12px', border: '1px solid var(--ink-light)',
              background: 'var(--white)', borderRadius: 2,
              fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 500,
              color: l.color, textDecoration: 'none', transition: 'all .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = l.color; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--ink-light)'; e.currentTarget.style.boxShadow = 'none'; }}
            >{l.icon}{l.label}</a>
          ))}
        </div>
      </div>

      {/* RIGHT — Sidebar */}
      <div style={{ borderLeft: '1px solid var(--ink-light)', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Profile card */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--ink-light)', padding: 16, textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #C0392B, #E67E22)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 28, fontWeight: 900, color: '#fff', fontFamily: 'var(--serif)' }}>S</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 700, color: 'var(--t-headline)' }}>Suryansh Singh</div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: '#C0392B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>Staff Engineer, AI Desk</div>
          <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--t-caption)', marginTop: 8, fontStyle: 'italic' }}>Available for opportunities</div>
          <div style={{ marginTop: 10, padding: '6px', background: 'var(--cream)', borderRadius: 2, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--p-green)', fontWeight: 600 }}>🟢 OPEN TO HIRE</div>
        </div>

        {/* Quick facts */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--ink-light)', padding: 14 }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 700, color: 'var(--t-headline)', borderBottom: '2px solid var(--t-headline)', paddingBottom: 6, marginBottom: 12 }}>FIELD STATS</div>
          {[
            { label: 'Projects Shipped',   val: '3+',    color: '#C0392B'        },
            { label: 'Stack Depth',        val: '16+',   color: 'var(--p-blue)'  },
            { label: 'RAG Accuracy',       val: '94.1%', color: 'var(--p-green)' },
            { label: 'ETL Speed Gain',     val: '2.8×',  color: 'var(--p-amber)' },
            { label: 'Cloud Uptime',       val: '99.7%', color: 'var(--p-teal)'  },
            { label: 'Years Active',       val: '3+',    color: 'var(--ink-dark)' },
          ].map(f => (
            <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid var(--cream-2)' }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--t-byline)' }}>{f.label}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, color: f.color }}>{f.val}</span>
            </div>
          ))}
        </div>

        {/* Journey */}
        <div style={{ background: '#C0392B', padding: 14, color: '#fff' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>THE JOURNEY</div>
          {['Data Analyst','Data Engineer','AI Engineer','→ Data Scientist'].map((r, i) => (
            <div key={r} style={{ fontFamily: 'var(--sans)', fontSize: 11, padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.2)', opacity: i === 3 ? 0.6 : 1, fontStyle: i === 3 ? 'italic' : 'normal' }}>
              {i < 3 ? '✓' : '⋯'} {r}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
