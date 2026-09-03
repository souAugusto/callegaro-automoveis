import { Eye, Handshake, FileCheck, HeartHandshake } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'

const badges = [
  {
    icon: Eye,
    title: 'Transparência Total',
    desc: 'Histórico e estado real de cada veículo, sem surpresas.',
  },
  {
    icon: Handshake,
    title: 'Negociação Justa',
    desc: 'Preço honesto e a melhor condição para o seu bolso.',
  },
  {
    icon: FileCheck,
    title: 'Documentação Segura',
    desc: 'Transferência e papelada em dia, com segurança jurídica.',
  },
  {
    icon: HeartHandshake,
    title: 'Atendimento de Confiança',
    desc: 'Do primeiro contato à entrega das chaves, com você.',
  },
]

export function TrustBadges() {
  return (
    <section className="border-b border-white/10 bg-black">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((b, i) => (
          <ScrollReveal key={b.title} delay={i * 0.08}>
            <div className="rounded-2xl border border-white/10 bg-card p-6 transition-colors hover:border-brand-yellow/50">
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand-yellow/15 text-brand-yellow">
                <b.icon className="size-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-wide text-white">
                {b.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
