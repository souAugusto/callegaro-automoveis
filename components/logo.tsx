import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('group flex items-center gap-2', className)}
      aria-label="AutoCenter Parobé - página inicial"
    >
      <span className="flex size-9 items-center justify-center rounded-md bg-brand-yellow font-display text-xl font-bold text-black">
        AC
      </span>
      <span className="font-display text-xl font-bold leading-none tracking-wide">
        <span className="text-white">AUTO</span>
        <span className="text-brand-yellow">CENTER</span>
        <span className="block text-[0.65rem] font-medium tracking-[0.3em] text-muted-foreground">
          PAROBÉ · RS
        </span>
      </span>
    </Link>
  )
}
