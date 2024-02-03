"use client"
//TODO : add a loading spinner while navigating from one page to another page
//TODO : add the sheet from shadcn ui for the mobile nav

import { navLinks } from "@/constants";
import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import Link from "next/link";
import HamburgerMenu from "./Hamburger";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "./Spinner";
import Image from "next/image";
import { url } from '@/constants';
import { fetcher } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';






// import Logo from '@/assets/remem.png'

const Navbar = () => {
    const [active, setActive] = useState("home");
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [geneDetails, setGeneDetails] = useState(null);
    const [showGeneDetails, setShowGeneDetails] = useState(false);   //EDIT
    const searchParams = useSearchParams()
    const geneSymbol = searchParams.get('geneSymbol')
    const router = useRouter();
    const pathname = usePathname();
    const menuRef = useRef(null);
    const buttonRef = useRef(null)


    useEffect(() => {
        // Get the current route path from the router
        const currentPath = pathname;

        // Update the active state based on the current path

        const matchingNavLink = navLinks.find(nav => nav.link === currentPath);
        if (matchingNavLink) {
            setActive(matchingNavLink.id);
            setLoading(false);
        }

    }, [pathname]);
    const handleNavigation = (link: any) => {
        setLoading(true);
        setActive(link);
        setToggle(false);
        setShowGeneDetails(false);
        router.push(link);
    };
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (

                menuRef.current &&
                !(menuRef.current as Node).contains(event.target as Node) && // Check if it's a Node
                buttonRef.current &&
                !(buttonRef.current as Node).contains(event.target as Node)
            ) {
                setToggle(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = async () => {
        try {
            setLoading(true);
    
            const response = await fetch(`${url}/RememProt/get_gene_details/${searchQuery}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                setGeneDetails(data);
                setShowGeneDetails(true);   //EDIT
            } else {
                console.error('Error:', response.statusText);
                console.error('Non-JSON response:', await response.text());
                setGeneDetails(null);
                setShowGeneDetails(false);  //EDIT
            }
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        setShowGeneDetails(false);
        setGeneDetails(null);
    };
    

    
    return (
        <div className="max-w-8xl mx-auto px-6 md:px-3 xl:px-6 ">
            {loading && <Spinner />}
            <nav className="w-full flex py-6 justify-between items-center navbar z-10">
                
                {/* <img src={logo} alt="hoobank" className="w-[124px] h-[32px]" /> */}
                {/* <Image src={Logo}  alt="logo" width={50} height={50} className="w-[150px] h-[150px]" unoptimized={true} /> */}
                <h1 className="font-bold text-4xl me-4">REMEMProt</h1>
                <ul className="list-none lg:flex hidden justify-center items-center flex-1">
                    {navLinks.map((nav, index) => (
                        <li
                            key={nav.id}
                            className={`font-poppins font-normal text-md cursor-pointer text-[17px] ${active === nav.id ? "text-blue-400" : "text-dimWhite"
                                } ${index === navLinks.length - 1 ? "mr-1" : "mr-10"}`}
                            onClick={() => handleNavigation(nav.link)}
                        >
                            <Link href={`${nav.link}`}>{nav.title}</Link>
                        </li>
                    ))}
                </ul>
                <Dialog>
               
                <div className="flex  justify-end items-center">
               
                <input type="text" placeholder="Search..."
                    className="hidden md:flex border border-gray-300 p-2 ms-2 mr-4 rounded-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                   />
                     <DialogTrigger>
                     <Button className="hidden md:flex p-2 me-3 rounded-md cursor-pointer" onClick={handleSearch}>
                   Search  </Button></DialogTrigger>
                    <div
                        className={`w-7 flex lg:hidden h-7  flex-col justify-between cursor-pointer transition-transform duration-300 ${toggle ? "open" : ""
                            }`}
                        onClick={() => setToggle(!toggle)}
                        ref={buttonRef}
                    >
                        <div className={`bg-black rounded-5px w-full h-1 ${toggle ? 'hidden' : ''}`}></div>
                        <div className={`bg-black rounded-5px w-full h-1 transform transition-transform ${toggle ? 'rotate-45 -translate-x-1' : ''}`}></div>
                        <div className={`bg-black rounded-5px w-full h-1 transform transition-transform ${toggle ? '-rotate-45 -translate-x-1 -translate-y-6' : ''}`}></div>
                    </div>
                    

                    <Button className="hidden lg:flex" onClick={() => router.push('/contactus')}>Contact Us</Button>
                    <div
                        ref={menuRef}
                        className={`${toggle ? "flex" : "hidden"
                            } p-6 lg:hidden  absolute top-20 right-0 mx-4 my-2 max-w-[15rem] w-1/2 bg-slate-400 z-50 rounded-xl sidebar`}
                    >
                        <ul className="list-none flex justify-end items-start flex-1 flex-col">
                            {navLinks.map((nav, index) => (
                                <li
                                    key={nav.id}
                                    className={`font-poppins font-medium cursor-pointer text-[17px] ${active === nav.title ? "text-white" : "text-dimWhite"
                                        } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                                    onClick={() => handleNavigation(nav.link)}
                                >
                                    <Link href={`${nav.link}`}>{nav.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                

             {/* Display gene details in a table */}
             {showGeneDetails && (
                
                   
                    <DialogContent className="w-full max-w-[80vh] max-h-[80vh] overflow-y-auto">
                        <DialogHeader className="w-full">
                            <DialogTitle> <strong className="ms-2"> Gene Details :</strong></DialogTitle>
                            <Button className="absolute top-2 right-5" onClick={handleGoBack}>
                                X
                            </Button>
                        </DialogHeader>
                        <table className="border-collapse w-full border border-gray-800">
                            <tbody>
                                {Object.entries(geneDetails).map(([key, value]) => (
                                    <tr key={key} className="bg-gray-200">
                                        <td className="border border-gray-800 p-2">
                                            {value !== undefined ? (
                                                typeof value === 'object' ? (
                                                    Object.entries(value).map(([subKey, subValue]) => (
                                                        <tr key={subKey}>
                                                            <td className="border border-gray-800 p-2 font-bold">{subKey}:</td>
                                                            <td className="border border-gray-800 p-2">{subValue}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td className="border border-gray-800 p-2">{value}</td>
                                                    </tr>
                                                )
                                            ) : (
                                                <tr>
                                                    <td className="border border-gray-800 p-2">N/A</td>
                                                </tr>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </DialogContent>
                
            )}

            {/* Rest of the content - conditionally rendered */}
            {!showGeneDetails && (
                <div>
                    {/* Display other content when gene details are not shown */}
                </div>
            )}
            </div></Dialog>
            </nav >
        </div>
    );
};

export default Navbar;