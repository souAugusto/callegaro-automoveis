import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const testimonials = [
  {
    name: 'Marcos Vieira',
    car: 'Chevrolet Onix 2018',
    photo: '/depoimentos/cliente-1.png',
    text: 'Atendimento nota mil! Fui super bem tratado, o carro estava impecável e o financiamento saiu rapidinho. Recomendo demais.',
  },
  {
    name: 'Juliana Souza',
    car: 'Hyundai HB20 2019',
    photo: '/depoimentos/cliente-2.png',
    text: 'Comprei meu primeiro carro na AutoCenter e foi tudo transparente. Me explicaram cada detalhe da documentação. Saí de carro novo no mesmo dia!',
  },
  {
    name: 'Anderson Rocha',
    car: 'Renault Sandero 2017',
    photo: '/depoimentos/cliente-3.png',
    text: 'Dei meu usado na troca e a avaliação foi justa. Negociação honesta do começo ao fim. Voltarei com certeza.',
  },
]

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        align="center"
        eyebrow="Quem comprou, aprovou"
        title="Depoimentos de clientes"
        description="A confiança de quem já realizou o sonho do carro próprio com a gente."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-2xl border border-white/10 bg-card p-6"
          >
            <Quote className="size-8 text-brand-yellow/40" />
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-white/90">
              {t.text}
            </blockquote>
            <div className="mt-4 flex gap-0.5" aria-label="5 de 5 estrelas">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-4 fill-brand-yellow text-brand-yellow"
                />
              ))}
            </div>
            <figcaption className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
              <Image
                src={t.photo}
                alt={t.name}
                width={44}
                height={44}
                className="size-11 rounded-full object-cover"
              />
              <span>
                <span className="block font-display font-bold text-white">
                  {t.name}
                </span>
                <span className="text-xs text-muted-foreground">{t.car}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
