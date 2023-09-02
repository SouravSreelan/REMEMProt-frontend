import Navbar from '@/components/ui/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/ui/Footer'
import { useEffect, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'
import Spinner from '@/components/ui/Spinner'
import { fetchCsrf } from '@/lib/utils'
const inter = Inter({ subsets: ['latin'] })
import { cookies } from 'next/headers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (

    <html lang="en">
      <body className={`${inter.className},  min-h-screen`}>

        <div className='p-5'>
          <Navbar />
        </div>

        {/* {loading && (
          <Spinner />
        )} */}
        {children}
        <div className='w-full'>
          <Footer />
        </div>
      </body>
    </html >
  )
}
