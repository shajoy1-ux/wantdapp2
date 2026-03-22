'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/components/providers/AppProvider'
import { fmtINR } from '@/lib/helpers'
import { CAT_ICONS } from '@/lib/data'

export function MessagesClient() {
  const {
    user, messages, onSendMessage, onMarkMessagesRead,
    requests, bids,
  } = useApp()

  const searchParams = useSearchParams()
  const initConvKey = searchParams.get('conv')

  const [activeConv, setActiveConv] = useState(initConvKey || null)
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const [mobileView, setMobileView] = useState('list') // 'list' | 'thread'
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Derive my ID — buyers use email, sellers use email too
  const myId = user?.email

  // Build conversation list: only convs this user is party to
  const myConvs = Object.entries(messages).filter(([convKey, msgs]) => {
    if (!msgs?.length) return false
    const first = msgs[0]
    if (!first) return false
    if (user?.role === 'buyer') return first.buyerId === myId
    if (user?.role === 'seller') return first.sellerId === myId || msgs.some(m => m.sellerId === myId)
    return first.buyerId === myId || first.sellerId === myId
  })

  // Get want + seller info for each conv
  const enrichedConvs = myConvs.map(([convKey, msgs]) => {
    const [wantIdStr] = convKey.split('_')
    const wantId = parseInt(wantIdStr)
    const want = requests.find(r => r.id === wantId)
    const last = msgs[msgs.length - 1]
    const unread = msgs.filter(m => !m.read && m.receiverId === myId && m.type !== 'system').length

    // Find seller name from bids
    const wantBids = bids[wantId] || []
    const firstMsg = msgs[0]
    const sellerEmail = firstMsg?.sellerId
    const matchedBid = wantBids.find(b => b.sellerEmail === sellerEmail || String(b.seller?.id) === sellerEmail)
    const sellerName = matchedBid?.seller?.name || 'Seller'
    const sellerImg = matchedBid?.seller?.img || '🏪'

    return { convKey, msgs, want, last, unread, sellerName, sellerImg, wantId }
  }).sort((a, b) => {
    const aTime = a.last?.createdAt || ''
    const bTime = b.last?.createdAt || ''
    return bTime.localeCompare(aTime)
  })

  const activeConvData = enrichedConvs.find(c => c.convKey === activeConv)
  const activeMessages = activeConv ? (messages[activeConv] || []) : []

  // Mark messages read when conversation is opened
  useEffect(() => {
    if (activeConv && myId) {
      onMarkMessagesRead(activeConv, myId)
    }
  }, [activeConv, myId, onMarkMessagesRead])

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeMessages.length])

  const openConv = (convKey) => {
    setActiveConv(convKey)
    setMobileView('thread')
    setDraft('')
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const send = useCallback(() => {
    if (!draft.trim() || !activeConv || !user) return
    setSending(true)

    const [wantIdStr, sellerIdPart] = activeConv.split(/_(.+)/)
    const wantId = parseInt(wantIdStr)
    const want = requests.find(r => r.id === wantId)

    const isBuyer = user.role === 'buyer'
    const senderRole = isBuyer ? 'buyer' : 'seller'

    // Receiver: if I'm buyer → send to seller; if seller → send to buyer
    const buyerId = want?._buyerId || activeConvData?.msgs?.[0]?.buyerId
    const sellerId = sellerIdPart || activeConvData?.msgs?.[0]?.sellerId
    const receiverId = isBuyer ? sellerId : buyerId

    onSendMessage(
      activeConv,
      draft.trim(),
      senderRole,
      receiverId,
      wantId,
      buyerId,
      sellerId,
      user
    )

    setDraft('')
    setSending(false)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [draft, activeConv, user, requests, activeConvData, onSendMessage])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  // WhatsApp fallback link
  const getWALink = () => {
    if (!activeConvData) return '#'
    const want = activeConvData.want
    const wantBids = bids[activeConvData.wantId] || []
    const sellerBid = wantBids.find(b =>
      b.sellerEmail === activeConvData?.msgs?.[0]?.sellerId ||
      String(b.seller?.id) === activeConvData?.msgs?.[0]?.sellerId
    )
    const phone = sellerBid?.seller?.phone || want?.phone || ''
    const msg = user?.role === 'buyer'
      ? `Hi! Regarding your offer on wantd.in for ${want?.title}.`
      : `Hi! Regarding your want for ${want?.title} on wantd.in.`
    return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`
  }

  if (!user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h2 style={{ fontWeight: 800, fontSize: 22, color: 'var(--fg)', marginBottom: 12 }}>Sign in to view messages</h2>
          <Link href="/auth" style={{ ...btnPrimary, textDecoration: 'none' }}>Sign In →</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>

      {/* Page header */}
      <div style={{ borderBottom: '1px solid #272729', padding: '16px 24px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 14 }}>
          {mobileView === 'thread' && activeConv && (
            <button
              onClick={() => setMobileView('list')}
              className="mobile-back-btn"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 20, padding: '4px 8px 4px 0', fontFamily: 'inherit', display: 'none' }}
            >
              ←
            </button>
          )}
          <h1 style={{ fontWeight: 900, fontSize: 22, color: 'var(--fg)', margin: 0 }}>Messages</h1>
          {enrichedConvs.reduce((n, c) => n + c.unread, 0) > 0 && (
            <span style={{ background: 'var(--accent)', color: '#fff', borderRadius: 100, padding: '2px 10px', fontSize: 12, fontWeight: 700 }}>
              {enrichedConvs.reduce((n, c) => n + c.unread, 0)} new
            </span>
          )}
        </div>
      </div>

      {/* Main two-pane */}
      <div style={{ flex: 1, display: 'flex', maxWidth: 1100, margin: '0 auto', width: '100%', overflow: 'hidden' }}>

        {/* ── LEFT: Conversation list ── */}
        <div className="conv-list-pane" style={{
          width: 320, flexShrink: 0,
          borderRight: '1px solid #272729',
          overflowY: 'auto',
          display: 'flex', flexDirection: 'column',
        }}>
          {enrichedConvs.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>💬</div>
              <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--fg)', marginBottom: 8 }}>No conversations yet</p>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
                {user.role === 'buyer'
                  ? 'Conversations will appear here when sellers contact you about your wants.'
                  : 'Submit offers on buyer requests to start conversations.'}
              </p>
              <Link href={user.role === 'buyer' ? '/post' : '/browse'} style={{ ...btnPrimary, textDecoration: 'none', marginTop: 20, fontSize: 13 }}>
                {user.role === 'buyer' ? '+ Post a Want' : 'Browse Requests →'}
              </Link>
            </div>
          ) : (
            enrichedConvs.map(conv => (
              <ConvRow
                key={conv.convKey}
                conv={conv}
                isActive={conv.convKey === activeConv}
                onClick={() => openConv(conv.convKey)}
              />
            ))
          )}
        </div>

        {/* ── RIGHT: Message thread ── */}
        <div className="thread-pane" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {!activeConv || !activeConvData ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>💬</div>
              <p style={{ fontWeight: 700, fontSize: 18, color: 'var(--fg)', marginBottom: 8 }}>Select a conversation</p>
              <p style={{ fontSize: 14, color: 'var(--muted)' }}>Choose from the list to read and reply to messages.</p>
            </div>
          ) : (
            <>
              {/* Thread header */}
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #272729', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{activeConvData.sellerImg}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg)', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        {user.role === 'buyer' ? activeConvData.sellerName : (activeConvData.want?.area || 'Buyer')}
                        {activeConvData.want && (
                          <span style={{ fontWeight: 400, fontSize: 12, color: 'var(--muted)' }}>
                            re:{' '}
                            <Link href={`/want/${activeConvData.wantId}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                              {activeConvData.want.title}
                            </Link>
                          </span>
                        )}
                      </div>
                      {activeConvData.want && (
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                          Budget: <span style={{ color: '#22c55e', fontWeight: 700 }}>₹{fmtINR(activeConvData.want.budget)}</span>
                          {' · '}📍 {activeConvData.want.area}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* WhatsApp fallback */}
                <a
                  href={getWALink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#25d366', color: '#fff', borderRadius: 9, padding: '7px 14px', fontSize: 12, fontWeight: 700, textDecoration: 'none', flexShrink: 0 }}
                >
                  📲 WhatsApp
                </a>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 8px' }}>
                {activeMessages.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)' }}>
                    <p style={{ fontSize: 14 }}>No messages yet. Say hello!</p>
                  </div>
                ) : (
                  activeMessages.map((msg, i) => (
                    <MessageBubble
                      key={msg.id}
                      msg={msg}
                      isMe={msg.senderId === myId}
                      showAvatar={i === 0 || activeMessages[i - 1]?.senderId !== msg.senderId}
                    />
                  ))
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input bar */}
              <div style={{ padding: '12px 16px', borderTop: '1px solid #272729', background: 'var(--surface)' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
                  <textarea
                    ref={inputRef}
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message… (Enter to send)"
                    rows={1}
                    maxLength={800}
                    style={{
                      flex: 1, background: '#1a1a1c', border: '1px solid #272729', borderRadius: 12,
                      padding: '11px 16px', color: 'var(--fg)', fontSize: 14, fontFamily: 'inherit',
                      resize: 'none', minHeight: 44, maxHeight: 120, overflowY: 'auto',
                      lineHeight: 1.5,
                    }}
                  />
                  <button
                    onClick={send}
                    disabled={!draft.trim() || sending}
                    className="btn-hover"
                    style={{
                      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      background: draft.trim() ? 'var(--accent)' : '#1a1a1c',
                      border: `1px solid ${draft.trim() ? 'var(--accent)' : '#272729'}`,
                      color: draft.trim() ? '#fff' : 'var(--muted)',
                      cursor: draft.trim() ? 'pointer' : 'default',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, transition: 'all .15s',
                    }}
                  >
                    ➤
                  </button>
                </div>
                <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, paddingLeft: 4 }}>
                  Enter to send · Shift+Enter for new line · Or use{' '}
                  <a href={getWALink()} target="_blank" rel="noopener noreferrer" style={{ color: '#25d366', textDecoration: 'none' }}>
                    WhatsApp
                  </a>{' '}
                  for faster replies
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .conv-list-pane {
            width: 100% !important;
            border-right: none !important;
            display: ${mobileView === 'list' ? 'flex' : 'none'} !important;
          }
          .thread-pane {
            display: ${mobileView === 'thread' ? 'flex' : 'none'} !important;
            width: 100% !important;
          }
          .mobile-back-btn { display: flex !important; }
        }
      `}</style>
    </div>
  )
}

// ── Conversation row in the left pane ──────────────────────────────────────────
function ConvRow({ conv, isActive, onClick }) {
  const { want, last, unread, sellerName, sellerImg } = conv

  const preview = last?.type === 'system'
    ? `🤖 ${last.body.slice(0, 60)}…`
    : last?.body?.slice(0, 60) + (last?.body?.length > 60 ? '…' : '')

  const timeStr = last?.createdAt
    ? new Date(last.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    : ''

  return (
    <div
      onClick={onClick}
      style={{
        padding: '14px 18px',
        borderBottom: '1px solid #1c1c1e',
        cursor: 'pointer',
        background: isActive ? 'rgba(255,85,0,0.06)' : 'transparent',
        borderLeft: `3px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
        transition: 'all .15s',
        display: 'flex', gap: 12, alignItems: 'flex-start',
      }}
    >
      {/* Avatar */}
      <div style={{
        width: 42, height: 42, borderRadius: '50%',
        background: 'var(--surface)', border: '1px solid #272729',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, flexShrink: 0,
      }}>
        {sellerImg}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 160 }}>
            {sellerName}
          </span>
          <span style={{ fontSize: 11, color: 'var(--muted)', flexShrink: 0, marginLeft: 6 }}>{timeStr}</span>
        </div>
        {want && (
          <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {CAT_ICONS[want.cat]} {want.title}
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
            {preview || 'No messages yet'}
          </span>
          {unread > 0 && (
            <span style={{ background: 'var(--accent)', color: '#fff', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0, marginLeft: 8 }}>
              {unread}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Individual message bubble ──────────────────────────────────────────────────
function MessageBubble({ msg, isMe, showAvatar }) {
  const isSystem = msg.type === 'system'
  const time = new Date(msg.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  if (isSystem) {
    return (
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', border: '1px solid #272729', borderRadius: 100, padding: '4px 14px', fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>
          {msg.body}
        </span>
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMe ? 'row-reverse' : 'row',
      alignItems: 'flex-end',
      gap: 8,
      marginBottom: 8,
    }}>
      {/* Avatar (other side only) */}
      {!isMe && (
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'var(--surface)', border: '1px solid #272729',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, flexShrink: 0,
          opacity: showAvatar ? 1 : 0,
        }}>
          {msg.senderRole === 'seller' ? '🏪' : '🛒'}
        </div>
      )}

      <div style={{ maxWidth: '72%', display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
        {showAvatar && !isMe && (
          <span style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3, paddingLeft: 4 }}>{msg.senderName}</span>
        )}
        <div style={{
          background: isMe ? 'var(--accent)' : 'var(--surface)',
          color: isMe ? '#fff' : 'var(--fg)',
          borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          padding: '10px 14px',
          fontSize: 14, lineHeight: 1.55,
          border: isMe ? 'none' : '1px solid #272729',
          wordBreak: 'break-word',
        }}>
          {msg.body}
        </div>
        <span style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3, paddingLeft: 4, paddingRight: 4 }}>
          {time}
          {isMe && msg.read && <span style={{ color: '#22c55e', marginLeft: 4 }}>✓✓</span>}
          {isMe && !msg.read && <span style={{ marginLeft: 4, opacity: 0.6 }}>✓</span>}
        </span>
      </div>
    </div>
  )
}

const btnPrimary = {
  background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12,
  padding: '11px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'inherit',
}
