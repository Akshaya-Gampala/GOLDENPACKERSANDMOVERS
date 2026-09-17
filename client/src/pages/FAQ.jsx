import React, { useState } from 'react';
import SEO from '../components/SEO';
import { BUSINESS_CONFIG } from '../config/business';
import { ChevronDown, ChevronUp, Search, HelpCircle, PhoneCall } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = BUSINESS_CONFIG.faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SEO
        title="Frequently Asked Questions (FAQ)"
        description="Find answers to common questions about moving quotes, packing materials, vehicle transport, booking timelines, and relocation services."
      />

      {/* Banner */}
      <section className="bg-slate-900 text-white py-16 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
            Got Questions?
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base">
            Everything you need to know about booking, packing, transit safety, and customer support with Golden Packers and Movers.
          </p>
        </div>
      </section>

      {/* FAQ Search & Accordions */}
      <section className="py-16 bg-slate-50 min-h-[500px]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your moving question..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium bg-white shadow-sm"
            />
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-2">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-slate-700 font-bold">No questions found matching "{searchQuery}"</p>
                <p className="text-xs text-slate-500">
                  Feel free to call our customer team directly at {BUSINESS_CONFIG.phonePrimary}.
                </p>
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bright-card rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-extrabold text-slate-900 text-lg hover:text-amber-600 transition-colors"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-amber-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Still Have Questions Banner */}
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200 text-center space-y-3">
            <h3 className="text-xl font-bold text-slate-900">Still Have Questions?</h3>
            <p className="text-slate-600 text-sm max-w-lg mx-auto">
              Our relocation customer specialists are available 24/7 to answer your specific moving queries.
            </p>
            <a
              href={`tel:${BUSINESS_CONFIG.phonePrimary}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gold-gradient-bg text-slate-950 font-bold text-sm shadow-md"
            >
              <PhoneCall className="w-4 h-4" /> Call {BUSINESS_CONFIG.phonePrimary}
            </a>
          </div>

        </div>
      </section>
    </>
  );
};

export default FAQ;
