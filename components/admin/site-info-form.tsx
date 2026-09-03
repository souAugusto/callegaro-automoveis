'use client'

import { useActionState, useState } from 'react'
import { Save, CheckCircle2, Plus, X } from 'lucide-react'
import type { SiteConfig } from '@/lib/site-config'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  saveSiteInfoAction,
  type SiteInfoFormState,
} from '@/app/admin/(dashboard)/site-info/actions'

const initialState: SiteInfoFormState = {}

export function SiteInfoForm({ initial }: { initial: SiteConfig }) {
  const [state, formAction, pending] = useActionState(
    saveSiteInfoAction,
    initialState,
  )
  const [hours, setHours] = useState<{ days: string; time: string }[]>(
    initial.hours.map((h) => ({ days: h.days, time: h.time })),
  )

  function addHourRow() {
    setHours((prev) => [...prev, { days: '', time: '' }])
  }

  function removeHourRow(index: number) {
    setHours((prev) => prev.filter((_, i) => i !== index))
  }

  function updateHourRow(index: number, field: 'days' | 'time', value: string) {
    setHours((prev) =>
      prev.map((h, i) => (i === index ? { ...h, [field]: value } : h)),
    )
  }

  return (
    <form action={formAction} className="space-y-8">
      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
          Dados do negócio
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="name">Nome do negócio*</Label>
            <Input id="name" name="name" defaultValue={initial.name} required />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="description">Descrição curta*</Label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={initial.description}
              required
            />
            <p className="text-xs text-muted-foreground">
              Usada como meta description do site nos resultados de busca.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
          Contato
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone*</Label>
            <Input id="phone" name="phone" defaultValue={initial.phone} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp*</Label>
            <Input
              id="whatsapp"
              name="whatsapp"
              defaultValue={initial.whatsapp}
              required
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="email">E-mail*</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={initial.email}
              required
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
          Endereço
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="street">Rua e número*</Label>
            <Input id="street" name="street" defaultValue={initial.address.street} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="neighborhood">Bairro</Label>
            <Input
              id="neighborhood"
              name="neighborhood"
              defaultValue={initial.address.neighborhood}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">CEP</Label>
            <Input id="zip" name="zip" defaultValue={initial.address.zip} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Cidade*</Label>
            <Input id="city" name="city" defaultValue={initial.address.city} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">Estado*</Label>
            <Input id="state" name="state" defaultValue={initial.address.state} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lat">Latitude*</Label>
            <Input
              id="lat"
              name="lat"
              type="number"
              step="any"
              defaultValue={initial.geo.lat}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lng">Longitude*</Label>
            <Input
              id="lng"
              name="lng"
              type="number"
              step="any"
              defaultValue={initial.geo.lng}
              required
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
            Horários de funcionamento
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addHourRow}
            className="gap-1.5 text-brand-yellow hover:text-brand-yellow"
          >
            <Plus className="size-4" />
            Adicionar
          </Button>
        </div>
        <div className="space-y-3">
          {hours.map((h, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`hours-days-${i}`}>Dia(s)</Label>
                <Input
                  id={`hours-days-${i}`}
                  name="hoursDays"
                  value={h.days}
                  onChange={(e) => updateHourRow(i, 'days', e.target.value)}
                  placeholder="Segunda a Sexta"
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor={`hours-time-${i}`}>Horário</Label>
                <Input
                  id={`hours-time-${i}`}
                  name="hoursTimes"
                  value={h.time}
                  onChange={(e) => updateHourRow(i, 'time', e.target.value)}
                  placeholder="8h00 às 18h30"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Remover horário"
                onClick={() => removeHourRow(i)}
                className="mb-0.5 text-muted-foreground hover:text-brand-red"
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
          {hours.length === 0 && (
            <p className="text-xs text-muted-foreground">
              Nenhum horário cadastrado.
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
          Redes sociais
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input id="instagram" name="instagram" defaultValue={initial.social.instagram} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook</Label>
            <Input id="facebook" name="facebook" defaultValue={initial.social.facebook} />
          </div>
        </div>
      </section>

      {state.error && <p className="text-sm text-brand-red">{state.error}</p>}
      {state.success && (
        <p className="flex items-center gap-2 text-sm text-emerald-400">
          <CheckCircle2 className="size-4" />
          Informações salvas.
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="h-auto gap-2 rounded-xl bg-brand-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-black hover:bg-brand-yellow"
      >
        <Save className="size-4" />
        {pending ? 'Salvando...' : 'Salvar informações'}
      </Button>
    </form>
  )
}
