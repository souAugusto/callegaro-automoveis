// Configuração central da loja (dados fictícios).
// TODO: mover para variáveis de ambiente / banco de dados ao plugar o backend.

export const SITE_NAME = 'Callegaro Automóveis'

export const site = {
  name: SITE_NAME,
  shortName: 'Callegaro',
  city: 'Parobé',
  state: 'RS',
  // Número usado nos links do WhatsApp (formato internacional, só dígitos).
  whatsapp: '5551999990000',
  whatsappDisplay: '(51) 99999-0000',
  phone: '(51) 3543-0000',
  email: 'contato@callegaroautomoveis.com.br',
  address: 'Av. do Trabalhador, 1234 - Centro, Parobé - RS, 95630-000',
  hours: [
    { label: 'Segunda a Sexta', value: '08h30 às 18h30' },
    { label: 'Sábado', value: '09h00 às 13h00' },
    { label: 'Domingo', value: 'Fechado' },
  ],
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
  },
  // Mapa embed (endereço fictício aproximado em Parobé/RS).
  mapEmbedUrl:
    'https://www.google.com/maps?q=Parob%C3%A9%2C%20RS&output=embed',
}

/**
 * Monta um link do WhatsApp com mensagem pré-preenchida.
 */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

export const mainNav = [
  { label: 'Início', href: '/' },
  { label: 'Estoque', href: '/estoque' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/contato' },
]
