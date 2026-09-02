'use client'

import { useActionState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { submitContactForm, type ContactFormState } from '@/app/(site)/contato/actions'

const initialState: ContactFormState = { success: false }

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  )

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-card p-8 text-center">
        <CheckCircle2 className="size-10 text-brand-yellow" />
        <p className="mt-4 font-display text-xl font-bold uppercase tracking-wide text-white">
          Mensagem enviada!
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Recebemos o seu contato e nossa equipe vai falar com você em breve.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome*</Label>
        <Input id="name" name="name" placeholder="Seu nome completo" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefone / WhatsApp*</Label>
        <Input
          id="phone"
          name="phone"
          placeholder="(51) 99999-0000"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="carInterest">Carro de interesse</Label>
        <Input
          id="carInterest"
          name="carInterest"
          placeholder="Ex: Chevrolet Onix 1.4"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Conte pra gente o que você procura"
          rows={4}
        />
      </div>

      {state.error && (
        <p className="text-sm text-brand-red">{state.error}</p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="h-auto w-full gap-2 rounded-xl bg-brand-yellow px-6 py-4 font-display text-base font-bold uppercase tracking-wide text-black hover:bg-brand-yellow"
      >
        <Send className="size-4" />
        {pending ? 'Enviando...' : 'Enviar mensagem'}
      </Button>
    </form>
  )
}
