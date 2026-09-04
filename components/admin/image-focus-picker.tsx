'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import type { ImageFocus } from '@/lib/data'

export function ImageFocusPicker({
  src,
  focus,
  onChange,
}: {
  src: string
  focus: ImageFocus
  onChange: (focus: ImageFocus) => void
}) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [dragging, setDragging] = useState(false)

  const updateFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      const el = imgRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const x = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
      const y = Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100))
      onChange({ x: Math.round(x), y: Math.round(y) })
    },
    [onChange],
  )

  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-black p-3">
      <p className="text-xs text-muted-foreground">
        Clique ou arraste na foto para escolher o ponto que deve ficar em
        destaque quando ela aparecer cortada no site.
      </p>

      <div
        className="relative flex h-56 w-full cursor-crosshair select-none items-center justify-center overflow-hidden rounded-lg bg-black"
        onPointerDown={(e) => {
          setDragging(true)
          updateFromPoint(e.clientX, e.clientY)
          e.currentTarget.setPointerCapture(e.pointerId)
        }}
        onPointerMove={(e) => {
          if (dragging) updateFromPoint(e.clientX, e.clientY)
        }}
        onPointerUp={() => setDragging(false)}
      >
        {/* Envolve a foto num bloco que se ajusta ao tamanho real renderizado
         * (com letterbox do object-contain), pra o marcador de foco em % ficar
         * alinhado com a foto de verdade, e não com o container inteiro. */}
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element -- precisa do elemento real pra medir o retângulo renderizado e mapear o clique em porcentagem */}
          <img
            ref={imgRef}
            src={src}
            alt=""
            draggable={false}
            className="pointer-events-none block max-h-56 max-w-full object-contain"
          />
          <div
            className="pointer-events-none absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-yellow bg-brand-yellow/30"
            style={{ left: `${focus.x}%`, top: `${focus.y}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">Como vai aparecer:</span>
        <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-md border border-white/10 bg-black">
          <Image
            src={src}
            alt=""
            fill
            sizes="120px"
            className="object-cover"
            style={{ objectPosition: `${focus.x}% ${focus.y}%` }}
          />
        </div>
      </div>
    </div>
  )
}
