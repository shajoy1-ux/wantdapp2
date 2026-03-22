'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/components/providers/AppProvider'
import { CATEGORIES, CAT_ICONS, AREAS, CONDITIONS } from '@/lib/data'
import { RequestCard, RequestDetailModal } from '@/components/browse/RequestCard'
import { SkeletonCard, Modal } from '@/components/ui/index.jsx'

export function BrowseClient() {
  const { user, requests, bids, showToast } = useApp()
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [area, setArea] = useState('All')
  const [cond, setCond] = useState('All')
  const [sort, setSort] = useState('newest')
  const [tab, setTab] = useState('all')
  const [wishlist, setWishlist] = useState(new Set())
  const [detailReq, setDetailReq] = useState(null)
  const [loading] = useState(false)

  const myBidIds = useMemo(() => {
    if (!user) return new Set()
    const myBids = Object.values(bids).flat().filter((b) => b.seller?.id === user?.sellerId)
    return new Set(Object.keys(bids).filter((k) => bids[k].some((b) => b.seller?.id === user?.sellerId)))
  }, [bids, user])

  const filtered = useMemo(() => {
    let list = [...requests].filter((r) => r.status === 'open')
    if (tab === 'trending') list = list.filter((r) => r.trending || r.viral)
    if (cat !== 'All') list = list.filter((r) => r.cat === cat)
    if (area !== 'All') list = list.filter((r) => r.area === area)
    if (cond !== 'All') list = list.filter((r) => r.cond === cond || r.cond === 'Any')
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((r) =>
        r.title.toLowerCase().includes(q) ||
        r.cat.toLowerCase().includes(q) ||
        r.area.toLowerCase().includes(q) ||
        r.desc?.toLowerCase().includes(q)
      )
    }
    if (sort === 'budget-high') list.sort((a, b) => b.budget - a.budget)
    else if (sort === 'budget-low') list.sort((a, b) => a.budget - b.budget)
    else if (sort === 'most-bids') list.sort((a, b) => b.bids - a.bids)
    return list
  }, [requests, tab, cat, area, cond, search, sort])

  const toggleWish = useCallback((id) => {
    setWishlist((prev) => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
    showToast(wishlist.has(id) ? 'Removed from saved' : '❤️ Saved to wishlist')
  }, [wishlist, showToast])

  const handleSubmitBid = useCallback((req) => {
    if (!user) {
      router.push('/auth?intent=bid')
      return
    }
    router.push(`/submit-bid?reqId=${req.id}`)
  }, [user, router])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Category pills */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid #272729', padding: '10px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 8, overflowX: 'auto' }}>
          {['All', ...CATEGORIES].map((c) => (
            <button
              key={c}
              className="cat-pill"
              onClick={() => setCat(c)}
              style={{
                flexShrink: 0,
                background: cat === c ? 'var(--accent)' : 'transparent',
                color: cat === c ? '#fff' : 'var(--muted-high)',
                border: `1px solid ${cat === c ? 'var(--accent)' : '#272729'}`,
                padding: '7px 16px', borderRadius: 100,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                transition: 'all .15s', fontFamily: 'inherit', whiteSpace: 'nowrap',
              }}
            >
              {c === 'All' ? 'All' : `${CAT_ICONS[c]} ${c}`}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid #272729', padding: '12px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search phones, laptops, gaming..."
            style={{ ...inputStyle, flex: '1 1 260px', padding: '10px 16px' }}
          />
          <select value={area} onChange={(e) => setArea(e.target.value)} style={{ ...inputStyle, flex: '0 1 170px', cursor: 'pointer' }}>
            <option value="All">📍 All Areas</option>
            {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <select value={cond} onChange={(e) => setCond(e.target.value)} style={{ ...inputStyle, flex: '0 1 145px', cursor: 'pointer' }}>
            <option value="All">Any Condition</option>
            {CONDITIONS.slice(1).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ ...inputStyle, flex: '0 1 170px', cursor: 'pointer' }}>
            <option value="newest">Newest First</option>
            <option value="budget-high">Budget: High → Low</option>
            <option value="budget-low">Budget: Low → High</option>
            <option value="most-bids">Most Bids</option>
          </select>
        </div>
      </div>

      {/* Tabs + count */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #272729', marginTop: 4 }}>
          <div style={{ display: 'flex' }}>
            {[['all', 'All Requests'], ['trending', '🔥 Trending']].map(([k, l]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                style={{
                  padding: '12px 20px', background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 14, fontWeight: 700,
                  color: tab === k ? 'var(--accent)' : 'var(--muted)',
                  borderBottom: `2px solid ${tab === k ? 'var(--accent)' : 'transparent'}`,
                  transition: '.15s', fontFamily: 'inherit',
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>{filtered.length} requests</span>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 60px' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontWeight: 700, fontSize: 18, color: 'var(--fg)', marginBottom: 8 }}>No requests found</p>
            <p style={{ fontSize: 14 }}>Try adjusting your filters</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
            {filtered.map((req, i) => (
              <RequestCard
                key={req.id}
                req={req}
                idx={i}
                onSubmitBid={handleSubmitBid}
                onViewDetail={setDetailReq}
                wishlist={wishlist}
                onToggleWish={user ? toggleWish : null}
                myBidIds={myBidIds}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      <Modal open={!!detailReq} onClose={() => setDetailReq(null)} maxWidth={580}>
        {detailReq && (
          <RequestDetailModal
            req={detailReq}
            bids={bids[detailReq.id] || []}
            onClose={() => setDetailReq(null)}
            onSubmitBid={() => { setDetailReq(null); handleSubmitBid(detailReq) }}
            user={user}
          />
        )}
      </Modal>
    </div>
  )
}

const inputStyle = {
  background: '#1a1a1c', border: '1px solid #272729', borderRadius: 12,
  padding: '10px 16px', color: 'var(--fg)', fontSize: 14, fontFamily: 'inherit',
  boxSizing: 'border-box',
}
