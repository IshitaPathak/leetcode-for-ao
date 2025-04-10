import React from 'react';
import { Github, Menu } from 'lucide-react';

type NavbarProps = {
  toggleSidebar: () => void;
};

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="bg-[#1a1a1a] text-white h-16 flex items-center px-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-800 md:hidden"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">CodeQuest</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-[#2cbb5d] text-white rounded-md hover:bg-[#28a754] transition-colors">
            Sign In
          </button>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <Github size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
};
