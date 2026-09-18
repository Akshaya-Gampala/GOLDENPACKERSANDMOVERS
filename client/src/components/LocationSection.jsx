import React, { useState } from 'react';
import { BUSINESS_CONFIG } from '../config/business';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  ExternalLink,
  Copy,
  Check,
  Building2,
  Compass,
} from 'lucide-react';

const LocationSection = ({ className = '' }) => {
  const [copied, setCopied] = useState(false);

  // Read Google Maps API key from environment variable if available
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Use API key embed URL if key is present, otherwise fallback to standard embed URL
  const embedSrc = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
        BUSINESS_CONFIG.address
      )}`
    : BUSINESS_CONFIG.googleMapsEmbedUrl;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(BUSINESS_CONFIG.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="our-location" className={`py-20 bg-slate-900 text-white relative overflow-hidden ${className}`}>
      {/* Background Subtle Highlights */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 rounded-full bg-amber-400/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <MapPin className="w-4 h-4 text-amber-400" /> Find Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Our Location
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Visit our office or find us easily on Google Maps. Get live directions or contact our team directly.
          </p>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Business Location & Details Info */}
          <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700/80 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col justify-between space-y-6 backdrop-blur-md">
            
            <div className="space-y-6">
              {/* Business Name Header */}
              <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
                <div className="w-12 h-12 rounded-2xl gold-gradient-bg text-slate-950 flex items-center justify-center font-bold shadow-lg shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-amber-400 tracking-wider">Main Branch</p>
                  <h3 className="text-xl font-extrabold text-white">{BUSINESS_CONFIG.name}</h3>
                </div>
              </div>

              {/* Full Address with Copy Feature & Location Pin Icon */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-400" /> Business Address
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 transition-all active:scale-95"
                    title="Copy full address"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium pl-5 border-l-2 border-amber-500/50 select-all">
                  {BUSINESS_CONFIG.address}
                </p>
              </div>

              {/* City & State */}
              <div className="space-y-1">
                <span className="text-xs font-extrabold uppercase text-slate-400 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-400" /> City / Region
                </span>
                <p className="text-slate-200 text-sm font-semibold pl-5 border-l-2 border-amber-500/50">
                  {BUSINESS_CONFIG.city}, {BUSINESS_CONFIG.state} - {BUSINESS_CONFIG.pincode}
                </p>
              </div>

              {/* Phone Numbers */}
              <div className="space-y-1">
                <span className="text-xs font-extrabold uppercase text-slate-400 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-amber-400" /> Phone Number
                </span>
                <div className="pl-5 border-l-2 border-amber-500/50 flex flex-wrap gap-3 pt-1">
                  <a
                    href={`tel:${BUSINESS_CONFIG.phonePrimary}`}
                    className="text-white hover:text-amber-400 font-bold text-base sm:text-lg transition-colors flex items-center gap-1.5"
                  >
                    {BUSINESS_CONFIG.phonePrimary}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="space-y-1">
                <span className="text-xs font-extrabold uppercase text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" /> Working Hours
                </span>
                <p className="text-slate-200 text-sm font-semibold pl-5 border-l-2 border-amber-500/50">
                  {BUSINESS_CONFIG.businessHours}
                </p>
              </div>
            </div>

            {/* Action Buttons: Get Directions & View on Google Maps */}
            <div className="pt-4 border-t border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={BUSINESS_CONFIG.getDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-5 py-3.5 rounded-xl gold-gradient-bg text-slate-950 font-extrabold text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" /> Get Directions
              </a>

              <a
                href={BUSINESS_CONFIG.googleMapsUrl || BUSINESS_CONFIG.googleBusinessProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-950 text-amber-400 font-extrabold text-sm border border-slate-700 hover:border-amber-500/50 shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" /> View on Google Maps
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps Area */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700/80 bg-slate-800 min-h-[380px] lg:min-h-[460px] relative group">
            <iframe
              title="Golden Packers and Movers Location Map"
              src={embedSrc}
              width="100%"
              height="100%"
              className="w-full h-full min-h-[380px] lg:min-h-[460px] border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            {/* Overlay badge */}
            <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700 shadow-xl pointer-events-auto hidden sm:flex items-center gap-2 text-xs font-bold text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Golden Packers Location Verified
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LocationSection;
