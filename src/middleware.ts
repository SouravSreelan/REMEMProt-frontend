import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
    // const path = request.nextUrl.pathname
    // console.log(path)
    // console.log('middleware')
    // const res = await fetch("http://ciods.in/RememProt/get_csrf_token/")
    // const csrfToken = await res.json()
    // console.log(res)
    // let response = NextResponse.next()

    // response.cookies.set('csrfToken', 'hello')

    // console.log(response)
    // // Set the CSRF token cookie
    // // response.headers['Set-Cookie'] = 'csrfToken=csrfToken; expires=Tue, 15 Nov 2023 00:00:00 GMT'

    return NextResponse.next()
}


// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
    ]
}

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export async function middleware(request: NextRequest, response: NextResponse) {
//     const path = request.nextUrl.pathname
//     console.log(path)
//     console.log('middleware')
//     const res = await fetch("http://ciods.in/RememProt/get_csrf_token/")
//     const csrfToken = await res.json()
//     console.log(res)

//     // Set the CSRF token cookie
//     cookies.setCookie(response, 'csrfToken', csrfToken, {
//         expires: new Date(Date.now() + 3600000), // Expires in 1 hour
//         httpOnly: true, // The cookie should only be accessible over HTTPS
//         sameSite: 'Strict', // The cookie should only be sent with same-origin requests
//     })

//     return NextResponse.next()
// }


// // See "Matching Paths" below to learn more
// export const config = {
//     matcher: [
//         '/',
//     ]
// }