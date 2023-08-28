import React from 'react';

const Footer = () => {
    return (
        <div className="relative bottom-0 w-full  sm:px-6 bg-gray-200 dark:bg-gray-800">
            {/* <div aria-hidden="true" className="flex  absolute left-1/2 max-w-[100px] h-[50px] w-[100px] transform -translate-x-3">
                <div className="bg-gradient-to-r from-red-500/50 to-purple-100 blur-3xl  rotate-[-60deg] transform -translate-x-[10rem] dark:from-blue-300-900/50 dark:to-purple-900"></div>
                <div className="bg-gradient-to-tl from-red-500 via-blue-100 to-blue-50 blur-3xl rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem] dark:from-indigo-900/70 dark:via-indigo-900/70 dark:to-blue-900/70"></div>
            </div> */}
            <footer className="mt-10 w-full   max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
                {/* Grid */}
                <div className="text-center">
                    <div>
                        <a
                            className="flex-none text-xl font-semibold text-black dark:text-white"
                            href="#"
                            aria-label="Brand"
                        >
                            REMEMProt
                        </a>
                    </div>
                    {/* End Col */}

                    <div className="mt-3">
                        <p className="text-gray-500">
                            {`REMEMProt is a joint project between the `}
                            <a
                                className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
                                href="http://csbmm.yenepoya.res.in/"
                            >
                                Centre for Integrative Omics Data Science (CIODS)
                            </a>{' '}
                            {`, `}
                            <a
                                className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
                                href="https://www.ciods.in"
                            >
                                Center for Systems Biology and Molecular Medicine (CSBMM)
                            </a>
                            {` and OMICS ANALYTICS Pvt.Ltd. supported by`}
                            <a
                                className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
                                href="https://www.yenepoya.res.in/"
                            >
                                Yenepoya (Deemed to be University)
                            </a>

                        </p>
                        <p className="text-gray-500">
                            © CIODS. All Rights Reserved by
                            Yenepoya (Deemed to be University)
                        </p>
                    </div>

                    {/* Social Brands */}
                    <div className="mt-3 space-x-2">
                        <a
                            className="inline-flex justify-center items-center w-10 h-10 text-center text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                            href="#"
                        >
                            <svg
                                className="w-3.5 h-3.5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                {/* SVG Path */}
                            </svg>
                        </a>
                        {/* Repeat for other social links */}
                    </div>
                    {/* End Social Brands */}
                </div>
                {/* End Grid */}
            </footer>
        </div>
    );
};

export default Footer;
