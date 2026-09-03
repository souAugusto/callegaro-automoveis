'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Car,
  Settings,
  ExternalLink,
  LogOut,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/carros', label: 'Carros', icon: Car },
  { href: '/admin/site-info', label: 'Informações do Site', icon: Settings },
]

export function AdminSidebar({ logoutAction }: { logoutAction: () => void }) {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  return (
    <aside className="flex w-full shrink-0 flex-col border-white/10 bg-black md:h-dvh md:w-64 md:border-r md:sticky md:top-0">
      <div className="border-b border-white/10 p-5">
        <Logo />
      </div>

      <nav
        className="flex gap-1 overflow-x-auto p-3 md:flex-col md:overflow-visible"
        aria-label="Menu administrativo"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 font-display text-sm font-medium uppercase tracking-wide transition-colors',
              isActive(item.href)
                ? 'bg-brand-yellow/10 text-brand-yellow'
                : 'text-white hover:bg-white/5',
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto space-y-1 border-t border-white/10 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="size-4" />
          Ver site
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-brand-red"
          >
            <LogOut className="size-4" />
            Sair
          </button>
        </form>
      </div>
    </aside>
  )
}
