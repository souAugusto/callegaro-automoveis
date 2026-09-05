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
import type { Car, CarStatus, Transmission, Fuel, ImageFocus } from '@/lib/data'
import { slugify, TRANSMISSION_UNSPECIFIED } from '@/lib/data'

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
  const transmissionRaw = String(formData.get('transmission') || '').trim()
  const transmission: Transmission | null =
    transmissionRaw && transmissionRaw !== TRANSMISSION_UNSPECIFIED
      ? (transmissionRaw as Transmission)
      : null
  const fuel = String(formData.get('fuel') || '') as Fuel
  const doorsRaw = String(formData.get('doors') || '').trim()
  const doors = doorsRaw ? Number(doorsRaw) : null
  const price = Number(formData.get('price'))
  const status = String(formData.get('status') || '') as CarStatus
  const featured = formData.get('featured') === 'on'
  const isFlagship = formData.get('isFlagship') === 'on'
  const description = String(formData.get('description') || '').trim()

  if (!brand || !model || !version || !color || !description) {
    return { error: 'Preencha todos os campos obrigatórios.' }
  }
  if (!year || !km || !price) {
    return { error: 'Ano, km e preço precisam ser números válidos.' }
  }
  if (doors !== null && !Number.isFinite(doors)) {
    return { error: 'Portas precisa ser um número válido.' }
  }

  const newFiles = formData
    .getAll('newImages')
    .filter((v): v is File => v instanceof File && v.size > 0)

  let uploadedImages: string[]
  try {
    uploadedImages = await Promise.all(newFiles.map((file) => uploadCarImage(file)))
  } catch {
    return { error: 'Não foi possível enviar uma ou mais fotos. Tente novamente.' }
  }

  const order = formData.getAll('imageOrder').map((v) => String(v))
  const focusXs = formData.getAll('imageFocusX').map((v) => Number(v))
  const focusYs = formData.getAll('imageFocusY').map((v) => Number(v))

  let nextUploaded = 0
  const images: string[] = []
  const imageFocus: Record<string, ImageFocus> = {}

  order.forEach((token, i) => {
    const url = token === 'NOVA' ? uploadedImages[nextUploaded++] : token
    if (!url) return
    images.push(url)
    const x = focusXs[i]
    const y = focusYs[i]
    imageFocus[url] = {
      x: Number.isFinite(x) ? x : 50,
      y: Number.isFinite(y) ? y : 50,
    }
  })

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
    imageFocus,
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

  let car: Car
  try {
    car = await addCar(input)
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? err.message
          : 'Não foi possível salvar o carro. Tente novamente.',
    }
  }

  if (input.isFlagship) await setFlagshipCar(car.id)
  revalidatePath('/admin/carros')
  revalidatePath('/admin')
  revalidatePath('/estoque')
  revalidatePath(`/estoque/${car.slug}`)
  revalidatePath('/')

  // Se o slug gerado ganhou um sufixo (já existia um carro com o mesmo
  // nome/versão/ano), avisa na listagem em vez de deixar isso invisível.
  const naiveSlug = slugify(`${input.brand}-${input.model}-${input.version}-${input.year}`)
  const notice =
    car.slug !== naiveSlug
      ? `?slugAjustado=${encodeURIComponent(car.slug)}`
      : ''
  redirect(`/admin/carros${notice}`)
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
