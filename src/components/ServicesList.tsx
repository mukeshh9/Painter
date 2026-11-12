import React, { useState } from 'react';
import { ServiceItem } from '../types/theme';
import { Check, ArrowRight, Shield, Sparkles } from 'lucide-react';

interface ServicesListProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
  onEnquireService: (service: ServiceItem) => void;
  initialCategory?: string;
}

export const ServicesList: React.FC<ServicesListProps> = ({
  services,
  onSelectService,
  onEnquireService,
  initialCategory = 'All',
}) => {
  const [selectedCat, setSelectedCat] = useState<string>(initialCategory);

  const categories = [
    { key: 'All', label: 'All 22 Services' },
    { key: 'exterior', label: 'Exterior & Villa' },
    { key: 'interior', label: 'Interior & Textures' },
    { key: 'wood', label: 'Wood & Furniture' },
    { key: 'specialized', label: 'Specialized & Repairs' },
    { key: 'additional', label: 'Waterproofing & Cleanup' },
  ];

  const filteredServices = selectedCat === 'All'
    ? services
    : services.filter((s) => s.category === selectedCat);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 tracking-wide uppercase mb-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Complete Painting Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Our 22 Professional Painting Services
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Every service is managed individually with dedicated visual assets, technical benefits, suitable application scopes, and dedicated enquiry routing.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelectedCat(c.key)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                selectedCat === c.key
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* 22 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-900 shadow-sm">
                    {service.categoryLabel}
                  </div>
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur text-white text-[11px] font-mono px-2 py-0.5 rounded">
                    #{service.order}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Bullet Benefits */}
                  <div className="space-y-1.5 pt-1 border-t border-slate-100">
                    {service.benefits.slice(0, 2).map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  onClick={() => onSelectService(service)}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition text-center"
                >
                  View Full Scope
                </button>
                <button
                  onClick={() => onEnquireService(service)}
                  className="py-2 px-3.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition shadow-sm flex items-center gap-1.5"
                >
                  <span>Estimate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
