// Camada de dados mockados em memória.
// TODO: conectar a um banco de dados real (ex: Supabase) e substituir estes
// arrays por consultas. Cada função abaixo é o ponto de integração.

import { SITE_NAME, site } from './site'

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
/* Carros                                                              */
/* ------------------------------------------------------------------ */

export const cars: Car[] = [
  {
    id: 'car-1',
    slug: 'vw-gol-1-6-2015',
    brand: 'Volkswagen',
    model: 'Gol',
    version: '1.6 Comfortline',
    year: 2015,
    km: 78000,
    color: 'Prata',
    transmission: 'Manual',
    fuel: 'Flex',
    doors: 4,
    price: 39900,
    images: ['/cars/vw-gol.png'],
    status: 'Disponível',
    featured: true,
    isFlagship: false,
    description:
      'Volkswagen Gol 1.6 Comfortline completo, revisado e com pneus novos. Econômico, espaçoso e pronto para rodar. Aceitamos seu usado na troca e temos financiamento facilitado.',
  },
  {
    id: 'car-2',
    slug: 'fiat-uno-1-0-2014',
    brand: 'Fiat',
    model: 'Uno',
    version: '1.0 Vivace',
    year: 2014,
    km: 92000,
    color: 'Branco',
    transmission: 'Manual',
    fuel: 'Flex',
    doors: 4,
    price: 28900,
    images: ['/cars/fiat-uno.png'],
    status: 'Disponível',
    featured: true,
    isFlagship: false,
    description:
      'Fiat Uno Vivace 1.0, o popular ideal para o dia a dia e para quem busca economia. Baixo custo de manutenção e ótimo primeiro carro. Documentação em dia.',
  },
  {
    id: 'car-3',
    slug: 'chevrolet-onix-1-4-2018',
    brand: 'Chevrolet',
    model: 'Onix',
    version: '1.4 LT',
    year: 2018,
    km: 54000,
    color: 'Vermelho',
    transmission: 'Manual',
    fuel: 'Flex',
    doors: 4,
    price: 54900,
    images: ['/cars/chevrolet-onix.png'],
    status: 'Disponível',
    featured: true,
    isFlagship: true,
    description:
      'Chevrolet Onix 1.4 LT, um dos carros mais vendidos do Brasil. Multimídia, direção elétrica e excelente estado de conservação. Único dono, revisões em concessionária.',
  },
  {
    id: 'car-4',
    slug: 'ford-ka-1-0-2016',
    brand: 'Ford',
    model: 'Ka',
    version: '1.0 SE',
    year: 2016,
    km: 68000,
    color: 'Preto',
    transmission: 'Manual',
    fuel: 'Flex',
    doors: 4,
    price: 42900,
    images: ['/cars/ford-ka.png'],
    status: 'Disponível',
    featured: true,
    isFlagship: false,
    description:
      'Ford Ka 1.0 SE completo, design moderno e ótimo espaço interno. Ar-condicionado gelando, ideal para cidade e estrada. Financiamento com aprovação rápida.',
  },
  {
    id: 'car-5',
    slug: 'renault-sandero-1-6-2017',
    brand: 'Renault',
    model: 'Sandero',
    version: '1.6 Expression',
    year: 2017,
    km: 61000,
    color: 'Cinza',
    transmission: 'Manual',
    fuel: 'Flex',
    doors: 4,
    price: 46900,
    images: ['/cars/renault-sandero.png'],
    status: 'Disponível',
    featured: true,
    isFlagship: false,
    description:
      'Renault Sandero 1.6 Expression, um dos hatchs mais espaçosos da categoria. Porta-malas gigante, muito confortável e econômico. Aceita troca.',
  },
  {
    id: 'car-6',
    slug: 'hyundai-hb20-1-0-2019',
    brand: 'Hyundai',
    model: 'HB20',
    version: '1.0 Comfort Plus',
    year: 2019,
    km: 47000,
    color: 'Azul',
    transmission: 'Manual',
    fuel: 'Flex',
    doors: 4,
    price: 61900,
    images: ['/cars/hyundai-hb20.png'],
    status: 'Disponível',
    featured: true,
    isFlagship: false,
    description:
      'Hyundai HB20 1.0 Comfort Plus, moderno, econômico e com baixa quilometragem. Multimídia, sensor de ré e garantia de procedência. Realize o sonho do carro seminovo.',
  },
  {
    id: 'car-7',
    slug: 'vw-fox-1-0-2013',
    brand: 'Volkswagen',
    model: 'Fox',
    version: '1.0 Trend',
    year: 2013,
    km: 105000,
    color: 'Prata',
    transmission: 'Manual',
    fuel: 'Flex',
    doors: 4,
    price: 32900,
    images: ['/cars/vw-fox.png'],
    status: 'Reservado',
    featured: false,
    isFlagship: false,
    description:
      'Volkswagen Fox 1.0 Trend, alto, espaçoso e muito econômico. Perfeito para família. Mecânica revisada e pronto para transferir.',
  },
  {
    id: 'car-8',
    slug: 'fiat-palio-1-0-2012',
    brand: 'Fiat',
    model: 'Palio',
    version: '1.0 Attractive',
    year: 2012,
    km: 118000,
    color: 'Vermelho',
    transmission: 'Manual',
    fuel: 'Flex',
    doors: 4,
    price: 29900,
    images: ['/cars/fiat-palio.png'],
    status: 'Disponível',
    featured: false,
    isFlagship: false,
    description:
      'Fiat Palio 1.0 Attractive, excelente custo-benefício e baixo consumo. Ótima opção de entrada com parcelas que cabem no bolso. Documentação segura.',
  },
]

/* ------------------------------------------------------------------ */
/* Leads                                                               */
/* ------------------------------------------------------------------ */

export const leads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Marcos Vieira',
    phone: '(51) 98111-2233',
    origin: 'WhatsApp',
    carInterest: 'Chevrolet Onix 1.4 LT',
    status: 'Novo',
    createdAt: daysAgo(1),
  },
  {
    id: 'lead-2',
    name: 'Juliana Souza',
    phone: '(51) 98222-3344',
    origin: 'Formulário do site',
    carInterest: 'Hyundai HB20 1.0',
    status: 'Em contato',
    createdAt: daysAgo(2),
  },
  {
    id: 'lead-3',
    name: 'Rafael Lima',
    phone: '(51) 98333-4455',
    origin: 'Instagram',
    carInterest: 'VW Gol 1.6',
    status: 'Negociando',
    createdAt: daysAgo(3),
  },
  {
    id: 'lead-4',
    name: 'Patrícia Gomes',
    phone: '(51) 98444-5566',
    origin: 'WhatsApp',
    carInterest: 'Fiat Uno 1.0',
    status: 'Vendido',
    createdAt: daysAgo(6),
  },
  {
    id: 'lead-5',
    name: 'Anderson Rocha',
    phone: '(51) 98555-6677',
    origin: 'Indicação',
    carInterest: 'Renault Sandero 1.6',
    status: 'Novo',
    createdAt: daysAgo(6),
  },
  {
    id: 'lead-6',
    name: 'Camila Fernandes',
    phone: '(51) 98666-7788',
    origin: 'Formulário do site',
    carInterest: 'Ford Ka 1.0',
    status: 'Perdido',
    createdAt: daysAgo(12),
  },
]

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function daysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString()
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

// TODO: substituir por SELECT ... WHERE featured = true
export function getFeaturedCars(excludeId?: string): Car[] {
  return cars.filter((c) => c.featured && c.id !== excludeId).slice(0, 6)
}

// TODO: substituir por SELECT ... WHERE is_flagship = true LIMIT 1
export function getFlagshipCar(): Car | undefined {
  return cars.find((c) => c.isFlagship) ?? cars.find((c) => c.featured) ?? cars[0]
}

// TODO: substituir por SELECT ... WHERE slug = ?
export function getCarBySlug(slug: string): Car | undefined {
  return cars.find((c) => c.slug === slug)
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
/* CRUD mockado em memória (painel admin).                            */
/* TODO: substituir por operações reais de banco de dados.            */
/* ------------------------------------------------------------------ */

export function getCarById(id: string): Car | undefined {
  return cars.find((c) => c.id === id)
}

export function addCar(input: Omit<Car, 'id' | 'slug'>): Car {
  const car: Car = {
    ...input,
    id: `car-${Date.now()}`,
    slug: slugify(`${input.brand}-${input.model}-${input.version}-${input.year}`),
  }
  cars.unshift(car)
  return car
}

export function updateCar(id: string, input: Omit<Car, 'id' | 'slug'>): Car | undefined {
  const car = getCarById(id)
  if (!car) return undefined
  Object.assign(car, input)
  return car
}

export function deleteCar(id: string): void {
  const index = cars.findIndex((c) => c.id === id)
  if (index !== -1) cars.splice(index, 1)
}

// Garante que só um carro por vez seja o carro-chefe da home.
export function setFlagshipCar(id: string): void {
  for (const c of cars) c.isFlagship = c.id === id
}

export function getLeadById(id: string): Lead | undefined {
  return leads.find((l) => l.id === id)
}

export function addLead(input: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead {
  const lead: Lead = {
    ...input,
    id: `lead-${Date.now()}`,
    status: 'Novo',
    createdAt: new Date().toISOString(),
  }
  leads.unshift(lead)
  return lead
}

export function updateLeadStatus(id: string, status: LeadStatus): void {
  const lead = getLeadById(id)
  if (lead) lead.status = status
}

export function deleteLead(id: string): void {
  const index = leads.findIndex((l) => l.id === id)
  if (index !== -1) leads.splice(index, 1)
}

export const carBrands = Array.from(new Set(cars.map((c) => c.brand))).sort()
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
