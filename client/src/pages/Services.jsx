import React from 'react';
import SEO from '../components/SEO';
import ServiceCard from '../components/ServiceCard';
import { BUSINESS_CONFIG } from '../config/business';
import { Sparkles, ShieldCheck } from 'lucide-react';

const Services = () => {
  return (
    <>
      <SEO
        title="Our Relocation Services"
        description="Explore household shifting, office relocation, vehicle transport, packing, unpacking, loading, warehouse storage, and commercial moving services by Golden Packers and Movers."
      />

      {/* Services Banner Header */}
      <section className="bg-slate-900 text-white py-16 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
            Professional Moving Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Comprehensive Relocation & Logistics Services
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base">
            From single-room apartments to multi-floor corporate offices, we offer tailored moving packages backed by experienced personnel and safe transit vehicles.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BUSINESS_CONFIG.servicesList.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Guarantee Bar */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold shrink-0 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Custom Moving Plan Needed?</h3>
                <p className="text-slate-600 text-sm">
                  We customize packing techniques and transit timing based on your unique inventory requirements.
                </p>
              </div>
            </div>

            <a
              href={`tel:${BUSINESS_CONFIG.phonePrimary}`}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shrink-0 transition-colors shadow-md"
            >
              Speak to Move Specialist
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
