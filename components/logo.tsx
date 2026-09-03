import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { DEFAULT_SITE } from '@/lib/site-config'

export function Logo({
  className,
  siteName = DEFAULT_SITE.name,
}: {
  className?: string
  siteName?: string
}) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center"
      aria-label={`${siteName} - página inicial`}
    >
      <Image
        src="/logo-callegaro-preto.png"
        alt={siteName}
        width={1600}
        height={561}
        priority
        className={cn('h-10 w-auto rounded-md', className)}
      />
    </Link>
  )
}
