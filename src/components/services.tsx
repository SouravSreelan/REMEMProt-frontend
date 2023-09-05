import ServicesCard from '@/components/ui/servicesCard'
import React from 'react'
import { servicesData } from '@/constants'


const Services = () => {
    return (
        <div className="relative max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8  lg:py-14 mx-auto mt-12 lg:mt-0">
            <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14 ">
                <h2 className="text-2xl font-bold md:text-4xl md:leading-tight  dark:text-white">Tools.</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                {servicesData.map((service) => (
                    <ServicesCard title={service.title} description={service.description} key={service.id} link={service.link} />
                ))}

            </div>
        </div>

    )
}
export default Services