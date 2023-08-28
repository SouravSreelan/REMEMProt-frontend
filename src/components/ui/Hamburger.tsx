import { useState } from 'react';

export default function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-black h-screen flex justify-center items-center">
            <div
                className={`w-12 h-12 flex flex-col justify-between cursor-pointer transition-transform ${isOpen ? 'rotate-45' : ''
                    }`}
                onClick={toggleMenu}
            >
                <div className="bg-white rounded-lg h-1/3"></div>
                <div className="bg-white rounded-lg h-1/3"></div>
                <div className="bg-white rounded-lg h-1/3"></div>
            </div>
        </div>
    );
}
