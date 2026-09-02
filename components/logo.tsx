import Link from 'next/link'
import { cn } from '@/lib/utils'
import { site } from '@/lib/site'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('group flex items-center gap-2', className)}
      aria-label={`${site.name} - página inicial`}
    >
      <span className="flex size-9 items-center justify-center rounded-md bg-brand-yellow font-display text-xl font-bold text-black">
        CA
      </span>
      <span className="font-display text-xl font-bold leading-none tracking-wide">
        <span className="text-white">CALLEGARO</span>
        <span className="text-brand-yellow"> AUTOMÓVEIS</span>
        <span className="block text-[0.65rem] font-medium tracking-[0.3em] text-muted-foreground">
          PAROBÉ · RS
        </span>
      </span>
    </Link>
  )
}
