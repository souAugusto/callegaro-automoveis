import 'server-only'

import { supabase } from './supabase'

const CARS_BUCKET = 'carros'

function extensionFromFile(file: File): string {
  const fromName = file.name.split('.').pop()
  if (fromName && fromName.length <= 5) return fromName.toLowerCase()
  const fromType = file.type.split('/').pop()
  return fromType || 'jpg'
}

/** Sobe uma foto de carro pro Supabase Storage e retorna a URL pública. */
export async function uploadCarImage(file: File): Promise<string> {
  const ext = extensionFromFile(file)
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from(CARS_BUCKET).upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  })
  if (error) throw error
  const { data } = supabase.storage.from(CARS_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

/** Remove uma foto do Storage a partir da URL pública, se ela pertencer ao
 * nosso bucket. URLs antigas (ex: /cars/vw-gol.png, arquivos estáticos do
 * projeto) são ignoradas silenciosamente. */
export async function deleteCarImage(url: string): Promise<void> {
  const marker = `/storage/v1/object/public/${CARS_BUCKET}/`
  const index = url.indexOf(marker)
  if (index === -1) return
  const path = url.slice(index + marker.length)
  if (!path) return
  await supabase.storage.from(CARS_BUCKET).remove([path])
}
