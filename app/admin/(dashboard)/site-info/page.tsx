import type { Metadata } from 'next'
import { SiteInfoForm } from '@/components/admin/site-info-form'

export const metadata: Metadata = { title: 'Informações do Site' }

export default function SiteInfoPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
        Informações do Site
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Dados de contato, endereço e horários usados no site.
      </p>

      <div className="mt-6 max-w-2xl rounded-2xl border border-white/10 bg-card p-6">
        <SiteInfoForm />
      </div>
    </div>
  )
}
