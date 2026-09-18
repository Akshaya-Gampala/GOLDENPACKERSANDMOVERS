import React, { useState } from 'react';
import { submitReviewApi } from '../services/api';
import { Star, X, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';

const ReviewModal = ({ isOpen, onClose, onReviewSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name || !formData.name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }

    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      setErrorMsg('Please select a rating between 1 and 5 stars.');
      return;
    }

    if (!formData.comment || !formData.comment.trim()) {
      setErrorMsg('Please write a review comment.');
      return;
    }

    setLoading(true);

    try {
      const res = await submitReviewApi({
        name: formData.name.trim(),
        email: formData.email.trim(),
        rating: Number(formData.rating),
        comment: formData.comment.trim(),
      });

      if (res.data.success) {
        setSuccessMsg('Thank you for your review! It has been submitted successfully and is pending administrator approval.');
        setFormData({ name: '', email: '', rating: 5, comment: '' });
        if (onReviewSubmitted) onReviewSubmitted();
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden relative">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Golden Packers Review</span>
            <h3 className="text-xl font-extrabold">Write a Customer Review</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          
          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Star Rating Input */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold uppercase text-slate-700">
              Select Your Rating *
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-amber-400 focus:outline-none transition-transform hover:scale-125 active:scale-95"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoverRating || formData.rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-sm font-extrabold text-slate-800 ml-2">
                {formData.rating} / 5 Stars
              </span>
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
              Your Full Name *
            </label>
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

          {/* Email Address (Optional) */}
          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
              Email Address <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. anish@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium"
            />
          </div>

          {/* Review / Comment Textarea */}
          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
              Your Review / Feedback *
            </label>
            <textarea
              name="comment"
              rows="4"
              value={formData.comment}
              onChange={handleChange}
              required
              placeholder="How was your packing and moving experience with Golden Packers and Movers?"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl gold-gradient-bg text-slate-950 font-extrabold text-sm shadow-md hover:brightness-105 transition-all flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Submit Review
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
