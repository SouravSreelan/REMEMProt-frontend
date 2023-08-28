import React from 'react'

const About = () => {
    return (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8  lg:py-14 mx-auto mt-12 lg:mt-0">
            <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14 ">
                <h2 className="text-2xl font-bold md:text-4xl md:leading-tight  dark:text-white">About Us.</h2>
            </div>

            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-32">
                    <div>
                        <img className="rounded-xl" src="https://www.ciods.in/static/rememb_prot/home%20page%20fig.png" alt="Image Description" />
                    </div>
                    <div className="mt-5 sm:mt-10 lg:mt-0">
                        <div className="space-y-6 sm:space-y-8">
                            <div className="space-y-2 md:space-y-4">
                                <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-gray-200">
                                    REMEMProt
                                </h2>                                <p className="text-gray-500 text-justify">
                                    Resource of Experimental Membrane-Enriched Mass spectrometry-derived Proteome (REMEMProt) is an open resource of experimentally-identified proteins derived by mass spectrometry-based approaches uniquely from plasma membrane enriched samples in diverse biological contexts. This resource currently encompasses such total membrane proteomes and differential expression proteomes from different cell lines and tissue associated with various diseases along with its biological context of study, method of extraction and membrane protein types. These proteomes in Homo sapiens, Mus musculus and Rattus norvegicus species can be browsed at the protein level using Gene Symbol or Entrez Gene ID. REMEMProt is the first resource of its kind that is aimed to serve as a platform for comparitive analysis of the membrane proteomes from diverse studies, multiple membrane proteome enrichment approaches and also the detectability of membrane proteins by mass spectrometry-based approaches till date.                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default About