import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Settings2,
  Fuel,
  DoorOpen,
  Palette,
} from 'lucide-react'
import { getAllCars, getCarBySlug, getSiteSettings } from '@/lib/db'
import { formatBRL, formatKm } from '@/lib/data'
import { whatsappLink } from '@/lib/site-config'
import { CarGallery } from '@/components/estoque/car-gallery'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { Badge } from '@/components/ui/badge'

export async function generateStaticParams() {
  const cars = await getAllCars()
  return cars.map((car) => ({ slug: car.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const car = await getCarBySlug(slug)
  if (!car) return { title: 'Veículo não encontrado' }

  const site = await getSiteSettings()
  const title = `${car.brand} ${car.model} ${car.version} ${car.year}`
  const specSummary = [formatKm(car.km), car.transmission, car.fuel]
    .filter(Boolean)
    .join(', ')
  const description = `${car.description} ${formatBRL(car.price)} — ${specSummary}. Confira na ${site.name} em ${site.address.city}/${site.address.state}.`.trim()
  const image = car.images[0]

  return {
    title,
    description,
    keywords: [
      car.brand,
      car.model,
      `${car.brand} ${car.model}`,
      `${car.brand} ${car.model} usado`,
      `${car.brand} ${car.model} seminovo`,
      'carro usado Parobé',
      site.name,
    ],
    alternates: {
      canonical: `/estoque/${car.slug}`,
    },
    openGraph: {
      title: `${title} — ${formatBRL(car.price)}`,
      description,
      url: `${site.url}/estoque/${car.slug}`,
      type: 'website',
      images: image
        ? [{ url: image, width: 1200, height: 900, alt: title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — ${formatBRL(car.price)}`,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [car, site] = await Promise.all([getCarBySlug(slug), getSiteSettings()])
  if (!car) notFound()

  const fullName = `${car.brand} ${car.model} ${car.version}`

  const availabilityMap: Record<typeof car.status, string> = {
    Disponível: 'https://schema.org/InStock',
    Reservado: 'https://schema.org/LimitedAvailability',
    Vendido: 'https://schema.org/SoldOut',
  }

  const carJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${fullName} ${car.year}`,
    brand: { '@type': 'Brand', name: car.brand },
    model: car.model,
    vehicleModelDate: String(car.year),
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: car.km,
      unitCode: 'KMT',
    },
    ...(car.transmission ? { vehicleTransmission: car.transmission } : {}),
    fuelType: car.fuel,
    ...(car.doors ? { numberOfDoors: car.doors } : {}),
    color: car.color,
    image: car.images,
    description: car.description,
    url: `${site.url}/estoque/${car.slug}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: car.price,
      availability: availabilityMap[car.status],
      url: `${site.url}/estoque/${car.slug}`,
      seller: {
        '@type': 'AutoDealer',
        name: site.name,
      },
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Estoque', item: `${site.url}/estoque` },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${fullName} ${car.year}`,
        item: `${site.url}/estoque/${car.slug}`,
      },
    ],
  }

  const specs = [
    { icon: Calendar, label: 'Ano', value: String(car.year) },
    { icon: Gauge, label: 'Quilometragem', value: formatKm(car.km) },
    car.transmission ? { icon: Settings2, label: 'Câmbio', value: car.transmission } : null,
    { icon: Fuel, label: 'Combustível', value: car.fuel },
    car.doors ? { icon: DoorOpen, label: 'Portas', value: `${car.doors} portas` } : null,
    { icon: Palette, label: 'Cor', value: car.color },
  ].filter(
    (spec): spec is { icon: typeof Calendar; label: string; value: string } => spec !== null,
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Link
        href="/estoque"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-brand-yellow"
      >
        <ArrowLeft className="size-4" />
        Voltar ao estoque
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <CarGallery images={car.images} imageFocus={car.imageFocus} alt={fullName} />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              className={
                car.status === 'Disponível'
                  ? 'bg-brand-yellow text-black'
                  : car.status === 'Reservado'
                    ? 'bg-brand-red text-white'
                    : 'bg-secondary text-white'
              }
            >
              {car.status}
            </Badge>
            <span className="text-sm text-muted-foreground">{car.brand}</span>
          </div>

          <h1 className="mt-2 font-display text-3xl font-bold uppercase leading-none tracking-tight text-white sm:text-4xl">
            {car.model} {car.version}
          </h1>

          <div className="mt-4 rounded-2xl border border-white/10 bg-card p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Por apenas
            </p>
            <p className="font-display text-4xl font-bold text-brand-yellow">
              {formatBRL(car.price)}
            </p>

            <a
              href={whatsappLink(
                site,
                `Olá! Tenho interesse no ${fullName} ${car.year} (${formatBRL(
                  car.price,
                )}) anunciado na ${site.name}. Ainda está disponível?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 font-display text-base font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.02]"
            >
              <WhatsAppIcon className="size-5" />
              Tenho interesse
            </a>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Resposta rápida no WhatsApp {site.phone}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {specs.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-card p-3"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                  <s.icon className="size-4 text-brand-yellow" />
                  {s.label}
                </div>
                <p className="mt-1 font-display font-bold text-white">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
          Sobre este veículo
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {car.description}
        </p>
      </section>
    </div>
  )
}
