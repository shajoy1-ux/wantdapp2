'use client'

import { useApp } from '@/components/providers/AppProvider'

export function ToastContainer() {
  const { toast } = useApp()
  return <Toast msg={toast.msg} visible={toast.on} />
}

export function Toast({ msg, visible }) {
  return (
    <div style={{
      position: 'fixed',
      top: visible ? 20 : -80,
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#1a1a1c',
      color: 'var(--fg)',
      padding: '12px 24px',
      borderRadius: 40,
      fontSize: 14,
      fontWeight: 600,
      zIndex: 9999,
      transition: 'top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      border: '1px solid #272729',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
    }}>
      {msg}
    </div>
  )
}
