import React from 'react';
import { ServiceItem, ThemeConfig } from '../types/theme';
import { EnquiryForm } from './EnquiryForm';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ArrowLeft, Check, Phone, ShieldCheck, Sparkles, Clock, Paintbrush } from 'lucide-react';

interface ServiceDetailProps {
  service: ServiceItem;
  config: ThemeConfig;
  onBack: () => void;
  onSelectOtherService: (service: ServiceItem) => void;
  allServices: ServiceItem[];
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({
  service,
  config,
  onBack,
  onSelectOtherService,
  allServices,
}) => {
  const relatedServices = allServices
    .filter((s) => s.id !== service.id && s.category === service.category)
    .slice(0, 3);

  return (
    <div className="py-12 sm:py-16 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Painting Services</span>
          </button>
        </div>

        {/* Hero Banner Grid */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 mb-12">
          {/* Left Hero Image */}
          <div className="lg:col-span-7 relative min-h-[340px] lg:min-h-[460px] bg-slate-900">
            <img
              src={service.image}
              alt={service.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 shadow">
              {service.categoryLabel}
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur p-4 rounded-xl text-white text-xs border border-white/10 flex items-center justify-between">
              <div>
                <span className="font-semibold block">{service.title}</span>
                <span className="text-[11px] text-slate-300">Serving Hyderabad & Secunderabad</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${config.phone.replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 rounded-lg bg-white text-slate-900 font-bold hover:bg-slate-100 transition text-[11px]"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* Right Header Description */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2">
                <Paintbrush className="w-4 h-4 text-blue-700" />
                <span>Service Specification</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
                {service.title}
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {service.fullDesc}
              </p>

              {/* Verified Trust Strip */}
              <div className="space-y-2.5 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Premium Asian Paints, Berger & Dulux coatings</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Meticulous masking and dust-controlled preparation</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Spotless post-painting cleaning & final handover</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <a
                href="#service-enquiry"
                className="flex-1 py-3 px-4 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl text-center transition shadow-sm"
              >
                {service.ctaLabel}
              </a>
              <a
                href={`https://wa.me/${config.whatsappWidget.number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Anika Painting, I am inquiring about ${service.title} in Hyderabad.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition shadow-sm"
              >
                <WhatsAppIcon size={16} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Key Advantages */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Key Benefits & Service Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 leading-relaxed font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suitable Applications */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Ideal Property Applications
              </h2>
              <div className="flex flex-wrap gap-2">
                {service.applications.map((app, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-100 text-xs font-medium"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

            {/* Process Execution */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Our 6-Step Painting Methodology
              </h2>
              <ol className="space-y-4 text-xs text-slate-600">
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Contact & Initial Consultation</strong>
                    Discuss your room or building requirements, color preferences, and timeline.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Site Inspection & Laser Measurement</strong>
                    Prompt on-site visit in Hyderabad/Secunderabad to gauge wall moisture, cracks, and exact square footage.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Estimate & Material Specification</strong>
                    Transparent quotation specifying original Asian Paints/Berger paint grades with zero hidden costs.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">4</span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Surface Preparation & Masking</strong>
                    Scraping, crack-filling, waterproof primer application, and masking all floors, furniture, and switch plates.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">5</span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Precision Painting & Finishing</strong>
                    Dual topcoats with roller/spray ensuring laser-sharp lines and uniform sheen.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">6</span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Final Inspection & Clean Handover</strong>
                    Thorough cleanup, inspection walkthrough with customer, and guaranteed satisfaction.
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Dedicated Enquiry Form (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-8" id="service-enquiry">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-1">
                Book Estimate for {service.title}
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Receive customized quotation and schedule an on-site visit in Hyderabad or Secunderabad.
              </p>
              <EnquiryForm
                config={config}
                source={`Service Page: ${service.title}`}
                selectedService={service.title}
              />
            </div>

            {/* Related Services in Category */}
            {relatedServices.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                  Related {service.categoryLabel} Services
                </h3>
                <div className="space-y-3">
                  {relatedServices.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectOtherService(rel)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition cursor-pointer border border-transparent hover:border-slate-200"
                    >
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-slate-900 block truncate">{rel.title}</span>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{rel.shortDesc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
