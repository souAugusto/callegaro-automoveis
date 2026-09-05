'use client'

import { useActionState } from 'react'
import { Save } from 'lucide-react'
import type { Car } from '@/lib/data'
import { carStatuses, transmissions, fuels, TRANSMISSION_UNSPECIFIED } from '@/lib/data'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ImageUploadField } from '@/components/admin/image-upload-field'
import type { CarFormState } from '@/app/admin/(dashboard)/carros/actions'

export function CarForm({
  car,
  action,
}: {
  car?: Car
  action: (prevState: CarFormState, formData: FormData) => Promise<CarFormState>
}) {
  const [state, formAction, pending] = useActionState<CarFormState, FormData>(
    action,
    {},
  )

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="brand">Marca*</Label>
          <Input id="brand" name="brand" defaultValue={car?.brand} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="model">Modelo*</Label>
          <Input id="model" name="model" defaultValue={car?.model} required />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="version">Versão*</Label>
          <Input
            id="version"
            name="version"
            defaultValue={car?.version}
            placeholder="Ex: 1.6 Comfortline"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Ano*</Label>
          <Input
            id="year"
            name="year"
            type="number"
            defaultValue={car?.year}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="km">Quilometragem*</Label>
          <Input
            id="km"
            name="km"
            type="number"
            defaultValue={car?.km}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">Cor*</Label>
          <Input id="color" name="color" defaultValue={car?.color} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="doors">Portas</Label>
          <Input
            id="doors"
            name="doors"
            type="number"
            defaultValue={car?.doors ?? undefined}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="transmission">Câmbio</Label>
          <Select
            name="transmission"
            defaultValue={car?.transmission ?? TRANSMISSION_UNSPECIFIED}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TRANSMISSION_UNSPECIFIED}>Não informado</SelectItem>
              {transmissions.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fuel">Combustível*</Label>
          <Select name="fuel" defaultValue={car?.fuel ?? fuels[0]}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fuels.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Preço (R$)*</Label>
          <Input
            id="price"
            name="price"
            type="number"
            defaultValue={car?.price}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status*</Label>
          <Select name="status" defaultValue={car?.status ?? carStatuses[0]}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {carStatuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Fotos</Label>
        <ImageUploadField
          existingImages={car?.images.map((url) => ({
            url,
            focus: car.imageFocus[url] ?? { x: 50, y: 50 },
          }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição*</Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={car?.description}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="flex w-fit items-center gap-2 text-sm text-white">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={car?.featured ?? false}
            className="size-4 rounded border-white/20 bg-transparent accent-brand-yellow"
          />
          Exibir na grade "Carros em destaque" da home
        </label>
        <label className="flex w-fit items-center gap-2 text-sm text-white">
          <input
            type="checkbox"
            name="isFlagship"
            defaultChecked={car?.isFlagship ?? false}
            className="size-4 rounded border-white/20 bg-transparent accent-brand-yellow"
          />
          Carro principal da home (carro-chefe)
        </label>
        <p className="text-xs text-muted-foreground">
          Só um carro pode ser o carro-chefe por vez — marcar este
          desmarca automaticamente o anterior.
        </p>
      </div>

      {state.error && <p className="text-sm text-brand-red">{state.error}</p>}

      <Button
        type="submit"
        disabled={pending}
        className="h-auto gap-2 rounded-xl bg-brand-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-black hover:bg-brand-yellow"
      >
        <Save className="size-4" />
        {pending ? 'Salvando...' : 'Salvar carro'}
      </Button>
    </form>
  )
}
