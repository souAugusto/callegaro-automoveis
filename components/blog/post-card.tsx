import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, UserRound } from 'lucide-react'
import type { Post } from '@/lib/data'
import { formatDate } from '@/lib/data'

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card transition-all hover:border-brand-yellow/60 hover:shadow-lg hover:shadow-brand-yellow/10"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-black">
        <Image
          src={post.cover || '/placeholder.svg'}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-brand-yellow" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <UserRound className="size-3.5 text-brand-yellow" />
            {post.author}
          </span>
        </div>

        <h3 className="mt-3 font-display text-xl font-bold leading-tight text-white">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wide text-brand-yellow">
          Ler artigo completo
        </span>
      </div>
    </Link>
  )
}
