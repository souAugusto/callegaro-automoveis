import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { site } from '@/lib/site'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center"
      aria-label={`${site.name} - página inicial`}
    >
      <Image
        src="/logo-callegaro-preto.png"
        alt={site.name}
        width={1600}
        height={561}
        priority
        className={cn('h-10 w-auto rounded-md', className)}
      />
    </Link>
  )
}
