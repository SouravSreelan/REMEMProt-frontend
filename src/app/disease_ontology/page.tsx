"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import speciesData from '@/constants/data.json';
import Link from 'next/link'


const DiseaseOntology = () => {
  const [sampleText, setSampleText] = useState('')
  const handleLoadSample = () => {
    const sampleData = speciesData.disease_ontology.map((gene) => gene.name);
    console.log(sampleData)
    setSampleText(sampleData.join('\n'));
  };
  return (
    <div className="flex items-center justify-center h-screen/2">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8  lg:py-14 mx-auto mt-12 lg:mt-0">
        <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-14 ">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight  dark:text-white">Disease Ontology.</h2>
          <p className='text-md font-normal max-w-9xl'>The disease ontology enrichment enables the analysis of the disease associations of the set of query proteins within the curated sets of proteins in REMEMProt. This also help visualize the protein-disease associations in the form of a heat map.</p>
        </div>
        <Card className="bg-slate-200 max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Enter Gene ID/ Gene Symbol :</CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="flex flex-col w-full gap-2 max-w-xl mx-auto">
              <Textarea placeholder="Type your message here." value={sampleText}
                onChange={(e) => setSampleText(e.target.value)} className="min-h-[20rem]" />
              <div className="flex justify-center gap-2 mt-5">
                <Button onClick={handleLoadSample}>Load Sample</Button>
                <Link href={{
                  pathname: '/disease_ontology/result',
                  query: {
                    doseInput: sampleText
                  }
                }}>
                  <Button disabled={!sampleText}>Submit Data</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DiseaseOntology