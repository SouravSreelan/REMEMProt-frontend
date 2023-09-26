"use client"
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import speciesData from '@/constants/data.json';
import Link from 'next/link'

const REMEMProtCSEA = () => {
    const [sampleText, setSampleText] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleLoadSample = () => {
        const sampleData = speciesData.rememProtData.map((gene) => gene.name);
        setSampleText(sampleData.join('\n'));
    };

    const handleSubmit = () => {
        const userInputGenes = sampleText.trim().split('\n');
    
        const foundGenes = userInputGenes.filter((userGene) =>
            speciesData.csea_new.some((gene) => gene.genesymbol === userGene)
        );
    
        if (foundGenes.length > 0) {
            window.location.href = `/rememprot-csea/result?analysisInput=${encodeURIComponent(sampleText)}`;
        } else {
            setErrorMessage('Gene(s) not found in the data');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen/2">
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-14">
                    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight lg:mb-10 dark:text-white">REMEMProt-CSEA</h2>
                    <p className="text-md font-normal text-justify max-w-9xl lg:px-20 lg:mx-20"> The enrichment analysis using the REMEMProt-CSEA enables the visualization of a set of query proteins if <i> a priori </i> is identified in a particular experimental/biological context. This also enables the users to cross-refer to enrichment methods, profiling/differential expression, and biological contexts such as disease, organism, and cell line/tissue source for their protein of interest.</p>
                </div>
                <Card className="bg-slate-200 max-w-xl mx-auto ">
                    <CardHeader>
                        <CardTitle className='text-xl'>Enter Gene ID/ Gene Symbol :</CardTitle>
                    </CardHeader>
                    <CardContent className="">
                        <div className="flex flex-col w-full gap-2 max-w-xl mx-auto">
                            <Textarea placeholder="Enter Genes here." className="min-h-[20rem] rounded-xl"
                                value={sampleText}
                                onChange={(e) => {
                                    setSampleText(e.target.value);
                                    setErrorMessage(''); 
                                }}
                            />
                            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                            <div className="flex justify-end  gap-2 mt-5">
                                <Button onClick={handleLoadSample}>Load Sample</Button>
                                <Button onClick={handleSubmit} disabled={!sampleText}>Submit Data</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default REMEMProtCSEA;
