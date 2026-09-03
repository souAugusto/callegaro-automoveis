// Tipo e valores padrão dos dados do negócio. Os dados de verdade agora
// vêm do banco (tabela site_settings, editável em /admin/site-info — ver
// getSiteSettings() em lib/db.ts). Este arquivo só define o formato e o
// fallback usado enquanto a tabela estiver vazia.

export interface SiteConfig {
  name: string
  legalName: string
  description: string
  url: string
  phone: string
  phoneRaw: string
  whatsapp: string
  email: string
  address: {
    street: string
    neighborhood: string
    city: string
    state: string
    zip: string
    country: string
    full: string
  }
  geo: { lat: number; lng: number }
  hours: { days: string; time: string }[]
  social: { instagram: string; facebook: string }
}

/** Campos técnicos que não são editáveis pelo formulário do admin. */
export const SITE_STATIC = {
  legalName: 'Callegaro Comércio de Veículos Ltda',
  url: 'https://www.callegaroautomoveis.site',
  country: 'BR',
} as const

export const DEFAULT_SITE: SiteConfig = {
  name: 'Callegaro Automóveis',
  legalName: SITE_STATIC.legalName,
  description:
    'Revenda de carros usados e seminovos em Parobé, RS. Financiamento, troca com entrada e atendimento de confiança.',
  url: SITE_STATIC.url,

  phone: '(51) 99675-9522',
  phoneRaw: '+5551996759522',
  whatsapp: 'https://wa.me/5551996759522',
  email: 'everson.callegaro@gmail.com',

  address: {
    street: 'Av. Taquara, 2659',
    neighborhood: 'Vila Nova',
    city: 'Parobé',
    state: 'RS',
    zip: '95630-000',
    country: SITE_STATIC.country,
    full: 'Av. Taquara, 2659 — Vila Nova, Parobé/RS, 95630-000',
  },

  geo: {
    lat: -29.6383827,
    lng: -50.8137415,
  },

  hours: [
    { days: 'Segunda a Sexta', time: '8h00 às 18h30' },
    { days: 'Sábado', time: '8h00 às 16h00' },
    { days: 'Domingo', time: 'Fechado' },
  ],

  social: {
    instagram: 'https://www.instagram.com/callegaroautomoveis3/',
    facebook: 'https://www.facebook.com/p/Callegaro-automóveis-100066760371070/',
  },
}

/** Monta um link do WhatsApp com mensagem pré-preenchida. */
export function whatsappLink(site: Pick<SiteConfig, 'whatsapp'>, message?: string): string {
  if (!message) return site.whatsapp
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`
}

/** Embed do Google Maps centrado nas coordenadas da loja. */
export function getMapEmbedUrl(site: Pick<SiteConfig, 'geo'>): string {
  return `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=16&output=embed`
}

/** Link "Como chegar" — abre a rota até a loja no Google Maps. */
export function getDirectionsUrl(site: Pick<SiteConfig, 'geo'>): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}`
}

export const mainNav = [
  { label: 'Início', href: '/' },
  { label: 'Estoque', href: '/estoque' },
  { label: 'Contato', href: '/contato' },
]
