import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { submitQuoteApi } from '../services/api';
import { BUSINESS_CONFIG } from '../config/business';
import { CheckCircle2, Loader2, Send, ShieldCheck, Phone, MapPin, Calendar } from 'lucide-react';

const GetQuote = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    movingFrom: '',
    movingTo: '',
    movingDate: '',
    propertyType: 'Apartment',
    rooms: '2 BHK',
    service: preselectedService || 'Household Shifting',
    items: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    // Form Validation
    if (!formData.name || !formData.phone || !formData.movingFrom || !formData.movingTo || !formData.movingDate) {
      setErrorMsg('Please fill in all mandatory fields (*)');
      setLoading(false);
      return;
    }

    try {
      const res = await submitQuoteApi(formData);
      if (res.data.success) {
        setSuccessMsg('Your quote request has been submitted successfully! Our move coordinator will contact you shortly with an accurate estimate.');
        // Clear form
        setFormData({
          name: '',
          phone: '',
          email: '',
          movingFrom: '',
          movingTo: '',
          movingDate: '',
          propertyType: 'Apartment',
          rooms: '2 BHK',
          service: 'Household Shifting',
          items: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('Quote submission error:', error);
      setErrorMsg(error.response?.data?.message || 'Failed to submit quote request. Please try again or call customer support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Get a Free Moving Quote"
        description="Request a instant free moving quotation for home, office, or vehicle relocation with Golden Packers and Movers."
      />

      {/* Header */}
      <section className="bg-slate-900 text-white py-16 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
            Instant Free Estimate
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Request a Free Moving Quote
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base">
            Fill out the relocation details below to get a transparent, itemized moving estimate with zero obligations.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 space-y-8">
            
            {/* Status Messages */}
            {successMsg && (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-extrabold text-lg">Thank You! Request Received.</h4>
                  <p className="text-sm text-emerald-800 leading-relaxed">{successMsg}</p>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-500" /> Personal & Contact Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
                    Full Name <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
                    Phone Number <span className="text-amber-600">*</span>
                  </label>
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

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. ramesh@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="border-b border-slate-100 pb-4 pt-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-500" /> Relocation Route & Date
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
                    Moving From (Pickup) <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="movingFrom"
                    value={formData.movingFrom}
                    onChange={handleChange}
                    required
                    placeholder="City / Area Name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
                    Moving To (Destination) <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="movingTo"
                    value={formData.movingTo}
                    onChange={handleChange}
                    required
                    placeholder="Destination City / Area"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
                    Expected Moving Date <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="date"
                    name="movingDate"
                    value={formData.movingDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="border-b border-slate-100 pb-4 pt-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-500" /> Service & Property Specifications
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
                    Required Service <span className="text-amber-600">*</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium bg-white"
                  >
                    {BUSINESS_CONFIG.servicesList.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium bg-white"
                  >
                    <option value="Apartment">Apartment / Flat</option>
                    <option value="Independent House">Independent Villa / House</option>
                    <option value="Office Space">Commercial Office</option>
                    <option value="Warehouse">Warehouse / Shop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
                    Number of Rooms
                  </label>
                  <select
                    name="rooms"
                    value={formData.rooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium bg-white"
                  >
                    <option value="1 RK / 1 BHK">1 RK / 1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4+ BHK Villa">4+ BHK / Villa</option>
                    <option value="Single Items">Few Household Items</option>
                    <option value="Corporate Office">Corporate Office Space</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
                    Approximate Major Items To Move
                  </label>
                  <input
                    type="text"
                    name="items"
                    value={formData.items}
                    onChange={handleChange}
                    placeholder="e.g. 1 Double Bed, Sofa Set, Fridge, Washing Machine, 10 Packing Boxes"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
                    Additional Instructions / Message
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any specific packing instructions or elevator access details..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl gold-gradient-bg text-slate-950 font-extrabold text-base shadow-xl hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-slate-950" /> Submitting Request...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Request Free Quote Now
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </section>
    </>
  );
};

export default GetQuote;
