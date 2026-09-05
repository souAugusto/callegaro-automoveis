import type { Metadata } from 'next'
import { getAllCars, getSiteSettings } from '@/lib/db'
import { EstoqueBrowser } from '@/components/estoque/estoque-browser'

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings()
  const description = `Confira o estoque de carros usados e seminovos da ${site.name} em Parobé, RS. Filtre por marca, preço e câmbio.`
  return {
    title: 'Estoque de Carros Usados em Parobé',
    description,
    keywords: [
      'estoque de carros usados',
      'carros seminovos Parobé',
      'carros usados Rio Grande do Sul',
      site.name,
    ],
    alternates: {
      canonical: '/estoque',
    },
    openGraph: {
      title: 'Estoque de Carros Usados em Parobé',
      description,
      url: `${site.url}/estoque`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Estoque de Carros Usados em Parobé',
      description,
    },
  }
}

export default async function EstoquePage() {
  const [cars, site] = await Promise.all([getAllCars(), getSiteSettings()])

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Estoque', item: `${site.url}/estoque` },
    ],
  }

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: cars.map((car, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${site.url}/estoque/${car.slug}`,
      name: `${car.brand} ${car.model} ${car.version} ${car.year}`,
    })),
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <header className="mb-10">
        <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-yellow">
          Nosso estoque
        </span>
        <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-5xl">
          Encontre o carro certo pra você
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Todos os veículos revisados e com procedência garantida. Use os
          filtros para achar o seu na hora.
        </p>
      </header>

      <EstoqueBrowser cars={cars} />
    </div>
  )
}
