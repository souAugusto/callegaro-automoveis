import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, UserRound } from 'lucide-react'
import { posts, getPostBySlug, formatDate } from '@/lib/data'
import { site, whatsappLink } from '@/lib/site'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import { PostCard } from '@/components/blog/post-card'

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Artigo não encontrado' }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3)
  const paragraphs = post.content.split('\n\n')

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-brand-yellow"
      >
        <ArrowLeft className="size-4" />
        Voltar ao blog
      </Link>

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

      <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
        {post.title}
      </h1>

      <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-black">
        <Image
          src={post.cover || '/placeholder.svg'}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>

      <div className="prose-invert mt-8 space-y-4">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-card p-6 text-center">
        <p className="font-display text-lg font-bold uppercase tracking-wide text-white">
          Ficou com alguma dúvida?
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Fale com a nossa equipe pelo WhatsApp e tire suas dúvidas sem
          compromisso.
        </p>
        <a
          href={whatsappLink(
            `Olá! Li o artigo "${post.title}" no blog da ${site.name} e gostaria de saber mais.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.03]"
        >
          <WhatsAppIcon className="size-4" />
          Falar no WhatsApp
        </a>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
            Leia também
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
