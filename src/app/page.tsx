"use client"
import Hero from '@/components/Hero'
import Image from 'next/image'
import About from './about/page'
import Services from '../components/services'
import { useEffect, useState } from 'react'
import { setCookie } from 'cookies-next'

export default function Home() {
  
  return (
    <>
   
      <Hero />
      <About />
      <Services />
    </>
  )

}
