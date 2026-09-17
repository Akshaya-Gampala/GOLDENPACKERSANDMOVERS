import React from 'react';
import { X, Calendar, Tag, Layers } from 'lucide-react';

const LightboxModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
          aria-label="Close Preview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image View */}
          <div className="bg-slate-900 flex items-center justify-center min-h-[300px] md:min-h-[450px]">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="max-h-[500px] w-full object-contain"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>

          {/* Details Content */}
          <div className="p-8 flex flex-col justify-between bg-white">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
                  {item.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" /> {item.date}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.description || 'Verified work experience photo from Golden Packers and Movers relocation project.'}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Layers className="w-4 h-4 text-amber-500" /> Golden Work Experience
              </span>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;
