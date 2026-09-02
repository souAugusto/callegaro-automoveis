import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getPostById } from '@/lib/data'
import { PostForm } from '@/components/admin/post-form'
import { updatePostAction } from '../actions'

export const metadata: Metadata = { title: 'Editar post' }

export default async function EditarPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = getPostById(id)
  if (!post) notFound()

  const action = updatePostAction.bind(null, id)

  return (
    <div>
      <Link
        href="/admin/posts"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-brand-yellow"
      >
        <ArrowLeft className="size-4" />
        Voltar para posts
      </Link>

      <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
        Editar post
      </h1>

      <div className="mt-6 max-w-2xl rounded-2xl border border-white/10 bg-card p-6">
        <PostForm post={post} action={action} />
      </div>
    </div>
  )
}
