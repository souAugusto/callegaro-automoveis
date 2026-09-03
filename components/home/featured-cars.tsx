import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CarCard } from '@/components/car-card'
import { SectionHeading } from '@/components/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'
import { getFeaturedCars } from '@/lib/data'

export function FeaturedCars({ excludeId }: { excludeId?: string } = {}) {
  const cars = getFeaturedCars(excludeId)
  if (cars.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Ofertas da semana"
          title="Carros em destaque"
          description="Seminovos revisados e prontos para rodar. Escolha o seu e agende uma visita."
        />
        <Link
          href="/estoque"
          className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-brand-yellow hover:underline"
        >
          Ver estoque completo
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car, i) => (
          <ScrollReveal key={car.id} delay={i * 0.08}>
            <CarCard car={car} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
