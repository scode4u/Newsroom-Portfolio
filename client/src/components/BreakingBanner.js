import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HEADLINES = [
  'LOCAL ENGINEER BUILDS RAG SYSTEM WITH 94.1% ACCURACY — INDUSTRY STUNNED',
  'ETL PIPELINE ACHIEVES 2.8x SPEED BREAKTHROUGH — SOURCES CONFIRM',
  'OIL SPILL DETECTION MODEL HITS 87.3% mIoU — FIRST OF ITS KIND IN REGION',
  'SURYANSH SINGH AWARDED BEST CODER AT LEX-HACK 1.0 — COMPETITORS SPEECHLESS',
  'HACKERRANK AWARDS ENGINEER 4-STAR BADGE IN PROBLEM SOLVING',
  'FASTAPI BACKEND DEPLOYED TO AWS — ZERO DOWNTIME RECORDED',
];

export default function BreakingBanner() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setIdx(i => (i + 1) % HEADLINES.length), 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ background: '#C0392B', display: 'flex', alignItems: 'center', height: 38, overflow: 'hidden' }}>
      <div style={{ background: '#1A1208', color: '#fff', padding: '0 16px', height: '100%', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em' }}>⚡ BREAKING</span>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '0 20px' }}>
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: '0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {HEADLINES[idx]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ padding: '0 16px', fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.7)', flexShrink: 0 }}>
        {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
}
