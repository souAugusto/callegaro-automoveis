import type { Metadata } from 'next'
import { Logo } from '@/components/logo'
import { LoginForm } from '@/components/admin/login-form'

export const metadata: Metadata = {
  title: 'Entrar',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-2xl border border-white/10 bg-card p-6 sm:p-8">
          <h1 className="font-display text-xl font-bold uppercase tracking-wide text-white">
            Painel administrativo
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Entre com suas credenciais para gerenciar carros e informações do site.
          </p>

          <div className="mt-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
