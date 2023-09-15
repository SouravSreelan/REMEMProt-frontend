"use client"
import Spinner from '@/components/ui/Spinner';
import { url } from '@/constants';
import { fetcher } from '@/lib/utils';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const DiseaseResult = () => {
    const searchParams = useSearchParams();
    const doseInput = searchParams.get('doseInput');
    const [final_np, setfinal_np] = useState<string[][]>([]);
    const [n, setn] = useState([]);
    const [genes, setgenes] = useState([]);
    const [hoveredRow, setHoveredRow] = useState(-1);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (doseInput) {

            try {
                const getData = async () => {
                    setLoading(true);
                    const postData = {
                        doseInput: doseInput,
                    }
                    const responseData = await fetcher(`${url}/RememProt/dose_ontology/`,  postData);
                    setfinal_np(responseData.final_np);
                    setgenes(responseData.genes);
                    setn(responseData.n);
                    setLoading(false);
                };
                getData();
            } catch (error) {
                console.error('Fetch error:', error);
                setLoading(false);
            }
        }
    }, [ doseInput]);

    return (
        <>
            {loading && <Spinner />}
            <div className="row justify-end mr-60 mb-1" style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="items-right justify-right border w-5 h-4 bg-blue-300 border-red-100 rounded-sm"></div>
                        <span style={{ marginLeft: '5px' }}>Present</span>
           
                        <div className="ms-3 items-right justify-right border w-5 h-4 bg-white border-red-100 rounded-sm"></div>
                     <span style={{ marginLeft: '5px' }}>Not Present</span>
            </div>
            <div className="flex justify-center">
                <div className="w-11/12">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs bg-gray-200 text-black">
                                <tr className="text-center">
                                    <th className="py-3 border border-white" scope="col"></th>
                                    {n &&
                                        n.map((item, index) => (
                                            <th className="py-3 px-2 border border-white" scope="col" key={index}>
                                                {item}
                                            </th>
                                        ))}
                                </tr>
                            </thead>
                            <tbody>
                                {final_np &&
                                    final_np.map((rowData, rowIndex) => (
                                        <tr
                                            key={rowIndex}
                                            className="bg-white border border-gray"
                                        >
                                            {rowData.map(
                                                (cellData: string | number | boolean, cellIndex: number) => (
                                                    <td
                                                        key={cellIndex}
                                                        className={`px-1 py-1 border border-red-100 ${cellIndex === 0
                                                            ? "font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                            : ""
                                                            } ${cellData === 1
                                                                ? "transition-transform duration-500 hover:scale-110 bg-blue-300" // Apply animation classes here
                                                                : ""
                                                            }`}
                                                        onMouseEnter={() => setHoveredRow(rowIndex)}
                                                        onMouseLeave={() => setHoveredRow(-1)}
                                                    >
                                                        {cellData === 1 || cellData === 0 ? "" : cellData}
                                                        {hoveredRow === rowIndex && (
                                                            <div className="bg-blue-100 p-1 absolute -top-8 left-0 w-full text-center text-black">
                                                                {genes[rowIndex]}
                                                            </div>
                                                        )}
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DiseaseResult