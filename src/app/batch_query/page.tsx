"use client"
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import React, { useEffect, useState } from 'react'
import speciesData from '@/constants/sample.json';
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'
import Link from 'next/link'

const BatchQuery = () => {
    const [species, setSpecies] = useState('')
    const [sampleText, setSampleText] = useState('');
    const [htmlContent, setHtmlContent] = useState('')
    const router = useRouter()
    const csrfToken = getCookie('csrftoken')

    const handleLoadSample = () => {
        const sampleData = speciesData.speciesSampleData.map((item) => item.name);
        setSampleText(sampleData.join('\n'));
    }

    console.log(sampleText)
    const fetchHtmlContent = async () => {
        const postData = {
            species: species,
            bqueryInput: sampleText
        }

        console.log(sampleText)
        try {
            if (csrfToken) {
                const response = await fetch('http://localhost:8000/RememProt/bqueryResult/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': csrfToken, // Set the CSRF token here
                    },
                    body: postData.toString(), // Use the formatted form data
                    credentials: 'include', // Include cookies in the request

                })
                const htmlContent = await response.text();
                console.log(htmlContent)
                return htmlContent;
            }
        } catch (error) {
            console.error('Error fetching HTML content:', error);
            return '';
        }
    };
    useEffect(() => {
        fetchHtmlContent().then((htmlContent) => {
            // console.log(htmlContent)
            setHtmlContent(htmlContent as string);
        })
    }, [])



    return (
        <div className='flex justify-center'>
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8  lg:py-14 mx-auto mt-12 lg:mt-0">
                <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14 ">
                    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight  dark:text-white">Batch Query.</h2>
                    <p className='text-md font-normal max-w-9xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt nam itaque sed eius modi error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!</p>
                </div>
                <Card className="bg-slate-200 max-w-xl mx-auto ">
                    <CardHeader>
                        <CardTitle className='text-xl'>Enter Gene ID/ Gene Symbol :</CardTitle>
                    </CardHeader>
                    <CardContent className="">
                        <div className="flex flex-col w-full gap-2 max-w-xl mx-auto">
                            <div className='mb-5'>
                                <Label htmlFor="species">Species</Label>
                                <Select onValueChange={(value) => setSpecies(value)}>
                                    <SelectTrigger id="framework">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>

                                    <SelectContent className='w-full' position="popper">
                                        {speciesData.species.map((species) => (
                                            <SelectItem key={species.id} value={species.name} > {species.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Textarea placeholder="Type your message here." className="min-h-[20rem] rounded-xl" value={sampleText}
                                onChange={(e) => setSampleText(e.target.value)} />
                            <div className="flex justify-end  gap-2 mt-5">
                                <Button onClick={handleLoadSample}>Load Sample</Button>
                                <Link href={{
                                    pathname: 'http://localhost:8000/RememProt/batch_query/bqueryResult',
                                    query: { species: species, bqueryInput: sampleText },
                                }}>
                                    <Button disabled={!species}>Submit Data</Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div> */}

            </div>

        </div>
    )
}

export default BatchQuery