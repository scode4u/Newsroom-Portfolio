import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ACHIEVEMENTS = [
  {
    badge: '🏆', type: 'AWARD', urgency: 'EXCLUSIVE',
    headline: 'Singh Wins Best Coder at Lex-Hack 1.0 — Beats Entire Field',
    body: 'Awarded Best Coder at Lex-Hack 1.0, an inter-college hackathon, after delivering the highest-quality technical solution under severe time pressure. Competitors described the solution as "unexpectedly complete."',
    detail: 'Lex-Hack 1.0 — Inter-College',
    year: '2024', color: '#C0392B',
  },
  {
    badge: '⭐', type: 'CERTIFICATION', urgency: 'REPORT',
    headline: 'HackerRank Awards 3-Star SQL Rating — Advanced Query Mastery Confirmed',
    body: 'Achieved 3-Star SQL rating on HackerRank, demonstrating proficiency in complex joins, window functions, aggregations, and query optimisation — the level expected of senior data professionals.',
    detail: 'HackerRank — SQL Track',
    year: '2024', color: '#D4860A',
  },
  {
    badge: '💻', type: 'CERTIFICATION', urgency: 'REPORT',
    headline: 'Problem Solving Badge Reaches 4 Stars — Algorithms Performance Cited',
    body: 'Earned HackerRank 4-Star Problem Solving badge through consistent high performance in data structures, algorithm challenges, and analytical thinking exercises across multiple contest sessions.',
    detail: 'HackerRank — Problem Solving',
    year: '2024', color: '#2E86AB',
  },
];

export default function AchievementsDesk() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} style={{ padding: '0 0 8px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 900, color: 'var(--t-headline)' }}>Editorial Commendations</h2>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--t-caption)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>AWARDS DESK</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: i * 0.13 }}
            className="news-card"
            style={{ padding: 20, borderTop: `4px solid ${a.color}` }}
          >
            {/* Badge row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 32 }}>{a.badge}</div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: '#fff', background: a.color, padding: '2px 8px', borderRadius: 2, display: 'block', marginBottom: 4 }}>{a.urgency}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--t-caption)' }}>{a.year}</span>
              </div>
            </div>

            {/* Type */}
            <div style={{ fontFamily: 'var(--sans)', fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: a.color, textTransform: 'uppercase', marginBottom: 6 }}>{a.type}</div>

            {/* Headline */}
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 700, color: 'var(--t-headline)', lineHeight: 1.25, marginBottom: 10 }}>{a.headline}</h3>

            {/* Body */}
            <p style={{ fontFamily: 'var(--body)', fontSize: 12.5, color: 'var(--t-byline)', lineHeight: 1.65, marginBottom: 12 }}>{a.body}</p>

            {/* Source */}
            <div style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--t-caption)', fontStyle: 'italic', borderTop: '1px solid var(--cream-3)', paddingTop: 8 }}>
              Source: {a.detail}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
