export const fmtINR = (n) => Number(n).toLocaleString('en-IN')

export const buildWA = (phone, msg = "Hi! I saw your offer on wantd.in and I'm interested.") => {
  const d = phone.replace(/\D/g, '')
  return `https://wa.me/${d.startsWith('91') ? d : '91' + d.slice(-10)}?text=${encodeURIComponent(msg)}`
}

export const buildShareWA = (req) => {
  const msg = `🛍️ Someone in ${req.area} is looking for: *${req.title}*\n💰 Budget: ₹${fmtINR(req.budget)}\n📦 Condition: ${req.cond || 'Any'}\n\nIf you can supply this, submit your offer on wantd.in!\n\n👉 https://www.wantd.in/browse`
  return `https://wa.me/?text=${encodeURIComponent(msg)}`
}

export const buildShareTwitter = (req) => {
  const msg = `Someone in ${req.area} wants a ${req.title} for ₹${fmtINR(req.budget)}. Are you a seller? Submit your best offer on wantd.in 👇`
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(msg)}&url=${encodeURIComponent('https://www.wantd.in/feed')}`
}

export const truncate = (str, n) => str?.length > n ? str.slice(0, n) + '…' : str

export const timeAgo = (dateString) => {
  if (!dateString) return ''
  // For demo data that already has human-readable strings
  if (typeof dateString === 'string' && dateString.includes('ago')) return dateString
  const d = new Date(dateString)
  const now = new Date()
  const diff = Math.floor((now - d) / 1000)
  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
  return `${Math.floor(diff / 86400)} days ago`
}

export const getAnonymisedLocation = (area) => {
  // Remove specific sub-areas for privacy on public feed
  const parts = area.split(',')
  return parts[parts.length - 1].trim() || area
}
