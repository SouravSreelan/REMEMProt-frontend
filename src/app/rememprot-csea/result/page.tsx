"use client"

import React, { useEffect, useState } from 'react';
import { fetcher } from '@/lib/utils';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import Spinner from '@/components/ui/Spinner';
import D3chart from '@/components/ui/D3chart';  // Import your D3chart component
import { url } from '@/constants';
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow, TableCell, TableFooter } from '@/components/ui/table';
import Link from 'next/link';

const RemprotResult = () => {
  const searchQuery = useSearchParams();
  const [enrichmentData, setEnrichmentData] = useState<EnrichmentResult[] | undefined>();
  const [loading, setLoading] = useState(true);

  const analysisInput = searchQuery.get('analysisInput');
  const csrfToken = getCookie('csrftoken');

  useEffect(() => {
    const fetchData = async () => {
      if (!analysisInput || !csrfToken) {
        return;
      }

      setLoading(true);
      const postData = {
        analysisInput: analysisInput,
      };

      try {
        const response = await fetcher(`${url}/RememProt/enrichment/`, csrfToken, postData);
        setEnrichmentData(response.enrichment_result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [analysisInput, csrfToken]);

  return (
    <div className='p-10 flex justify-center items-center flex-col'>
      {enrichmentData &&
        <>
          <D3chart data={enrichmentData} />
          <div className='w-full mt-10 p-5'>

            <Table className='w-full'>
              <TableCaption>For inquires regarding the complete dataset download, kindle <Link href={'/contactus'} className='text-blue-500'>contact us</Link></TableCaption>
              <TableHeader className='bg-slate-300'>
                <TableRow >
                  <TableHead rowSpan={2} className="text-black font-bold border-r-2 border-white">Disease_Organism_Cell line/tissue name_memb enrich method_Profiling/Differential_Context of Identification</TableHead>
                  <TableHead rowSpan={2} className='text-black font-bold border-r-2 border-white'>Percentage</TableHead>
                  <TableHead rowSpan={2} className='border-r-2 text-black font-bold border-white'>Count</TableHead>
                  <TableHead rowSpan={2} className="text-center border-r-2 text-black font-bold border-white">p_value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrichmentData.map((item) => (
                  <TableRow key={item.p_value} className=''>
                    <TableCell className="text-justify font-normal" >{item.enrichment}</TableCell>
                    <TableCell>{item.percentage}</TableCell>
                    <TableCell>{item.count}</TableCell>
                    <TableCell className="">{item.log10pval}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
              </TableFooter>
            </Table>
          </div>
        </>
      } {/* Render the D3chart component */}
      {loading && <Spinner />}

    </div>
  );
};

export default RemprotResult;
