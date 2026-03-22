export const CATEGORIES = [
  'Mobile Phones', 'Laptops & Computers', 'Gaming', 'TVs & Audio',
  'Cameras', 'Tablets', 'Wearables', 'Accessories', 'Home Appliances', 'Other',
]

export const CAT_ICONS = {
  'Mobile Phones': '📱', 'Laptops & Computers': '💻', 'Gaming': '🎮',
  'TVs & Audio': '📺', 'Cameras': '📷', 'Tablets': '📟',
  'Wearables': '⌚', 'Accessories': '🎧', 'Home Appliances': '🏠', 'Other': '🔌',
}

export const AREAS = [
  'Koramangala', 'HSR Layout', 'Indiranagar', 'Whitefield',
  'Electronic City', 'Marathahalli', 'JP Nagar', 'Jayanagar', 'MG Road', 'BTM Layout',
]

export const CONDITIONS = ['Any', 'Brand New', 'Like New', 'Good', 'Fair']

export const SELLERS = [
  { id: 1, name: 'TechHub Bangalore', rating: 4.9, img: '👨‍💻', sales: 1243, verified: true, area: 'Koramangala', phone: '+919900001111', responseTime: '< 1 hour', joinedYear: 2021 },
  { id: 2, name: 'SP Road Electronics', rating: 4.8, img: '🔧', sales: 2876, verified: true, area: 'Shivajinagar', phone: '+919900002222', responseTime: '< 2 hours', joinedYear: 2020 },
  { id: 3, name: 'GadgetZone BLR', rating: 4.7, img: '📱', sales: 1605, verified: true, area: 'Indiranagar', phone: '+919900003333', responseTime: '< 1 hour', joinedYear: 2021 },
  { id: 4, name: 'LaptopWala', rating: 4.8, img: '💻', sales: 954, verified: true, area: 'HSR Layout', phone: '+919900004444', responseTime: '< 3 hours', joinedYear: 2022 },
  { id: 5, name: 'PhoneDeals BLR', rating: 4.9, img: '📲', sales: 3201, verified: true, area: 'Electronic City', phone: '+919900005555', responseTime: '< 45 min', joinedYear: 2020 },
  { id: 6, name: 'GameStation BLR', rating: 4.6, img: '🎮', sales: 721, verified: true, area: 'Whitefield', phone: '+919900006666', responseTime: '< 4 hours', joinedYear: 2022 },
  { id: 7, name: 'CameraHouse', rating: 4.5, img: '📷', sales: 412, verified: false, area: 'MG Road', phone: '+919900007777', responseTime: '< 6 hours', joinedYear: 2023 },
  { id: 8, name: 'AudioPro Bangalore', rating: 4.7, img: '🎧', sales: 567, verified: true, area: 'JP Nagar', phone: '+919900008888', responseTime: '< 2 hours', joinedYear: 2022 },
]

export const INITIAL_REQUESTS = [
  { id: 1, title: 'iPhone 15 Pro 256GB', cat: 'Mobile Phones', budget: 90000, area: 'Koramangala', cond: 'Like New', bids: 7, trending: true, urgent: true, desc: 'Natural Titanium preferred. No scratches. With original box and charger. OEM accessories required.', time: '2 hours ago', status: 'open', phone: '+919880001111' },
  { id: 2, title: 'MacBook Air M3 16GB 512GB', cat: 'Laptops & Computers', budget: 95000, area: 'HSR Layout', cond: 'Any', bids: 5, trending: true, viral: true, desc: 'Space Gray or Midnight. AppleCare+ preferred. For software development. 2024 model.', time: '4 hours ago', status: 'open', phone: '+919880002222' },
  { id: 3, title: 'Samsung Galaxy S24 Ultra 256GB', cat: 'Mobile Phones', budget: 65000, area: 'Indiranagar', cond: 'Good', bids: 9, trending: true, desc: 'Any color. Good battery health. S Pen must work perfectly.', time: '5 hours ago', status: 'open', phone: '+919880003333' },
  { id: 4, title: 'Sony PS5 Slim with 2 Controllers', cat: 'Gaming', budget: 35000, area: 'Whitefield', cond: 'Like New', bids: 4, desc: 'Digital or disc edition fine. Extra controller preferred. Original cables included.', time: '6 hours ago', status: 'open', phone: '+919880004444' },
  { id: 5, title: 'Dell XPS 15 i7 32GB', cat: 'Laptops & Computers', budget: 85000, area: 'Electronic City', cond: 'Good', bids: 3, desc: 'For video editing. Need good display. 2023 or 2024 model preferred.', time: '8 hours ago', status: 'open', phone: '+919880005555' },
  { id: 6, title: 'LG C3 55" OLED 4K TV', cat: 'TVs & Audio', budget: 75000, area: 'JP Nagar', cond: 'Brand New', bids: 2, desc: 'Sealed box preferred. For home theater setup. Wall mount included if possible.', time: '10 hours ago', status: 'open', phone: '+919880006666' },
  { id: 7, title: 'iPad Air M2 256GB WiFi', cat: 'Tablets', budget: 45000, area: 'Jayanagar', cond: 'Like New', bids: 6, trending: true, urgent: true, desc: 'Space Gray. Apple Pencil included if possible. For digital art and note-taking.', time: '12 hours ago', status: 'open', phone: '+919880007777' },
  { id: 8, title: 'Sony WH-1000XM5 Headphones', cat: 'Accessories', budget: 18000, area: 'MG Road', cond: 'Any', bids: 11, trending: true, viral: true, desc: 'Black or Silver. ANC must work perfectly. With carry case.', time: '14 hours ago', status: 'open', phone: '+919880008888' },
  { id: 9, title: 'Canon EOS R6 Mark II Body', cat: 'Cameras', budget: 150000, area: 'Koramangala', cond: 'Like New', bids: 2, desc: 'Low shutter count preferred. For professional wedding photography.', time: '1 day ago', status: 'open', phone: '+919880009999' },
  { id: 10, title: 'Nothing Phone (2) 256GB', cat: 'Mobile Phones', budget: 28000, area: 'BTM Layout', cond: 'Good', bids: 8, trending: true, desc: 'White preferred. Glyph lights must be fully functional. Clean IMEI.', time: '1 day ago', status: 'open', phone: '+919880010101' },
  { id: 11, title: 'Apple Watch Ultra 2', cat: 'Wearables', budget: 55000, area: 'HSR Layout', cond: 'Like New', bids: 3, desc: 'With orange Alpine Loop. GPS + Cellular. Battery health > 90%.', time: '1 day ago', status: 'open', phone: '+919880011111' },
  { id: 12, title: 'AirPods Pro 2 USB-C', cat: 'Accessories', budget: 15000, area: 'JP Nagar', cond: 'Brand New', bids: 12, trending: true, viral: true, desc: 'Sealed box only. MRP is 24900 — looking for best deal below 15K.', time: '3 days ago', status: 'open', phone: '+919880012121' },
]

export const INITIAL_BIDS = {
  1: [
    { id: 'b1', seller: SELLERS[4], price: 87000, del: '45 min', warranty: '6 months seller warranty', cond: 'Like New', msg: 'Have a Like New unit with original box and charger. Battery health 98%. Full warranty papers. Available for inspection in Koramangala.', status: 'pending' },
    { id: 'b2', seller: SELLERS[0], price: 88500, del: '1 hr', warranty: '3 months seller warranty', cond: 'Like New', msg: 'Sourced directly from authorised reseller. Titanium finish, no scratches. Can deliver to your doorstep same day.', status: 'pending' },
    { id: 'b3', seller: SELLERS[2], price: 89000, del: '2 hrs', warranty: 'Apple warranty remaining', cond: 'Like New', msg: 'Natural Titanium, 256GB, original accessories. Bill available. Slight use — no visible marks.', status: 'pending' },
  ],
  2: [
    { id: 'b4', seller: SELLERS[3], price: 90000, del: '1 day', warranty: '1 year Apple warranty', cond: 'Brand New', msg: 'MacBook Air M3 Space Gray, 16GB/512GB. Retail seal intact. Full warranty. Perfect for development work.', status: 'pending' },
    { id: 'b5', seller: SELLERS[1], price: 93000, del: '2 days', warranty: 'AppleCare+ till 2026', cond: 'Like New', msg: 'Midnight color, AppleCare+ included till 2026. Box and all accessories. Minor use, like new condition.', status: 'pending' },
  ],
  8: [
    { id: 'b6', seller: SELLERS[7], price: 16500, del: 'Same day', warranty: 'Sony warranty valid', cond: 'Brand New', msg: 'Black color, sealed box. Sony warranty valid. Full ANC working. Best price on the market.', status: 'pending' },
    { id: 'b7', seller: SELLERS[2], price: 17200, del: '1 day', warranty: '6 months seller warranty', cond: 'Like New', msg: 'Silver edition with carry case. Lightly used, all functions perfect. Can negotiate slightly.', status: 'pending' },
  ],
  12: [
    { id: 'b8', seller: SELLERS[0], price: 13500, del: '2 hrs', warranty: '1 year Apple warranty', cond: 'Brand New', msg: "Brand new sealed AirPods Pro 2 USB-C. Apple authorised. Best price you'll find in Bangalore.", status: 'pending' },
    { id: 'b9', seller: SELLERS[4], price: 14000, del: 'Same day', warranty: '6 months seller warranty', cond: 'Brand New', msg: 'Sealed box, receipt available. Will deliver personally to Indiranagar or JP Nagar area.', status: 'pending' },
    { id: 'b10', seller: SELLERS[7], price: 14500, del: '1 day', warranty: '3 months seller warranty', cond: 'Brand New', msg: 'Grey import but original Apple. Full functioning. Can demo before purchase.', status: 'pending' },
  ],
}

export const TESTIMONIALS = [
  { initials: 'RK', name: 'Rohan K.', city: 'Koramangala', role: 'Buyer', rating: 5, quote: 'Posted my iPhone requirement at 10am. By noon I had 6 bids. Closed at ₹4,000 below my budget. This is genuinely brilliant.' },
  { initials: 'PS', name: 'Preethi S.', city: 'HSR Layout', role: 'Buyer', rating: 5, quote: 'No more wading through OLX spam. I told sellers what I wanted, they competed. Got a Like New MacBook for ₹12,000 less than market.' },
  { initials: 'AK', name: 'Arjun K.', city: 'Indiranagar', role: 'Verified Seller', rating: 5, quote: 'As a seller, I love it — I only bid on buyers I can actually serve. Zero wasted time. My close rate is 40% higher than OLX.' },
  { initials: 'SM', name: 'Sneha M.', city: 'JP Nagar', role: 'Buyer', rating: 5, quote: 'First bid came in 38 minutes. Three sellers competed and I picked the one with the best warranty. Total time: 2 hours. Unbeatable.' },
]

export const STATS = [
  { end: 12400, prefix: '', suffix: '+', label: 'Wants posted', sub: 'and counting', color: 'var(--accent)' },
  { end: 4800, prefix: '', suffix: '+', label: 'Verified sellers', sub: 'across Bangalore', color: 'var(--green)' },
  { raw: '₹2Cr+', label: 'Deals closed', sub: 'total value transacted', color: 'var(--blue)' },
  { end: 88, prefix: '', suffix: '%', label: 'Buyers save money', sub: 'vs their original budget', color: 'var(--yellow)' },
]

export const SITE_URL = 'https://www.wantd.in'
export const COMPANY_EMAIL = 'hello@wantd.in'
export const SUPPORT_EMAIL = 'hello@wantd.in'
export const PRIVACY_EMAIL = 'privacy@wantd.in'
export const GRIEVANCE_EMAIL = 'grievance@wantd.in'
export const COMPANY_PHONE = '+91 80 0000 0000'
export const COMPANY_ADDRESS = 'Koramangala 5th Block, Bangalore — 560034, Karnataka, India'
export const GST_NUMBER = 'GSTIN: [PENDING REGISTRATION]'
