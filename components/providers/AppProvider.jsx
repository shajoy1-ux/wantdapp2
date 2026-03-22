'use client'

import { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { INITIAL_REQUESTS, INITIAL_BIDS, SELLERS } from '@/lib/data'

const AppContext = createContext(null)

const lsGet = (key, fallback) => {
  if (typeof window === 'undefined') return fallback
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback }
  catch { return fallback }
}
const lsSet = (key, val) => {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
}

export function AppProvider({ children }) {
  const [user, setUser]           = useState(null)
  const [requests, setRequests]   = useState(INITIAL_REQUESTS)
  const [bids, setBids]           = useState(INITIAL_BIDS)
  const [pendingBid, setPendingBid] = useState(null)
  const [toast, setToast]         = useState({ msg: '', on: false })
  const [sellerApplications, setSellerApplications] = useState([])
  const [ratings, setRatings]     = useState([])
  const [messages, setMessages]   = useState({})
  const [paymentIntents, setPaymentIntents] = useState([])
  const [verifiedSellerEmails, setVerifiedSellerEmails] = useState([])
  const hydrated = useRef(false)

  useEffect(() => {
    if (hydrated.current) return
    hydrated.current = true
    const savedUser     = lsGet('wantd_user', null)
    const savedReqs     = lsGet('wantd_requests', null)
    const savedBids     = lsGet('wantd_bids', null)
    const savedApps     = lsGet('wantd_seller_apps', [])
    const savedRatings  = lsGet('wantd_ratings', [])
    const savedMsgs     = lsGet('wantd_messages', {})
    const savedPayments = lsGet('wantd_payments', [])
    const savedVerified = lsGet('wantd_verified_sellers', [])
    if (savedUser)    setUser(savedUser)
    if (savedReqs)    setRequests(savedReqs)
    if (savedBids)    setBids(savedBids)
    setSellerApplications(savedApps)
    setRatings(savedRatings)
    setMessages(savedMsgs)
    setPaymentIntents(savedPayments)
    setVerifiedSellerEmails(savedVerified)
  }, [])

  useEffect(() => { if (hydrated.current) lsSet('wantd_user', user) }, [user])
  useEffect(() => { if (hydrated.current) lsSet('wantd_requests', requests) }, [requests])
  useEffect(() => { if (hydrated.current) lsSet('wantd_bids', bids) }, [bids])
  useEffect(() => { if (hydrated.current) lsSet('wantd_seller_apps', sellerApplications) }, [sellerApplications])
  useEffect(() => { if (hydrated.current) lsSet('wantd_ratings', ratings) }, [ratings])
  useEffect(() => { if (hydrated.current) lsSet('wantd_messages', messages) }, [messages])
  useEffect(() => { if (hydrated.current) lsSet('wantd_payments', paymentIntents) }, [paymentIntents])
  useEffect(() => { if (hydrated.current) lsSet('wantd_verified_sellers', verifiedSellerEmails) }, [verifiedSellerEmails])

  const showToast = useCallback((msg) => {
    setToast({ msg, on: true })
    setTimeout(() => setToast({ msg: '', on: false }), 2800)
  }, [])

  const login = useCallback((profile) => {
    setUser(profile)
    showToast(`Welcome back, ${profile.name?.split(' ')[0]}! 🎉`)
  }, [showToast])

  const logout = useCallback(() => {
    setUser(null)
    lsSet('wantd_user', null)
    showToast('Signed out. See you soon!')
  }, [showToast])

  const onPost = useCallback((form, currentUser) => {
    const u = currentUser
    const newReq = {
      id: Date.now(),
      title: form.title,
      cat: form.cat,
      desc: form.desc,
      budget: parseInt(form.budget),
      area: form.area,
      cond: form.cond,
      phone: form.phone,
      bids: 0,
      status: 'open',
      urgent: form.urgent,
      _new: true,
      _mine: true,
      _buyerId: u?.email || null,
      time: 'Just now',
      trending: false,
    }
    setRequests((p) => [newReq, ...p])
    const matched = SELLERS.filter(() => Math.random() > 0.45).slice(0, 3)
    setTimeout(() => { showToast(`⚡ ${matched.length} sellers notified about your request!`) }, 900)
    return newReq
  }, [showToast])

  const onAcceptBid = useCallback((bidId, reqId) => {
    setBids((prev) => {
      const updated = { ...prev }
      if (updated[reqId]) {
        updated[reqId] = updated[reqId].map((b) => ({
          ...b, status: b.id === bidId ? 'accepted' : b.status,
        }))
      }
      return updated
    })
    setRequests((prev) => prev.map((r) => (r.id === reqId ? { ...r, status: 'accepted' } : r)))
    showToast('🎉 Deal accepted! Chat with the seller on WhatsApp.')
  }, [showToast])

  const onSubmitBid = useCallback((form, req, currentUser) => {
    if (!req) return
    const u = currentUser
    const newBid = {
      id: `b_${Date.now()}`,
      seller: u?.sellerProfile || SELLERS[0],
      sellerId: u?.sellerId,
      sellerEmail: u?.email,
      price: parseInt(form.price),
      del: form.del,
      warranty: form.warranty || 'As described',
      cond: form.cond,
      msg: form.msg,
      location: form.location || u?.sellerProfile?.area || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    setBids((prev) => ({ ...prev, [req.id]: [...(prev[req.id] || []), newBid] }))
    setRequests((prev) => prev.map((r) => (r.id === req.id ? { ...r, bids: r.bids + 1 } : r)))
    if (req._buyerId) {
      const convKey = `${req.id}_${u?.email || u?.sellerId}`
      const sysMsg = {
        id: `sys_${Date.now()}`,
        wantId: req.id, convKey,
        senderId: 'system', senderName: 'wantd.in', senderRole: 'system',
        receiverId: req._buyerId,
        body: `${u?.sellerProfile?.name || u?.name || 'A seller'} submitted an offer of ₹${parseInt(form.price).toLocaleString('en-IN')} for your want.`,
        read: false, createdAt: new Date().toISOString(), type: 'system',
        buyerId: req._buyerId, sellerId: u?.email || u?.sellerId,
      }
      setMessages((prev) => ({ ...prev, [convKey]: [...(prev[convKey] || []), sysMsg] }))
    }
    showToast('🎯 Offer submitted successfully!')
    return newBid
  }, [showToast])

  const onCloseWant = useCallback((reqId, { didBuy, sellerId, stars, review, reason }, currentBids) => {
    const winBid = currentBids?.find(b =>
      sellerId && (String(b.seller?.id) === String(sellerId) || b.sellerEmail === sellerId)
    )
    setRequests((prev) => prev.map((r) =>
      r.id === reqId
        ? { ...r, status: 'closed', closedAt: new Date().toISOString(),
            closedReason: didBuy ? 'bought' : (reason || 'other'),
            winningSellerId: sellerId || null,
            winningPrice: didBuy && winBid ? winBid.price : null }
        : r
    ))
    if (didBuy && sellerId && stars) {
      setRatings((prev) => [...prev, {
        id: `r_${Date.now()}`, reqId, stars: parseInt(stars),
        review: review || '', createdAt: new Date().toISOString(), sellerId,
      }])
    }
    showToast('✅ Request closed.')
  }, [showToast])

  const onApplyAsSeller = useCallback((form, currentUser) => {
    const app = { id: `app_${Date.now()}`, userId: currentUser?.email, ...form,
      status: 'pending', createdAt: new Date().toISOString() }
    setSellerApplications((prev) => [...prev.filter(a => a.userId !== currentUser?.email), app])
    showToast("📋 Application submitted! We'll review within 24–48 hours.")
    return app
  }, [showToast])

  const onDemoApproveSeller = useCallback((userEmail) => {
    setSellerApplications((prev) => prev.map(a =>
      a.userId === userEmail ? { ...a, status: 'approved', approvedAt: new Date().toISOString() } : a
    ))
    setVerifiedSellerEmails((prev) => prev.includes(userEmail) ? prev : [...prev, userEmail])
    setUser((prev) => prev ? { ...prev, isVerifiedSeller: true } : prev)
    showToast('✅ Seller account approved! You can now submit offers.')
  }, [showToast])

  const getMySellerApplication = useCallback((email) =>
    sellerApplications.find(a => a.userId === email) || null
  , [sellerApplications])

  const isVerifiedSeller = useCallback((email) =>
    verifiedSellerEmails.includes(email)
  , [verifiedSellerEmails])

  const onCreatePaymentIntent = useCallback((reqId, sellerId, sellerInfo, currentUser) => {
    const intent = {
      id: `pi_${Date.now()}`, reqId, sellerId,
      buyerId: currentUser?.email, sellerInfo,
      amount: 500, status: 'pending',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }
    setPaymentIntents((prev) => [
      ...prev.filter(p => !(p.reqId === reqId && p.sellerId === sellerId)), intent
    ])
    return intent
  }, [])

  const onConfirmPayment = useCallback((intentId) => {
    setPaymentIntents((prev) => prev.map(p =>
      p.id === intentId ? { ...p, status: 'paid', paidAt: new Date().toISOString() } : p
    ))
    showToast("✅ Payment confirmed! Seller's contact is now revealed.")
    return true
  }, [showToast])

  const onConfirmDealClosed = useCallback((intentId, didClose) => {
    setPaymentIntents((prev) => prev.map(p =>
      p.id === intentId ? { ...p, status: didClose ? 'captured' : 'refunded',
        resolvedAt: new Date().toISOString() } : p
    ))
    showToast(didClose ? '🎉 Deal confirmed! ₹500 captured as platform fee.' : '💸 ₹500 refund initiated — 5–7 business days.')
  }, [showToast])

  const onSendMessage = useCallback((convKey, body, senderRole, receiverId, wantId, buyerId, sellerId, currentUser) => {
    const u = currentUser
    const msg = {
      id: `m_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      wantId, convKey,
      senderId: u?.email || String(u?.sellerId) || 'unknown',
      senderName: u?.sellerProfile?.name || u?.name || 'User',
      senderRole, receiverId, body,
      read: false, createdAt: new Date().toISOString(),
      type: 'message', buyerId, sellerId,
    }
    setMessages((prev) => ({ ...prev, [convKey]: [...(prev[convKey] || []), msg] }))
    return msg
  }, [])

  const onMarkMessagesRead = useCallback((convKey, myId) => {
    setMessages((prev) => {
      const conv = prev[convKey]
      if (!conv) return prev
      return { ...prev, [convKey]: conv.map(m => m.receiverId === myId ? { ...m, read: true } : m) }
    })
  }, [])

  const getUnreadCount = useCallback((myId) => {
    if (!myId) return 0
    return Object.values(messages).flat()
      .filter(m => !m.read && m.receiverId === myId && m.type !== 'system').length
  }, [messages])

  const getSellerRating = useCallback((sellerIdOrEmail) => {
    const sellerRatings = ratings.filter(r => r.sellerId === String(sellerIdOrEmail))
    if (!sellerRatings.length) return null
    const avg = sellerRatings.reduce((s, r) => s + r.stars, 0) / sellerRatings.length
    return { avg: Math.round(avg * 10) / 10, count: sellerRatings.length }
  }, [ratings])

  const allRequests = useMemo(() => {
    if (!user || user.role !== 'buyer') return requests
    return requests.map(r => ({ ...r, _mine: r._mine || false }))
  }, [requests, user])

  const value = {
    user, login, logout,
    requests: allRequests, rawRequests: requests,
    bids, setBids, pendingBid, setPendingBid,
    onPost, onAcceptBid, onSubmitBid, onCloseWant,
    onApplyAsSeller, onDemoApproveSeller, getMySellerApplication, isVerifiedSeller,
    sellerApplications,
    onCreatePaymentIntent, onConfirmPayment, onConfirmDealClosed, paymentIntents,
    messages, onSendMessage, onMarkMessagesRead, getUnreadCount,
    ratings, getSellerRating, verifiedSellerEmails,
    toast, showToast,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
