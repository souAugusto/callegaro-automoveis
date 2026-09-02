import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
}) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-yellow">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
