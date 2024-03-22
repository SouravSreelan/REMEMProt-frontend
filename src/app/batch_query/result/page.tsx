"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { url } from "@/constants";
import { fetcher } from "@/lib/utils";
import Link from "next/link";
import Spinner from "@/components/ui/Spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const BqueryResult = () => {
  const searchParams = useSearchParams();
  const species = searchParams.get("species");
  const bqueryInput = searchParams.get("bqueryInput");
  const [selectedGene, setSelectedGene] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState<Record<number, ResultItem[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedGeneInfo, setSelectedGeneInfo] = useState({});

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleYesClick = (geneSymbol) => {
    setSelectedGene(geneSymbol);
    setDialogOpen(true);
  };

  useEffect(() => {
    const fetchData = async (page: number) => {
      if (!species || !bqueryInput || data[page]) {
        return; // Data already cached for this page
      }
      setLoading(true);
      const postData = {
        species: species,
        bqueryInput: bqueryInput,
        page: page.toString(),
      };

      try {
        const responseData = await fetcher(
          `${url}/RememProt/bqueryResult/`,
          postData
        );
        console.log(responseData);
        // const responseData = await response.json();
        setData((prevData) => ({
          ...prevData,
          [page]: responseData.results,
        }));
        setTotalPages(responseData.pagination.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(currentPage);
  }, [species, bqueryInput, currentPage, data]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleCellMarkerClick = (geneSymbol) => {
    setSelectedGene(geneSymbol);
    setDialogOpen(true);
  };
  const currentPageData = data[currentPage] || [];

  return (
    <>
      {/* Render the data */}
      {/* {currentPageData.map((item, index) => ( */}
      <div className="p-10">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14 ">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            Batch Query Results
          </h2>
          <p className="mt-5 text-md md:text-lg md:leading-tight dark:text-white">
            Protein membrane localization analysis
          </p>
        </div>
        <div className="flex justify-between p-5">
          <h1 className="font-bold text-xl">
            Organism : <span className="font-semibold text-xl">{species}</span>{" "}
          </h1>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {currentPageData && currentPageData.length > 0 ? (
              <Table>
                <TableCaption className="mt-5">
                  For inquires regarding download of the complete dataset,
                  kindly{" "}
                  <Link href={"/contactus"} className="text-blue-500">
                    contact us
                  </Link>
                </TableCaption>
                <TableHeader className="bg-slate-300">
                  <TableRow>
                    <>
                      <TableHead
                        rowSpan={2}
                        className="text-black font-bold border-r-2 border-white"
                      >
                        Gene Symbol
                      </TableHead>
                      <TableHead
                        rowSpan={2}
                        className="text-black font-bold border-r-2 border-white"
                      >
                        Transmembrane Domain status :{" "}
                        <a
                          className="text-blue-500"
                          href="https://services.healthtech.dtu.dk/services/TMHMM-2.0/"
                          target="_blank"
                        >
                          TMHMM - 2.0
                        </a>{" "}
                        <br />{" "}
                      </TableHead>
                      {species == "Homo sapiens" && (
                        <>
                          <TableHead
                            rowSpan={2}
                            className="border-r-2 text-black font-bold border-white"
                          >
                            TM in any Binary Interactor
                          </TableHead>
                          <TableHead
                            rowSpan={2}
                            className="border-r-2 text-black font-bold border-white"
                          >
                            TM in any Complex Interactor
                          </TableHead>
                        </>
                      )}
                      <TableHead
                        rowSpan={2}
                        className="border-r-2 text-black font-bold border-white"
                      >
                        REMEMProt (Profile or differential data)
                      </TableHead>
                      <TableHead
                        rowSpan={2}
                        className="text-center border-r-2 text-black font-bold border-white"
                      >
                        Context of identification
                      </TableHead>
                      {species !== "Rattus norvegicus" && (
                        <TableHead
                          colSpan={12}
                          className="text-center text-black font-bold"
                        >
                          Cell Marker Status
                        </TableHead>
                      )}
                    </>
                  </TableRow>
                  {/* {species !== "Rattus norvegicus" && (
                    <TableRow>
                      <TableHead className="text-center font-bold border-r-2 text-black  border-white">
                        Tissue Type
                      </TableHead>
                      <TableHead className="text-center border-r-2 border-white text-black font-bold">
                        Cancer Type
                      </TableHead>
                      <TableHead className="text-center text-black font-bold">
                        Cell Name
                      </TableHead>
                    </TableRow>
                  )} */}
                </TableHeader>
                <TableBody>
                  {currentPageData.map((item) => (
                    <TableRow key={item.id} className="">
                      <>
                        <TableCell>{item.geneSymbol}</TableCell>
                        <TableCell className="ms-3">{item.isTrans}</TableCell>
                        {species === "Homo sapiens" && (
                          <>
                            <TableCell>
                              {item.binary === "YES" ? (
                                <Dialog
                                  onClose={() => handleCloseDialog()}
                                  isOpen={isDialogOpen}
                                >
                                  <DialogTrigger
                                    className=""
                                    onClick={() =>
                                      handleYesClick(item.geneSymbol)
                                    }
                                  >
                                    <span className="cursor-pointer text-center items-center justify-center text-blue-500 ms-3">
                                      YES
                                    </span>
                                  </DialogTrigger>
                                  <DialogContent className="h-auto max-h-[50vh] w-2/6 overflow-y-scroll">
                                    <div>
                                      <h4 className="text-bold-600 ms-2">
                                        {" "}
                                        <b>Binary Interactor:</b>{" "}
                                      </h4>
                                    </div>

                                    {item.binary_info_list &&
                                      item.binary_info_list.map(
                                        (info, index) => (
                                          <Card
                                            key={index}
                                            className="bg-slate-200 p-5"
                                          >
                                            <h2 className="text-lg font-semibold">
                                              Interactor:{" "}
                                              <span className="font-normal">
                                                {info[0][1]}
                                              </span>
                                            </h2>
                                            <Separator className="flex justify-center mt-5 w-4/6" />
                                            <h2 className="text-lg font-semibold">
                                              TM Status:{" "}
                                              <span className="font-normal text-justify">
                                                {info[1][1]}
                                              </span>
                                            </h2>
                                            <Separator className="flex justify-center mt-5 w-4/6" />
                                            <h2 className="text-lg font-semibold">
                                              {" "}
                                              PubMed ID:{" "}
                                              <span className="font-normal">
                                                {" "}
                                                <a
                                                  // href={`https://pubmed.ncbi.nlm.nih.gov/${info[2][1]}`}
                                                  className="text-blue-500"
                                                  href={`https://pubmed.ncbi.nlm.nih.gov/?term=${info[2][1]}&sort=date`}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  {info[2][1]}
                                                </a>
                                              </span>
                                            </h2>
                                            <Separator className="flex justify-center mt-5 w-4/6" />
                                          </Card>
                                        )
                                      )}
                                  </DialogContent>
                                </Dialog>
                              ) : (
                                <TableCell>
                                  <span className="flex items-start text-left max-w-4/6 justify-start">
                                    {item.binary || "NA "}
                                  </span>
                                </TableCell>
                              )}
                            </TableCell>
                            <TableCell>
                              {item.complex === "YES" ? (
                                <Dialog
                                  onClose={() => handleCloseDialog()}
                                  isOpen={isDialogOpen}
                                >
                                  <DialogTrigger
                                    className=""
                                    onClick={() =>
                                      handleYesClick(item.geneSymbol)
                                    }
                                  >
                                    <span className="cursor-pointer text-center align-middle items-center justify-center text-blue-500 ms-3 mt-10">
                                      YES
                                    </span>
                                  </DialogTrigger>
                                  <DialogContent className="h-auto max-h-[50vh] w-2/6 overflow-y-scroll">
                                    <div>
                                      <h4 className="text-bold-600 ms-2">
                                        {" "}
                                        <b>Complex Interactor:</b>{" "}
                                      </h4>
                                    </div>
                                    {item.complex_info_list.map(
                                      (info, index) => (
                                        <Card
                                          key={index}
                                          className="bg-slate-200 p-5"
                                        >
                                          <h2 className="text-lg font-semibold">
                                            Interactor:{" "}
                                            <span className="font-normal">
                                              {info[0][1]}
                                            </span>
                                          </h2>
                                          <Separator className="flex justify-center mt-5 w-4/6" />
                                          <h2 className="text-lg font-semibold">
                                            TM Status:{" "}
                                            <span className="font-normal text-justify">
                                              {info[1][1]}
                                            </span>
                                          </h2>
                                          <Separator className="flex justify-center mt-5 w-4/6" />
                                          <h2 className="text-lg font-semibold">
                                            {" "}
                                            PubMed ID:{" "}
                                            <span className="font-normal">
                                              {" "}
                                              <a
                                                className="text-blue-500"
                                                href={`https://pubmed.ncbi.nlm.nih.gov/${info[2][1]}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                {info[2][1] || "NA"}
                                              </a>
                                            </span>
                                          </h2>
                                          <Separator className="flex justify-center mt-5 w-4/6" />
                                        </Card>
                                      )
                                    )}
                                  </DialogContent>
                                </Dialog>
                              ) : (
                                <TableCell>
                                  <span className="flex items-start text-left max-w-4/6 justify-start">
                                    {item.complex || "NA "}
                                  </span>
                                </TableCell>
                              )}{" "}
                            </TableCell>
                            {/* <TableCell>{item.complex || "NA "}</TableCell> */}
                          </>
                        )}

                        <TableCell>{item.profileOrDifex}</TableCell>
                        <TableCell className="text-justify font-normal ">
                          {item.contxtOfIdent}
                        </TableCell>
                        {species !== "Rattus norvegicus" && (
                          <>
                            <TableCell className="text-left">
                              {(item.tissueType &&
                                item.tissueType.length > 0) ||
                              (item.cancerType && item.cancerType.length > 0) ||
                              (item.cellName && item.cellName.length > 0) ? (
                                <Dialog
                                  onClose={() => handleCloseDialog()}
                                  isOpen={isDialogOpen}
                                >
                                  <DialogTrigger
                                    className="max-w-4/6"
                                    onClick={() =>
                                      handleCellMarkerClick(item.geneSymbol)
                                    }
                                  >
                                    <span className="cursor-pointer text-blue-500">
                                      YES
                                    </span>
                                  </DialogTrigger>
                                  <DialogContent className="w-4/6 h-auto max-h-[50vh] overflow-y-scroll">
                                    <Card className="bg-slate-200 max-w-4/6 p-5">
                                      <h2 className="text-lg font-semibold">
                                        Tissue Type:{" "}
                                        <span className="font-normal">
                                          {item.tissueType.length > 0
                                            ? item.tissueType.map(
                                                (types, index) => (
                                                  <span key={index}>
                                                    {Array.isArray(types)
                                                      ? types.join(" ")
                                                      : types}{" "}
                                                    |{" "}
                                                  </span>
                                                )
                                              )
                                            : "NA"}
                                        </span>
                                      </h2>
                                      <Separator className="flex justify-center mt-5 w-4/6" />
                                      <h2 className="text-lg font-semibold">
                                        Cancer Type:{" "}
                                        <span className="font-normal">
                                          {item.cancerType.length > 0
                                            ? item.cancerType.map(
                                                (types, index) => (
                                                  <span key={index}>
                                                    {Array.isArray(types)
                                                      ? types.join(" ")
                                                      : types}{" "}
                                                    |{" "}
                                                  </span>
                                                )
                                              )
                                            : "NA"}
                                        </span>
                                      </h2>
                                      <Separator className="flex justify-center mt-5 w-4/6" />
                                      <h2 className="text-lg font-semibold">
                                        Cell Name:{" "}
                                        <span className="font-normal">
                                          {item.cellName.length > 0
                                            ? item.cellName.map(
                                                (names, index) => (
                                                  <span key={index}>
                                                    {Array.isArray(names)
                                                      ? names.join(" ")
                                                      : names}{" "}
                                                    |{" "}
                                                  </span>
                                                )
                                              )
                                            : "NA"}
                                        </span>
                                      </h2>
                                      <Separator className="flex justify-center mt-5 w-4/6" />
                                    </Card>
                                  </DialogContent>
                                </Dialog>
                              ) : (
                                "NA"
                              )}
                            </TableCell>
                          </>
                        )}
                      </>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="2xl:mt-56 2xl:mb-96 xl:mt-28 xl:mb-64 lg:mt-28 lg:mb-28 sm:mt-28 sm:mb-28">
                <p className="text-red-800 text-lG">
                  No data available. Gene not found.
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <div className="p-5 flex justify-end">
        {/* Previous Button */}
        <Button
          onClick={() => goToPage(currentPage - 1)}
          className="mr-5"
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {/* Dynamic Page Buttons */}
        {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
          const page = currentPage - 2 + index; // Calculate nearby page number
          return page > 0 && page <= totalPages ? (
            <Button
              key={page}
              onClick={() => goToPage(page)}
              className="mr-5"
              disabled={currentPage === page}
            >
              {page}
            </Button>
          ) : null;
        })}

        {/* Next Button */}
        <Button
          onClick={() => goToPage(currentPage + 1)}
          className="mr-5"
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default BqueryResult;
