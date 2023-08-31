"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import speciesData from '@/constants/data.json';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'

import React, { useState } from 'react'
import Spinner from '@/components/ui/Spinner'
// import { cookies } from 'next/headers'

const Browse = () => {
    const [species, setSpecies] = useState("");
    const [method, setMethod] = useState("");
    const [tissue, setTissue] = useState("");
    const [loading, setLoading] = useState(false);
    const [methods, setMethods] = useState([]);
    const [cells, setCells] = useState([]);


    const csrfToken = getCookie('csrftoken')
    const handleSelectSpecies = async (e: string) => {
        setSpecies(e)
        if (csrfToken) {

            const postData = new URLSearchParams();
            postData.append('selectedSpecies', e);
            try {
                setLoading(true)
                const res = await fetch('http://localhost:8000/RememProt/selectedSpecies/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': csrfToken, // Set the CSRF token here
                    },
                    body: postData.toString(), // Use the formatted form data
                    credentials: 'include', // Include cookies in the request

                })
                const data = await res.json()
                if (data.methods) {
                    setMethods(data.methods)
                    setLoading(false)
                }


            } catch (error) {
                console.error('Fetch error:', error);
            }

        }
    }

    const handleSelectMethod = async (e: string) => {
        setMethod(e)
        if (csrfToken) {
            const postData = new URLSearchParams();
            postData.append('selectedSpecies', species);
            postData.append('methodSelect', e);
            try {
                setLoading(true)
                const res = await fetch('http://localhost:8000/RememProt/selectedMethod/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': csrfToken, // Set the CSRF token here
                    },
                    body: postData.toString(), // Use the formatted form data
                    credentials: 'include', // Include cookies in the request

                })
                const data = await res.json()
                if (data.cells) {
                    setCells(data.cells)
                    setLoading(false)
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }

        }
    }


    return (
        <>
            {loading && (
                <Spinner />
            )}
            <div className=' justify-center'>
                <div className="max-w-[85rem]  px-4 py-10 sm:px-6 lg:px-8  lg:py-14 mx-auto mt-12 lg:mt-0">
                    <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14 ">
                        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight  dark:text-white">Browse.</h2>
                        {/* <p className='text-md font-normal max-w-9xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt nam itaque sed eius modi error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!</p> */}
                    </div>
                    <div className=''>
                        <Card className='bg-slate-200 '>
                            <CardHeader>
                                <CardTitle>Select</CardTitle>
                                <CardDescription>
                                    give some text here
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid grid-cols-2  gap-4">
                                    <div className="grid gap-2">
                                        <>
                                            <Label htmlFor="species">Species</Label>
                                            <Select onValueChange={(value) => handleSelectSpecies(value)}>
                                                <SelectTrigger id="framework">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>

                                                <SelectContent className='w-full' position="popper">
                                                    {speciesData.species.map((species) => (
                                                        <SelectItem key={species.id} value={species.name} > {species.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="species">Choose a method</Label>
                                        <Select onValueChange={(value) => handleSelectMethod(value)}>
                                            <SelectTrigger id="framework">
                                                <SelectValue placeholder={species ? 'Select' : 'Please Select a species'} />
                                            </SelectTrigger>
                                            <SelectContent className='w-full' position="popper">
                                                {methods.map((met, index) => (
                                                    <SelectItem key={index} value={met}>{met}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="subject">Tissue/Cell line</Label>
                                    <Select onValueChange={(value) => setTissue(value)}>
                                        <SelectTrigger id="framework">
                                            <SelectValue placeholder={method ? 'Select' : 'Please Select a Method'} />
                                        </SelectTrigger>
                                        <SelectContent className='w-full' position="popper">
                                            {cells.map((met, index) => (
                                                <SelectItem key={index} value={met}>{met}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                            </CardContent>
                            <CardFooter className="justify-between space-x-2">
                                <Button variant="ghost">Cancel</Button>
                                <Link href={{
                                    pathname: '/browse/result',
                                    query: { species, method, tissueCell: tissue }
                                }}>
                                    <Button type='submit' disabled={!species || !method || !tissue}>Submit</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </div >
            </div>
        </>
    )
}

export default Browse