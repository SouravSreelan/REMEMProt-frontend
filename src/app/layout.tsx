"use client"
import Navbar from '@/components/ui/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/ui/Footer'
import { useEffect, useState } from 'react'
import { setCookie } from 'cookies-next'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(false)
  useEffect(() => {

    const getCsrfToken = async () => {
      setLoading(true)
      const url = 'http://localhost:8000/RememProt/get_csrf_token/';
      const res = await fetch(url)
      const data = await res.json()
      if (data.csrfToken) {
        setCookie('csrftoken', data.csrfToken, {
          sameSite: 'strict',
          secure: true
        });
        setLoading(false)
      }
      setLoading(false)
    }
    getCsrfToken()
  }, [])
  return (
    
    <html lang="en">
      <body className={`${inter.className},  min-h-screen`}>

        <div className='p-5'>
          {/* <div aria-hidden="true" className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-62 opacity-40 dark:opacity-20">
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
          </div> */}

          <Navbar />
        </div>

        {loading && (
          <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
              <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>                </div>
        )}
        {children}
        <div className='w-full'>
          <Footer />
        </div>
      </body>
    </html >
  )
}
