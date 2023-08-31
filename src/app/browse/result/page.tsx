"use client"
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import browseData from '@/constants/browseTableData.json';
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'next/navigation';
import { getCookie } from 'cookies-next';
import Spinner from '@/components/ui/Spinner';

const BrowseResult = () => {
    const resultArray = [{}, {}]; // Your mock result array
    const noOfResult = resultArray.length;
    const [selectedProtein, setSelectedProtein] = useState('');
    const [gene, setGene] = useState('');
    const [loading, setLoading] = useState(false);
    const [transmemStatus, setTransmemStatus] = useState('');
    const [cellMarker, setCellMarker] = useState<proteinDataProps["cell_marker_status"]>([]);
    const searchParams = useSearchParams()
    const species = searchParams.get('species')
    const method = searchParams.get('method')
    const tissueCell = searchParams.get('tissueCell')
    const csrfToken = getCookie('csrftoken')
    const [data, setData] = useState<JsonDataProps>();


    useEffect(() => {
        const getData = async () => {
            if (species && method && tissueCell) {
                const postData = new URLSearchParams();
                postData.append('species', species);
                postData.append('method', method);
                postData.append('tissueCell', tissueCell);
                try {
                    setLoading(true)
                    if (csrfToken) {
                        const res = await fetch('http://localhost:8000/RememProt/browseResult/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'X-CSRFToken': csrfToken, // Set the CSRF token here
                            },
                            body: postData.toString(), // Use the formatted form data
                            credentials: 'include', // Include cookies in the request

                        })
                        const jsonData = await res.json()
                        setData(jsonData)

                        setLoading(false)
                        // console.log(methods)
                    }
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            }
        }
        getData()
    }, [species, method, tissueCell, csrfToken])

    interface JsonDataProps {
        final_formatted_data: {
            gene: string;
            Transmem_status: string;
            profileOrDifferential: string;
            contxtOfIdent: string
            pmid: string;
            cell_marker_status: {
                tissueType: string;
                cancerType: string;
                cellName: string;
            }[];
        }[];
        method: string;
        species: string;
        tissueCell: string;
    }
    interface proteinDataProps {
        gene: string;
        Transmem_status: string;
        profileOrDifferential: string;
        contxtOfIdent: string
        pmid: string;
        cell_marker_status: {
            tissueType: string;
            cancerType: string;
            cellName: string;
        }[];
    }

    const handleProteinClick = (proteinData: proteinDataProps) => {
        setGene(proteinData.gene);
        setTransmemStatus(proteinData.Transmem_status)
        setCellMarker(proteinData.cell_marker_status)

    };

    console.log({ browseData, data})
    return (
        <>
            {loading && (
                <Spinner />
            )}
            <div className="w-full px-4 py-10 sm:px-6 lg:px-8  lg:py-14 mx-auto mt-12 lg:mt-0">
                <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14 ">
                    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight  dark:text-white">Browse Results.</h2>
                </div>

                <div className="w-full mx-auto">
                    <h3 className='font-semibold text-xl'>  Organism : {`${browseData.organisms}`}</h3> <br />

                    <div className={`w-full mx-auto ${browseData.data.length > 1 ? 'grid grid-cols-2 gap-4' : ''}`}>
                        {
                            <Dialog>
                                <Card className="bg-slate-200  max-w-full p-5">
                                    <h2 className='text-lg font-semibold'>Analysis : <span className='font-normal'>{data?.final_formatted_data[0].profileOrDifferential}</span></h2>
                                    <Separator className='flex justify-center mt-5' />
                                    <h2 className='text-lg font-semibold'>Context : <span className='font-normal text-justify'>{data?.final_formatted_data[0].contxtOfIdent}</span></h2>
                                    <Separator className='flex justify-center mt-5' />
                                    <h2 className='text-lg font-semibold'>Method : <span className='font-normal'>{data?.method}</span></h2>
                                    <Separator className='flex justify-center mt-5' />
                                    <h2 className='text-lg font-semibold'>Tissue/Cell line : <span className='font-normal'>{data?.tissueCell}</span></h2>
                                    <Separator className='flex justify-center mt-5' />
                                    <h2 className='text-lg font-semibold'>PubMed ID : <span className='font-normal'>{data?.final_formatted_data[0].pmid}</span></h2>
                                    <Separator className='flex justify-center mt-5' />
                                    <CardTitle className='mt-5 '>Select Protein</CardTitle>
                                    <CardContent>
                                        <div className="w-full mt-5 mx-auto grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">

                                            {data?.final_formatted_data.map((protein, index) => (
                                                // <div key={index} className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                                                <DialogTrigger key={index} asChild>
                                                    <div
                                                        onClick={() => handleProteinClick(protein)}
                                                        className="cursor-pointer group hover:scale-105 transform transition-transform duration-300 rounded-3xl border-[.5px] drop-shadow-sm bg-white border-gray-400 bg-opacity-50 shadow-2xl shadow-gray-600/10">

                                                        <div className='p-6 sm:p-8'>

                                                            <h3 className="text-2xl text-center font-semibold text-gray-800 dark:text-white">
                                                                {protein.gene.length > 7 ? `${protein.gene.slice(0, 7)}...` : protein.gene}
                                                            </h3>


                                                        </div>

                                                    </div>
                                                </DialogTrigger>

                                                // </div>
                                            ))}

                                        </div>

                                    </CardContent>
                                </Card>
                                {gene && (

                                    <DialogContent className="sm:max-w-4xl">
                                        <DialogHeader>
                                            <DialogTitle>Protein Data</DialogTitle>

                                        </DialogHeader>
                                        <Separator />
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-3 items-center gap-4">
                                                <Label htmlFor="name" className="text-left  text-lg">
                                                    Protein :
                                                </Label>
                                                <h3 className='font-normal text-lg '>{gene}</h3>
                                            </div>
                                            <Separator />
                                            <div className="grid grid-cols-3 items-center gap-4">
                                                <Label htmlFor="name" className="text-left  text-lg">
                                                    Transmembrane status :
                                                </Label>
                                                <h3 className='font-normal text-lg '>{transmemStatus}</h3>
                                            </div>
                                            <Separator />
                                            <div className="grid items-center gap-4">
                                                <Label htmlFor="name" className="text-left  text-lg">
                                                    Cell Marker Status : -
                                                </Label>
                                            </div>
                                            {cellMarker.map((cell: any, index: any) => (
                                                <>
                                                    <div className="grid grid-cols-4 justify-center items-center text-center  gap-4">
                                                        <Label htmlFor="name" className="text-center  text-lg">
                                                            Cell Name :
                                                        </Label>
                                                        <h3 className='font-normal text-left text-lg '>{cell.cellName}</h3>
                                                    </div>
                                                    <div className="grid grid-cols-4 justify-center items-center text-center  gap-4">
                                                        <Label htmlFor="name" className="text-center  text-lg">
                                                            Tissue Type :
                                                        </Label>
                                                        <h3 className='font-normal text-lg text-left'>{cell.tissueType}</h3>
                                                    </div>
                                                    <div className="grid grid-cols-4 justify-center items-center text-center  gap-4">
                                                        <Label htmlFor="name" className="text-center  text-lg">
                                                            Cancer Type :
                                                        </Label>
                                                        <h3 className='font-normal text-lg text-left'>{cell.cancerType}</h3>
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    </DialogContent>
                                )
                                }
                            </Dialog>

                        }
                    </div>


                </div>
            </div>
        </>
    )
}

export default BrowseResult