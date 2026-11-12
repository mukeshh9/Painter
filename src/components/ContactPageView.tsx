import React, { useState } from 'react';
import { ThemeConfig } from '../types/theme';
import { EnquiryForm } from './EnquiryForm';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Phone, MapPin, Clock, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

interface ContactPageViewProps {
  config: ThemeConfig;
}

export const ContactPageView: React.FC<ContactPageViewProps> = ({ config }) => {
  return (
    <div className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider block mb-2">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Anika Professional Painting Services
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Reach our estimation team directly for on-site inspection, color guidance, and quotation across Hyderabad and Secunderabad.
          </p>
        </div>

        {/* 2-Column Split: Business Info (Left) & FormSubmit.co Form (Right) */}
        {/* CRITICAL: Google Maps is strictly excluded here per mandatory specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Business Information
              </h2>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-900 shrink-0 mt-1" />
                <div>
                  <strong className="text-xs text-slate-900 block mb-0.5">Physical Address</strong>
                  <p className="text-xs text-slate-600 leading-relaxed">{config.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <strong className="text-xs text-slate-900 block mb-0.5">Phone Number</strong>
                  <a
                    href={`tel:${config.phone.replace(/\s+/g, '')}`}
                    className="text-xs text-blue-900 font-semibold hover:underline"
                  >
                    {config.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0 mt-1" size={16} />
                <div>
                  <strong className="text-xs text-slate-900 block mb-0.5">WhatsApp Chat</strong>
                  <a
                    href={`https://wa.me/${config.whatsappWidget.number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(config.whatsappWidget.prefilledMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-700 font-semibold hover:underline"
                  >
                    {config.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                <div>
                  <strong className="text-xs text-slate-900 block mb-0.5">Operating Hours</strong>
                  <p className="text-xs text-slate-600">{config.businessHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-purple-600 shrink-0 mt-1" />
                <div>
                  <strong className="text-xs text-slate-900 block mb-0.5">Receiving Desk (FormSubmit)</strong>
                  <p className="text-xs text-slate-600">{config.enquiryForm.receivingEmail}</p>
                </div>
              </div>
            </div>

            {/* Local Notice */}
            <div className="p-6 bg-blue-950 text-white rounded-2xl border border-blue-900 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Local Twin-City Assurance</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                We do not send subcontractors or third-party intermediaries. Our trained painters in Hyderabad and Secunderabad arrive with laser measurement tools and original paint swatches.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`tel:${config.phone.replace(/\s+/g, '')}`}
                  className="px-4 py-2 bg-white text-slate-900 text-xs font-bold rounded-lg hover:bg-slate-100 transition"
                >
                  Call Now
                </a>
                <a
                  href={`https://wa.me/${config.whatsappWidget.number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(config.whatsappWidget.prefilledMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#25D366] text-white text-xs font-bold rounded-lg hover:bg-[#20bd5a] transition flex items-center gap-1.5"
                >
                  <WhatsAppIcon size={14} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: FormSubmit.co Enquiry Form */}
          <div className="lg:col-span-7" id="contact-form">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900">{config.enquiryForm.title}</h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill the fields below to send an instant notification to our Kapra estimation desk.
              </p>
            </div>
            <EnquiryForm config={config} source="Dedicated Contact Us Page" />
          </div>
        </div>
      </div>
    </div>
  );
};
