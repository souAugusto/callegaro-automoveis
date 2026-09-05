import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Info } from 'lucide-react'
import { getAllCars } from '@/lib/db'
import { formatBRL, formatKm, objectPosition } from '@/lib/data'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DeleteButton } from '@/components/admin/delete-button'
import { cn } from '@/lib/utils'
import { removeCar } from './actions'

export const metadata: Metadata = { title: 'Carros' }

const statusStyles: Record<string, string> = {
  Disponível: 'bg-brand-yellow text-black',
  Reservado: 'bg-white/15 text-white',
  Vendido: 'bg-brand-red text-white',
}

export default async function AdminCarrosPage({
  searchParams,
}: {
  searchParams: Promise<{ slugAjustado?: string }>
}) {
  const cars = await getAllCars()
  const { slugAjustado } = await searchParams

  return (
    <div>
      {slugAjustado && (
        <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-brand-yellow/30 bg-brand-yellow/10 p-4 text-sm text-brand-yellow">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p>
            Já existia um carro com esse nome, versão e ano. Para não gerar
            um link duplicado, foi criado o endereço{' '}
            <strong>/estoque/{slugAjustado}</strong> automaticamente.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
            Carros
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {cars.length} veículos cadastrados no estoque.
          </p>
        </div>
        <Link
          href="/admin/carros/novo"
          className="inline-flex h-auto items-center gap-2 rounded-xl bg-brand-yellow px-4 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.02]"
        >
          <Plus className="size-4" />
          Novo carro
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Veículo</TableHead>
              <TableHead className="text-muted-foreground">Ano</TableHead>
              <TableHead className="text-muted-foreground">Km</TableHead>
              <TableHead className="text-muted-foreground">Preço</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right text-muted-foreground">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id} className="border-white/10">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-black">
                      <Image
                        src={car.images[0] || '/placeholder.svg'}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                        style={{ objectPosition: objectPosition(car.imageFocus[car.images[0]]) }}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {car.brand} {car.model}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {car.version}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {car.year}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatKm(car.km)}
                </TableCell>
                <TableCell className="font-medium text-brand-yellow">
                  {formatBRL(car.price)}
                </TableCell>
                <TableCell>
                  <Badge className={statusStyles[car.status]}>
                    {car.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/admin/carros/${car.id}`}
                      aria-label="Editar"
                      className={cn(
                        'flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-white',
                      )}
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <DeleteButton
                      id={car.id}
                      action={removeCar}
                      confirmMessage={`Excluir ${car.brand} ${car.model}?`}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {cars.length === 0 && (
          <p className="p-8 text-center text-sm text-muted-foreground">
            Nenhum carro cadastrado ainda.
          </p>
        )}
      </div>
    </div>
  )
}
