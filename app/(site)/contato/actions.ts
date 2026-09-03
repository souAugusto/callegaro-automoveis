'use server'

import { revalidatePath } from 'next/cache'
import { addLead } from '@/lib/db'

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

  await addLead({
    name,
    phone,
    origin: 'Formulário do site',
    carInterest: carInterest || message || 'Não informado',
  })

  revalidatePath('/admin/leads')
  revalidatePath('/admin')

  return { success: true }
}
