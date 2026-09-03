import { Car, TrendingUp, CheckCircle2 } from 'lucide-react'
import { getAllCars } from '@/lib/db'
import { formatBRL } from '@/lib/data'

export default async function AdminDashboardPage() {
  const cars = await getAllCars()
  const availableCars = cars.filter((c) => c.status === 'Disponível').length
  const inventoryValue = cars
    .filter((c) => c.status !== 'Vendido')
    .reduce((sum, c) => sum + c.price, 0)

  const stats = [
    { label: 'Carros no estoque', value: cars.length, icon: Car, hint: `${availableCars} disponíveis` },
    { label: 'Disponíveis', value: availableCars, icon: CheckCircle2, hint: 'prontos para venda' },
    {
      label: 'Valor em estoque',
      value: formatBRL(inventoryValue),
      icon: TrendingUp,
      hint: 'carros não vendidos',
    },
  ]

  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Visão geral do estoque de carros.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/10 bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {s.label}
              </p>
              <s.icon className="size-4 text-brand-yellow" />
            </div>
            <p className="mt-2 font-display text-2xl font-bold text-white">
              {s.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
