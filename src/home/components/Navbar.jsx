import React from 'react';
import logo from '../../assets/logo.png';

function Navbar() {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="glass-nav sticky top-0 z-40 w-full border-b border-white/10 shadow-lg shadow-gray-100/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Chashmewala Logo" className="h-8 w-auto object-contain" />
        </div>

        <div className="hidden md:flex items-center gap-10 font-outfit font-semibold text-sm">
          <button
            onClick={() => handleScroll('hero')}
            className="relative py-1 text-gray-800 hover:text-gold font-bold transition-colors duration-200 group cursor-pointer"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => handleScroll('categories')}
            className="relative py-1 text-gray-800 hover:text-gold font-bold transition-colors duration-200 group cursor-pointer"
          >
            Categories
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => handleScroll('products')}
            className="relative py-1 text-gray-800 hover:text-gold font-bold transition-colors duration-200 group cursor-pointer"
          >
            Products
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => handleScroll('why-choose-us')}
            className="relative py-1 text-gray-800 hover:text-gold font-bold transition-colors duration-200 group cursor-pointer"
          >
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
