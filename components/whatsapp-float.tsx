import { whatsappLink, type SiteConfig } from '@/lib/site-config'
import { WhatsAppIcon } from './whatsapp-icon'

export function WhatsAppFloat({ site }: { site: SiteConfig }) {
  const href = whatsappLink(site, 'Olá! Vim pelo site e gostaria de mais informações.')
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-semibold text-black shadow-lg shadow-black/40 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="size-6" />
      <span className="hidden sm:inline">Fale conosco</span>
    </a>
  )
}
