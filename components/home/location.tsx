import { MapPin, Phone, Clock, Navigation } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { getMapEmbedUrl, getDirectionsUrl } from '@/lib/site-config'
import { getSiteSettings } from '@/lib/db'

export async function Location() {
  const site = await getSiteSettings()

  return (
    <section className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="Venha nos visitar"
          title="Onde estamos"
          description={`Estamos no coração de ${site.address.city}. Passe para um cafezinho e conheça nosso estoque de perto.`}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-card p-5">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand-yellow" />
              <div>
                <p className="font-display font-bold uppercase tracking-wide text-white">
                  Endereço
                </p>
                <p className="text-sm text-muted-foreground">{site.address.full}</p>
                <a
                  href={getDirectionsUrl(site)}
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
                  href={`tel:${site.phoneRaw}`}
                  className="text-sm text-muted-foreground hover:text-white"
                >
                  {site.phone}
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
              src={getMapEmbedUrl(site)}
              title={`Mapa da localização da ${site.name}`}
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
