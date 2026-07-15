import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const JOURNEY = [
  {
    year: '2021', role: 'Data Analyst', status: 'ARCHIVED', color: '#27AE60',
    headline: 'Singh Begins Career Parsing Raw Data — "SQL Was My First Language"',
    body: 'Starting with data analysis fundamentals, Singh mastered SQL, Pandas, and data visualisation. Built early dashboards and reports that turned messy spreadsheets into executive decisions.',
    skills: ['SQL','Pandas','Excel','Matplotlib','Data Cleaning','Storytelling'],
  },
  {
    year: '2024', role: 'Data Engineer', status: 'CURRENT', color: '#2E86AB',
    headline: 'Engineer Pivots to Pipeline Architecture — AWS, Docker, FastAPI Adopted',
    body: 'Transitioning to full data engineering, Singh built ETL pipelines, containerised services with Docker, provisioned AWS infrastructure, and established CI/CD workflows at F24 Tech Softwares.',
    skills: ['ETL','FastAPI','Docker','AWS','GitHub Actions','MySQL','Bash'],
  },
  {
    year: '2024', role: 'AI/ML Engineer', status: 'CURRENT', color: '#C0392B',
    headline: 'AI Systems Division Opens — RAG Pipeline Hits Production',
    body: 'Simultaneously expanding into AI engineering, Singh deployed LLM-powered applications using OpenAI, LangChain, and vector databases — culminating in a RAG system with 94.1% retrieval accuracy.',
    skills: ['OpenAI API','LangChain','RAG','PyTorch','Pinecone','Prompt Eng.'],
  },
  {
    year: '2025', role: 'Senior Data Engineer', status: 'TARGET', color: '#D4860A',
    headline: 'FORECAST: Engineer Eyes Petabyte-Scale Infrastructure Role',
    body: 'Next target: joining a team building real-time data infrastructure at scale. Actively learning Apache Spark, Airflow DAGs, dbt transformations, and Snowflake cloud warehousing.',
    skills: ['Apache Spark','Airflow','dbt','Snowflake','Kafka','Delta Lake'],
  },
  {
    year: '2026', role: 'Data Scientist', status: 'TARGET', color: '#16A085',
    headline: 'LONG-TERM: Singh Charts Course Toward Data Science Leadership',
    body: 'The endgame: combining engineering rigour with statistical science. A/B testing, ML model deployment, feature engineering, and turning data infrastructure into measurable business impact.',
    skills: ['Statistics','A/B Testing','MLOps','XGBoost','Feature Eng.','Causal Inference'],
  },
];

const STATUS_STYLE = {
  ARCHIVED: { bg: 'rgba(39,174,96,0.08)',   border: 'rgba(39,174,96,0.35)',   label: '✓ ARCHIVED'  },
  CURRENT:  { bg: 'rgba(192,57,43,0.07)',   border: 'rgba(192,57,43,0.35)',   label: '● CURRENT'   },
  TARGET:   { bg: 'rgba(212,134,10,0.07)',  border: 'rgba(212,134,10,0.3)',   label: '◎ TARGET'    },
};

export default function JourneyTimeline() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="archives" ref={ref} style={{ padding: '0 0 8px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 900, color: 'var(--t-headline)' }}>
          Career Chronicle
        </h2>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--t-caption)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          DATA ANALYST → DATA SCIENTIST
        </span>
      </div>

      <p style={{ fontFamily: 'var(--body)', fontStyle: 'italic', fontSize: 14, color: 'var(--t-byline)', marginBottom: 24, borderLeft: '3px solid var(--ink-light)', paddingLeft: 12 }}>
        A five-chapter story of technical evolution — from reading data to building the systems that make data possible, and eventually, making data predict the future.
      </p>

      <div style={{ position: 'relative' }}>
        {/* Vertical rule */}
        <div style={{ position: 'absolute', left: 56, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, #27AE60, #2E86AB, #C0392B, rgba(212,134,10,0.4), rgba(22,160,133,0.2))', borderRadius: 2 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {JOURNEY.map((j, i) => {
            const st = STATUS_STYLE[j.status];
            return (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}
              >
                {/* Year stamp */}
                <div style={{ width: 50, flexShrink: 0, textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, color: j.color }}>{j.year}</div>
                </div>

                {/* Timeline dot */}
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: j.color, border: `3px solid var(--white)`, boxShadow: `0 0 0 2px ${j.color}`, flexShrink: 0, marginTop: 4, position: 'relative', zIndex: 1 }}>
                  {j.status === 'CURRENT' && (
                    <motion.div style={{ position: 'absolute', inset: -5, borderRadius: '50%', border: `1.5px solid ${j.color}`, opacity: 0.5 }}
                      animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Story card */}
                <div style={{ flex: 1, background: st.bg, border: `1px solid ${st.border}`, borderRadius: 2, padding: '14px 18px', opacity: j.status === 'TARGET' ? 0.85 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--sans)', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--white)', background: j.color, padding: '2px 8px', borderRadius: 2 }}>
                        {j.role.toUpperCase()}
                      </span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: j.color, fontWeight: 600 }}>{st.label}</span>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: j.status === 'TARGET' ? 15 : 17, fontWeight: 700, color: 'var(--t-headline)', lineHeight: 1.25, marginBottom: 7, fontStyle: j.status === 'TARGET' ? 'italic' : 'normal' }}>
                    {j.headline}
                  </h3>
                  <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--t-byline)', lineHeight: 1.65, marginBottom: 10 }}>{j.body}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {j.skills.map(s => (
                      <span key={s} style={{ fontFamily: 'var(--sans)', fontSize: 10, fontWeight: 600, padding: '2px 8px', border: `1px solid ${j.color}`, borderRadius: 2, color: j.color, background: 'rgba(255,255,255,0.6)' }}>{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
