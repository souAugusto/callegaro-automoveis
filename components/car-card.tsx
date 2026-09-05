import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Fuel, Gauge, Settings2 } from 'lucide-react'
import type { Car } from '@/lib/data'
import { formatBRL, formatKm, objectPosition } from '@/lib/data'
import { cn } from '@/lib/utils'
import { EASE_CLASS } from '@/lib/motion'

const statusStyles: Record<Car['status'], string> = {
  Disponível: 'bg-brand-yellow text-black',
  Reservado: 'bg-white/15 text-white',
  Vendido: 'bg-brand-red text-white',
}

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      href={`/estoque/${car.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card transition-all duration-500',
        EASE_CLASS,
        'hover:-translate-y-2 hover:border-brand-yellow/60 hover:shadow-2xl hover:shadow-black/40',
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <Image
          src={car.images[0] || '/placeholder.svg'}
          alt={`${car.brand} ${car.model} ${car.version}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={cn(
            'object-cover transition-transform duration-700 group-hover:scale-110',
            EASE_CLASS,
          )}
          style={{ objectPosition: objectPosition(car.imageFocus[car.images[0]]) }}
        />
        <span
          className={cn(
            'absolute left-3 top-3 rounded-full px-3 py-1 font-display text-xs font-bold uppercase tracking-wide',
            statusStyles[car.status],
          )}
        >
          {car.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="font-display text-xs font-medium uppercase tracking-widest text-brand-yellow">
          {car.brand}
        </p>
        <h3 className="font-display text-lg font-bold leading-tight text-white">
          {car.model} {car.version}
        </h3>

        {car.description && (
          <p className="mt-1.5 line-clamp-3 whitespace-pre-line text-sm text-muted-foreground">
            {car.description}
          </p>
        )}

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3.5 text-brand-yellow" />
            {car.year}
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge className="size-3.5 text-brand-yellow" />
            {formatKm(car.km)}
          </span>
          <span className="flex items-center gap-1.5">
            <Settings2 className="size-3.5 text-brand-yellow" />
            {car.transmission}
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel className="size-3.5 text-brand-yellow" />
            {car.fuel}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
          <div>
            <p className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
              Por
            </p>
            <p className="font-display text-2xl font-bold text-brand-yellow">
              {formatBRL(car.price)}
            </p>
          </div>
          <span className="rounded-lg bg-white/10 px-3 py-2 font-display text-xs font-bold uppercase tracking-wide text-white transition-colors group-hover:bg-brand-yellow group-hover:text-black">
            Ver detalhes
          </span>
        </div>
      </div>
    </Link>
  )
}
