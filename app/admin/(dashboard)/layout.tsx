import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { destroySession } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/admin-sidebar'

export const metadata: Metadata = {
  title: {
    default: 'Painel administrativo',
    template: '%s | Painel administrativo',
  },
  robots: { index: false, follow: false },
}

async function logoutAction() {
  'use server'
  await destroySession()
  redirect('/admin/login')
}

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
      <AdminSidebar logoutAction={logoutAction} />
      <main className="flex-1 px-4 py-8 sm:px-6 sm:py-10">{children}</main>
    </div>
  )
}
