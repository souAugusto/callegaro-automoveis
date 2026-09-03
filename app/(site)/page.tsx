import { FlagshipHero } from '@/components/home/flagship-hero'
import { TrustBadges } from '@/components/home/trust-badges'
import { FeaturedCars } from '@/components/home/featured-cars'
import { Financing } from '@/components/home/financing'
import { Location } from '@/components/home/location'
import { getFlagshipCar } from '@/lib/db'

export default async function HomePage() {
  const flagshipCar = await getFlagshipCar()

  return (
    <>
      <FlagshipHero car={flagshipCar} />
      <FeaturedCars excludeId={flagshipCar?.id} />
      <TrustBadges />
      <Financing />
      <Location />
    </>
  )
}
