import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BUSINESS_CONFIG } from '../config/business';
import { Truck, Phone, MessageCircle, Menu, X, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Why Choose Us', path: '/why-choose-us' },
    { name: 'Our Work', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path) => location.pathname === path;

  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Hello Golden Packers & Movers, I want to inquire about relocation services.'
  )}`;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5' : 'bg-white border-b border-slate-100 py-3.5'}`}>
      {/* Top High-Visibility Notification & Direct Contact Bar */}
      <div className="bg-slate-900 text-slate-200 py-2 px-4 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1.5 text-amber-400 font-extrabold">
              <ShieldCheck className="w-4 h-4" /> 24/7 Verified Relocation Service
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-300 font-bold">{BUSINESS_CONFIG.address}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <a
              href={`tel:${BUSINESS_CONFIG.phonePrimary}`}
              className="bg-amber-500 text-slate-950 px-3 py-1 rounded-full font-extrabold flex items-center gap-1 hover:bg-amber-400 transition-colors shadow-sm text-xs"
            >
              📞 CALL: {BUSINESS_CONFIG.phonePrimary}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 text-white px-3 py-1 rounded-full font-extrabold flex items-center gap-1 hover:bg-emerald-600 transition-colors shadow-sm text-xs"
            >
              💬 WHATSAPP
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl gold-gradient-bg flex items-center justify-center text-slate-900 shadow-md group-hover:scale-105 transition-transform">
              <Truck className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                GOLDEN <span className="text-amber-600 font-bold">PACKERS</span>
              </div>
              <p className="text-[10px] tracking-widest text-slate-500 font-semibold uppercase">& MOVERS</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'text-amber-600 bg-amber-50/80 font-bold'
                    : 'text-slate-700 hover:text-amber-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Call Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={`tel:${BUSINESS_CONFIG.phonePrimary}`}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 border border-amber-300"
            >
              <Phone className="w-4 h-4 fill-current" /> CALL {BUSINESS_CONFIG.phonePrimary}
            </a>

            <Link
              to="/get-quote"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 focus:outline-none border border-slate-200"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-3 shadow-2xl animate-fadeIn">
          {/* Prominent Mobile Contact Buttons */}
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <a
              href={`tel:${BUSINESS_CONFIG.phonePrimary}`}
              className="w-full text-center py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm shadow-md flex items-center justify-center gap-1.5"
            >
              <Phone className="w-4 h-4 fill-current" /> CALL NOW
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 rounded-xl bg-emerald-500 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 fill-current" /> WHATSAPP
            </a>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2.5 rounded-lg text-base font-semibold ${
                isActive(link.path)
                  ? 'text-amber-600 bg-amber-50 font-bold'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-2">
            <Link
              to="/get-quote"
              className="block w-full text-center px-5 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-md"
            >
              Get Free Moving Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
