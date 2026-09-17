import React, { useState } from 'react';
import SEO from '../components/SEO';
import { BUSINESS_CONFIG } from '../config/business';
import { submitContactApi } from '../services/api';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, Loader2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    if (!formData.name || !formData.phone || !formData.message) {
      setErrorMsg('Please fill in Name, Phone, and Message.');
      setLoading(false);
      return;
    }

    try {
      const res = await submitContactApi(formData);
      if (res.data.success) {
        setSuccessMsg('Thank you for contacting Golden Packers and Movers! We will respond shortly.');
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      setErrorMsg('Failed to send contact message. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi Golden Packers & Movers, I want to inquire about relocation.')}`;

  return (
    <>
      <SEO
        title="Contact Us"
        description="Contact Golden Packers and Movers for moving inquiries, phone numbers, email, WhatsApp, and office address."
      />

      {/* Header */}
      <section className="bg-slate-900 text-white py-16 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
            24/7 Customer Care
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Contact Golden Packers and Movers
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base">
            Have questions about your move? Reach out to our customer support team via phone, WhatsApp, email, or visit our office.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href={`tel:${BUSINESS_CONFIG.phonePrimary}`}
              className="bright-card p-6 rounded-2xl flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl gold-gradient-bg text-slate-950 flex items-center justify-center font-bold shadow-md">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase text-slate-400">Call Us 24/7</p>
                <p className="text-lg font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  {BUSINESS_CONFIG.phonePrimary}
                </p>
              </div>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bright-card p-6 rounded-2xl flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-md">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase text-slate-400">Instant WhatsApp</p>
                <p className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {BUSINESS_CONFIG.whatsappDisplay}
                </p>
              </div>
            </a>

            <a
              href={`mailto:${BUSINESS_CONFIG.email}`}
              className="bright-card p-6 rounded-2xl flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold shadow-md">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase text-slate-400">Email Inquiry</p>
                <p className="text-base font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors truncate">
                  {BUSINESS_CONFIG.email}
                </p>
              </div>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Direct Message</h2>

              {successMsg && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  {successMsg}
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Anish Patel"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. anish@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Inter-city Shifting Inquiry"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">Your Message *</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="How can we assist you with your upcoming move?"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl gold-gradient-bg text-slate-950 font-extrabold text-base shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />} Send Message
                </button>
              </form>
            </div>

            {/* Address & Google Maps Embed */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Main Office Location
                </h3>

                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{BUSINESS_CONFIG.address}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>{BUSINESS_CONFIG.businessHours}</span>
                  </li>
                </ul>
              </div>

              {/* Google Map Section */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-[280px]">
                <iframe
                  title="Golden Packers Location Map"
                  src={BUSINESS_CONFIG.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default Contact;
