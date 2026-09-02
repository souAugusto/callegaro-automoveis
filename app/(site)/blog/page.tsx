import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/data'
import { PostCard } from '@/components/blog/post-card'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Dicas sobre manutenção, financiamento e compra de carros seminovos. Conteúdo produzido pela nossa equipe para ajudar você a comprar com segurança.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <header className="mb-10">
        <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-yellow">
          Nosso blog
        </span>
        <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-5xl">
          Dicas para comprar e cuidar do seu carro
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Conteúdo prático sobre manutenção, financiamento e documentação,
          escrito pela equipe que vive o mercado de seminovos todos os dias.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
