import React from 'react';
import { ThemeConfig } from '../types/theme';
import { MapPin, Navigation, ExternalLink, Phone, ShieldCheck } from 'lucide-react';

interface GoogleMapsModuleProps {
  config: ThemeConfig;
  className?: string;
  isStandalone?: boolean;
}

export const GoogleMapsModule: React.FC<GoogleMapsModuleProps> = ({
  config,
  className = '',
  isStandalone = false,
}) => {
  if (!config.googleMaps.enabled) {
    return null;
  }

  return (
    <section className={`py-12 sm:py-16 ${className}`} id="location-map">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 tracking-wide uppercase mb-2">
            <MapPin className="w-4 h-4 text-blue-800" />
            <span>Independent Google Maps Module</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {config.googleMaps.title}
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            {config.googleMaps.description}
          </p>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2 sm:p-3">
          <div className="relative w-full rounded-xl overflow-hidden bg-slate-100" style={{ height: `${config.googleMaps.height}px` }}>
            <iframe
              src={config.googleMaps.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Anika Professional Painting Services Location Map"
              className="w-full h-full"
            />
          </div>

          {/* Location Info Strip */}
          <div className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-slate-100 mt-2">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-900 block">Verified Business Location</span>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                {config.address}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Local Contractor
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" /> {config.phone}
                </span>
                <span>·</span>
                <span>Operating 24 Hours</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={config.googleMaps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl transition shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{config.googleMaps.directionsLabel}</span>
              </a>

              <a
                href={config.googleListingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl transition"
              >
                <span>HiDoot Directory</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
