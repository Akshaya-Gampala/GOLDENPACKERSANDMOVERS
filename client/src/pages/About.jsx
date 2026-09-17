import React from 'react';
import SEO from '../components/SEO';
import { BUSINESS_CONFIG } from '../config/business';
import { Shield, Target, Eye, Heart, CheckCircle2, Award, Truck, Users } from 'lucide-react';

const About = () => {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Golden Packers and Movers, our mission, vision, values, and commitment to safe, reliable relocation services."
      />

      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
            About Golden Packers & Movers
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Your Trusted Relocation Partner
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base">
            Providing safe, efficient, and professional packing and moving solutions with care across local and domestic destinations.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-extrabold tracking-wider uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Our Story
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                Built on Integrity, Reliability, and Customer Satisfaction
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                Golden Packers and Movers was established with a singular objective: to transform the moving experience into a seamless, stress-free process for families, professionals, and businesses. Relocation is more than moving boxes; it represents a fresh start, and we take pride in safeguarding your belongings as if they were our own.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Our team consists of trained packing technicians, careful drivers, and responsive customer care managers who ensure every detail of your move is meticulously planned and executed on schedule.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">500+ Completed</h4>
                    <p className="text-xs text-slate-500">Verified Moves</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">1000+ Customers</h4>
                    <p className="text-xs text-slate-500">Happy Families</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80"
                  alt="Golden Packers Team at work"
                  className="w-full h-[420px] object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission, Vision & Core Values */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Mission */}
            <div className="bright-card p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl gold-gradient-bg text-slate-950 flex items-center justify-center font-bold shadow-md">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To deliver world-class relocation, packing, and logistics solutions characterized by safety, punctuality, transparent pricing, and unwavering customer care.
              </p>
            </div>

            {/* Vision */}
            <div className="bright-card p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl gold-gradient-bg text-slate-950 flex items-center justify-center font-bold shadow-md">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To be recognized as the premier relocation company across India, setting benchmarks in service quality, vehicle safety, and innovative logistics management.
              </p>
            </div>

            {/* Core Values */}
            <div className="bright-card p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl gold-gradient-bg text-slate-950 flex items-center justify-center font-bold shadow-md">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Values</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" /> Integrity & Transparent Pricing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" /> Utmost Care for Goods
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" /> Punctual Schedule Commitment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" /> Continuous Improvement
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Process Flow / Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-extrabold tracking-wider uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            How We Work
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3 mb-12">
            Our Standard Relocation Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 relative">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h4 className="font-bold text-lg text-slate-900 mb-2">Quote Request</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit move details online or over the phone for an accurate free estimate.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 relative">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h4 className="font-bold text-lg text-slate-900 mb-2">Expert Packing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our crew arrives on time with high-grade bubble wrap, boxes, and protective film.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 relative">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h4 className="font-bold text-lg text-slate-900 mb-2">Safe Transit</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Goods loaded onto covered container trucks and transported with GPS tracking.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 relative">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
                4
              </div>
              <h4 className="font-bold text-lg text-slate-900 mb-2">Unpacking & Setup</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Careful unloading, unboxing, and room-wise item setup at your new destination.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
