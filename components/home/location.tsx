import { MapPin, Phone, Clock } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { site } from '@/lib/site'

export function Location() {
  return (
    <section className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="Venha nos visitar"
          title="Onde estamos"
          description="Estamos no coração de Parobé. Passe para um cafezinho e conheça nosso estoque de perto."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
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
              title="Mapa da localização da AutoCenter Parobé"
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
