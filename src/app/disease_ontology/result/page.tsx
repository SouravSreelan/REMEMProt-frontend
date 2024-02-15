"use client"
import Spinner from '@/components/ui/Spinner';
import { url } from '@/constants';
import { fetcher } from '@/lib/utils';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from "@/components/ui/button";



const DiseaseResult = () => {
    const searchParams = useSearchParams();
    const doseInput = searchParams.get('doseInput');
    const [mergedData, setMergedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total_pages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await fetch(`${url}/RememProt/dose_ontology/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({  doseInput, page: currentPage }),
            });
            // setLoading(false);
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const responseData = await response.json();
            setMergedData(responseData.merged_data);
            setTotalPages(responseData.pagination.total_pages);
          } catch (error) {
            console.error('Error fetching data:', error);
          }finally {
            setLoading(false);
          }
        };
    
        fetchData();
    }, [doseInput, currentPage]);
  
    const goToPage = (page) => {
      setCurrentPage(page);
    };

      const renderTableHeader = () => {
        if (mergedData.length === 0) return null;
    
        const headers = Object.keys(mergedData[0]);
    
        return (
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header}><strong> {header}</strong></TableHead>
              ))}
            </TableRow>
          </TableHeader>
        );
      };
    
      const renderTableBody = () => {
        return (
          <TableBody>
            {mergedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  // <TableCell key={cellIndex}>{cell}</TableCell>
                  <TableCell key={cellIndex}>
                  {cell === "BEFREE" ? <a href="https://www.disgenet.org/dbinfo" target='__blank'>
                   <div className='flex'> {cell} <svg className='ms-1 mt-1' width="13" height="13" viewBox="0 0 15 15" fill="primary" xmlns="http://www.w3.org/2000/svg"><path d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z" fill="blue" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div></a>: cell}
                </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        );
      };
    
    //   return (
    //     <>
    //     {loading && <Spinner />}

    //     <div>
    //       <Table className=''>
    //         {renderTableHeader()}
    //         {renderTableBody()}
    //       </Table>
    //     </div>
    //        </>
    //   );

    return (
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Table className='w-full'>
                {renderTableHeader()}
                {renderTableBody()}
              </Table>
              <div className='pagination'>
                <Button className='mx-3 mt-2' onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </Button>
    
                {Array.from({ length: Math.min(total_pages, 5) }, (_, index) => {
                  const page = currentPage - 2 + index+ 1; 
                  return page > 0 && page <= total_pages ? (
                    <Button className='mx-1 mt-2' key={page} onClick={() => goToPage(page)} disabled={currentPage === page}>
                      {page}
                    </Button>
                  ) : null;
                })}
    
                <Button className='mx-3 mt-2' onClick={() => goToPage(currentPage + 1)} disabled={currentPage === total_pages}>
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      );
    };
    
    
    export default DiseaseResult;