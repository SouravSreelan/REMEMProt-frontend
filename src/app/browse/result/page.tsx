"use client"
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react';
import browseData from '@/constants/browseTableData.json';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'next/navigation';
import Spinner from '@/components/ui/Spinner';
import { fetcher } from '@/lib/utils';
import { url } from '@/constants';

const BrowseResult = () => {
    const [gene, setGene] = useState('');
    const [loading, setLoading] = useState(false);
    const [transmemStatus, setTransmemStatus] = useState('');
    const [cellMarker, setCellMarker] = useState<proteinDataProps["cellMarker"]>([]);
    const searchParams = useSearchParams()
    const species = searchParams.get('species')
    const method = searchParams.get('method')
    const tissueCell = searchParams.get('tissueCell')
    const [data, setData] = useState<JsonDataProps>();

    useEffect(() => {
        const getData = async () => {
            if (species && method && tissueCell) {
                const postData = {
                    species: species,
                    method: method,
                    tissueCell: tissueCell
                };
                try {
                    setLoading(true)
                    const jsonData = await fetcher(`${url}/RememProt/browseResult/`, postData)
                    console.log(jsonData)
                    setData(jsonData.final_formatted_data)
                    setLoading(false)
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            }
        }
        getData()
    }, [species, method, tissueCell]);

    const handleProteinClick = (proteinData: proteinDataProps) => {
        setGene(proteinData.gene);
        setTransmemStatus(proteinData.transmemStatus);
        setCellMarker(proteinData.cellMarker);
    };


    const numItems = data?.data.length || 0;


    return (
        <>
            {loading && (
                <Spinner />
            )}
            <div className="w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-12 lg:mt-0">
                <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14 ">
                    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">Browse Results</h2>
                </div>

                <div className="w-full mx-auto">
                    <h3 className='font-semibold text-xl'>Organism: {`${species}`}</h3> <br />

                    <div className={`w-full mx-auto grid grid-cols-1 ${numItems === 2 ? 'md:grid-cols-2' : null} gap-4`}>
                        {data && data.data?.map((dataItem, dataIndex) => (
                            <>
                                <Dialog key={dataIndex}>
                                    <Card className="bg-slate-200 max-w-full p-5">
                                        <h2 className='text-lg font-semibold'>Analysis: <span className='font-normal'>{dataItem.analysis}</span></h2>
                                        <Separator className='flex justify-center mt-5' />
                                        <h2 className='text-lg font-semibold'>Context: <span className='font-normal text-justify'>{dataItem.context}</span></h2>
                                        <Separator className='flex justify-center mt-5' />
                                        <h2 className='text-lg font-semibold'>Method: <span className='font-normal'>{dataItem.method}</span></h2>
                                        <Separator className='flex justify-center mt-5' />
                                        <h2 className='text-lg font-semibold'>Tissue/Cell line: <span className='font-normal'>{dataItem.tissue_or_cell_line}</span></h2>
                                        <Separator className='flex justify-center mt-5' />
                                        <h2 className='text-lg font-semibold'>PubMed ID: <span className='font-normal'>{dataItem.pubmedId}</span></h2>
                                        <Separator className='flex justify-center mt-5' />
                                        <CardContent>
                                            <div className={`w-full mt-5 mx-auto grid grid-cols-2 gap-4 ${numItems === 1 ? 'lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12' : 'lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6'}`}>
                                                {dataItem.proteinData.map((protein, index) => (
                                                    <DialogTrigger key={index} asChild>
                                                        <div
                                                            onClick={() => handleProteinClick(protein)}
                                                            className={`cursor-pointer group hover:scale-105 transform transition-transform duration-300 rounded-3xl border-[.5px] drop-shadow-sm bg-white ${protein.transmemStatus === 'YES' ? 'border-green-500' : 'border-red-500'} bg-opacity-50 shadow-2xl shadow-gray-600/10`}
                                                            style={{ overflow: 'hidden' }}
                                                        >
                                                            <div className='p-4 sm:p-8' style={{ maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                <h3 className="text-lg  lg:text-xl/2 xl:text-base 2xl:text-xl text-center font-semibold text-gray-800 dark:text-white">
                                                                    {protein.gene}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </DialogTrigger>
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
                                                    <Label htmlFor="name" className="text-left text-lg">
                                                        Protein:
                                                    </Label>
                                                    <h3 className='font-normal text-lg '>{gene}</h3>
                                                </div>
                                                <Separator />
                                                <div className="grid grid-cols-3 items-center gap-4">
                                                    <Label htmlFor="name" className="text-left text-lg">
                                                        Transmembrane status:
                                                    </Label>
                                                    <h3 className='font-normal text-lg '>{transmemStatus}</h3>
                                                </div>
                                                <Separator />
                                                <div className="grid items-center gap-4">
                                                    <Label htmlFor="name" className="text-left text-lg">
                                                        Cell Marker Status: -
                                                    </Label>
                                                </div>
                                                {cellMarker.map((cell: any, index: any) => (
                                                    <React.Fragment key={index}>
                                                        <div className="grid grid-cols-4 justify-center items-center text-center gap-4">
                                                            <Label htmlFor="name" className="text-center text-lg">
                                                                Cell Name:
                                                            </Label>
                                                            <h3 className='font-normal text-left text-lg '>{cell.cellName}</h3>
                                                        </div>
                                                        <div className="grid grid-cols-4 justify-center items-center text-center gap-4">
                                                            <Label htmlFor="name" className="text-center text-lg">
                                                                Tissue Type:
                                                            </Label>
                                                            <h3 className='font-normal text-lg text-left'>{cell.tissueType}</h3>
                                                        </div>
                                                        <div className="grid grid-cols-4 justify-center items-center text-center gap-4">
                                                            <Label htmlFor="name" className="text-center text-lg">
                                                                Cancer Type:
                                                            </Label>
                                                            <h3 className='font-normal text-lg text-left'>{cell.cancerType}</h3>
                                                        </div>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </DialogContent>
                                    )}
                                </Dialog>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BrowseResult;