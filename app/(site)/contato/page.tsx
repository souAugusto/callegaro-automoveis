import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Navigation } from 'lucide-react'
import { getMapEmbedUrl, getDirectionsUrl, whatsappLink, type SiteConfig } from '@/lib/site-config'
import { getSiteSettings } from '@/lib/db'
import { WhatsAppIcon } from '@/components/whatsapp-icon'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings()
  return {
    title: 'Contato e Localização',
    description: `Fale com a ${site.name}. Telefone, endereço e horário de atendimento em ${site.address.city}/${site.address.state}.`,
    alternates: {
      canonical: '/contato',
    },
  }
}

function getFaqs(site: SiteConfig) {
  return [
    {
      question: `A ${site.name} aceita troca com entrada?`,
      answer:
        'Sim. Avaliamos o seu usado na hora e o valor entra como parte do pagamento do carro novo, com entrada facilitada.',
    },
    {
      question: 'Vocês fazem financiamento?',
      answer:
        'Sim, trabalhamos com os principais bancos para encontrar a melhor condição de financiamento para o seu perfil, com aprovação rápida.',
    },
    {
      question: 'Qual o horário de funcionamento da loja?',
      answer: `Atendemos ${site.hours.map((h) => `${h.days.toLowerCase()} das ${h.time}`).join(', ')}.`,
    },
    {
      question: `Onde fica a ${site.name}?`,
      answer: `Ficamos na ${site.address.full}, de fácil acesso para quem vem de Taquara, Igrejinha, Três Coroas e Sapiranga.`,
    },
    {
      question: 'Os carros passam por alguma revisão antes da venda?',
      answer:
        'Sim, todos os veículos são revisados e têm procedência verificada antes de irem para o estoque.',
    },
    {
      question: 'Como entro em contato para tirar dúvidas sobre um carro?',
      answer:
        'Você pode ligar, mandar mensagem no WhatsApp ou vir até a loja pessoalmente — nossa equipe responde rápido e sem compromisso.',
    },
  ]
}

export default async function ContatoPage() {
  const site = await getSiteSettings()
  const faqs = getFaqs(site)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="mb-10 max-w-2xl">
        <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-yellow">
          Fale conosco
        </span>
        <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-5xl">
          Vamos conversar sobre o seu próximo carro
        </h1>
        <p className="mt-4 text-muted-foreground">
          Ligue, mande uma mensagem no WhatsApp ou venha até a loja. Nossa
          equipe responde rápido e sem compromisso.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-card p-5">
            <MapPin className="mt-0.5 size-5 shrink-0 text-brand-yellow" />
            <div>
              <p className="font-display font-bold uppercase tracking-wide text-white">
                Endereço
              </p>
              <p className="text-sm text-muted-foreground">{site.address.full}</p>
              <a
                href={getDirectionsUrl(site)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-yellow hover:underline"
              >
                <Navigation className="size-3.5" />
                Como chegar
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-card p-5">
            <Phone className="mt-0.5 size-5 shrink-0 text-brand-yellow" />
            <div>
              <p className="font-display font-bold uppercase tracking-wide text-white">
                Telefone
              </p>
              <a
                href={`tel:${site.phoneRaw}`}
                className="text-sm text-muted-foreground hover:text-white"
              >
                {site.phone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-card p-5">
            <Mail className="mt-0.5 size-5 shrink-0 text-brand-yellow" />
            <div>
              <p className="font-display font-bold uppercase tracking-wide text-white">
                E-mail
              </p>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-muted-foreground hover:text-white"
              >
                {site.email}
              </a>
            </div>
          </div>

          <a
            href={whatsappLink(site, 'Olá! Vim pelo site e gostaria de mais informações.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 font-display text-base font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.02]"
          >
            <WhatsAppIcon className="size-5" />
            Falar no WhatsApp
          </a>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-card">
            <div className="p-5 pb-0">
              <p className="font-display font-bold uppercase tracking-wide text-white">
                Horário de atendimento
              </p>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Dia</TableHead>
                  <TableHead className="text-muted-foreground">Horário</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {site.hours.map((h) => (
                  <TableRow key={h.days} className="border-white/10">
                    <TableCell className="font-medium text-white">
                      {h.days}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {h.time}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <iframe
            src={getMapEmbedUrl(site)}
            title={`Mapa da localização da ${site.name}`}
            className="h-full min-h-100 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <section className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
          Perguntas frequentes
        </h2>
        <div className="mt-6 space-y-4">
          {faqs.map((f) => (
            <div
              key={f.question}
              className="rounded-2xl border border-white/10 bg-card p-5"
            >
              <h3 className="font-display font-bold text-white">
                {f.question}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
