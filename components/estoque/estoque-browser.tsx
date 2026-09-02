'use client'

import { useMemo, useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import type { Car } from '@/lib/data'
import { CarCard } from '@/components/car-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

type PriceRange = 'all' | '0-35' | '35-50' | '50-plus'

const priceRanges: { value: PriceRange; label: string }[] = [
  { value: 'all', label: 'Todos os preços' },
  { value: '0-35', label: 'Até R$ 35.000' },
  { value: '35-50', label: 'R$ 35.000 a R$ 50.000' },
  { value: '50-plus', label: 'Acima de R$ 50.000' },
]

export function EstoqueBrowser({ cars }: { cars: Car[] }) {
  const [query, setQuery] = useState('')
  const [brand, setBrand] = useState('all')
  const [transmission, setTransmission] = useState('all')
  const [price, setPrice] = useState<PriceRange>('all')

  const brands = useMemo(
    () => Array.from(new Set(cars.map((c) => c.brand))).sort(),
    [cars],
  )

  const filtered = useMemo(() => {
    return cars.filter((car) => {
      const text = `${car.brand} ${car.model} ${car.year}`.toLowerCase()
      if (query && !text.includes(query.toLowerCase())) return false
      if (brand !== 'all' && car.brand !== brand) return false
      if (transmission !== 'all' && car.transmission !== transmission)
        return false
      if (price === '0-35' && car.price >= 35000) return false
      if (price === '35-50' && (car.price < 35000 || car.price >= 50000))
        return false
      if (price === '50-plus' && car.price < 50000) return false
      return true
    })
  }, [cars, query, brand, transmission, price])

  const hasFilters =
    query !== '' || brand !== 'all' || transmission !== 'all' || price !== 'all'

  function clearFilters() {
    setQuery('')
    setBrand('all')
    setTransmission('all')
    setPrice('all')
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <div className="flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wide text-white">
            <Filter className="size-4 text-brand-yellow" />
            Filtros
          </div>

          <div className="mt-5 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="busca">Busca</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="busca"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Marca, modelo ou ano"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Marca</Label>
              <Select value={brand} onValueChange={setBrand}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as marcas</SelectItem>
                  {brands.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Faixa de preço</Label>
              <Select
                value={price}
                onValueChange={(v) => setPrice(v as PriceRange)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Câmbio</Label>
              <Select value={transmission} onValueChange={setTransmission}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="Automático">Automático</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hasFilters && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="w-full gap-2"
              >
                <X className="size-4" />
                Limpar filtros
              </Button>
            )}
          </div>
        </div>
      </aside>

      <div>
        <p className="mb-4 text-sm text-muted-foreground">
          {filtered.length}{' '}
          {filtered.length === 1
            ? 'veículo encontrado'
            : 'veículos encontrados'}
        </p>

        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center">
            <p className="font-display text-xl font-bold uppercase text-white">
              Nenhum veículo encontrado
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Tente ajustar os filtros ou fale com a gente pelo WhatsApp.
            </p>
            <Button onClick={clearFilters} className="mt-5">
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
