import Link from 'next/link'
import { Car, Users, TrendingUp } from 'lucide-react'
import { getAllCars, getAllLeads } from '@/lib/db'
import { formatBRL, formatDate } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { leadStatusStyles } from '@/components/admin/lead-status-styles'

export default async function AdminDashboardPage() {
  const [cars, leads] = await Promise.all([getAllCars(), getAllLeads()])
  const availableCars = cars.filter((c) => c.status === 'Disponível').length
  const newLeads = leads.filter((l) => l.status === 'Novo').length
  const inventoryValue = cars
    .filter((c) => c.status !== 'Vendido')
    .reduce((sum, c) => sum + c.price, 0)

  const stats = [
    { label: 'Carros no estoque', value: cars.length, icon: Car, hint: `${availableCars} disponíveis` },
    { label: 'Leads novos', value: newLeads, icon: Users, hint: `${leads.length} no total` },
    {
      label: 'Valor em estoque',
      value: formatBRL(inventoryValue),
      icon: TrendingUp,
      hint: 'carros não vendidos',
    },
  ]

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Visão geral do estoque e dos leads recebidos pelo site.
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

      <div className="mt-8 rounded-2xl border border-white/10 bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
            Leads recentes
          </h2>
          <Link
            href="/admin/leads"
            className="text-xs font-medium uppercase tracking-wide text-brand-yellow hover:underline"
          >
            Ver todos
          </Link>
        </div>

        <div className="mt-4 divide-y divide-white/10">
          {recentLeads.map((lead) => (
            <div
              key={lead.id}
              className="flex flex-wrap items-center justify-between gap-2 py-3"
            >
              <div>
                <p className="font-medium text-white">{lead.name}</p>
                <p className="text-xs text-muted-foreground">
                  {lead.carInterest} · {formatDate(lead.createdAt)}
                </p>
              </div>
              <Badge className={leadStatusStyles[lead.status]}>
                {lead.status}
              </Badge>
            </div>
          ))}
          {recentLeads.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Nenhum lead ainda.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
