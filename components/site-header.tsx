'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from './logo'
import { WhatsAppIcon } from './whatsapp-icon'
import { mainNav, site, whatsappLink } from '@/lib/site'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-24 max-w-6xl items-center justify-between px-4">
        <Logo className="h-16" />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Menu principal">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'font-display text-sm font-medium uppercase tracking-wide transition-colors hover:text-brand-yellow',
                isActive(item.href) ? 'text-brand-yellow' : 'text-white',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink(`Olá! Vim pelo site da ${site.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg bg-brand-yellow px-4 py-2 font-display text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.03] sm:flex"
          >
            <WhatsAppIcon className="size-4" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex size-10 items-center justify-center rounded-lg border border-white/15 text-white md:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-white/10 bg-background px-4 py-4 md:hidden"
          aria-label="Menu principal móvel"
        >
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-lg px-3 py-3 font-display text-base font-medium uppercase tracking-wide',
                    isActive(item.href)
                      ? 'bg-brand-yellow/10 text-brand-yellow'
                      : 'text-white hover:bg-white/5',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <a
                href={whatsappLink(`Olá! Vim pelo site da ${site.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-brand-yellow px-4 py-3 font-display font-bold uppercase tracking-wide text-black"
              >
                <WhatsAppIcon className="size-4" />
                Falar no WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
