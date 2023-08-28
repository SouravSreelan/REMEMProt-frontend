import React from 'react';
import Link from 'next/link';

interface ServicesCardProps {
    title: string,
    description: string
    link: string
}
const ServicesCard = (props: ServicesCardProps) => {
    return (

        <div className="group hover:scale-105 transform transition-transform duration-300 rounded-3xl border-[.5px] drop-shadow-sm bg-white border-gray-400 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">

            <div className='p-6 sm:p-8'>

                <div className="mt-6 relative">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        {props.title}
                    </h3>
                    <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300 text-justify">
                        {props.description}
                    </p>
                </div>
            </div>
            <div className="mt-auto  flex border-t  border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                <Link href={{
                    pathname: props.link
                }} className="w-full py-3 px-4   rounded-bl-3xl rounded-br-3xl flex justify-center items-center  font-medium  text-gray-700 transition-colors text-sm sm:p-4  hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-300" >
                    <span>Read more</span>
                </Link>
            </div>
        </div>




    );
};

export default ServicesCard;