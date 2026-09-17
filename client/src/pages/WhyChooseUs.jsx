import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { BUSINESS_CONFIG } from '../config/business';
import {
  UserCheck,
  ShieldCheck,
  DollarSign,
  Clock,
  PackageCheck,
  HeartHandshake,
  Truck,
  Headphones,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      title: 'Experienced Professionals',
      description: 'Our crew undergoes rigorous training in handling fragile glassware, electronics, bulky furniture, and modular assemblies.',
      icon: UserCheck,
    },
    {
      title: 'Safe & Secure Handling',
      description: 'Multi-layered bubble wrapping, corner edge protectors, and corrugated box packaging ensure 100% damage-free transit.',
      icon: ShieldCheck,
    },
    {
      title: 'Transparent Pricing',
      description: 'Zero hidden charges. What we quote upfront is what you pay. Detailed itemized estimates provided before every move.',
      icon: DollarSign,
    },
    {
      title: 'Timely Delivery',
      description: 'We respect your time. Punctual crew arrival and committed transit schedules guarantee zero unnecessary waiting.',
      icon: Clock,
    },
    {
      title: 'Quality Packing Materials',
      description: 'Heavy-duty cardboard boxes, waterproof shrink wrap, wooden crating, and high-density foam padding.',
      icon: PackageCheck,
    },
    {
      title: 'Customer-Focused Service',
      description: 'Dedicated move coordinators assigned to your project for continuous updates from loading to final setup.',
      icon: HeartHandshake,
    },
    {
      title: 'Reliable Transportation',
      description: 'Modern fleet of clean, GPS-monitored, closed-container vehicles equipped with cargo securing straps.',
      icon: Truck,
    },
    {
      title: 'End-to-End Moving Support',
      description: 'Complete assistance from initial estimate, packing, loading, highway transit, unloading, to final item assembly.',
      icon: Headphones,
    },
  ];

  return (
    <>
      <SEO
        title="Why Choose Us"
        description="Discover why Golden Packers and Movers is the preferred choice for safe, affordable, transparent, and on-time relocation services."
      />

      {/* Banner */}
      <section className="bg-slate-900 text-white py-16 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
            The Golden Advantage
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Why Choose Golden Packers and Movers?
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base">
            We combine industry experience, top-tier packing materials, transparent pricing, and trained personnel to deliver a smooth relocation.
          </p>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="bright-card p-8 rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-xl gold-gradient-bg text-slate-950 flex items-center justify-center font-bold shadow-md">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-amber-600">
                    <CheckCircle className="w-4 h-4 text-amber-500" /> Standard Golden Quality
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/get-quote"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gold-gradient-bg text-slate-950 font-extrabold text-base shadow-lg hover:brightness-105 transition-all"
            >
              Get Your Free Moving Quote Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
