import React from 'react';

export default function FooterBroadcast() {
  return (
    <footer style={{ background: 'var(--t-headline)', color: 'rgba(255,255,255,0.85)', marginTop: 0 }}>
      {/* Top rule */}
      <div style={{ background: '#C0392B', height: 4 }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 40, marginBottom: 32 }}>
          {/* Masthead */}
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>
              The Suryansh Dispatch
            </div>
            <div style={{ fontFamily: 'var(--body)', fontStyle: 'italic', fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>
              "All the Data That's Fit to Pipeline"
            </div>
            <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
              SNN — Suryansh News Network covers AI engineering, data pipelines, and full-stack development from the desk of Suryansh Singh, India's most pipeline-obsessed engineer.
            </p>
          </div>

          {/* Desk contacts */}
          <div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 8 }}>
              NEWSROOM DESKS
            </div>
            {['AI Engineering Desk','Data Pipeline Desk','Cloud & DevOps Desk','Editorial Board'].map(d => (
              <div key={d} style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'rgba(255,255,255,0.6)', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{d}</div>
            ))}
          </div>

          {/* Quick links */}
          <div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 8 }}>
              QUICK LINKS
            </div>
            {[
              { label: 'GitHub', href: 'https://github.com/scode4u' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/suryansh-singh-code' },
              { label: 'Email', href: 'mailto:code4ssr@gmail.com' },
              { label: 'Download Resume', href: '/resume.pdf' },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: 12, color: 'rgba(255,255,255,0.6)', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none', transition: 'color .15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#C0392B'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >{l.label}</a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
            © {new Date().getFullYear()} The Suryansh Dispatch. All rights reserved. SNN — Suryansh News Network.
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'flex', gap: 20 }}>
            <span>code4ssr@gmail.com</span>
            <span>github.com/scode4u</span>
            <span>+91 7987839954</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
