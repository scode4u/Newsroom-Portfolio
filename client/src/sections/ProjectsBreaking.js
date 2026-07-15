import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PROJECTS = [
  {
    id: 1, urgency: 'BREAKING', category: 'AI + DEVOPS',
    headline: 'Local Engineer\'s AI Copilot Achieves 94.1% RAG Accuracy — DevOps Industry Reacts',
    deck: 'A newly deployed AI DevOps Copilot built with FastAPI, OpenAI, and LangChain has demonstrated retrieval accuracy of 94.1% with sub-180ms latency, sources at the project\'s AWS EC2 cluster confirm.',
    body: 'The system ingests server logs, performs RAG-based retrieval over historical incident data, and generates actionable remediation steps via a React dashboard. Deployed via Docker on AWS.',
    metrics: [{ k:'RAG Accuracy', v:'94.1%', c:'#C0392B' },{ k:'API Latency', v:'<180ms', c:'var(--p-blue)' },{ k:'Status', v:'DEPLOYED', c:'var(--p-green)' }],
    tags: ['FastAPI','OpenAI','RAG','LangChain','Docker','AWS','React'],
    color: '#C0392B', bg: 'rgba(192,57,43,0.05)',
  },
  {
    id: 2, urgency: 'EXCLUSIVE', category: 'DATA ENGINEERING',
    headline: 'ETL Pipeline Normalizes 250K Records/Hour — "2.8x Faster Than Previous System"',
    deck: 'An end-to-end ETL pipeline developed by Singh has been confirmed to process 250,000 records per hour after transforming heterogeneous data to MySQL 3NF schema with 99.7% accuracy.',
    body: 'The pipeline uses Pandas batch optimizations and validates data integrity at each transformation stage. Prior system was manually managed and error-prone.',
    metrics: [{ k:'Speed Gain', v:'2.8×', c:'var(--p-amber)' },{ k:'Accuracy', v:'99.7%', c:'var(--p-green)' },{ k:'Records/hr', v:'250K+', c:'var(--p-blue)' }],
    tags: ['Python','Pandas','NumPy','MySQL','ETL','Bash'],
    color: '#D4860A', bg: 'rgba(212,134,10,0.05)',
  },
  {
    id: 3, urgency: 'REPORT', category: 'MACHINE LEARNING',
    headline: 'DeepLabV3+ Model Detects Oil Spills in SAR Imagery with 87.3% mIoU',
    deck: 'A semantic segmentation pipeline built on PyTorch and DeepLabV3+ achieves 87.3% mIoU on synthetic aperture radar satellite imagery for real-time oil spill detection.',
    body: 'The model features custom SAR pre-processing, data augmentation, and inference served via FastAPI — achieving under 400ms inference time per image.',
    metrics: [{ k:'mIoU Score', v:'87.3%', c:'var(--p-teal)' },{ k:'Inference', v:'<400ms', c:'var(--p-blue)' },{ k:'Accuracy', v:'91.2%', c:'var(--p-green)' }],
    tags: ['PyTorch','DeepLabV3+','SAR','FastAPI','OpenCV','Python'],
    color: '#16A085', bg: 'rgba(22,160,133,0.05)',
  },
];

export default function ProjectsBreaking() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="field-reports" ref={ref} style={{ padding: '0 0 8px' }}>
      <div style={{ display:'flex', alignItems:'baseline', gap:16, marginBottom:20 }}>
        <h2 style={{ fontFamily:'var(--serif)', fontSize:28, fontWeight:900, color:'var(--t-headline)' }}>Field Reports</h2>
        <span style={{ fontFamily:'var(--sans)', fontSize:11, color:'var(--t-caption)', letterSpacing:'0.08em', textTransform:'uppercase' }}>PROJECT COVERAGE</span>
      </div>

      {/* Lead story — full width */}
      <motion.div initial={{ opacity:0, y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
        className="news-card" style={{ padding:24, marginBottom:20, borderLeft:`4px solid ${PROJECTS[0].color}`, background:PROJECTS[0].bg }}>
        <div style={{ display:'flex', gap:10, marginBottom:10, alignItems:'center' }}>
          <span className="breaking-badge">{PROJECTS[0].urgency}</span>
          <span style={{ fontFamily:'var(--sans)', fontSize:10, fontWeight:600, color:'var(--t-caption)', letterSpacing:'0.1em' }}>{PROJECTS[0].category}</span>
        </div>
        <h3 style={{ fontFamily:'var(--serif)', fontSize:26, fontWeight:900, color:'var(--t-headline)', lineHeight:1.15, marginBottom:10 }}>{PROJECTS[0].headline}</h3>
        <p style={{ fontFamily:'var(--body)', fontSize:15, color:'var(--t-body)', lineHeight:1.65, marginBottom:12, fontStyle:'italic', borderLeft:'3px solid var(--ink-light)', paddingLeft:12 }}>{PROJECTS[0].deck}</p>
        <p style={{ fontFamily:'var(--body)', fontSize:14, color:'var(--t-byline)', lineHeight:1.65, marginBottom:16 }}>{PROJECTS[0].body}</p>
        <div style={{ display:'flex', gap:16, marginBottom:14 }}>
          {PROJECTS[0].metrics.map(m => (
            <div key={m.k} style={{ textAlign:'center', padding:'8px 16px', background:'var(--white)', border:'1px solid var(--ink-light)', borderRadius:2 }}>
              <div style={{ fontFamily:'var(--mono)', fontSize:18, fontWeight:700, color:m.c }}>{m.v}</div>
              <div style={{ fontFamily:'var(--sans)', fontSize:10, color:'var(--t-caption)', marginTop:2 }}>{m.k}</div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {PROJECTS[0].tags.map(t => <span key={t} className="tag" style={{ color:PROJECTS[0].color }}>{t}</span>)}
        </div>
      </motion.div>

      {/* Two-col stories */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        {PROJECTS.slice(1).map((p,i) => (
          <motion.div key={p.id} initial={{ opacity:0, y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.15+i*0.1 }}
            className="news-card" style={{ padding:20, borderTop:`3px solid ${p.color}` }}>
            <div style={{ display:'flex', gap:8, marginBottom:8, alignItems:'center' }}>
              <span style={{ fontFamily:'var(--sans)', fontSize:9, fontWeight:700, letterSpacing:'0.12em', color:'var(--white)', background:p.color, padding:'2px 7px', borderRadius:2 }}>{p.urgency}</span>
              <span style={{ fontFamily:'var(--sans)', fontSize:10, color:'var(--t-caption)', letterSpacing:'0.08em' }}>{p.category}</span>
            </div>
            <h3 style={{ fontFamily:'var(--serif)', fontSize:18, fontWeight:700, color:'var(--t-headline)', lineHeight:1.25, marginBottom:8 }}>{p.headline}</h3>
            <p style={{ fontFamily:'var(--body)', fontSize:13, color:'var(--t-byline)', lineHeight:1.65, marginBottom:12 }}>{p.deck}</p>
            <div style={{ display:'flex', gap:10, marginBottom:12, flexWrap:'wrap' }}>
              {p.metrics.map(m => (
                <div key={m.k} style={{ padding:'4px 10px', background:'var(--cream)', border:'1px solid var(--ink-light)', borderRadius:2, textAlign:'center' }}>
                  <div style={{ fontFamily:'var(--mono)', fontSize:13, fontWeight:700, color:m.c }}>{m.v}</div>
                  <div style={{ fontFamily:'var(--sans)', fontSize:9, color:'var(--t-caption)' }}>{m.k}</div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
              {p.tags.map(t => <span key={t} className="tag" style={{ color:p.color, fontSize:9 }}>{t}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
