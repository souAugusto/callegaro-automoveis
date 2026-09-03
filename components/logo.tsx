import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SITE } from '@/lib/site-config'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center"
      aria-label={`${SITE.name} - página inicial`}
    >
      <Image
        src="/logo-callegaro-preto.png"
        alt={SITE.name}
        width={1600}
        height={561}
        priority
        className={cn('h-10 w-auto rounded-md', className)}
      />
    </Link>
  )
}
