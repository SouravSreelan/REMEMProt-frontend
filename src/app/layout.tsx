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
  // const [loading, setLoading] = useState(false)


  // let _csrfToken = null;

  // async function getCsrfToken() {
  //   if (_csrfToken === null) {
  //     const response = await fetch(`http://localhost:8000/RememProt/get_csrf_token/`, {
  //       credentials: 'include',
  //     });
  //     const data = await response.json();
  //     _csrfToken = data.csrfToken;
  //   }
  //   return _csrfToken;
  // }



  // const [cookies, setCookie] = useCookies(['csrftoken']) // initilize cookies
  // const csrf = cookieCutter.get('csrftoken')
  // useEffect(() => {
  //   // if (!csrf) {
  // const getCsrfToken = async () => {
  //   setLoading(true)
  //   const res = await fetch(`http://localhost:8000/RememProt/get_csrf_token/`)
  //   // const res = await fetch(`https://ciods.in/RememProt/get_csrf_token/`)
  //   const data = await res.json()
  //   if (data.csrfToken) {
  //     cookieCutter.set('csrftoken', data.csrfToken, {
  //       path: '/', // The root path to make the cookie available site-wide.
  //       domain: '.ciods.in', // Allow subdomains of vercel.app to access the cookie.
  //       secure: true, // Enforce secure (HTTPS) connections for the cookie.
  //       sameSite: 'lax', // Adjust as needed for your use case.
  //     });
  //     setLoading(false)
  //   }
  //   // if (res.status === 200) {
  //   //   const data = await res.json();
  //   //   setLoading(false)
  //   //   return data;
  //   // } else {
  //   //   throw new Error(res.statusText);
  //   // }
  // }
  //   getCsrfToken()
  //   // }
  // }, [])

  const getCsrfToken = async () => {
    // setLoading(true)
    const res = await fetch(`http://localhost:8000/RememProt/get_csrf_token/`)
    // const res = await fetch(`https://ciods.in/RememProt/get_csrf_token/`)
    const data = await res.json()
    if (data.csrfToken) {
      cookies().set('csrftoken', data.csrfToken, {
        path: '/browse', // The root path to make the cookie available site-wide.
        domain: 'localhost', // Allow subdomains of vercel.app to access the cookie.
        secure: true, // Enforce secure (HTTPS) connections for the cookie.
        sameSite: 'lax', // Adjust as needed for your use case.
      });
      // setLoading(false)
    }
    // if (res.status === 200) {
    //   const data = await res.json();
    //   setLoading(false)
    //   return data;
    // } else {
    //   throw new Error(res.statusText);
    // }
  }

  getCsrfToken()
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
