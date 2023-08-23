"use client"

import React from 'react'
import MouseScroll from './ui/MouseScroll'

const Hero = () => {
    return (
        <div className="relative overflow-hidden">
            {/* Gradients */}
            {/* TODO: add gradient */}

            {/* <div aria-hidden="true" className="flex  absolute -top-96 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-400-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem] dark:from-blue-300-900/50 dark:to-purple-900"></div>
                <div className="bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem] dark:from-indigo-900/70 dark:via-indigo-900/70 dark:to-blue-900/70"></div>
            </div> */}

            {/* End Gradients */}

            <div className="relative z-10">
                <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                    <div className="max-w-5xl text-center mx-auto">
                        {/* Title */}
                        <div className="max-w-screen-9xl px-4 py-32 lg:flex  lg:items-center">
                            <h1 className="block font-semibold text-black text-4xl md:text-5xl lg:text-7xl w-full">
                                Resource of Experimental Membrane-Enriched Mass spectrometry-derived Proteome
                            </h1>
                        </div>
                        {/* End Title */}

                        <div className="lg:w-5xl -mt-10 lg:-mt-[5rem] text-center mx-auto">
                            <p className="mt-8 text-gray-700 dark:text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt nam itaque sed eius modi error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!</p>
                            <div className="mouse_scroll">

                                <div className="mouse">
                                    <div className="wheel"></div>
                                </div>
                                <div>
                                    <span className="m_scroll_arrows unu"></span>
                                    <span className="m_scroll_arrows doi"></span>
                                    <span className="m_scroll_arrows trei"></span>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}

                        {/* End Buttons */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero