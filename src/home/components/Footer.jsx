import React from 'react';
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiBox, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-white border-t border-gray-800 font-sans transition-colors duration-300 relative z-10 pt-28 sm:pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-left mb-16">
          {/* Col 1: Brand & Details */}
          <div className="flex flex-col gap-5">
            <span className="font-outfit font-extrabold text-3xl tracking-wider text-gradient-gold">
              CASHMEWALA
            </span>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs font-sans">
              Follow our official social platforms for latest updates and eyewear collections.
            </p>
            <div className="flex items-center gap-3 mt-2">

              <span className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer border border-white/10">
                <a
                  href="https://wa.me/917875491676"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="text-emerald-500 hover:text-emerald-600 hover:scale-110 transition-all cursor-pointer flex items-center justify-center"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>
              </span>

              <span className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer border border-white/10" aria-label="App Box">
                <a
                  href="https://www.instagram.com/thechasmewala001?igsh=MXRta3A0dXo1aGRrMg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-red-500 hover:text-red-600 hover:scale-110 transition-all cursor-pointer flex items-center justify-center"
                >
                  <FiInstagram className="w-4 h-4" />
                </a>
              </span>

            </div>
          </div>

          {/* Col 2: Other Pages */}
          <div>
            <h4 className="font-outfit font-bold text-sm text-gold tracking-wide mb-6">
              Other Pages
            </h4>
            <div className="flex flex-col gap-3 text-xs text-gray-400 items-start font-sans">
              <a href="#hero" className="hover:text-gold transition-colors">Home</a>
              <a href="#about" className="hover:text-gold transition-colors">About Us</a>
              <a href="#products" className="hover:text-gold transition-colors">Services</a>
              <a href="#why-choose-us" className="hover:text-gold transition-colors">Contact</a>
              <a href="#categories" className="hover:text-gold transition-colors">Project</a>
            </div>
          </div>

          {/* Col 3: 1 col blank space in center */}
          <div className="hidden md:block"></div>

          {/* Col 4: Social Media & Support to the right */}
          <div>
            <h4 className="font-outfit font-bold text-sm text-gold tracking-wide mb-6">
              Support
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4 font-sans">
              Our Support and Sales team is available 24/7 to answer your queries.
            </p>
            <ul className="flex flex-col gap-3 text-xs font-sans">
              <li>
                <a
                  href="mailto:aakeebaalam121@gmail.com"
                  className="flex items-center gap-2.5 text-gray-300 hover:text-gold transition-colors group"
                >
                  <span className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-gold/30 group-hover:bg-gold/10 transition-colors">
                    <FiMail className="w-3.5 h-3.5 text-gold" />
                  </span>
                  <span className="break-all">aakeebaalam121@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+917875491676"
                  className="flex items-center gap-2.5 text-gray-300 hover:text-gold transition-colors group"
                >
                  <span className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-gold/30 group-hover:bg-gold/10 transition-colors">
                    <FiPhone className="w-3.5 h-3.5 text-gold" />
                  </span>
                  <span>+91 78754 91676</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400">
                <span className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                  <FiMapPin className="w-3.5 h-3.5 text-gold" />
                </span>
                <p className='flex flex-col'>
                <span>
                  Haidry Chowk, Main Rd, Near Roy Hospital, Shiv Panchayat Nagar.
                </span>
                <span>
                  Kamptee 441001.
                </span>
                <span>
                  Nagpur, Maharashtra, India.
                </span>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full h-px bg-gray-800 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-sans">
          <p>© {currentYear} CashmeWala. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
