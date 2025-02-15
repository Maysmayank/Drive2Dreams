import React from "react";
import { FaSquareWhatsapp } from "react-icons/fa6";

function WhatsappIcon() {
    return (

        <div className="bg-white p-4 z-50 pl-4 border rounded-sm animate-bounce fixed bottom-4 right-1 md:right-10 text-black flex items-center gap-8">
            <span className="md:text-xl font-bold text-gray-600" >Contact Us</span>
            <a
                href="https://wa.me/7982742784"
                target="_blank"
                rel="noopener noreferrer"
                className="  text-white p-3 rounded-full  transition duration-300"
            >
                
                <FaSquareWhatsapp size={60}  className="top-0 right-0 absolute text-green-500" />
                </a>

        </div>

    );
}

export default WhatsappIcon;
