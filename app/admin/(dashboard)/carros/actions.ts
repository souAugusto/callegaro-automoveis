'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {
  addCar,
  updateCar,
  deleteCar,
  setFlagshipCar,
  type Car,
  type CarStatus,
  type Transmission,
  type Fuel,
} from '@/lib/data'

export interface CarFormState {
  error?: string
}

function parseCarInput(formData: FormData): Omit<Car, 'id' | 'slug'> | { error: string } {
  const brand = String(formData.get('brand') || '').trim()
  const model = String(formData.get('model') || '').trim()
  const version = String(formData.get('version') || '').trim()
  const year = Number(formData.get('year'))
  const km = Number(formData.get('km'))
  const color = String(formData.get('color') || '').trim()
  const transmission = String(formData.get('transmission') || '') as Transmission
  const fuel = String(formData.get('fuel') || '') as Fuel
  const doors = Number(formData.get('doors'))
  const price = Number(formData.get('price'))
  const status = String(formData.get('status') || '') as CarStatus
  const featured = formData.get('featured') === 'on'
  const isFlagship = formData.get('isFlagship') === 'on'
  const description = String(formData.get('description') || '').trim()
  const images = String(formData.get('images') || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (!brand || !model || !version || !color || !description) {
    return { error: 'Preencha todos os campos obrigatórios.' }
  }
  if (!year || !km || !doors || !price) {
    return { error: 'Ano, km, portas e preço precisam ser números válidos.' }
  }

  return {
    brand,
    model,
    version,
    year,
    km,
    color,
    transmission,
    fuel,
    doors,
    price,
    images: images.length > 0 ? images : ['/placeholder.svg'],
    status,
    featured,
    isFlagship,
    description,
  }
}

export async function createCarAction(
  _prevState: CarFormState,
  formData: FormData,
): Promise<CarFormState> {
  const input = parseCarInput(formData)
  if ('error' in input) return input

  const car = addCar(input)
  if (input.isFlagship) setFlagshipCar(car.id)
  revalidatePath('/admin/carros')
  revalidatePath('/estoque')
  revalidatePath('/')
  redirect('/admin/carros')
}

export async function updateCarAction(
  id: string,
  _prevState: CarFormState,
  formData: FormData,
): Promise<CarFormState> {
  const input = parseCarInput(formData)
  if ('error' in input) return input

  const car = updateCar(id, input)
  if (car && input.isFlagship) setFlagshipCar(car.id)
  revalidatePath('/admin/carros')
  revalidatePath('/estoque')
  revalidatePath('/')
  redirect('/admin/carros')
}

export async function removeCar(formData: FormData) {
  const id = String(formData.get('id') || '')
  deleteCar(id)
  revalidatePath('/admin/carros')
  revalidatePath('/estoque')
  revalidatePath('/admin')
  revalidatePath('/')
}
