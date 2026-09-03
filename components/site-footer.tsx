import Link from 'next/link'
import { MapPin, Phone, Clock } from 'lucide-react'
import { InstagramIcon, FacebookIcon } from './social-icons'
import { Logo } from './logo'
import { mainNav, type SiteConfig } from '@/lib/site-config'

export function SiteFooter({ site }: { site: SiteConfig }) {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="space-y-4">
          <Logo siteName={site.name} />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Carros populares e seminovos com procedência, negociação justa e
            financiamento facilitado em {site.address.city}/{site.address.state}.
          </p>
          <div className="flex gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex size-10 items-center justify-center rounded-lg border border-white/15 text-white transition-colors hover:bg-brand-yellow hover:text-black"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex size-10 items-center justify-center rounded-lg border border-white/15 text-white transition-colors hover:bg-brand-yellow hover:text-black"
            >
              <FacebookIcon className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-brand-yellow">
            Navegação
          </h3>
          <ul className="space-y-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-brand-yellow">
            Contato
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-yellow" />
              <span>{site.address.full}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-brand-yellow" />
              <a href={`tel:${site.phoneRaw}`} className="hover:text-white">
                {site.phone}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-brand-yellow">
            Horário
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {site.hours.map((h) => (
              <li key={h.days} className="flex items-start gap-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand-yellow" />
                <span>
                  <span className="block text-white">{h.days}</span>
                  {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="px-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  )
}
