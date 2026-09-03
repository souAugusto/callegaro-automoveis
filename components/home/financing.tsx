import Image from 'next/image'
import { CheckCircle2, Zap, Wallet, Repeat } from 'lucide-react'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { ScrollReveal } from '@/components/scroll-reveal'
import { site, whatsappLink } from '@/lib/site'

const bullets = [
  {
    icon: Zap,
    title: 'Aprovação rápida',
    desc: 'Análise de crédito ágil e resposta no mesmo dia.',
  },
  {
    icon: Wallet,
    title: 'Parcelas que cabem no bolso',
    desc: 'Planos flexíveis com entrada facilitada e prazos longos.',
  },
  {
    icon: Repeat,
    title: 'Aceita usado na troca',
    desc: 'Avaliamos o seu carro na hora e abatemos na entrada.',
  },
]

export function Financing() {
  return (
    <section className="border-y border-white/10 bg-black">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
        <ScrollReveal className="relative order-last aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 lg:order-first">
          <Image
            src="/blog/financiamento-consignado.png"
            alt="Cliente assinando contrato de financiamento de carro"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-yellow">
            Financiamento facilitado
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
            O seu carro mais perto do que você imagina
          </h2>
          <p className="mt-3 text-muted-foreground">
            Trabalhamos com os principais bancos para encontrar a melhor
            condição para o seu perfil. Simule sem compromisso.
          </p>

          <ul className="mt-6 space-y-4">
            {bullets.map((b) => (
              <li key={b.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-yellow/15 text-brand-yellow">
                  <b.icon className="size-5" />
                </span>
                <span>
                  <span className="flex items-center gap-2 font-display text-base font-bold uppercase tracking-wide text-white">
                    <CheckCircle2 className="size-4 text-brand-yellow" />
                    {b.title}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {b.desc}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <a
            href={whatsappLink(
              `Olá! Quero simular um financiamento na ${site.name}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-4 font-display text-base font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.03]"
          >
            <WhatsAppIcon className="size-5" />
            Simular financiamento
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
