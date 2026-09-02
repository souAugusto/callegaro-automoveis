'use client'

import { useActionState } from 'react'
import { LogIn } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { login, type LoginState } from '@/app/admin/(auth)/login/actions'

const initialState: LoginState = {}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="admin@callegaroautomoveis.com.br"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" name="password" type="password" required />
      </div>

      {state.error && (
        <p className="text-sm text-brand-red">{state.error}</p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="h-auto w-full gap-2 rounded-xl bg-brand-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-black hover:bg-brand-yellow"
      >
        <LogIn className="size-4" />
        {pending ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  )
}
