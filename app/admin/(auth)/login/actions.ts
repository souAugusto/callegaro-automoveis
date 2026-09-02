'use server'

import { redirect } from 'next/navigation'
import { verifyCredentials, createSession } from '@/lib/auth'

export interface LoginState {
  error?: string
}

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get('email') || '')
  const password = String(formData.get('password') || '')

  if (!verifyCredentials(email, password)) {
    return { error: 'E-mail ou senha inválidos.' }
  }

  await createSession()
  redirect('/admin')
}
