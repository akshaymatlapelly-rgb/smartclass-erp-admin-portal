import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppChat = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open('https://wa.me/919182008552', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end">
      
        {isHovered && (
          <div className="mr-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 whitespace-nowrap hidden sm:block relative backdrop-blur-md bg-opacity-90 dark:bg-opacity-90"
          >
            <span className="font-medium">Need Help? Chat with Faculty Support</span>
            {/* Arrow/triangle pointer for the bubble */}
            <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white dark:border-l-gray-800 border-opacity-90 dark:border-opacity-90"></div>
          </div>
        )}
      

      <div className="relative">
        {/* Pulsing ring animation */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75"></div>
        
        {/* Main button */}
        <button onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:shadow-[0_0_25px_rgba(37,211,102,0.8)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/50 flex items-center justify-center transition-shadow border-2 border-[#25D366]"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={28} />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppChat;
