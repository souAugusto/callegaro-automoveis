import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CarForm } from '@/components/admin/car-form'
import { createCarAction } from '../actions'

export const metadata: Metadata = { title: 'Novo carro' }

export default function NovoCarroPage() {
  return (
    <div>
      <Link
        href="/admin/carros"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-brand-yellow"
      >
        <ArrowLeft className="size-4" />
        Voltar para carros
      </Link>

      <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
        Novo carro
      </h1>

      <div className="mt-6 max-w-2xl rounded-2xl border border-white/10 bg-card p-6">
        <CarForm action={createCarAction} />
      </div>
    </div>
  )
}
