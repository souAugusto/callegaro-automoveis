import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { getSiteSettings } from '@/lib/db'

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const site = await getSiteSettings()

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader site={site} />
      <main className="flex-1">{children}</main>
      <SiteFooter site={site} />
      <WhatsAppFloat site={site} />
    </div>
  )
}
