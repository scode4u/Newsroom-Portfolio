import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const EXPERIENCE = [
  {
    company: 'F24 Tech Softwares',
    role: 'DevOps Intern',
    period: '2024',
    type: 'INTERNSHIP',
    color: '#2E86AB',
    headline: 'Intern Overhauls Cloud Infrastructure at F24 Tech — "Zero Downtime Achieved"',
    deck: 'During a six-month engagement at F24 Tech Softwares, Singh provisioned AWS cloud infrastructure, containerised multiple services with Docker, and established automated CI/CD pipelines.',
    bullets: [
      'Provisioned AWS EC2 instances, S3 buckets, and IAM roles for team operations',
      'Containerised 3+ services with Docker — dev/prod parity established',
      'Built GitHub Actions CI/CD — automated build → test → deploy pipeline',
      'Deployed FastAPI backend services with zero-downtime strategies',
      'Authored Bash automation scripts reducing manual operations overhead by 60%',
    ],
    tags: ['AWS','EC2','S3','IAM','Docker','GitHub Actions','FastAPI','Bash','CI/CD'],
    impact: 82,
  },
];

const EDUCATION = [
  {
    institution: 'Engineering College',
    degree: 'B.Tech — Computer Science',
    period: '2021–2025',
    type: 'EDUCATION',
    color: '#27AE60',
    headline: 'Computer Science Graduate Masters Algorithms, ML, and Systems Design',
    deck: 'Four-year program covering data structures, algorithms, machine learning fundamentals, database systems, and software engineering. Active participant in hackathons and coding competitions.',
    bullets: [
      'Built AI/ML projects applying real-world Python and deep learning',
      'Won Best Coder award at Lex-Hack 1.0 inter-college hackathon',
      'Achieved HackerRank 4-Star Problem Solving and 3-Star SQL ratings',
      'Coursework: DBMS, OS, Networks, Algorithms, ML, System Design',
    ],
    tags: ['Python','ML','DSA','DBMS','System Design','Algorithms'],
    impact: null,
  },
];

function ArticleCard({ item, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.15 }}
      className="news-card"
      style={{ padding: 22, borderTop: `4px solid ${item.color}` }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: '#fff', background: item.color, padding: '2px 8px', borderRadius: 2 }}>{item.type}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--t-caption)' }}>{item.period}</span>
        </div>
        {item.impact && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 700, color: item.color }}>{item.impact}</div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 9, color: 'var(--t-caption)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Impact Score</div>
          </div>
        )}
      </div>

      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 700, color: 'var(--t-headline)', lineHeight: 1.2, marginBottom: 4 }}>{item.role || item.degree}</h3>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 600, color: item.color, marginBottom: 10 }}>{item.company || item.institution}</div>

      <p style={{ fontFamily: 'var(--body)', fontStyle: 'italic', fontSize: 14, color: 'var(--t-byline)', marginBottom: 14, borderLeft: '3px solid var(--ink-light)', paddingLeft: 10, lineHeight: 1.6 }}>{item.deck}</p>

      {item.impact && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--t-caption)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Performance Rating</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: item.color, fontWeight: 600 }}>{item.impact}/100</span>
          </div>
          <div style={{ height: 5, background: 'var(--cream-3)', borderRadius: 3, overflow: 'hidden' }}>
            <motion.div style={{ height: '100%', background: item.color, borderRadius: 3, opacity: 0.8 }}
              initial={{ width: 0 }} animate={inView ? { width: `${item.impact}%` } : {}} transition={{ duration: 1, delay: i * 0.15 + 0.3 }}/>
          </div>
        </div>
      )}

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
        {item.bullets.map((b, j) => (
          <li key={j} style={{ display: 'flex', gap: 8, fontFamily: 'var(--body)', fontSize: 13.5, color: 'var(--t-body)', lineHeight: 1.55 }}>
            <span style={{ color: item.color, flexShrink: 0, marginTop: 1 }}>▸</span>{b}
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {item.tags.map(t => (
          <span key={t} style={{ fontFamily: 'var(--sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.05em', padding: '2px 8px', border: `1px solid ${item.color}`, borderRadius: 2, color: item.color }}>{t}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ExperienceArchive() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section ref={ref} style={{ padding: '0 0 8px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 900, color: 'var(--t-headline)' }}>Experience & Education</h2>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--t-caption)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>VERIFIED RECORD</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {[...EXPERIENCE, ...EDUCATION].map((item, i) => (
          <ArticleCard key={i} item={item} i={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
