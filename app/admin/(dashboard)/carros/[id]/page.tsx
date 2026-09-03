import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getCarById } from '@/lib/data'
import { CarForm } from '@/components/admin/car-form'
import { updateCarAction } from '../actions'

export const metadata: Metadata = { title: 'Editar carro' }

export default async function EditarCarroPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const car = await getCarById(id)
  if (!car) notFound()

  const action = updateCarAction.bind(null, id)

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
        Editar {car.brand} {car.model}
      </h1>

      <div className="mt-6 max-w-2xl rounded-2xl border border-white/10 bg-card p-6">
        <CarForm car={car} action={action} />
      </div>
    </div>
  )
}
