'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ImagePlus, X, Focus } from 'lucide-react'
import type { ImageFocus } from '@/lib/data'
import { ImageFocusPicker } from './image-focus-picker'

type ImageItem =
  | { key: string; type: 'existing'; url: string; focus: ImageFocus }
  | { key: string; type: 'new'; file: File; preview: string; focus: ImageFocus }

const CENTER: ImageFocus = { x: 50, y: 50 }

// Distância mínima (px) antes de um toque/clique virar arraste.
const DRAG_THRESHOLD = 5

let nextKey = 0

export function ImageUploadField({
  existingImages = [],
}: {
  existingImages?: { url: string; focus: ImageFocus }[]
}) {
  const [items, setItems] = useState<ImageItem[]>(
    existingImages.map(({ url, focus }) => ({
      key: `k${nextKey++}`,
      type: 'existing',
      url,
      focus,
    })),
  )
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [draggingKey, setDraggingKey] = useState<string | null>(null)
  const pressRef = useRef<{ key: string; x: number; y: number } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function syncInput(current: ImageItem[]) {
    const files = current
      .filter((item): item is Extract<ImageItem, { type: 'new' }> => item.type === 'new')
      .map((item) => item.file)
    const dt = new DataTransfer()
    files.forEach((f) => dt.items.add(f))
    if (inputRef.current) inputRef.current.files = dt.files
  }

  function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? [])
    if (picked.length === 0) return
    const additions: ImageItem[] = picked.map((file) => ({
      key: `k${nextKey++}`,
      type: 'new',
      file,
      preview: URL.createObjectURL(file),
      focus: { ...CENTER },
    }))
    const merged = [...items, ...additions]
    setItems(merged)
    syncInput(merged)
  }

  function removeItem(key: string) {
    const target = items.find((i) => i.key === key)
    if (target?.type === 'new') URL.revokeObjectURL(target.preview)
    const merged = items.filter((i) => i.key !== key)
    setItems(merged)
    syncInput(merged)
    if (editingKey === key) setEditingKey(null)
  }

  function moveItemTo(key: string, targetIndex: number) {
    const from = items.findIndex((i) => i.key === key)
    if (from === -1 || from === targetIndex) return
    const merged = [...items]
    const [moved] = merged.splice(from, 1)
    merged.splice(targetIndex, 0, moved)
    setItems(merged)
    syncInput(merged)
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>, key: string) {
    if (e.button !== 0 || (e.target as HTMLElement).closest('button')) return
    e.currentTarget.setPointerCapture(e.pointerId)
    pressRef.current = { key, x: e.clientX, y: e.clientY }
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const press = pressRef.current
    if (!press) return
    if (!draggingKey) {
      const dist = Math.hypot(e.clientX - press.x, e.clientY - press.y)
      if (dist < DRAG_THRESHOLD) return
      setDraggingKey(press.key)
    }
    const over = document
      .elementFromPoint(e.clientX, e.clientY)
      ?.closest<HTMLElement>('[data-image-key]')
    const overKey = over?.dataset.imageKey
    if (!overKey || overKey === press.key) return
    const targetIndex = items.findIndex((i) => i.key === overKey)
    if (targetIndex !== -1) moveItemTo(press.key, targetIndex)
  }

  function handlePointerEnd() {
    pressRef.current = null
    setDraggingKey(null)
  }

  function setFocus(key: string, focus: ImageFocus) {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, focus } : i)))
  }

  const editingItem = items.find((i) => i.key === editingKey)

  return (
    <div className="space-y-3">
      {items.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={item.key}
              data-image-key={item.key}
              onPointerDown={(e) => handlePointerDown(e, item.key)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerEnd}
              onPointerCancel={handlePointerEnd}
              className={`group relative aspect-square touch-none select-none overflow-hidden rounded-lg border bg-black transition-opacity ${
                draggingKey === item.key
                  ? 'cursor-grabbing border-brand-yellow opacity-50'
                  : 'cursor-grab border-white/10'
              }`}
            >
              <Image
                src={item.type === 'existing' ? item.url : item.preview}
                alt=""
                fill
                sizes="120px"
                draggable={false}
                className="pointer-events-none object-cover"
                style={{ objectPosition: `${item.focus.x}% ${item.focus.y}%` }}
              />
              <input
                type="hidden"
                name="imageOrder"
                value={item.type === 'existing' ? item.url : 'NOVA'}
              />
              <input type="hidden" name="imageFocusX" value={item.focus.x} />
              <input type="hidden" name="imageFocusY" value={item.focus.y} />

              <span
                className={`absolute left-1 top-1 rounded px-1.5 py-0.5 text-[0.6rem] font-bold uppercase ${
                  index === 0 ? 'bg-brand-yellow text-black' : 'bg-black/70 text-white'
                }`}
              >
                {index === 0 ? 'Capa' : index + 1}
              </span>

              <button
                type="button"
                onClick={() => removeItem(item.key)}
                aria-label="Remover foto"
                className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="size-3.5" />
              </button>

              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => setEditingKey(editingKey === item.key ? null : item.key)}
                  aria-label="Ajustar foco da foto"
                  className={`flex size-6 items-center justify-center rounded-full ${
                    editingKey === item.key
                      ? 'bg-brand-yellow text-black'
                      : 'bg-black/70 text-white'
                  }`}
                >
                  <Focus className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingItem && (
        <ImageFocusPicker
          src={editingItem.type === 'existing' ? editingItem.url : editingItem.preview}
          focus={editingItem.focus}
          onChange={(focus) => setFocus(editingItem.key, focus)}
        />
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

      {items.length > 0 ? (
        <p className="text-xs text-muted-foreground">
          A foto marcada como "Capa" aparece em destaque no site. Arraste
          as fotos para reordenar e use o ícone de foco para escolher a parte da
          foto que fica visível quando ela é cortada.
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          Nenhuma foto selecionada. Sem fotos, o carro fica com uma imagem
          padrão.
        </p>
      )}
    </div>
  )
}
