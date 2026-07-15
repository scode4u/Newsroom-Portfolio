import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BroadcastBar() {
  const [time,    setTime]    = useState(new Date());
  const [metrics, setMetrics] = useState({ viewer_count: 2847, breaking_alerts: 2 });

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    const m = setInterval(async () => {
      try { const r = await fetch('/api/metrics'); if (r.ok) setMetrics(await r.json()); } catch {}
    }, 5000);
    return () => { clearInterval(t); clearInterval(m); };
  }, []);

  return (
    <div style={{
      background: '#C0392B', color: '#fff',
      padding: '5px 24px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', fontSize: 11,
      fontFamily: 'var(--sans)', fontWeight: 500, letterSpacing: '0.04em',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
          style={{ display: 'flex', alignItems: 'center', gap: 5, fontWeight: 700 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', display: 'inline-block' }}/>
          LIVE
        </motion.div>
        <span style={{ opacity: 0.88 }}>SNN — SURYANSH NEWS NETWORK</span>
      </div>
      <div style={{ display: 'flex', gap: 24, opacity: 0.9, alignItems: 'center' }}>
        <span>👁 {(metrics.viewer_count||2847).toLocaleString()} viewers</span>
        <span>🔔 {metrics.breaking_alerts||2} breaking alerts</span>
        <span>{time.toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short', year:'numeric' })}</span>
        <span style={{ fontFamily: 'var(--mono)', fontWeight: 700 }}>{time.toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
