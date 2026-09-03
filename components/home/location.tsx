import { MapPin, Phone, Clock, Navigation } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { SITE, SITE_MAP_EMBED_URL, SITE_DIRECTIONS_URL } from '@/lib/site-config'

export function Location() {
  return (
    <section className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="Venha nos visitar"
          title="Onde estamos"
          description={`Estamos no coração de ${SITE.address.city}. Passe para um cafezinho e conheça nosso estoque de perto.`}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-card p-5">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand-yellow" />
              <div>
                <p className="font-display font-bold uppercase tracking-wide text-white">
                  Endereço
                </p>
                <p className="text-sm text-muted-foreground">{SITE.address.full}</p>
                <a
                  href={SITE_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-yellow hover:underline"
                >
                  <Navigation className="size-3.5" />
                  Como chegar
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-card p-5">
              <Phone className="mt-0.5 size-5 shrink-0 text-brand-yellow" />
              <div>
                <p className="font-display font-bold uppercase tracking-wide text-white">
                  Telefone
                </p>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="text-sm text-muted-foreground hover:text-white"
                >
                  {SITE.phone}
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
                  {SITE.hours.map((h) => (
                    <li key={h.days}>
                      {h.days}: {h.time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              src={SITE_MAP_EMBED_URL}
              title={`Mapa da localização da ${SITE.name}`}
              className="h-full min-h-75 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
