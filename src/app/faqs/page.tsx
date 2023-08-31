import React from 'react'
import data from '@/constants/data.json'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Faqs = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8  lg:py-14 mx-auto mt-12 lg:mt-0">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14 ">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight  dark:text-white">Frequently asked questions.</h2>
      </div>
      <section className="bg-white dark:bg-gray-900">

        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
          {data.faq.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} >
              <AccordionTrigger className='text-2xl text-left'>{item.question}</AccordionTrigger>
              <AccordionContent className='text-xl'>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  )
}

export default Faqs