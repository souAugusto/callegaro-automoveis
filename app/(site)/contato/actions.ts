'use server'

import { addLead } from '@/lib/data'

export interface ContactFormState {
  success: boolean
  error?: string
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get('name') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const carInterest = String(formData.get('carInterest') || '').trim()
  const message = String(formData.get('message') || '').trim()

  if (!name || !phone) {
    return { success: false, error: 'Preencha seu nome e telefone para continuar.' }
  }

  addLead({
    name,
    phone,
    origin: 'Formulário do site',
    carInterest: carInterest || message || 'Não informado',
  })

  return { success: true }
}
