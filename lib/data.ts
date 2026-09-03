// Camada de dados: consultas ao Supabase (Postgres).
// Os tipos abaixo continuam em camelCase para o resto do app; o mapeamento
// para as colunas em snake_case do banco fica isolado aqui.

import { supabase } from './supabase'

export type CarStatus = 'Disponível' | 'Reservado' | 'Vendido'
export type Transmission = 'Manual' | 'Automático'
export type Fuel = 'Flex' | 'Gasolina' | 'Diesel'

export interface Car {
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
  price: number
  images: string[]
  status: CarStatus
  featured: boolean
  isFlagship: boolean
  description: string
}

export type LeadStatus = 'Novo' | 'Em contato' | 'Negociando' | 'Vendido' | 'Perdido'

export interface Lead {
  id: string
  name: string
  phone: string
  origin: string
  carInterest: string
  status: LeadStatus
  createdAt: string // ISO
}

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
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  })
}

export function formatKm(km: number): string {
  return `${km.toLocaleString('pt-BR')} km`
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
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

/* ------------------------------------------------------------------ */
/* Enums estáticos (não vêm do banco)                                  */
/* ------------------------------------------------------------------ */

export const transmissions: Transmission[] = ['Manual', 'Automático']
export const fuels: Fuel[] = ['Flex', 'Gasolina', 'Diesel']
export const leadStatuses: LeadStatus[] = [
  'Novo',
  'Em contato',
  'Negociando',
  'Vendido',
  'Perdido',
]
export const carStatuses: CarStatus[] = ['Disponível', 'Reservado', 'Vendido']
