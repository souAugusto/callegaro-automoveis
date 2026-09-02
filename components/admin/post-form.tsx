'use client'

import { useActionState } from 'react'
import { Save } from 'lucide-react'
import type { Post } from '@/lib/data'
import { site } from '@/lib/site'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { PostFormState } from '@/app/admin/(dashboard)/posts/actions'

function toDateInputValue(iso?: string) {
  const date = iso ? new Date(iso) : new Date()
  return date.toISOString().slice(0, 10)
}

export function PostForm({
  post,
  action,
}: {
  post?: Post
  action: (prevState: PostFormState, formData: FormData) => Promise<PostFormState>
}) {
  const [state, formAction, pending] = useActionState<PostFormState, FormData>(
    action,
    {},
  )

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título*</Label>
        <Input id="title" name="title" defaultValue={post?.title} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Resumo*</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cover">Imagem de capa (URL)</Label>
          <Input
            id="cover"
            name="cover"
            defaultValue={post?.cover}
            placeholder="/blog/post.png"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Autor*</Label>
          <Input
            id="author"
            name="author"
            defaultValue={post?.author ?? `Equipe ${site.shortName}`}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Data de publicação</Label>
          <Input
            id="date"
            name="date"
            type="date"
            defaultValue={toDateInputValue(post?.date)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">
          Conteúdo* (separe os parágrafos com uma linha em branco)
        </Label>
        <Textarea
          id="content"
          name="content"
          rows={12}
          defaultValue={post?.content}
          required
        />
      </div>

      {state.error && <p className="text-sm text-brand-red">{state.error}</p>}

      <Button
        type="submit"
        disabled={pending}
        className="h-auto gap-2 rounded-xl bg-brand-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-black hover:bg-brand-yellow"
      >
        <Save className="size-4" />
        {pending ? 'Salvando...' : 'Salvar post'}
      </Button>
    </form>
  )
}
