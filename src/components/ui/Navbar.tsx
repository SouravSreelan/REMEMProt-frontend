"use client"

import { navLinks } from "@/constants";
import { useState } from "react";
import { Button } from "./button";

const Navbar = () => {
    const [active, setActive] = useState("Home");
    const [toggle, setToggle] = useState(false);

    return (
        <div className="max-w-8xl mx-auto px-6 md:px-3 xl:px-6 ">

            <nav className="w-full flex py-6 justify-between items-center navbar z-10">
                {/* <img src={logo} alt="hoobank" className="w-[124px] h-[32px]" /> */}
                <h1 className="font-bold text-3xl">REMEMProt</h1>
                <ul className="list-none lg:flex hidden justify-center items-center flex-1">
                    {navLinks.map((nav, index) => (
                        <li
                            key={nav.id}
                            className={`font-poppins font-normal cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"
                                } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                            onClick={() => setActive(nav.title)}
                        >
                            <a href={`#${nav.id}`}>{nav.title}</a>
                        </li>
                    ))}
                </ul>


                <div className="flex  justify-end items-center">
                    {/* <img
                    // src={toggle ? close : menu}
                    alt="menu"
                    className="w-[28px] h-[28px] object-contain"
                    onClick={() => setToggle(!toggle)}
                /> */}
                    <Button>Contact Us</Button>

                    <div
                        className={`${!toggle ? "hidden" : "flex"
                            } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
                    >
                        <ul className="list-none flex justify-end items-start flex-1 flex-col">
                            {navLinks.map((nav, index) => (
                                <li
                                    key={nav.id}
                                    className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"
                                        } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                                    onClick={() => setActive(nav.title)}
                                >
                                    <a href={`#${nav.id}`}>{nav.title}</a>
                                </li>
                            ))}
                        </ul>
                        B</div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;