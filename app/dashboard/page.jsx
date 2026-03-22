'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/components/providers/AppProvider'

export default function DashboardRedirect() {
  const { user } = useApp()
  const router = useRouter()
  useEffect(() => {
    if (user?.role === 'seller') router.replace('/dashboard/seller')
    else router.replace('/dashboard/buyer')
  }, [user, router])
  return null
}
