import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { setCookie } from "cookies-next"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const fetcher = async (url: string, csrfToken: string, postData: Record<string, string | number>) => {
  const formattedPostData = new URLSearchParams();

  for (const key in postData) {
    formattedPostData.append(key, postData[key] as string);

  }
  console.log({ csrfToken })

  const res = await fetch(url, {

    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRFToken': csrfToken,
    },
    body: formattedPostData.toString(),
    credentials: 'include',
    cache: 'default'
  });

  const responseData = await res.json();
  return responseData;
}

export function getRandomColor(index: number, opacity: number) {
  const baseHue = index * 137.5;
  const hue = (baseHue + 30) % 360; // Avoid hues close to black (e.g., 0)
  const saturation = 50 + (index * 10) % 50; // Vary the saturation
  const lightness = 50 + (index * 10) % 50; // Vary the lightness
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
}


export const fetchCsrf = async () => {
  try {
    const response = await fetch('http://localhost:8000/RememProt/get_csrf_token/');
    const data = await response.json();
    if (data.csrfToken) {
      // Set the CSRF token cookie
      setCookie('csrftoken', data.csrfToken, {
        path: '/',
        domain: '.ciods.in', // Allow subdomains of ciods.in to access the cookie.
        secure: true,
        sameSite: 'lax',
      });
    }

  } catch (err) {
    console.log(err)
  }
}