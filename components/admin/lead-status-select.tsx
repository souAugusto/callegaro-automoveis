'use client'

import { useTransition } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { leadStatuses, type LeadStatus } from '@/lib/data'
import { changeLeadStatus } from '@/app/admin/(dashboard)/leads/actions'

export function LeadStatusSelect({
  leadId,
  status,
}: {
  leadId: string
  status: LeadStatus
}) {
  const [pending, startTransition] = useTransition()

  return (
    <Select
      value={status}
      disabled={pending}
      onValueChange={(value) =>
        startTransition(() => {
          changeLeadStatus(leadId, value as LeadStatus)
        })
      }
    >
      <SelectTrigger size="sm" className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {leadStatuses.map((s) => (
          <SelectItem key={s} value={s}>
            {s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
