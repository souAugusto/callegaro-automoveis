'use server'

import { revalidatePath } from 'next/cache'
import { updateLeadStatus, deleteLead, type LeadStatus } from '@/lib/data'

export async function changeLeadStatus(id: string, status: LeadStatus) {
  await updateLeadStatus(id, status)
  revalidatePath('/admin/leads')
  revalidatePath('/admin')
}

export async function removeLead(formData: FormData) {
  const id = String(formData.get('id') || '')
  await deleteLead(id)
  revalidatePath('/admin/leads')
  revalidatePath('/admin')
}
