import React, { useState } from 'react';
import { GalleryItem } from '../types/theme';
import { Image as ImageIcon, Eye, Sparkles } from 'lucide-react';

interface GallerySectionProps {
  items: GalleryItem[];
  title?: string;
  isFullPage?: boolean;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  items,
  title = 'Painting Inspiration & Our Services',
  isFullPage = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const categories = ['All', ...Array.from(new Set(items.map((it) => it.category)))];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((it) => it.category === selectedCategory);

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-200" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Exact Mandatory Title */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 tracking-wide uppercase mb-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Curated Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Original illustrative representations of premium painting finishes, designer texture walls, and protective wood coatings created specifically for Anika Professional Painting Services.
          </p>
          <p className="text-[11px] text-slate-400 mt-1 italic">
            *Illustrative conceptual project inspiration. Replaceable with client-completed job photographs from WordPress Admin.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.altText}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 bg-white/90 backdrop-blur rounded-full text-slate-900 shadow">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-blue-900 block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveImage(null)}
          >
            <div
              className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] bg-slate-900">
                <img
                  src={activeImage.image}
                  alt={activeImage.altText}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-blue-800 uppercase tracking-wide">
                    {activeImage.category}
                  </span>
                  <button
                    onClick={() => setActiveImage(null)}
                    className="text-xs text-slate-400 hover:text-slate-900 font-bold"
                  >
                    Close (Esc)
                  </button>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{activeImage.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{activeImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
