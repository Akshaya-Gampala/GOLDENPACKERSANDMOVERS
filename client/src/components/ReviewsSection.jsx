import React, { useState, useEffect } from 'react';
import { fetchPublicReviewsApi } from '../services/api';
import { BUSINESS_CONFIG } from '../config/business';
import ReviewModal from './ReviewModal';
import { Star, ExternalLink, Quote, MessageSquare, PlusCircle } from 'lucide-react';

const ReviewsSection = ({ className = '' }) => {
  const [reviews, setReviews] = useState(BUSINESS_CONFIG.reviewsList);
  const [rating, setRating] = useState(BUSINESS_CONFIG.googleRating);
  const [reviewCount, setReviewCount] = useState(BUSINESS_CONFIG.googleReviewCount);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadApprovedReviews = async () => {
    try {
      const res = await fetchPublicReviewsApi();
      if (res.data.success && res.data.data && res.data.data.length > 0) {
        // Transform database items to match display format
        const formatted = res.data.data.map((r) => ({
          id: r._id,
          authorName: r.name,
          rating: r.rating,
          relativeTime: new Date(r.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          text: r.comment,
        }));
        setReviews(formatted);
        setRating(res.data.averageRating || BUSINESS_CONFIG.googleRating);
        setReviewCount(res.data.count || BUSINESS_CONFIG.googleReviewCount);
      }
    } catch (err) {
      console.error('Error fetching public reviews, using fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApprovedReviews();
  }, []);

  const renderStars = (starCount) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 sm:w-5 sm:h-5 ${
          i < Math.round(starCount) ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
        }`}
      />
    ));
  };

  return (
    <>
      <section id="what-our-customers-say" className={`py-20 bg-white border-t border-slate-100 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              <MessageSquare className="w-4 h-4 text-amber-600" /> Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Real customer feedback for Golden Packers and Movers.
            </p>

            {/* Top Rating Summary Card */}
            <div className="pt-6 flex flex-col items-center justify-center">
              <div className="bg-slate-900 text-white px-8 py-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center gap-6 border border-slate-800">
                <div className="flex flex-col items-center sm:items-start space-y-1">
                  <div className="flex items-center gap-1">{renderStars(rating)}</div>
                  <div className="text-3xl font-extrabold text-amber-400 font-heading">
                    {rating} <span className="text-xl font-normal text-slate-400">/ 5</span>
                  </div>
                </div>
                <div className="h-px sm:h-12 w-full sm:w-px bg-slate-700"></div>
                <div className="text-center sm:text-left space-y-1">
                  <p className="text-sm sm:text-base text-slate-200 font-bold">
                    Based on <span className="text-amber-400 font-extrabold">{reviewCount}</span> customer reviews
                  </p>
                  <p className="text-xs text-slate-400">Golden Packers and Movers Verified Rating</p>
                </div>
              </div>
            </div>

            {/* Write a Review Button */}
            <div className="pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl gold-gradient-bg text-slate-950 font-extrabold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <PlusCircle className="w-5 h-5" /> Write a Review
              </button>
            </div>
          </div>

          {/* Customer Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.slice(0, 8).map((rev) => (
              <div
                key={rev.id}
                className="bright-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between space-y-6 relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border border-slate-200/90 bg-white"
              >
                <div className="space-y-4">
                  {/* Star Rating & Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">{renderStars(rev.rating)}</div>
                    <Quote className="w-7 h-7 text-amber-500/20 group-hover:text-amber-500/40 transition-colors" />
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-700 text-sm leading-relaxed font-medium">
                    "{rev.text}"
                  </p>
                </div>

                {/* Author Info & Date Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gold-gradient-bg text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-md">
                      {rev.authorName ? rev.authorName.charAt(0) : 'G'}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">— {rev.authorName}</h4>
                      <span className="text-[11px] text-slate-400 font-semibold">{rev.relativeTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Reviews Button */}
          <div className="mt-14 text-center">
            <a
              href={BUSINESS_CONFIG.googleBusinessProfileUrl || BUSINESS_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold text-base shadow-xl hover:scale-105 active:scale-95 transition-all border border-slate-700"
            >
              <span>View All Reviews</span>
              <ExternalLink className="w-5 h-5 text-amber-400" />
            </a>
          </div>

        </div>
      </section>

      {/* Write a Review Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewSubmitted={loadApprovedReviews}
      />
    </>
  );
};

export default ReviewsSection;
