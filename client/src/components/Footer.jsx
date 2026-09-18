import React from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_CONFIG } from '../config/business';
import { Truck, Phone, Mail, MapPin, Clock, Lock, ShieldCheck, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg gold-gradient-bg flex items-center justify-center text-slate-950 font-bold">
                <Truck className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                GOLDEN <span className="text-amber-400">PACKERS</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {BUSINESS_CONFIG.subheading}
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-amber-400 bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Licensed, Insured & Verified Relocation Experts</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-base font-bold tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-amber-500">›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-amber-500">›</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-amber-500">›</span> Our Services
                </Link>
              </li>
              <li>
                <Link to="/why-choose-us" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-amber-500">›</span> Why Choose Us
                </Link>
              </li>
              <li>
                <Link to="/#reviews" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-amber-500">›</span> Customer Reviews (4.9★)
                </Link>
              </li>
              <li>
                <Link to="/#find-us" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-amber-500">›</span> Find Us / Location
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-amber-500">›</span> Work Gallery
                </Link>
              </li>
              <li>
                <Link to="/get-quote" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-amber-500">›</span> Request Quote
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-amber-500">›</span> FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Moving Services */}
          <div>
            <h3 className="text-white text-base font-bold tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Relocation Services
            </h3>
            <ul className="space-y-2 text-sm">
              {BUSINESS_CONFIG.servicesList.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link to="/services" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                    <span className="text-amber-500">›</span> {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white text-base font-bold tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{BUSINESS_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${BUSINESS_CONFIG.phonePrimary}`} className="hover:text-amber-400 transition-colors">
                  {BUSINESS_CONFIG.phonePrimary}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:text-amber-400 transition-colors">
                  {BUSINESS_CONFIG.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-400">{BUSINESS_CONFIG.businessHours}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Golden Packers and Movers. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/admin/login" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-amber-500" /> Admin Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
