import type { LeadStatus } from '@/lib/data'

export const leadStatusStyles: Record<LeadStatus, string> = {
  Novo: 'bg-brand-yellow text-black',
  'Em contato': 'bg-white/15 text-white',
  Negociando: 'bg-blue-500/20 text-blue-300',
  Vendido: 'bg-emerald-500/20 text-emerald-300',
  Perdido: 'bg-brand-red/20 text-brand-red',
}
