import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import { getAllPosts, formatDate } from '@/lib/data'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteButton } from '@/components/admin/delete-button'
import { cn } from '@/lib/utils'
import { removePost } from './actions'

export const metadata: Metadata = { title: 'Posts' }

export default function AdminPostsPage() {
  const posts = getAllPosts()

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
            Posts
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {posts.length} artigos publicados no blog.
          </p>
        </div>
        <Link
          href="/admin/posts/novo"
          className="inline-flex h-auto items-center gap-2 rounded-xl bg-brand-yellow px-4 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.02]"
        >
          <Plus className="size-4" />
          Novo post
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Título</TableHead>
              <TableHead className="text-muted-foreground">Autor</TableHead>
              <TableHead className="text-muted-foreground">Data</TableHead>
              <TableHead className="text-right text-muted-foreground">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id} className="border-white/10">
                <TableCell className="max-w-xs truncate font-medium text-white">
                  {post.title}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {post.author}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(post.date)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      aria-label="Editar"
                      className={cn(
                        'flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-white',
                      )}
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <DeleteButton
                      id={post.id}
                      action={removePost}
                      confirmMessage={`Excluir o post "${post.title}"?`}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {posts.length === 0 && (
          <p className="p-8 text-center text-sm text-muted-foreground">
            Nenhum post publicado ainda.
          </p>
        )}
      </div>
    </div>
  )
}
