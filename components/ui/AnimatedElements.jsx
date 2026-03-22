'use client'

import { useState, useRef, useEffect } from 'react'

// ─── COUNT-UP WITH INTERSECTION OBSERVER (A1 fix) ────────────────────────────
export function CountUp({ end, prefix = '', suffix = '', duration = 1800 }) {
  const [val, setVal] = useState(0)
  const started = useRef(false)
  const spanRef = useRef(null)

  useEffect(() => {
    const el = spanRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const steps = 60
          const inc = end / steps
          let cur = 0
          const t = setInterval(() => {
            cur += inc
            if (cur >= end) { setVal(end); clearInterval(t) }
            else setVal(Math.floor(cur))
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={spanRef}>{prefix}{val.toLocaleString('en-IN')}{suffix}</span>
}

// ─── ACTIVITY TICKER (already cycling, just expose for Navbar too) ────────────
export function ActivityTicker() {
  const activities = [
    '🎉 Arjun in Koramangala just received 7 bids on iPhone 15 Pro',
    '💰 Priya in HSR Layout saved ₹12,000 on her MacBook Air M3',
    '⚡ Ravi in Whitefield got his first bid in under 45 minutes',
    '🤝 Sneha in Indiranagar closed a deal on Samsung S24 Ultra',
    '🔥 Kiran in JP Nagar got 9 competing bids on Sony headphones',
    '✅ Meera in BTM Layout verified her seller and saved ₹8,500',
    '📦 Deepak in Jayanagar posted a want and got 5 bids in 1 hour',
    '🏆 Kavya in MG Road got AirPods Pro 2 for ₹13,500 — ₹11,400 off MRP',
  ]
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setIdx((i) => (i + 1) % activities.length); setVisible(true) }, 400)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      background: 'var(--surface)', border: '1px solid #272729',
      borderRadius: 100, padding: '7px 16px',
      fontSize: 13, color: 'var(--muted-high)',
      marginBottom: 28, maxWidth: '100%', overflow: 'hidden',
    }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0, position: 'relative' }}>
        <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22c55e', animation: 'ping 1.5s infinite', opacity: 0.4 }} />
      </span>
      <span style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity .3s, transform .3s',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {activities[idx]}
      </span>
    </div>
  )
}
