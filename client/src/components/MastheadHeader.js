import React from 'react';

export default function MastheadHeader() {
  return (
    <div style={{ background: 'var(--white)', borderBottom: '4px solid #C0392B', padding: '16px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Top rule */}
        <div style={{ borderTop: '2px solid var(--t-headline)', borderBottom: '1px solid var(--t-headline)', padding: '4px 0', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--t-byline)' }}>
            Data Engineering • AI Systems • Full Stack
          </span>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--t-caption)' }}>
            Vol. III, No. 24 &nbsp;|&nbsp; Est. 2021 &nbsp;|&nbsp; India Edition
          </span>
        </div>

        {/* Masthead */}
        <div style={{ textAlign: 'center', padding: '8px 0 12px' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 8vw, 80px)', fontWeight: 900, color: 'var(--t-headline)', letterSpacing: '-0.02em', lineHeight: 1 }}>
            The Suryansh Dispatch
          </div>
          <div style={{ fontFamily: 'var(--body)', fontStyle: 'italic', fontSize: 14, color: 'var(--t-byline)', marginTop: 6 }}>
            "All the Data That's Fit to Pipeline" &nbsp;—&nbsp; Covering AI, Data Engineering & Beyond
          </div>
        </div>

        {/* Nav bar */}
        <div style={{ borderTop: '2px solid var(--t-headline)', borderBottom: '2px solid var(--t-headline)', padding: '6px 0', display: 'flex', justifyContent: 'center', gap: 32 }}>
          {['FRONT PAGE','MARKETS','FIELD REPORTS','ARCHIVES','EDITORIAL','CONTACT'].map(s => (
            <a key={s} href={`#${s.toLowerCase().replace(' ','-')}`} style={{
              fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
              color: 'var(--t-headline)', textDecoration: 'none', transition: 'color .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#C0392B'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--t-headline)'}
            >{s}</a>
          ))}
        </div>
      </div>
    </div>
  );
}
