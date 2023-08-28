import Hero from '@/components/Hero'
import Image from 'next/image'
import About from './about/page'
import Services from './services/page'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
    </>
  )

}
