import React from "react";
import { FaSquareWhatsapp } from "react-icons/fa6";

function WhatsappIcon() {
  const phoneNumber = "917982742784"; // Replace with the correct WhatsApp number
  const message = encodeURIComponent("Hello! How can I help you in finding the right colleges?");
  
  return (
    <div className="bg-white p- z-50 pl-4 border rounded-sm animate-bounce fixed bottom-4 right-4 md:right-10 text-black flex items-center gap-4 shadow-lg">
      <span className="md:text-lg font-bold text-gray-600">Contact Us</span>
      
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative p-2 rounded-full hover:scale-110 transition-transform duration-300"
      >
        <FaSquareWhatsapp size={50} className="text-green-500" />
      </a>
    </div>
  );
}

export default WhatsappIcon;
