import { FlagshipHero } from '@/components/home/flagship-hero'
import { TrustBadges } from '@/components/home/trust-badges'
import { FeaturedCars } from '@/components/home/featured-cars'
import { Financing } from '@/components/home/financing'
import { Testimonials } from '@/components/home/testimonials'
import { Location } from '@/components/home/location'
import { getFlagshipCar } from '@/lib/data'

export default function HomePage() {
  const flagshipCar = getFlagshipCar()

  return (
    <>
      <FlagshipHero car={flagshipCar} />
      <FeaturedCars excludeId={flagshipCar?.id} />
      <TrustBadges />
      <Financing />
      <Testimonials />
      <Location />
    </>
  )
}
