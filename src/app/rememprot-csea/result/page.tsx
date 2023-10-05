"use client"

import React, { useEffect, useState } from 'react';
import { fetcher } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import Spinner from '@/components/ui/Spinner';
import Chart from '@/components/ui/Chart';  // Import your Chart component
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow, TableCell, TableFooter } from '@/components/ui/table';
import Link from 'next/link';
import { url } from '@/constants';
import { Button } from '@/components/ui/button';
import data from '@/constants/data.json'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { parse } from 'json2csv';
const RemprotResult = () => {
  const searchQuery = useSearchParams();
  const species = searchQuery.get('species');
  const [enrichmentData, setEnrichmentData] = useState<EnrichmentResult[] | undefined>();
  const [loading, setLoading] = useState(true);

  const analysisInput = searchQuery.get('analysisInput');

  const convertToCSV = () => {
    const fields = enrichmentData && Object.keys(enrichmentData[0]); // get the headers from the first object in the array
    const csv = json2csv({ data: enrichmentData, fields });
    return csv;
  }

  const downloadCSV = () => {
    // const csv = convertToCSV();
    // const blob = new Blob([csv], { type: 'text/csv' });
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'data.csv';
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    const csvData = parse(enrichmentData);

    // Create a Blob containing the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';

    // Trigger the download
    a.click();

    // Clean up: Revoke the object URL to free resources
    window.URL.revokeObjectURL(url);

  }

  useEffect(() => {
    const fetchData = async () => {
      if (!species || !analysisInput) {
        return;
      }

      setLoading(true);
      const postData = {
        species: species,
        analysisInput: analysisInput,
      };

      try {
        const response = await fetcher(`${url}/RememProt/enrichment/`, postData);
        setEnrichmentData(response.enrichment_result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [species, analysisInput]);

  return (
    <div className='p-10 flex justify-center items-center flex-col'>
      {enrichmentData &&
        <>
          <Chart data={enrichmentData} />
          <div className='w-full mt-10 p-5' style={{overflow: 'hidden'}}>
            <div className='w-4/6 lg:ms-10 pb-5 flex justify-end'>
              <Button onClick={downloadCSV}> Download </Button>            </div>
              <div className="flex">


            <Table className='w-5/6'>
              <TableCaption>For inquires regarding the complete dataset download, kindle <Link href={'/contactus'} className='text-blue-500'>contact us</Link></TableCaption>
              <TableHeader className='bg-slate-300'>
                <TableRow >
                  <TableHead rowSpan={2} className="text-black font-bold border-r-2 border-white">ID</TableHead>
                  <TableHead rowSpan={2} className="text-black font-bold border-r-2 border-white">Disease_Organism_Cell line/tissue name_membrane protein enrichment methods_Profiling/Differential_Context of Identification</TableHead>
                  <TableHead rowSpan={2} className='text-black font-bold border-r-2 border-white'>Percentage</TableHead>
                  <TableHead rowSpan={2} className='border-r-2 text-black font-bold border-white'>Count</TableHead>
                  <TableHead rowSpan={2} className="text-center border-r-2 text-black font-bold border-white">p_value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrichmentData.map((item, index) => (
                  <TableRow key={index} className=''>
                    <TableCell className="text-justify font-normal" >{item.term}</TableCell>
                    <TableCell className="text-justify font-normal" >{item.enrichment}</TableCell>
                    <TableCell>{item.percentage}</TableCell>
                    <TableCell>{item.count}</TableCell>
                    <TableCell className="">{item.p_value.toExponential(4)}</TableCell>
                    

                  </TableRow>
                  
                ))}
              </TableBody>
              <TableFooter>
              </TableFooter>
              
            </Table>

            <section className="bg-white dark:bg-gray-900 w-1/6">
  <Accordion type="single" collapsible className="" defaultValue="item-0">
    
  {data.box.map((item, index) => (
    <AccordionItem key={index} value={`item-${index}`} >
      <AccordionTrigger className='text-2xl text-left'>{item.question}</AccordionTrigger>
      <AccordionContent className='text-xl whitespace-pre'>{item.answer}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
</section>


          </div></div>
        </>
      } {/* Render the D3chart component */}
      {loading && <Spinner />}

    </div>
  );
};

export default RemprotResult;
