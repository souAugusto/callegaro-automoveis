// Camada de dados: consultas ao Supabase (Postgres). Só pode ser importado
// por Server Components e Server Actions — nunca por um componente 'use
// client', senão o Next.js empacota este código (e a checagem da chave
// secreta) para dentro do JavaScript enviado ao navegador. O import de
// 'server-only' faz o build falhar na hora se isso acontecer.
import 'server-only'

import { supabase } from './supabase'
import {
  slugify,
  type Car,
  type CarStatus,
  type Fuel,
  type ImageFocus,
  type Transmission,
} from './data'
import { SITE_STATIC, DEFAULT_SITE, type SiteConfig } from './site-config'

/* ------------------------------------------------------------------ */
/* Mapeamento linha do banco <-> objeto do app                        */
/* ------------------------------------------------------------------ */

interface CarRow {
  id: string
  slug: string
  brand: string
  model: string
  version: string
  year: number
  km: number
  color: string
  transmission: Transmission
  fuel: Fuel
  doors: number
  price: number | string
  images: string[] | null
  image_focus: Record<string, ImageFocus> | null
  status: CarStatus
  featured: boolean
  is_flagship: boolean
  description: string
}

function mapCarRow(row: CarRow): Car {
  return {
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    model: row.model,
    version: row.version,
    year: row.year,
    km: row.km,
    color: row.color,
    transmission: row.transmission,
    fuel: row.fuel,
    doors: row.doors,
    price: Number(row.price),
    images: row.images ?? [],
    imageFocus: row.image_focus ?? {},
    status: row.status,
    featured: row.featured,
    isFlagship: row.is_flagship,
    description: row.description,
  }
}

/** Campos graváveis de um carro, exceto is_flagship — tratado à parte
 * (ver setFlagshipCar/unsetFlagshipCar) pra não violar a constraint que
 * garante um único carro-chefe por vez. */
function carInputToRow(input: Omit<Car, 'id' | 'slug'>) {
  return {
    brand: input.brand,
    model: input.model,
    version: input.version,
    year: input.year,
    km: input.km,
    color: input.color,
    transmission: input.transmission,
    fuel: input.fuel,
    doors: input.doors,
    price: input.price,
    images: input.images,
    image_focus: input.imageFocus,
    status: input.status,
    featured: input.featured,
    description: input.description,
  }
}

/* ------------------------------------------------------------------ */
/* Carros                                                              */
/* ------------------------------------------------------------------ */

export async function getAllCars(): Promise<Car[]> {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(mapCarRow)
}

export async function getFeaturedCars(excludeId?: string): Promise<Car[]> {
  let query = supabase
    .from('cars')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(6)
  if (excludeId) query = query.neq('id', excludeId)
  const { data, error } = await query
  if (error) throw error
  return (data ?? []).map(mapCarRow)
}

export async function getFlagshipCar(): Promise<Car | undefined> {
  const { data: flagship } = await supabase
    .from('cars')
    .select('*')
    .eq('is_flagship', true)
    .maybeSingle()
  if (flagship) return mapCarRow(flagship)

  const { data: featured } = await supabase
    .from('cars')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (featured) return mapCarRow(featured)

  const { data: any } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  return any ? mapCarRow(any) : undefined
}

export async function getCarBySlug(slug: string): Promise<Car | undefined> {
  const { data } = await supabase.from('cars').select('*').eq('slug', slug).maybeSingle()
  return data ? mapCarRow(data) : undefined
}

export async function getCarById(id: string): Promise<Car | undefined> {
  const { data } = await supabase.from('cars').select('*').eq('id', id).maybeSingle()
  return data ? mapCarRow(data) : undefined
}

/** Erro de código conhecido do Postgres (ex: 23505 = unique_violation). */
function pgErrorCode(error: unknown): string | undefined {
  return typeof error === 'object' && error !== null && 'code' in error
    ? String((error as { code?: unknown }).code)
    : undefined
}

/** Acha o primeiro slug livre a partir de uma base, tentando "base",
 * "base-2", "base-3"... até não achar nenhum carro com esse slug. */
async function findFreeSlug(base: string): Promise<string> {
  let attempt = 1
  while (true) {
    const candidate = attempt === 1 ? base : `${base}-${attempt}`
    const { data } = await supabase.from('cars').select('id').eq('slug', candidate).maybeSingle()
    if (!data) return candidate
    attempt++
  }
}

export async function addCar(input: Omit<Car, 'id' | 'slug'>): Promise<Car> {
  const baseSlug = slugify(`${input.brand}-${input.model}-${input.version}-${input.year}`)

  // Tenta achar um slug livre e inserir; se ainda assim colidir (duas
  // inserções concorrentes disputando o mesmo slug), tenta de novo com o
  // próximo sufixo livre em vez de deixar o erro do Postgres estourar.
  for (let i = 0; i < 5; i++) {
    const slug = await findFreeSlug(baseSlug)
    const { data, error } = await supabase
      .from('cars')
      .insert({ ...carInputToRow(input), slug })
      .select()
      .single()
    if (!error) return mapCarRow(data)
    if (pgErrorCode(error) !== '23505') throw error
  }

  throw new Error(
    'Não foi possível gerar um identificador único para este carro. Tente novamente.',
  )
}

export async function updateCar(
  id: string,
  input: Omit<Car, 'id' | 'slug'>,
): Promise<Car | undefined> {
  const { data, error } = await supabase
    .from('cars')
    .update(carInputToRow(input))
    .eq('id', id)
    .select()
    .maybeSingle()
  if (error) throw error
  return data ? mapCarRow(data) : undefined
}

export async function deleteCar(id: string): Promise<void> {
  const { error } = await supabase.from('cars').delete().eq('id', id)
  if (error) throw error
}

// Garante que só um carro por vez seja o carro-chefe da home.
export async function setFlagshipCar(id: string): Promise<void> {
  await supabase.from('cars').update({ is_flagship: false }).eq('is_flagship', true)
  const { error } = await supabase.from('cars').update({ is_flagship: true }).eq('id', id)
  if (error) throw error
}

export async function unsetFlagshipCar(id: string): Promise<void> {
  const { error } = await supabase.from('cars').update({ is_flagship: false }).eq('id', id)
  if (error) throw error
}

/* ------------------------------------------------------------------ */
/* Informações do site                                                 */
/* ------------------------------------------------------------------ */

interface SiteSettingsRow {
  name: string
  description: string
  phone: string
  whatsapp: string
  email: string
  street: string
  neighborhood: string
  city: string
  state: string
  zip: string
  lat: number
  lng: number
  hours: { days: string; time: string }[]
  instagram: string
  facebook: string
}

function formatFullAddress(row: {
  street: string
  neighborhood: string
  city: string
  state: string
  zip: string
}): string {
  const line = [row.street, row.neighborhood].filter(Boolean).join(' — ')
  const cityState = `${row.city}/${row.state}`
  return [line, cityState, row.zip].filter(Boolean).join(', ')
}

function mapSiteSettingsRow(row: SiteSettingsRow): SiteConfig {
  const digits = row.phone.replace(/\D/g, '')
  return {
    name: row.name,
    legalName: SITE_STATIC.legalName,
    description: row.description,
    url: SITE_STATIC.url,
    phone: row.phone,
    phoneRaw: digits ? `+55${digits}` : '',
    whatsapp: row.whatsapp,
    email: row.email,
    address: {
      street: row.street,
      neighborhood: row.neighborhood,
      city: row.city,
      state: row.state,
      zip: row.zip,
      country: SITE_STATIC.country,
      full: formatFullAddress(row),
    },
    geo: { lat: row.lat, lng: row.lng },
    hours: row.hours ?? [],
    social: { instagram: row.instagram, facebook: row.facebook },
  }
}

export async function getSiteSettings(): Promise<SiteConfig> {
  const { data } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 'default')
    .maybeSingle()
  return data ? mapSiteSettingsRow(data) : DEFAULT_SITE
}

export interface SiteSettingsInput {
  name: string
  description: string
  phone: string
  whatsapp: string
  email: string
  street: string
  neighborhood: string
  city: string
  state: string
  zip: string
  lat: number
  lng: number
  hours: { days: string; time: string }[]
  instagram: string
  facebook: string
}

export async function saveSiteSettings(input: SiteSettingsInput): Promise<void> {
  const { error } = await supabase.from('site_settings').upsert({
    id: 'default',
    name: input.name,
    description: input.description,
    phone: input.phone,
    whatsapp: input.whatsapp,
    email: input.email,
    street: input.street,
    neighborhood: input.neighborhood,
    city: input.city,
    state: input.state,
    zip: input.zip,
    lat: input.lat,
    lng: input.lng,
    hours: input.hours,
    instagram: input.instagram,
    facebook: input.facebook,
    updated_at: new Date().toISOString(),
  })
  if (error) throw error
}
