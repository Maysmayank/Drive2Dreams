import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function WhatsappIcon() {
    return (

        <div className="bg-white z-50 pl-4 border rounded-full fixed bottom-4 right-1 md:right-10 text-black flex items-center gap-4">
            <span className="md:text-xl font-bold text-gray-600" >Contact</span>
            <a
                href="https://wa.me/7982742784"
                target="_blank"
                rel="noopener noreferrer"
                className=" bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
            >
                
                <FaWhatsapp size={32} className="animate-pulse" />
            </a>

        </div>

    );
}

export default WhatsappIcon;
