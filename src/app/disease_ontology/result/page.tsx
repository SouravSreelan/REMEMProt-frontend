"use client"
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const DiseaseResult = () => {
    const searchParams = useSearchParams();
    const [data, setData] = useState();
    const doseInput = searchParams.get('doseInput');
    const csrfToken = getCookie('csrftoken')

    useEffect(() => {
        if (doseInput && csrfToken) {
            const postData = new URLSearchParams();
            postData.append('doseInput', doseInput);
            const getData = async () => {
                const res = await fetch('http://localhost:8000/RememProt/dose_ontology/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': csrfToken,
                    },
                    body: postData.toString(),
                    credentials: 'include',
                })
                const responseData = await res.json();
                setData(responseData);
                console.log(responseData)
                console.log(data)
            }
            getData()
        }
    },[])

    return (
        <div>{JSON.stringify(data)}</div>
    )
}

export default DiseaseResult