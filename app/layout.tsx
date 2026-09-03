import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Oswald } from 'next/font/google'
import './globals.css'
import { SITE_STATIC } from '@/lib/site-config'
import { getSiteSettings } from '@/lib/db'

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

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings()

  return {
    metadataBase: new URL(SITE_STATIC.url),
    title: {
      default: `${site.name} — Carros Usados e Seminovos em Parobé, RS`,
      template: '%s | Callegaro Automóveis',
    },
    description: site.description,
    keywords: [
      'carros usados',
      'carros seminovos',
      'carros populares',
      'financiamento de carros',
      'Parobé',
      'Rio Grande do Sul',
      site.name,
    ],
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: `${site.name} — Carros Usados e Seminovos em Parobé, RS`,
      description: site.description,
      url: site.url,
      siteName: site.name,
      locale: 'pt_BR',
      type: 'website',
      images: [
        {
          url: '/logo-callegaro-preto.png',
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.name} — Carros Usados e Seminovos em Parobé, RS`,
      description: site.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const site = await getSiteSettings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phoneRaw,
    email: site.email,
    image: `${site.url}/logo-callegaro-preto.png`,
    logo: `${site.url}/logo-callegaro-preto.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
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
    sameAs: [site.social.instagram, site.social.facebook],
  }

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
