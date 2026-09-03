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
  type Lead,
  type LeadStatus,
  type Transmission,
} from './data'

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
  status: CarStatus
  featured: boolean
  is_flagship: boolean
  description: string
}

interface LeadRow {
  id: string
  name: string
  phone: string
  origin: string
  car_interest: string
  status: LeadStatus
  created_at: string
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
    status: row.status,
    featured: row.featured,
    isFlagship: row.is_flagship,
    description: row.description,
  }
}

function mapLeadRow(row: LeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    origin: row.origin,
    carInterest: row.car_interest,
    status: row.status,
    createdAt: row.created_at,
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

export async function addCar(input: Omit<Car, 'id' | 'slug'>): Promise<Car> {
  const slug = slugify(`${input.brand}-${input.model}-${input.version}-${input.year}`)
  const { data, error } = await supabase
    .from('cars')
    .insert({ ...carInputToRow(input), slug })
    .select()
    .single()
  if (error) throw error
  return mapCarRow(data)
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
/* Leads                                                               */
/* ------------------------------------------------------------------ */

export async function getAllLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(mapLeadRow)
}

export async function getLeadById(id: string): Promise<Lead | undefined> {
  const { data } = await supabase.from('leads').select('*').eq('id', id).maybeSingle()
  return data ? mapLeadRow(data) : undefined
}

export async function addLead(
  input: Omit<Lead, 'id' | 'createdAt' | 'status'>,
): Promise<Lead> {
  const { data, error } = await supabase
    .from('leads')
    .insert({
      name: input.name,
      phone: input.phone,
      origin: input.origin,
      car_interest: input.carInterest,
    })
    .select()
    .single()
  if (error) throw error
  return mapLeadRow(data)
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<void> {
  const { error } = await supabase.from('leads').update({ status }).eq('id', id)
  if (error) throw error
}

export async function deleteLead(id: string): Promise<void> {
  const { error } = await supabase.from('leads').delete().eq('id', id)
  if (error) throw error
}
