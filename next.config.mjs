/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      // Padrão é 1MB, pequeno demais pra enviar várias fotos de carro (o
      // formulário de carro no admin faz upload de imagem via Server Action).
      bodySizeLimit: '25mb',
    },
  },
}

export default nextConfig
