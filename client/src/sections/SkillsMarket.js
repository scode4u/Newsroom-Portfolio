import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const SKILLS = [
  { sym:'PY',   name:'Python',            cat:'Core',     base:95, color:'#2E86AB' },
  { sym:'FAPI', name:'FastAPI',           cat:'Backend',  base:93, color:'#27AE60' },
  { sym:'TAPI', name:'OpenAI API',        cat:'AI/ML',    base:90, color:'#C0392B' },
  { sym:'PAN',  name:'Pandas',            cat:'Data',     base:90, color:'#D4860A' },
  { sym:'SQL',  name:'SQL / MySQL',       cat:'Data',     base:88, color:'#16A085' },
  { sym:'PENG', name:'Prompt Eng.',       cat:'AI/ML',    base:88, color:'#C0392B' },
  { sym:'DCK',  name:'Docker',            cat:'DevOps',   base:86, color:'#2E86AB' },
  { sym:'RAG',  name:'RAG Systems',       cat:'AI/ML',    base:85, color:'#C0392B' },
  { sym:'NP',   name:'NumPy',             cat:'Data',     base:85, color:'#D4860A' },
  { sym:'LCH',  name:'LangChain',         cat:'AI/ML',    base:82, color:'#C0392B' },
  { sym:'GHA',  name:'GitHub Actions',    cat:'DevOps',   base:82, color:'#27AE60' },
  { sym:'ETL',  name:'ETL Pipelines',     cat:'Data Eng', base:82, color:'#16A085' },
  { sym:'AWS',  name:'AWS',               cat:'Cloud',    base:80, color:'#D4860A' },
  { sym:'VDB',  name:'Vector Databases',  cat:'AI/ML',    base:80, color:'#C0392B' },
];

const CAT_COLORS = { 'Core':'#2E86AB','AI/ML':'#C0392B','Backend':'#27AE60','Data':'#D4860A','Data Eng':'#16A085','DevOps':'#27AE60','Cloud':'#D4860A' };

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background:'var(--white)', border:'1px solid var(--ink-light)', padding:'8px 12px', fontFamily:'var(--sans)', fontSize:12, boxShadow:'0 4px 12px rgba(0,0,0,0.1)' }}>
      <div style={{ fontWeight:700, color:'var(--t-headline)' }}>{d.name}</div>
      <div style={{ color:'var(--t-byline)', marginTop:2 }}>Category: <strong>{d.cat}</strong></div>
      <div style={{ color: d.color, fontWeight:700 }}>Proficiency: {d.base}%</div>
    </div>
  );
};

export default function SkillsMarket() {
  const [stocks, setStocks] = useState(SKILLS.map(s => ({ ...s, price: s.base, change: 0, up: true })));
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const iv = setInterval(async () => {
      try {
        const r = await fetch('/api/stocks');
        if (r.ok) { const d = await r.json(); if (d.stocks) setStocks(prev => prev.map((s,i) => ({ ...s, ...(d.stocks[i]||{}) }))); }
      } catch {
        setStocks(prev => prev.map(s => { const ch = parseFloat((Math.random()*2-1).toFixed(2)); return { ...s, change:ch, price:parseFloat((s.base+ch*0.5).toFixed(1)), up:ch>=0 }; }));
      }
    }, 3500);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="markets" ref={ref} style={{ padding: '0 0 8px' }}>
      <div style={{ display:'flex', alignItems:'baseline', gap:16, marginBottom:20 }}>
        <h2 style={{ fontFamily:'var(--serif)', fontSize:28, fontWeight:900, color:'var(--t-headline)' }}>Skills Market Report</h2>
        <span style={{ fontFamily:'var(--sans)', fontSize:11, color:'var(--t-caption)', letterSpacing:'0.08em', textTransform:'uppercase' }}>MARKETS DESK</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:28 }}>
        {/* Chart */}
        <div>
          <div style={{ fontFamily:'var(--body)', fontStyle:'italic', fontSize:13, color:'var(--t-byline)', marginBottom:14, borderLeft:'3px solid var(--p-amber)', paddingLeft:10 }}>
            All proficiency indices trending positive in Q4. Python leads at 95pts.
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={SKILLS} margin={{ top:4, right:8, left:-24, bottom:50 }}>
              <XAxis dataKey="sym" tick={{ fontSize:10, fill:'var(--t-byline)', fontFamily:'var(--mono)' }} angle={-45} textAnchor="end" interval={0}/>
              <YAxis domain={[65,100]} tick={{ fontSize:10, fill:'var(--t-byline)' }}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Bar dataKey="base" radius={[2,2,0,0]}>
                {SKILLS.map((s,i) => <Cell key={i} fill={CAT_COLORS[s.cat]||'#2E86AB'} fillOpacity={0.8}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Live ticker table */}
        <div>
          <div style={{ fontFamily:'var(--sans)', fontSize:11, fontWeight:700, letterSpacing:'0.1em', color:'var(--t-caption)', textTransform:'uppercase', marginBottom:10, paddingBottom:6, borderBottom:'2px solid var(--t-headline)', display:'grid', gridTemplateColumns:'1fr auto auto auto' }}>
            <span>SKILL</span><span>SCORE</span><span>CHG</span><span>%</span>
          </div>
          {stocks.slice(0,10).map((s,i) => (
            <motion.div key={s.sym}
              initial={{ opacity:0, x:-10 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:i*0.05 }}
              style={{ display:'grid', gridTemplateColumns:'1fr auto auto auto', gap:8, padding:'6px 0', borderBottom:'1px solid var(--cream-3)', alignItems:'center' }}
              onMouseEnter={e=>e.currentTarget.style.background='var(--cream-2)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}
            >
              <div>
                <span style={{ fontFamily:'var(--mono)', fontSize:11, fontWeight:700, color:'var(--t-headline)' }}>{s.sym}</span>
                <span style={{ fontFamily:'var(--sans)', fontSize:10, color:'var(--t-caption)', marginLeft:6 }}>{s.name}</span>
              </div>
              <span style={{ fontFamily:'var(--mono)', fontSize:12, fontWeight:600, color:'var(--t-headline)' }}>{(s.price||s.base).toFixed(1)}</span>
              <span style={{ fontFamily:'var(--mono)', fontSize:11, color: s.up?'var(--stock-up)':'var(--stock-down)', fontWeight:500 }}>
                {s.up?'▲':'▼'}{Math.abs(s.change||0).toFixed(2)}
              </span>
              <span style={{ fontFamily:'var(--mono)', fontSize:10, color: s.up?'var(--stock-up)':'var(--stock-down)' }}>
                {s.up?'+':''}{s.pct?.toFixed(1)||'0.0'}%
              </span>
            </motion.div>
          ))}
          <div style={{ fontFamily:'var(--sans)', fontSize:10, color:'var(--t-caption)', marginTop:8, fontStyle:'italic' }}>
            * Proficiency indices update every 3.5s. Past performance reflects actual skill.
          </div>
        </div>
      </div>
    </section>
  );
}
