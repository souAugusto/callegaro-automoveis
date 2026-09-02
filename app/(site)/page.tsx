import { Hero } from '@/components/home/hero'
import { TrustBadges } from '@/components/home/trust-badges'
import { FeaturedCars } from '@/components/home/featured-cars'
import { Financing } from '@/components/home/financing'
import { Testimonials } from '@/components/home/testimonials'
import { Location } from '@/components/home/location'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <FeaturedCars />
      <Financing />
      <Testimonials />
      <Location />
    </>
  )
}
