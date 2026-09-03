'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ImagePlus, X } from 'lucide-react'

interface NewImage {
  file: File
  preview: string
}

export function ImageUploadField({
  existingImages = [],
}: {
  existingImages?: string[]
}) {
  const [kept, setKept] = useState<string[]>(existingImages)
  const [newImages, setNewImages] = useState<NewImage[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  function syncInput(files: File[]) {
    const dt = new DataTransfer()
    files.forEach((f) => dt.items.add(f))
    if (inputRef.current) inputRef.current.files = dt.files
  }

  function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? [])
    if (picked.length === 0) return
    const additions = picked.map((file) => ({ file, preview: URL.createObjectURL(file) }))
    const merged = [...newImages, ...additions]
    setNewImages(merged)
    syncInput(merged.map((m) => m.file))
  }

  function removeNew(index: number) {
    const target = newImages[index]
    if (target) URL.revokeObjectURL(target.preview)
    const merged = newImages.filter((_, i) => i !== index)
    setNewImages(merged)
    syncInput(merged.map((m) => m.file))
  }

  function removeKept(url: string) {
    setKept((prev) => prev.filter((u) => u !== url))
  }

  const hasAny = kept.length > 0 || newImages.length > 0

  return (
    <div className="space-y-3">
      {hasAny && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {kept.map((url) => (
            <div
              key={url}
              className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-black"
            >
              <Image src={url} alt="" fill sizes="120px" className="object-cover" />
              <input type="hidden" name="existingImages" value={url} />
              <button
                type="button"
                onClick={() => removeKept(url)}
                aria-label="Remover foto"
                className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
          {newImages.map((img, i) => (
            <div
              key={img.preview}
              className="group relative aspect-square overflow-hidden rounded-lg border border-brand-yellow/40 bg-black"
            >
              <Image src={img.preview} alt="" fill sizes="120px" className="object-cover" />
              <span className="absolute left-1 top-1 rounded bg-brand-yellow px-1.5 py-0.5 text-[0.6rem] font-bold uppercase text-black">
                Nova
              </span>
              <button
                type="button"
                onClick={() => removeNew(i)}
                aria-label="Remover foto"
                className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-card px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-brand-yellow/60 hover:text-white">
        <ImagePlus className="size-5 text-brand-yellow" />
        Adicionar fotos
        <input
          ref={inputRef}
          type="file"
          name="newImages"
          accept="image/*"
          multiple
          onChange={handleFilesSelected}
          className="hidden"
        />
      </label>

      {!hasAny && (
        <p className="text-xs text-muted-foreground">
          Nenhuma foto selecionada. Sem fotos, o carro fica com uma imagem
          padrão.
        </p>
      )}
    </div>
  )
}
