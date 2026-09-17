import React from 'react';
import { BUSINESS_CONFIG } from '../config/business';
import { Phone, MessageCircle } from 'lucide-react';

const FloatingContact = () => {
  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Hello Golden Packers & Movers, I want to inquire about relocation services.'
  )}`;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-[90vw] sm:max-w-none">
      
      {/* High Visibility WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-4 py-3 rounded-full bg-emerald-500 text-white font-extrabold shadow-2xl hover:bg-emerald-600 hover:scale-105 transition-all border-2 border-white ring-4 ring-emerald-400/30 animate-pulse"
        aria-label="Chat on WhatsApp"
      >
        <div className="w-9 h-9 rounded-full bg-white text-emerald-600 flex items-center justify-center shrink-0 shadow-inner">
          <MessageCircle className="w-6 h-6 fill-current" />
        </div>
        <div className="text-left leading-tight pr-1">
          <span className="block text-[10px] uppercase tracking-wider text-emerald-100 font-extrabold">Instant Chat</span>
          <span className="text-sm font-extrabold flex items-center gap-1">
            💬 WHATSAPP: {BUSINESS_CONFIG.phonePrimary}
          </span>
        </div>
      </a>

      {/* High Visibility Direct Phone Call Button */}
      <a
        href={`tel:${BUSINESS_CONFIG.phonePrimary}`}
        className="flex items-center gap-3 px-4 py-3 rounded-full bg-amber-500 text-slate-950 font-extrabold shadow-2xl hover:bg-amber-400 hover:scale-105 transition-all border-2 border-white ring-4 ring-amber-400/30"
        aria-label="Call Now"
      >
        <div className="w-9 h-9 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
          <Phone className="w-5 h-5 fill-current" />
        </div>
        <div className="text-left leading-tight pr-1">
          <span className="block text-[10px] uppercase tracking-wider text-slate-900 font-extrabold">Click to Call</span>
          <span className="text-sm font-extrabold flex items-center gap-1">
            📞 CALL NOW: {BUSINESS_CONFIG.phonePrimary}
          </span>
        </div>
      </a>

    </div>
  );
};

export default FloatingContact;
