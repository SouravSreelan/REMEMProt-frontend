"use client"
import Navbar from '@/components/ui/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/ui/Footer'
import { useEffect, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'
import Spinner from '@/components/ui/Spinner'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(false)
  const csrf = getCookie('csrftoken')
  useEffect(() => {
    if (!csrf) {
      const getCsrfToken = async () => {
        setLoading(true)
        // const res = await fetch(`http://localhost:8000/RememProt/get_csrf_token/`)
        const res = await fetch(`https://ciods.in/RememProt/get_csrf_token/`)
        const data = await res.json()
        if (data.csrfToken) {
          // setCookie('csrftoken', data.csrfToken, {
          //   path: '/', // The root path to make the cookie available site-wide.
          //   domain: '.vercel.app', // Allow subdomains of vercel.app to access the cookie.
          //   secure: true, // Enforce secure (HTTPS) connections for the cookie.
          //   sameSite: 'lax', // Adjust as needed for your use case.
          // });
          if (typeof window !== 'undefined') {
            localStorage.setItem('crftoken', data.csrfToken)
          }
          setLoading(false)
        }
        setLoading(false)
      }
      getCsrfToken()
    }
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
          <Spinner />
        )}
        {children}
        <div className='w-full'>
          <Footer />
        </div>
      </body>
    </html >
  )
}
