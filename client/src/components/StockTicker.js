import React, { useState, useEffect, useRef } from 'react';

export default function StockTicker() {
  const [stocks, setStocks] = useState([
    { sym:'PY',   name:'Python',      price:95.2,  change:0.8,  up:true  },
    { sym:'SQL',  name:'SQL',         price:88.4,  change:-0.3, up:false },
    { sym:'FAPI', name:'FastAPI',     price:93.1,  change:1.2,  up:true  },
    { sym:'RAG',  name:'RAG Systems', price:85.7,  change:0.5,  up:true  },
    { sym:'TAPI', name:'OpenAI API',  price:90.3,  change:2.1,  up:true  },
    { sym:'DCK',  name:'Docker',      price:86.0,  change:-0.8, up:false },
    { sym:'AWS',  name:'AWS',         price:80.5,  change:0.3,  up:true  },
    { sym:'PAN',  name:'Pandas',      price:90.1,  change:1.4,  up:true  },
    { sym:'LCH',  name:'LangChain',   price:82.2,  change:-0.4, up:false },
    { sym:'ETL',  name:'ETL Pipes',   price:82.9,  change:0.7,  up:true  },
  ]);

  useEffect(() => {
    const iv = setInterval(async () => {
      try {
        const r = await fetch('/api/stocks');
        if (r.ok) { const d = await r.json(); setStocks(d.stocks); }
      } catch {
        setStocks(prev => prev.map(s => {
          const ch = parseFloat((Math.random()*4-2).toFixed(2));
          return { ...s, change: ch, price: parseFloat((s.price + ch * 0.1).toFixed(2)), up: ch >= 0 };
        }));
      }
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  const doubled = [...stocks, ...stocks];

  return (
    <div style={{ background: 'var(--t-headline)', color: '#fff', overflow: 'hidden', height: 34, display: 'flex', alignItems: 'center', borderBottom: '2px solid #C0392B' }}>
      {/* Label */}
      <div style={{ background: '#C0392B', padding: '0 14px', height: '100%', display: 'flex', alignItems: 'center', flexShrink: 0, gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'var(--sans)', letterSpacing: '0.1em' }}>SKILL INDEX</span>
      </div>

      {/* Scrolling tickers */}
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div style={{ display: 'flex', gap: 0, animation: 'ticker 30s linear infinite', whiteSpace: 'nowrap' }}>
          {doubled.map((s, i) => (
            <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 20px', borderRight: '1px solid rgba(255,255,255,0.1)', height: 34 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, color: '#fff' }}>{s.sym}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: s.up ? '#73DE9A' : '#FF8A80' }}>{s.price?.toFixed(1)}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: s.up ? '#73DE9A' : '#FF8A80' }}>
                {s.up ? '▲' : '▼'} {Math.abs(s.change||0).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
