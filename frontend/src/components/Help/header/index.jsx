import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogoImage } from '../../Images/imagesComponents';

const logoStyle = {
  maxHeight: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '1rem',
  color: '#fff',
};

const HelpLPHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 h-[var(--header-height)] ${
        isScrolled ? "!bg-primary-gray backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 sm:px-12 flex items-center justify-between h-full">
          <Link to="/" style={logoStyle}>
            <LogoImage />
          </Link>
        
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="font-medium text-white hover:text-primary-green transition-colors">Início</a>
        </nav>
      </div>
    </header>
  );
};

export default HelpLPHeader;
