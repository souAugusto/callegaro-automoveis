'use server'

import { saveSiteInfo, type SiteInfoInput } from '@/lib/save-site-info'

export interface SiteInfoFormState {
  error?: string
  success?: boolean
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function saveSiteInfoAction(
  _prevState: SiteInfoFormState,
  formData: FormData,
): Promise<SiteInfoFormState> {
  const name = String(formData.get('name') || '').trim()
  const description = String(formData.get('description') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const whatsapp = String(formData.get('whatsapp') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const street = String(formData.get('street') || '').trim()
  const neighborhood = String(formData.get('neighborhood') || '').trim()
  const city = String(formData.get('city') || '').trim()
  const state = String(formData.get('state') || '').trim()
  const zip = String(formData.get('zip') || '').trim()
  const lat = Number(formData.get('lat'))
  const lng = Number(formData.get('lng'))
  const instagram = String(formData.get('instagram') || '').trim()
  const facebook = String(formData.get('facebook') || '').trim()

  const hoursDays = formData.getAll('hoursDays').map((v) => String(v).trim())
  const hoursTimes = formData.getAll('hoursTimes').map((v) => String(v).trim())
  const hours = hoursDays
    .map((days, i) => ({ days, time: hoursTimes[i] ?? '' }))
    .filter((h) => h.days || h.time)

  if (!name || !street || !city || !state) {
    return { error: 'Preencha nome do negócio, rua, cidade e estado.' }
  }
  if (!phone.trim()) {
    return { error: 'O telefone não pode ficar vazio.' }
  }
  if (!EMAIL_RE.test(email)) {
    return { error: 'Informe um e-mail válido.' }
  }
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return { error: 'Latitude e longitude precisam ser números válidos.' }
  }

  const input: SiteInfoInput = {
    name,
    description,
    phone,
    whatsapp,
    email,
    street,
    neighborhood,
    city,
    state,
    zip,
    lat,
    lng,
    hours,
    instagram,
    facebook,
  }

  try {
    await saveSiteInfo(input)
  } catch {
    return { error: 'Não foi possível salvar. Tente novamente.' }
  }

  return { success: true }
}
