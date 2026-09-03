// Configuração central da loja. Todo o resto do site importa daqui —
// não repita telefone, endereço, e-mail ou redes sociais soltos em outros
// arquivos.

export const SITE = {
  name: 'Callegaro Automóveis',
  legalName: 'Callegaro Comércio de Veículos Ltda',
  description:
    'Revenda de carros usados e seminovos em Parobé, RS. Financiamento, troca com entrada e atendimento de confiança.',
  url: 'https://www.callegaroautomoveis.site',

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
    country: 'BR',
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
} as const

/** Monta um link do WhatsApp com mensagem pré-preenchida. */
export function whatsappLink(message?: string): string {
  if (!message) return SITE.whatsapp
  return `${SITE.whatsapp}?text=${encodeURIComponent(message)}`
}

/** Embed do Google Maps centrado nas coordenadas da loja. */
export const SITE_MAP_EMBED_URL = `https://www.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=16&output=embed`

/** Link "Como chegar" — abre a rota até a loja no Google Maps. */
export const SITE_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${SITE.geo.lat},${SITE.geo.lng}`

export const mainNav = [
  { label: 'Início', href: '/' },
  { label: 'Estoque', href: '/estoque' },
  { label: 'Contato', href: '/contato' },
]
