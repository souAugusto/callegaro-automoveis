import type { Metadata } from 'next'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'
import { site } from '@/lib/site'
import { ContactForm } from '@/components/contato/contact-form'

export const metadata: Metadata = {
  title: 'Contato',
  description: `Fale com a ${site.name}. Formulário de contato, telefone, endereço e horário de atendimento em ${site.city}/${site.state}.`,
}

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-yellow">
          Fale conosco
        </span>
        <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-5xl">
          Vamos conversar sobre o seu próximo carro
        </h1>
        <p className="mt-4 text-muted-foreground">
          Preencha o formulário, ligue ou venha até a loja. Nossa equipe
          responde rápido e sem compromisso.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-card p-5">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand-yellow" />
              <div>
                <p className="font-display font-bold uppercase tracking-wide text-white">
                  Endereço
                </p>
                <p className="text-sm text-muted-foreground">{site.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-card p-5">
              <Phone className="mt-0.5 size-5 shrink-0 text-brand-yellow" />
              <div>
                <p className="font-display font-bold uppercase tracking-wide text-white">
                  Telefone
                </p>
                <p className="text-sm text-muted-foreground">
                  {site.phone} · {site.whatsappDisplay}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-card p-5">
              <Mail className="mt-0.5 size-5 shrink-0 text-brand-yellow" />
              <div>
                <p className="font-display font-bold uppercase tracking-wide text-white">
                  E-mail
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-muted-foreground hover:text-white"
                >
                  {site.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-card p-5">
              <Clock className="mt-0.5 size-5 shrink-0 text-brand-yellow" />
              <div>
                <p className="font-display font-bold uppercase tracking-wide text-white">
                  Horário de atendimento
                </p>
                <ul className="text-sm text-muted-foreground">
                  {site.hours.map((h) => (
                    <li key={h.label}>
                      {h.label}: {h.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              src={site.mapEmbedUrl}
              title={`Mapa da localização da ${site.name}`}
              className="h-full min-h-75 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">
            Envie uma mensagem
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Respondemos em até 1 dia útil.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
