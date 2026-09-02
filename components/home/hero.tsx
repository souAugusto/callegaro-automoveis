import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { site, whatsappLink } from '@/lib/site'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {/* imagem de fundo */}
      <div className="absolute inset-0">
        <Image
          src="/cars/chevrolet-onix.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-widest text-brand-yellow">
          Seminovos com procedência em {site.city}/{site.state}
        </span>

        <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
          Realize seu sonho e{' '}
          <span className="text-brand-yellow">saia de carro novo</span> hoje
          mesmo
        </h1>

        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Carros populares revisados, negociação justa e financiamento
          facilitado. Aprovação rápida e parcelas que cabem no seu bolso.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/estoque"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-yellow px-7 py-4 font-display text-base font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.03]"
          >
            Ver estoque
            <ArrowRight className="size-5" />
          </Link>
          <a
            href={whatsappLink(
              `Olá! Quero realizar meu sonho de sair de carro novo. Pode me ajudar?`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 font-display text-base font-bold uppercase tracking-wide text-white transition-colors hover:border-[#25D366] hover:text-[#25D366]"
          >
            <WhatsAppIcon className="size-5" />
            Falar no WhatsApp
          </a>
        </div>

        <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6">
          {[
            { n: '+500', l: 'Clientes satisfeitos' },
            { n: '12 anos', l: 'De mercado' },
            { n: '100%', l: 'Documentação segura' },
          ].map((s) => (
            <div key={s.l}>
              <dt className="font-display text-3xl font-bold text-brand-yellow">
                {s.n}
              </dt>
              <dd className="text-xs uppercase tracking-wide text-muted-foreground">
                {s.l}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
