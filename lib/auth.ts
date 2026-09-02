// Autenticação mockada do painel admin (dados fictícios).
// TODO: substituir por autenticação real (ex: NextAuth + banco de dados) ao plugar o backend.

import { cookies } from 'next/headers'

export const ADMIN_SESSION_COOKIE = 'admin_session'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@callegaroautomoveis.com.br'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'callegaro123'

export function verifyCredentials(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
    password === ADMIN_PASSWORD
  )
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_SESSION_COOKIE, 'ok', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 horas
  })
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_COOKIE)
}
