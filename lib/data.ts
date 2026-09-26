// Tipos, formatação e constantes compartilhados entre servidor e navegador.
// As consultas ao banco (que dependem da chave secreta do Supabase) ficam
// isoladas em lib/db.ts, que só pode ser importado no servidor — se este
// arquivo importasse o cliente do Supabase, qualquer componente 'use
// client' que usasse um tipo ou uma constante daqui levaria esse código
// (e a chave) junto para o navegador.

export type CarStatus = 'Disponível' | 'Reservado' | 'Vendido'
export type Transmission = 'Manual' | 'Automático'
export type Fuel = 'Flex' | 'Gasolina' | 'Diesel'

/** Ponto de foco de uma foto, em porcentagem da largura/altura da imagem
 * (0-100). Usado como object-position para decidir qual parte da foto
 * fica visível quando ela é exibida cortada (object-cover). */
export interface ImageFocus {
  x: number
  y: number
}

export interface Car {
  id: string
  slug: string
  brand: string
  model: string
  version: string
  year: number
  km: number | null
  color: string
  transmission: Transmission | null
  fuel: Fuel
  doors: number | null
  price: number
  images: string[]
  imageFocus: Record<string, ImageFocus>
  status: CarStatus
  featured: boolean
  isFlagship: boolean
  description: string
}

/** CSS object-position para uma foto, considerando seu ponto de foco
 * (ou o centro, se nenhum foi definido). */
export function objectPosition(focus?: ImageFocus): string {
  if (!focus) return '50% 50%'
  return `${focus.x}% ${focus.y}%`
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

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Valor do <select> de câmbio no formulário do admin quando o campo,
 * agora opcional, é deixado sem preencher. */
export const TRANSMISSION_UNSPECIFIED = 'nao-informado'

export const transmissions: Transmission[] = ['Manual', 'Automático']
export const fuels: Fuel[] = ['Flex', 'Gasolina', 'Diesel']
export const carStatuses: CarStatus[] = ['Disponível', 'Reservado', 'Vendido']
