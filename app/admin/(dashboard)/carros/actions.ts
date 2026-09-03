'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {
  addCar,
  updateCar,
  deleteCar,
  getCarById,
  setFlagshipCar,
  unsetFlagshipCar,
} from '@/lib/db'
import { uploadCarImage, deleteCarImage } from '@/lib/storage'
import type { Car, CarStatus, Transmission, Fuel } from '@/lib/data'

export interface CarFormState {
  error?: string
}

async function parseCarInput(
  formData: FormData,
): Promise<Omit<Car, 'id' | 'slug'> | { error: string }> {
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

  if (!brand || !model || !version || !color || !description) {
    return { error: 'Preencha todos os campos obrigatórios.' }
  }
  if (!year || !km || !doors || !price) {
    return { error: 'Ano, km, portas e preço precisam ser números válidos.' }
  }

  const existingImages = formData
    .getAll('existingImages')
    .map((v) => String(v))
    .filter(Boolean)

  const newFiles = formData
    .getAll('newImages')
    .filter((v): v is File => v instanceof File && v.size > 0)

  let uploadedImages: string[]
  try {
    uploadedImages = await Promise.all(newFiles.map((file) => uploadCarImage(file)))
  } catch {
    return { error: 'Não foi possível enviar uma ou mais fotos. Tente novamente.' }
  }

  const images = [...existingImages, ...uploadedImages]

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
  const input = await parseCarInput(formData)
  if ('error' in input) return input

  const car = await addCar(input)
  if (input.isFlagship) await setFlagshipCar(car.id)
  revalidatePath('/admin/carros')
  revalidatePath('/admin')
  revalidatePath('/estoque')
  revalidatePath(`/estoque/${car.slug}`)
  revalidatePath('/')
  redirect('/admin/carros')
}

export async function updateCarAction(
  id: string,
  _prevState: CarFormState,
  formData: FormData,
): Promise<CarFormState> {
  const previous = await getCarById(id)
  const input = await parseCarInput(formData)
  if ('error' in input) return input

  const car = await updateCar(id, input)
  if (car) {
    if (input.isFlagship) {
      await setFlagshipCar(car.id)
    } else {
      await unsetFlagshipCar(car.id)
    }

    const removedImages = (previous?.images ?? []).filter(
      (url) => !input.images.includes(url),
    )
    await Promise.all(removedImages.map((url) => deleteCarImage(url)))
  }

  revalidatePath('/admin/carros')
  revalidatePath('/admin')
  revalidatePath('/estoque')
  if (car) revalidatePath(`/estoque/${car.slug}`)
  revalidatePath('/')
  redirect('/admin/carros')
}

export async function removeCar(formData: FormData) {
  const id = String(formData.get('id') || '')
  const car = await getCarById(id)
  await deleteCar(id)
  if (car) await Promise.all(car.images.map((url) => deleteCarImage(url)))
  revalidatePath('/admin/carros')
  revalidatePath('/estoque')
  revalidatePath('/admin')
  revalidatePath('/')
}
