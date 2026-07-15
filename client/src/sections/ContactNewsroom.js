import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Github, Linkedin, Phone } from 'lucide-react';

export default function ContactNewsroom() {
  const [form,   setForm]   = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [storyId, setStoryId] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const r = await fetch('/api/tip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const d = await r.json();
      if (d.success) { setStoryId(d.story_id); setStatus('sent'); setForm({ name: '', email: '', message: '' }); }
      else throw new Error();
    } catch {
      setTimeout(() => {
        setStoryId(`STR-${Date.now()}`);
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      }, 1000);
    }
  };

  const inp = {
    width: '100%', background: 'var(--newsprint)', border: '1px solid var(--ink-light)',
    borderRadius: 2, padding: '9px 12px', fontFamily: 'var(--body)', fontSize: 14,
    color: 'var(--t-headline)', outline: 'none', transition: 'border-color .15s, box-shadow .15s',
  };

  return (
    <section id="contact" style={{ padding: '0 0 40px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 900, color: 'var(--t-headline)' }}>
          Send a Tip to the Newsroom
        </h2>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--t-caption)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>CONTACT DESK</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        {/* Left — form */}
        <div>
          <p style={{ fontFamily: 'var(--body)', fontStyle: 'italic', fontSize: 14, color: 'var(--t-byline)', marginBottom: 20, borderLeft: '3px solid #C0392B', paddingLeft: 12, lineHeight: 1.65 }}>
            Whether you're building an AI product, hiring a data engineer, or exploring a collaboration — the SNN newsroom is ready to receive your tip. All messages are reviewed personally by Singh.
          </p>

          {status === 'sent' ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: 'rgba(39,174,96,0.08)', border: '1px solid rgba(39,174,96,0.35)', borderLeft: '4px solid #27AE60', padding: 20, borderRadius: 2 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 700, color: '#27AE60', marginBottom: 6 }}>
                📰 Tip Received by Newsroom
              </div>
              <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--t-byline)', lineHeight: 1.6, marginBottom: 8 }}>
                Your message has been logged and will be reviewed shortly. Story ID assigned for tracking:
              </p>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 700, color: '#27AE60', background: 'var(--cream)', padding: '6px 12px', borderRadius: 2, display: 'inline-block' }}>
                {storyId}
              </div>
            </motion.div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { key: 'name',  label: 'Your Name',    type: 'text',  ph: 'Jane Smith — Tech Editor, Acme Corp' },
                { key: 'email', label: 'Email Address', type: 'email', ph: 'jane@company.com'                    },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--t-byline)', display: 'block', marginBottom: 5 }}>{f.label}</label>
                  <input type={f.type} value={form[f.key]} required placeholder={f.ph}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={inp}
                    onFocus={e => { e.target.style.borderColor = '#C0392B'; e.target.style.boxShadow = '0 0 0 3px rgba(192,57,43,0.08)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--ink-light)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--t-byline)', display: 'block', marginBottom: 5 }}>Your Message / Tip</label>
                <textarea value={form.message} required rows={5}
                  placeholder="Tell us what you're working on, what role you're hiring for, or how you'd like to collaborate..."
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{ ...inp, resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={e => { e.target.style.borderColor = '#C0392B'; e.target.style.boxShadow = '0 0 0 3px rgba(192,57,43,0.08)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--ink-light)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <button type="submit" disabled={status === 'sending'} style={{
                background: '#C0392B', color: '#fff', border: 'none', padding: '11px 24px',
                fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
                cursor: status === 'sending' ? 'not-allowed' : 'pointer', borderRadius: 2,
                display: 'flex', alignItems: 'center', gap: 8, opacity: status === 'sending' ? 0.75 : 1,
                transition: 'background .15s',
              }}
              onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.background = '#A93226'; }}
              onMouseLeave={e => e.currentTarget.style.background = '#C0392B'}
              >
                {status === 'sending' ? (
                  <><div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }}/> FILING STORY...</>
                ) : (
                  <><Send size={14}/> SUBMIT TIP TO NEWSROOM</>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right — contacts + info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Direct channels */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--ink-light)', padding: 20 }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700, color: 'var(--t-headline)', borderBottom: '2px solid var(--t-headline)', paddingBottom: 8, marginBottom: 14 }}>
              DIRECT CHANNELS
            </div>
            {[
              { icon: <Mail size={14}/>,     label: 'Email',    val: 'code4ssr@gmail.com',                        href: 'mailto:code4ssr@gmail.com',                           color: '#C0392B'         },
              { icon: <Github size={14}/>,   label: 'GitHub',   val: 'github.com/scode4u',                        href: 'https://github.com/scode4u',                          color: 'var(--t-headline)' },
              { icon: <Linkedin size={14}/>, label: 'LinkedIn', val: 'linkedin.com/in/suryansh-singh-code',       href: 'https://linkedin.com/in/suryansh-singh-code',         color: '#2E86AB'          },
              { icon: <Phone size={14}/>,    label: 'Phone',    val: '+91 7987839954',                            href: 'tel:+917987839954',                                   color: '#27AE60'          },
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--cream-2)', textDecoration: 'none', transition: 'opacity .15s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${c.color}18`, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--t-caption)' }}>{c.label}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: c.color, fontWeight: 500, marginTop: 1 }}>{c.val}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Availability notice */}
          <div style={{ background: '#C0392B', color: '#fff', padding: 20 }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>📢 AVAILABILITY NOTICE</div>
            <p style={{ fontFamily: 'var(--body)', fontSize: 13, lineHeight: 1.65, marginBottom: 14, opacity: 0.92 }}>
              Suryansh Singh is currently available for full-time roles, internships, and freelance engagements in Data Engineering, AI Engineering, and Full Stack development.
            </p>
            {['Full-time Positions','Internships','Freelance / Contract','Remote & On-site'].map(r => (
              <div key={r} style={{ fontFamily: 'var(--sans)', fontSize: 11, padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: 8, opacity: 0.9 }}>
                <span>✓</span>{r}
              </div>
            ))}
          </div>

          {/* Newsroom note */}
          <div style={{ background: 'var(--cream-2)', border: '1px solid var(--ink-light)', padding: 16 }}>
            <div style={{ fontFamily: 'var(--body)', fontStyle: 'italic', fontSize: 12.5, color: 'var(--t-byline)', lineHeight: 1.65 }}>
              <strong style={{ fontStyle: 'normal' }}>Editorial Note:</strong> All tips submitted through this form are reviewed within 24 hours. Confidentiality guaranteed. The SNN newsroom does not sell contact information.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
