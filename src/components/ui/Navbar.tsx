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
import Logo from '@/assets/remem.png'

const Navbar = () => {
    const [active, setActive] = useState("home");
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false)
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
    return (
        <div className="max-w-8xl mx-auto px-6 md:px-3 xl:px-6 ">
            {loading && <Spinner />}
            <nav className="w-full flex py-6 justify-between items-center navbar z-10">
                {/* <img src={logo} alt="hoobank" className="w-[124px] h-[32px]" /> */}
                {/* <Image src={Logo}  alt="logo" width={50} height={50} className="w-[150px] h-[150px]" unoptimized={true} /> */}
                <h1 className="font-bold text-3xl">REMEMProt</h1>
                <ul className="list-none lg:flex hidden justify-center items-center flex-1">
                    {navLinks.map((nav, index) => (
                        <li
                            key={nav.id}
                            className={`font-poppins font-normal text-md cursor-pointer text-[16px] ${active === nav.id ? "text-blue-400" : "text-dimWhite"
                                } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                            onClick={() => handleNavigation(nav.link)}
                        >
                            <Link href={`${nav.link}`}>{nav.title}</Link>
                        </li>
                    ))}
                </ul>


                <div className="flex  justify-end items-center">
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
                                    className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"
                                        } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                                    onClick={() => handleNavigation(nav.link)}
                                >
                                    <Link href={`${nav.link}`}>{nav.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav >
        </div >
    );
};

export default Navbar;