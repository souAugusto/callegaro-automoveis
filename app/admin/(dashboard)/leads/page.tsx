import type { Metadata } from 'next'
import { getAllLeads, formatDate } from '@/lib/data'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { LeadStatusSelect } from '@/components/admin/lead-status-select'
import { DeleteButton } from '@/components/admin/delete-button'
import { removeLead } from './actions'

export const metadata: Metadata = { title: 'Leads' }

export default async function AdminLeadsPage() {
  const sorted = await getAllLeads()

  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
        Leads
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Contatos recebidos pelo site, WhatsApp e redes sociais.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Nome</TableHead>
              <TableHead className="text-muted-foreground">Telefone</TableHead>
              <TableHead className="text-muted-foreground">Origem</TableHead>
              <TableHead className="text-muted-foreground">Interesse</TableHead>
              <TableHead className="text-muted-foreground">Data</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right text-muted-foreground">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((lead) => (
              <TableRow key={lead.id} className="border-white/10">
                <TableCell className="font-medium text-white">
                  {lead.name}
                </TableCell>
                <TableCell>
                  <a
                    href={`tel:${lead.phone}`}
                    className="text-muted-foreground hover:text-white"
                  >
                    {lead.phone}
                  </a>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {lead.origin}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {lead.carInterest}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(lead.createdAt)}
                </TableCell>
                <TableCell>
                  <LeadStatusSelect leadId={lead.id} status={lead.status} />
                </TableCell>
                <TableCell className="text-right">
                  <DeleteButton
                    id={lead.id}
                    action={removeLead}
                    confirmMessage={`Excluir o lead de ${lead.name}?`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {sorted.length === 0 && (
          <p className="p-8 text-center text-sm text-muted-foreground">
            Nenhum lead recebido ainda.
          </p>
        )}
      </div>
    </div>
  )
}
