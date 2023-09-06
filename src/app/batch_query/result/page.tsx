"use client"
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { url } from '@/constants';
import { fetcher } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const BqueryResult = () => {
  const searchParams = useSearchParams();
  const species = searchParams.get('species');
  const bqueryInput = searchParams.get('bqueryInput');
  const [data, setData] = useState<Record<number, ResultItem[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async (page: number) => {
      if (!species || !bqueryInput || data[page]) {
        return; // Data already cached for this page
      }
      const postData = {
        species: species,
        bqueryInput: bqueryInput,
        page: page.toString()
      }

      try {
        const responseData = await fetcher(`${url}/RememProt/bqueryResult/`, postData)
        console.log(responseData)
        // const responseData = await response.json();
        setData(prevData => ({
          ...prevData,
          [page]: responseData.results,
        }));
        setTotalPages(responseData.pagination.total_pages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(currentPage);
  }, [species, bqueryInput, currentPage, data]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const currentPageData = data[currentPage] || [];

  return (
    <>
      {/* Render the data */}
      {/* {currentPageData.map((item, index) => ( */}
      <div className='p-10'>
        <div className='flex justify-between p-5'>
          <h1 className='font-bold text-xl'>Organim : <span className='font-semibold text-xl'>{species}</span> </h1>
          <p></p>
        </div>
        <Table >
          <TableCaption>For inquires regarding the complete dataset download, kindle <Link href={'/contactus'} className='text-blue-500'>contact us</Link></TableCaption>
          <TableHeader className='bg-slate-300'>
            <TableRow >
              <TableHead rowSpan={2} className="text-black font-bold border-r-2 border-white">Gene Symbol</TableHead>
              <TableHead rowSpan={2} className='text-black font-bold border-r-2 border-white'>Transmembrane</TableHead>
              <TableHead rowSpan={2} className='border-r-2 text-black font-bold border-white'>Profile and/or differential expression</TableHead>
              <TableHead rowSpan={2} className="text-center border-r-2 text-black font-bold border-white">Context of identification</TableHead>
              {species !== 'Rattus norvegicus' && (
                <TableHead colSpan={12} className="text-center text-black font-bold">Cell Marker Status</TableHead>
              )}
            </TableRow>
            {species !== 'Rattus norvegicus' && (
              <TableRow>
                <TableHead className="text-center font-bold border-r-2 text-black  border-white" >Tissue Type</TableHead>
                <TableHead className="text-center border-r-2 border-white text-black font-bold">Cancer Type</TableHead>
                <TableHead className="text-center text-black font-bold">Cell Name</TableHead>
              </TableRow>
            )}
          </TableHeader>
          <TableBody>
            {currentPageData.map((item) => (
              <TableRow key={item.id} className=''>
                <>
                  <TableCell className="font-semibold" >{item.geneSymbol}</TableCell>
                  <TableCell>{item.isTrans}</TableCell>
                  <TableCell>{item.profileOrDifex}</TableCell>
                  <TableCell className="text-justify font-normal ">{item.contxtOfIdent}</TableCell>
                  {species !== 'Rattus norvegicus' && (
                    <>
                      <TableCell className="text-left">{item.tissueType}</TableCell>
                      <TableCell className="text-left">{item.cancerType}</TableCell>
                      <TableCell className="text-left">{item.cellName}</TableCell>
                    </>
                  )}
                </>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='p-5 flex justify-end '>
        {/* Pagination buttons */}
        <Button onClick={() => goToPage(currentPage - 1)} className='mr-5' disabled={currentPage === 1}>
          Previous
        </Button >
        <Button onClick={() => goToPage(currentPage + 1)} className='mr-5' disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </>
  );
};

export default BqueryResult;

