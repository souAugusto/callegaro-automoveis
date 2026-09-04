'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ImageFocus } from '@/lib/data'
import { objectPosition } from '@/lib/data'
import { cn } from '@/lib/utils'

export function CarGallery({
  images,
  imageFocus,
  alt,
}: {
  images: string[]
  imageFocus: Record<string, ImageFocus>
  alt: string
}) {
  const [active, setActive] = useState(0)
  const list = images.length > 0 ? images : ['/placeholder.svg']

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-card">
        <Image
          src={list[active] || '/placeholder.svg'}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          style={{ objectPosition: objectPosition(imageFocus[list[active]]) }}
        />
      </div>

      {list.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {list.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={cn(
                'relative aspect-[4/3] overflow-hidden rounded-lg border transition',
                active === i
                  ? 'border-brand-yellow ring-2 ring-brand-yellow/40'
                  : 'border-white/10 opacity-70 hover:opacity-100',
              )}
            >
              <Image
                src={img || '/placeholder.svg'}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
                style={{ objectPosition: objectPosition(imageFocus[img]) }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
