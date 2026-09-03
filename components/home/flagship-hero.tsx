import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, Gauge, Settings2 } from 'lucide-react'
import type { Car } from '@/lib/data'
import { formatBRL, formatKm } from '@/lib/data'
import { whatsappLink } from '@/lib/site-config'
import { getSiteSettings } from '@/lib/db'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { EASE_CLASS } from '@/lib/motion'
import { cn } from '@/lib/utils'

export async function FlagshipHero({ car }: { car?: Car }) {
  const site = await getSiteSettings()

  if (!car) {
    return (
      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
            Seminovos com procedência em {site.address.city}/{site.address.state}
          </h1>
          <p className="mt-4 text-muted-foreground">
            Nosso estoque está sendo atualizado. Fale com a gente pelo
            WhatsApp e conheça as novidades.
          </p>
          <a
            href={whatsappLink(site, 'Olá! Vim pelo site e gostaria de mais informações.')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-4 font-display text-base font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.03]"
          >
            <WhatsAppIcon className="size-5" />
            Falar no WhatsApp
          </a>
        </div>
      </section>
    )
  }

  const fullName = `${car.brand} ${car.model} ${car.version}`
  const specs = [
    { icon: Calendar, label: car.year },
    { icon: Gauge, label: formatKm(car.km) },
    { icon: Settings2, label: car.transmission },
  ]

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-black">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:py-20 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-widest text-brand-yellow">
            Carro em destaque
          </span>

          <h1 className="mt-6 font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl">
            {car.brand} {car.model}
          </h1>
          <p className="mt-2 font-display text-lg font-medium uppercase tracking-wide text-brand-yellow">
            {car.version}
          </p>

          <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted-foreground">
            {specs.map((s, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <s.icon className="size-4 text-brand-yellow" />
                {s.label}
              </span>
            ))}
          </div>

          <p className="mt-6 font-display text-4xl font-bold text-brand-yellow">
            {formatBRL(car.price)}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(
                site,
                `Olá! Tenho interesse no ${fullName} ${car.year} (${formatBRL(
                  car.price,
                )}) anunciado na ${site.name}. Ainda está disponível?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-4 font-display text-base font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.03]"
            >
              <WhatsAppIcon className="size-5" />
              Tenho interesse
            </a>
            <Link
              href="/estoque"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 font-display text-base font-bold uppercase tracking-wide text-white transition-colors hover:border-brand-yellow hover:text-brand-yellow"
            >
              Ver estoque completo
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>

        <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={car.images[0] || '/placeholder.svg'}
            alt={fullName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={cn(
              'object-cover transition-transform duration-700 group-hover:scale-105',
              EASE_CLASS,
            )}
          />
          <div
            className={cn(
              'pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full',
              EASE_CLASS,
            )}
          />
        </div>
      </div>
    </section>
  )
}
