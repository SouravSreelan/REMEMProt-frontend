"use client";
import Spinner from "@/components/ui/Spinner";
import { url } from "@/constants";
import { fetcher } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const DiseaseResult = () => {
  const searchParams = useSearchParams();
  const doseInput = searchParams.get("doseInput");
  const searchInput = searchParams.get("searchInput");
  const [mergedData, setMergedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total_pages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const requestBody = {
          page: currentPage,
        };
        if (doseInput) {
          requestBody.doseInput = doseInput;
        }

        if (searchInput) {
          requestBody.searchInput = searchInput;
        }
        console.log("JSON.stringify(requestBody)", JSON.stringify(requestBody));
        const response = await fetch(`${url}/RememProt/dose_ontology/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        // setLoading(false);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        setMergedData(responseData.merged_data);
        setTotalPages(responseData.pagination.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doseInput, searchInput, currentPage]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const renderTableHeader = () => {
    if (mergedData.length === 0) return null;

    const headers = Object.keys(mergedData[0]);

    return (
      <TableHeader className="bg-slate-300">
        <TableRow>
          {headers.map((header) => (
            <TableHead
              key={header}
              className="text-black font-bold border-r-2 border-white"
              rowSpan={2}
            >
              <strong> {header}</strong>
            </TableHead>
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
            {Object.entries(row).map(([key, cell], cellIndex) => (
              <TableCell key={cellIndex}>
                {key === "PMID" ? (
                  <a
                    className="text-blue-600"
                    href={`https://pubmed.ncbi.nlm.nih.gov/${cell}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {cell}
                  </a>
                ) : key === "Gene description" ? (
                  cell.charAt(0).toUpperCase() + cell.slice(1)
                ) : (
                  cell
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto text-center mb-10 mt-12 lg:mb-14 ">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight lg:mb-10 dark:text-white">
          Disease Ontology Enrichment Result
        </h2>
        <p className="text-md font-normal text-center max-w-9xl mb-3">
          {" "}
          The data for disease-protein association is retrieved from the{" "}
          <a
            className="text-blue-500"
            href="https://www.disgenet.org/dbinfo"
            target="__blank"
          >
            {" "}
            DisGeNET database
          </a>
        </p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <center>
            <div className="flex mx-10 w-5/6 pe-10 items-center justify-center">
              <Table className="w-full justify-center">
                {/* <TableCaption> <h2 className='text-lg mt-3'> The data for disease-protein association is retrieved from the <Link href={"https://www.disgenet.org"} target='__blank' className='text-blue-500'> DisGeNET database</Link></h2></TableCaption> */}
                {renderTableHeader()}
                {renderTableBody()}
              </Table>
            </div>
          </center>
          <div className="pagination">
            <Button
              className="mx-3 mt-2"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {Array.from({ length: Math.min(total_pages, 5) }, (_, index) => {
              const page = currentPage - 2 + index + 1;
              return page > 0 && page <= total_pages ? (
                <Button
                  className="mx-1 mt-2"
                  key={page}
                  onClick={() => goToPage(page)}
                  disabled={currentPage === page}
                >
                  {page}
                </Button>
              ) : null;
            })}

            <Button
              className="mx-3 mt-2"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === total_pages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default DiseaseResult;
