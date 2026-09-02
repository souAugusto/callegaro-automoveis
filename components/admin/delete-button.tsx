'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DeleteButton({
  id,
  action,
  confirmMessage = 'Tem certeza que deseja excluir este item?',
}: {
  id: string
  action: (formData: FormData) => void
  confirmMessage?: string
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        variant="ghost"
        size="icon-sm"
        aria-label="Excluir"
        className="text-muted-foreground hover:bg-brand-red/10 hover:text-brand-red"
      >
        <Trash2 className="size-4" />
      </Button>
    </form>
  )
}
