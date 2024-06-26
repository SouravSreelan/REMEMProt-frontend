import React from 'react'
import data from '@/constants/data.json';


const Contributors = () => {
    return (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8  lg:py-14 mx-auto mt-12 lg:mt-0">
            <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14 ">
                <h2 className="text-2xl font-bold md:text-4xl md:leading-tight  dark:text-white">Contributors</h2>
            </div>
            <div className="space-y-8">
                <div className="items-center">
                <p className="text-xl md:text-3xl md:leading-tight text-center lg:mb-5 dark:text-white"><i> We acknowledge the following Contributors</i></p>
                    {data.contributors.map((item, index) => (
                        <div key={index} className="ml-4 p-5 border-b">
                            <h1 className="text-xl font-bold text-justify">{index + 1}. <span className='font-normal text-justify leading-3'> <a href={item.doiLink} target="_blank" rel="noopener noreferrer">{item.details}</a></span></h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>)
}

export default Contributors