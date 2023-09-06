"use client"
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import React, { useState } from 'react'
import speciesData from '@/constants/data.json';

import Link from 'next/link'

const BatchQuery = () => {
    const [species, setSpecies] = useState('Homo Sapiens')
    const [sampleText, setSampleText] = useState('');
    const handleLoadSample = () => {
        const selectedSpeciesData = speciesData.speciesSampleData.find((item) => item.species === species);

        if (selectedSpeciesData) {
            const sampleData = selectedSpeciesData.genes.map((gene) => gene.name);
            setSampleText(sampleData.join('\n'));
        } else {
            // Handle the case when selectedSpeciesData is not found
            console.error('Selected species data not found');
        }
    };

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
                                <Select onValueChange={(value) => setSpecies(value)} defaultValue='Homo Sapiens'>
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
                            <Textarea placeholder="Enter Genes here." className="min-h-[20rem] rounded-xl" value={sampleText}
                                onChange={(e) => setSampleText(e.target.value)} />
                            <div className="flex justify-end  gap-2 mt-5">
                                <Button onClick={handleLoadSample}>Load Sample</Button>
                                <Link href={{
                                    pathname: '/batch_query/result',
                                    query: { species, bqueryInput: sampleText }
                                }}>
                                    <Button disabled={!species} >Submit Data</Button>
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