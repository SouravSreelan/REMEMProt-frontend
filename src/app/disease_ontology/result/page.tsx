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
            const response = await fetch('http://127.0.0.1:8000/RememProt/dose_ontology/', {
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
                  <TableCell key={cellIndex}>{cell}</TableCell>
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
              <Table>
                {renderTableHeader()}
                {renderTableBody()}
              </Table>
              <div className='pagination'>
                <Button className='mx-3 mt-2' onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </Button>
    
                {Array.from({ length: Math.min(total_pages, 5) }, (_, index) => {
                  const page = currentPage - 2 + index; 
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