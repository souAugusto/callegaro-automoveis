import type { Metadata } from 'next'
import { getAllCars } from '@/lib/db'
import { SITE } from '@/lib/site-config'
import { EstoqueBrowser } from '@/components/estoque/estoque-browser'

export const metadata: Metadata = {
  title: 'Estoque de Carros Usados em Parobé',
  description: `Confira o estoque de carros usados e seminovos da ${SITE.name} em Parobé, RS. Filtre por marca, preço e câmbio.`,
  alternates: {
    canonical: '/estoque',
  },
}

export default async function EstoquePage() {
  const cars = await getAllCars()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
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
