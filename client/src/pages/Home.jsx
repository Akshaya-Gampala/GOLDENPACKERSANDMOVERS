import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ServiceCard from '../components/ServiceCard';
import LightboxModal from '../components/LightboxModal';
import { BUSINESS_CONFIG } from '../config/business';
import { fetchGalleryApi } from '../services/api';
import {
  Truck,
  ShieldCheck,
  Clock,
  Award,
  Users,
  Phone,
  MessageCircle,
  ArrowRight,
  PackageCheck,
  UserCheck,
  DollarSign,
  ThumbsUp,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const Home = () => {
  const [featuredWork, setFeaturedWork] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const loadFeaturedGallery = async () => {
      try {
        const res = await fetchGalleryApi('All');
        setFeaturedWork(res.data.data.slice(0, 4));
      } catch (error) {
        console.error('Error loading home gallery preview', error);
      }
    };
    loadFeaturedGallery();
  }, []);

  return (
    <>
      <SEO title="Safe & Reliable Moving Solutions" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-amber-50/60 via-white to-white py-16 lg:py-24 overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-600" /> Premium Moving & Relocation Services
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15]">
                Safe, Reliable & <span className="gold-gradient-text">Stress-Free</span> Moving Solutions
              </h1>

              <p className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {BUSINESS_CONFIG.subheading}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href={`tel:${BUSINESS_CONFIG.phonePrimary}`}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base sm:text-lg shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 border-2 border-amber-300"
                >
                  <Phone className="w-6 h-6 fill-current" /> CALL NOW: {BUSINESS_CONFIG.phonePrimary}
                </a>

                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Golden Packers & Movers, I want to inquire about relocation.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base sm:text-lg shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 border-2 border-emerald-400"
                >
                  <MessageCircle className="w-6 h-6 fill-current" /> WHATSAPP NOW
                </a>

                <Link
                  to="/get-quote"
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Get Free Quote <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Quick Key Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-xl mx-auto lg:mx-0 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-xs font-bold text-slate-800">Zero Hidden Cost</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-xs font-bold text-slate-800">100% Safe Transit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-xs font-bold text-slate-800">On-Time Guarantee</span>
                </div>
              </div>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-2 rounded-3xl gold-gradient-bg opacity-30 blur-lg"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                    alt="Golden Packers and Movers Truck & Warehouse Team"
                    className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Golden Guarantee</p>
                      <p className="text-sm font-extrabold text-slate-900">Protected Domestic Shifting</p>
                    </div>
                    <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-amber-400 font-bold text-xs">Verified Move</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {BUSINESS_CONFIG.stats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-heading mb-1">{stat.value}</p>
                <p className="text-sm text-slate-300 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Highlights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase bg-amber-100 text-amber-800">
              Why Customers Trust Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Complete Peace of Mind For Your Relocation
            </h2>
            <p className="text-slate-600 text-base">
              Every item is handled with precision, care, and professional packing materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BUSINESS_CONFIG.trustHighlights.map((item, idx) => (
              <div key={idx} className="bright-card p-8 rounded-2xl space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section Preview */}
      <section className="py-20 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase bg-amber-100 text-amber-800">
                Our Core Services
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                Tailored Relocation Solutions
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-amber-600 font-extrabold hover:text-amber-700 text-base"
            >
              Explore All Services <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BUSINESS_CONFIG.servicesList.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Work Gallery Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase bg-amber-100 text-amber-800">
              Work Experience Photos
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              See Our Actual Moving Projects
            </h2>
            <p className="text-slate-600">Real photos of our packing, loading, and transit operations.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredWork.map((photo) => (
              <div
                key={photo._id || photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative rounded-2xl overflow-hidden shadow-md cursor-pointer border border-slate-200 bg-slate-900 h-64"
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-5 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded w-fit mb-1 border border-amber-500/30">
                    {photo.category}
                  </span>
                  <h4 className="font-bold text-base line-clamp-1">{photo.title}</h4>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all"
            >
              View Full Work Gallery <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Quote Banner */}
      <section className="py-16 gold-gradient-bg text-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready For a Smooth Moving Experience?</h2>
            <p className="text-slate-900 font-semibold text-base">
              Get an accurate free moving quotation in less than 2 minutes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <Link
              to="/get-quote"
              className="px-8 py-4 rounded-xl bg-slate-950 text-white font-extrabold hover:bg-slate-900 shadow-xl transition-all text-center"
            >
              Request Free Quote Now
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && <LightboxModal item={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
    </>
  );
};

export default Home;
