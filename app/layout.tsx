import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Oswald } from 'next/font/google'
import './globals.css'
import { SITE } from '@/lib/site-config'

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
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Carros Usados e Seminovos em Parobé, RS`,
    template: '%s | Callegaro Automóveis',
  },
  description: SITE.description,
  keywords: [
    'carros usados',
    'carros seminovos',
    'carros populares',
    'financiamento de carros',
    'Parobé',
    'Rio Grande do Sul',
    SITE.name,
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${SITE.name} — Carros Usados e Seminovos em Parobé, RS`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/logo-callegaro-preto.png',
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Carros Usados e Seminovos em Parobé, RS`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  telephone: SITE.phoneRaw,
  email: SITE.email,
  image: `${SITE.url}/logo-callegaro-preto.png`,
  logo: `${SITE.url}/logo-callegaro-preto.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.zip,
    addressCountry: SITE.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE.geo.lat,
    longitude: SITE.geo.lng,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:00',
      closes: '16:00',
    },
  ],
  areaServed: ['Parobé', 'Taquara', 'Igrejinha', 'Três Coroas', 'Sapiranga'],
  priceRange: '$$',
  sameAs: [SITE.social.instagram, SITE.social.facebook],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
