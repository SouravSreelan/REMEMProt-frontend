"use client"
import { BubbleChart } from '@/components/Chart';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const RemprotResult = () => {
  const searchQuery = useSearchParams();
  const [data, setData] = useState();
  // const [data, setData] = useState<ResultItem[] | undefined>();
  const analysisInput = searchQuery.get('analysisInput');
  const csrfToken = getCookie('csrftoken')
  useEffect(() => {
    if (analysisInput) {
      const postData = new URLSearchParams();
      postData.append('analysisInput', analysisInput);
      const getData = async () => {
        if (csrfToken) {
          const res = await fetch('http://localhost:8000/RememProt/enrichment/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-CSRFToken': csrfToken, // Set the CSRF token here
            },
            body: postData.toString(), // Use the formatted form data
            credentials: 'include',
            // setData(res.json())
          })
          const responseData = await res.json();
          setData(responseData);
          console.log(data)
        }
      }
      getData()
    }

  }, [analysisInput])

  return (
    <div>{JSON.stringify(data)}</div>
    // <BubbleChart />
  )
}

export default RemprotResult