import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Oswald } from 'next/font/google'
import './globals.css'
import { SITE_NAME } from '@/lib/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Carros seminovos com financiamento facilitado`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    `Loja de carros populares e seminovos em Parobé/RS. Realize seu sonho e saia de carro novo hoje mesmo com financiamento facilitado, negociação justa e documentação segura.`,
  generator: 'v0.app',
  keywords: [
    'carros seminovos',
    'carros populares',
    'financiamento de carros',
    'Parobé',
    'Rio Grande do Sul',
    SITE_NAME,
  ],
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
