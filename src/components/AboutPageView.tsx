import React from 'react';
import { ThemeConfig } from '../types/theme';
import { ShieldCheck, Award, Users, CheckCircle2, Paintbrush, ArrowRight } from 'lucide-react';

interface AboutPageViewProps {
  config: ThemeConfig;
  onNavigateToServices: () => void;
  onNavigateToContact: () => void;
}

export const AboutPageView: React.FC<AboutPageViewProps> = ({
  config,
  onNavigateToServices,
  onNavigateToContact,
}) => {
  return (
    <div className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider block mb-2">
            Company Profile
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About Anika Professional Painting Services
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Professional residential and commercial painting contractor serving Hyderabad and Secunderabad, Telangana.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 leading-snug">
              Elevating Living & Workspaces Through Craftsmanship & Punctuality
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Operating from Kapra near Radhika Theater, Anika Professional Painting Services was founded on a simple premise: painting should be transparent, long-lasting, and free from homeowner stress.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We eliminate common industry shortcomings—unexplained delays, diluted paints, and messy spatter on expensive flooring. Every project starts with laser measurement and a line-item estimate, followed by meticulous plastic masking and professional execution using Asian Paints and Berger products.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-2xl font-bold text-blue-900 block mb-1">
                  {config.suppliedRating} / 5
                </span>
                <span className="text-xs text-slate-500">
                  Rating from {config.suppliedReviewCount} verified reviews
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-2xl font-bold text-blue-900 block mb-1">22 Scopes</span>
                <span className="text-xs text-slate-500">
                  Interiors, exteriors, woodwork & waterproofing
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src="/assets/images/hero_luxury_interior_1794504458934.jpg"
                alt="Anika Professional Painting Interior Finish"
                className="w-full h-[380px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Core Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-b border-slate-100">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-2">Authentic Material Seal</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paints are purchased factory-sealed from authorized distribution counters. No thinning beyond manufacturer technical specifications.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <Paintbrush className="w-6 h-6 text-blue-800 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-2">Thorough Surface Preparation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never paint over loose chalk or active dampness. We address plaster damage, apply bonding primers, and finish with dual topcoats.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <CheckCircle2 className="w-6 h-6 text-amber-500 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-2">Spotless Cleanup</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We scrub incidental paint specks off vitrified tile floors, clean switch plates, and leave premises ready for family enjoyment.
            </p>
          </div>
        </div>

        {/* Action strip */}
        <div className="mt-12 text-center">
          <button
            onClick={onNavigateToContact}
            className="px-6 py-3.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl transition shadow-sm inline-flex items-center gap-2"
          >
            <span>Request Consultation with Anika Painting</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
