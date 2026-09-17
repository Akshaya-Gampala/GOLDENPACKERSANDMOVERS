import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import LightboxModal from '../components/LightboxModal';
import { fetchGalleryApi } from '../services/api';
import { Layers, Calendar, Filter, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(null);

  const categories = [
    'All',
    'Packing',
    'Loading',
    'Transportation',
    'Unloading',
    'House Shifting',
    'Office Shifting',
    'Vehicle Moving',
    'Completed Projects',
  ];

  useEffect(() => {
    const loadGallery = async () => {
      setLoading(true);
      try {
        const res = await fetchGalleryApi(selectedCategory);
        setGalleryItems(res.data.data);
      } catch (error) {
        console.error('Failed to load gallery items:', error);
      } finally {
        setLoading(false);
      }
    };
    loadGallery();
  }, [selectedCategory]);

  return (
    <>
      <SEO
        title="Work Experience Gallery"
        description="View real photographs of our packing, loading, highway transit, unloading, home shifting, office relocation, and vehicle transportation projects."
      />

      {/* Banner */}
      <section className="bg-slate-900 text-white py-16 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
            Work Experience Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Our Work & Experience Gallery
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base">
            Browse authentic work experience photos of our professional packing, secure loading, container transport, and completed customer relocation projects.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-slate-50 min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Category Filter Buttons */}
          <div className="flex items-center justify-center gap-2 flex-wrap bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
            <span className="text-xs font-extrabold uppercase text-slate-400 px-3 flex items-center gap-1.5 mr-1 hidden sm:flex">
              <Filter className="w-3.5 h-3.5" /> Filter Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'gold-gradient-bg text-slate-950 shadow-md scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loading Spinner */}
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-600">Loading Work Experience Photos...</p>
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <ImageIcon className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-xl font-bold text-slate-800">No Photos In This Category Yet</h3>
              <p className="text-slate-500 text-sm">
                Photos for category "{selectedCategory}" will be uploaded soon by our site admin.
              </p>
            </div>
          ) : (
            /* Modern Grid Gallery */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setActivePhoto(item)}
                  className="bright-card rounded-2xl overflow-hidden group cursor-pointer border border-slate-200 bg-white flex flex-col justify-between"
                >
                  <div className="relative h-64 overflow-hidden bg-slate-900">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/90 text-amber-400 border border-amber-500/40 backdrop-blur-md">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-semibold text-amber-600">
                        <Sparkles className="w-3.5 h-3.5" /> Verified Project
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> {item.date}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                      {item.description || 'Professional relocation work completed by Golden Packers and Movers crew.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Lightbox Preview */}
      {activePhoto && <LightboxModal item={activePhoto} onClose={() => setActivePhoto(null)} />}
    </>
  );
};

export default Gallery;
