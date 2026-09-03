// Tipos, formatação e constantes compartilhados entre servidor e navegador.
// As consultas ao banco (que dependem da chave secreta do Supabase) ficam
// isoladas em lib/db.ts, que só pode ser importado no servidor — se este
// arquivo importasse o cliente do Supabase, qualquer componente 'use
// client' que usasse um tipo ou uma constante daqui levaria esse código
// (e a chave) junto para o navegador.

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
