const express = require('express');
const cors    = require('cors');
const app     = express();
const PORT    = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Live stock-style metrics for skill prices
app.get('/api/stocks', (req, res) => {
  const stocks = [
    { sym:'PY',   name:'Python',       base:95 },
    { sym:'SQL',  name:'SQL',          base:88 },
    { sym:'FAPI', name:'FastAPI',      base:93 },
    { sym:'RAG',  name:'RAG Systems',  base:85 },
    { sym:'TAPI', name:'OpenAI API',   base:90 },
    { sym:'DCK',  name:'Docker',       base:86 },
    { sym:'AWS',  name:'AWS',          base:80 },
    { sym:'PAN',  name:'Pandas',       base:90 },
    { sym:'LCH',  name:'LangChain',    base:82 },
    { sym:'ETL',  name:'ETL Pipeline', base:82 },
  ].map(s => {
    const change = parseFloat((Math.random() * 4 - 2).toFixed(2));
    const price  = parseFloat((s.base + change).toFixed(2));
    return { ...s, price, change, pct: parseFloat(((change / s.base) * 100).toFixed(2)), up: change >= 0 };
  });
  res.json({ stocks, timestamp: new Date().toISOString() });
});

// Live metrics (breaking news stats)
app.get('/api/metrics', (req, res) => {
  res.json({
    stories_published:  Math.floor(Math.random() * 20 + 180),
    viewer_count:       Math.floor(Math.random() * 500 + 2400),
    breaking_alerts:    Math.floor(Math.random() * 3 + 1),
    uptime_pct:         parseFloat((99.7 + Math.random() * 0.3).toFixed(2)),
    inference_ms:       parseFloat((Math.random() * 30 + 40).toFixed(1)),
    pipelines_running:  Math.floor(Math.random() * 4 + 3),
    timestamp:          new Date().toISOString(),
  });
});

// Contact — "Send a tip"
app.post('/api/tip', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`\n📰 TIP RECEIVED from ${name} <${email}>:\n${message}\n`);
  res.json({ success: true, story_id: `STR-${Date.now()}`, message: 'Your tip has been received by the newsroom.' });
});

app.get('/api/health', (_, res) => res.json({ status: 'LIVE', broadcast: 'SNN — Suryansh News Network' }));

app.listen(PORT, () => {
  console.log(`\n📡 SNN Broadcast Server live on :${PORT}`);
  console.log(`   Suryansh News Network — ON AIR\n`);
});
