import React, { useState } from 'react';
import { ThemeConfig, ServiceItem, GalleryItem } from '../types/theme';
import { EnquiryForm } from './EnquiryForm';
import { GallerySection } from './GallerySection';
import { GoogleMapsModule } from './GoogleMapsModule';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  Paintbrush,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  ArrowRight,
  Star,
  Layers,
  ChevronDown,
  Building,
  Home,
  Check
} from 'lucide-react';

interface HomePageViewProps {
  config: ThemeConfig;
  services: ServiceItem[];
  gallery: GalleryItem[];
  onNavigateToServices: () => void;
  onNavigateToGallery: () => void;
  onNavigateToContact: () => void;
  onSelectService: (service: ServiceItem) => void;
}

export const HomePageView: React.FC<HomePageViewProps> = ({
  config,
  services,
  gallery,
  onNavigateToServices,
  onNavigateToGallery,
  onNavigateToContact,
  onSelectService,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const featuredServices = services.filter((s) => s.featured).slice(0, 6);
  const homeGallery = gallery.filter((g) => g.featuredOnHome).slice(0, 4);

  const faqs = [
    {
      q: 'Which areas do you provide painting services in?',
      a: 'We provide prompt residential and commercial painting services across Hyderabad and Secunderabad, including Kapra, Sainikpuri, AS Rao Nagar, Yapral, ECIL, Tarnaka, Banjara Hills, Jubilee Hills, Madhapur, and Gachibowli.',
    },
    {
      q: 'Which paint brands do you use for interior and exterior work?',
      a: 'We use premium authentic paints from Asian Paints (Royale, Apex Ultima), Berger (Breathe Easy, WeatherCoat), and other top tier brands chosen based on your preferences and budget.',
    },
    {
      q: 'Do you take care of masking and post-painting cleanup?',
      a: 'Yes, absolutely. Prior to painting, our team masks all floors, modular woodwork, and switch plates with drop cloths and masking tape. Upon completion, we clean paint specks and wash floors so your home is ready for immediate living.',
    },
    {
      q: 'Can you fix severe wall dampness and water seepage?',
      a: 'Yes. Our specialized waterproofing team inspects the root cause of dampness, removes flaky efflorescence plaster, applies chemical crystalline moisture barriers, and seals cracks before painting.',
    },
    {
      q: 'How do I get a free estimate and color consultation?',
      a: 'Simply call us at +91 98665 92716, message us on WhatsApp, or submit the online enquiry form. We will arrange a free on-site laser measurement visit at your convenience.',
    },
  ];

  return (
    <div className="space-y-0">
      {/* SECTION 1: HERO */}
      {config.sections.hero && (
        <section className="relative bg-slate-900 text-white overflow-hidden py-20 sm:py-28">
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/images/hero_luxury_interior_1794504458934.jpg"
              alt="Luxury Living Room Interior Painting Hyderabad"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              {config.showRating && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-xs text-amber-300 mb-6">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="font-semibold text-white">{config.suppliedRating}/5</span>
                  <span className="text-slate-300">({config.suppliedReviewCount} verified reviews)</span>
                </div>
              )}

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
                Transform Your Space with Professional Painting Services
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
                Give your home or commercial property a fresh, beautiful look with professional painting, premium finishes and reliable painting solutions across Hyderabad and Secunderabad.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#home-enquiry"
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition shadow-lg shadow-blue-900/40"
                >
                  Get a Free Estimate
                </a>
                <a
                  href={`tel:${config.phone.replace(/\s+/g, '')}`}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl transition flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call: {config.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${config.whatsappWidget.number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(config.whatsappWidget.prefilledMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold rounded-xl transition flex items-center gap-2 shadow"
                >
                  <WhatsAppIcon size={18} />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              {/* Regional markers */}
              <div className="flex items-center gap-4 mt-10 pt-6 border-t border-white/10 text-xs text-slate-400">
                <span>Serving {config.primaryCity} & {config.secondaryCity}</span>
                <span>·</span>
                <span>Asian Paints & Berger</span>
                <span>·</span>
                <span>Dust-Controlled Execution</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: ABOUT ANIKA */}
      {config.sections.about && (
        <section className="py-16 sm:py-24 bg-white" id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md">
                  <img
                    src="/assets/images/exterior_villa_paint_1794504472273.jpg"
                    alt="Anika Professional Painting Services Villa Exterior"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-6 rounded-2xl shadow-xl hidden sm:block max-w-xs border border-slate-800">
                  <div className="text-2xl font-bold text-amber-400 mb-1">{config.suppliedRating} ★</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Consistent 4.7/5 satisfaction rating across residential villas & commercial repaints in Hyderabad.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
                  About Anika Professional Painting
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                  Experienced Local Painting Specialists Serving Hyderabad & Secunderabad
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Headquartered in Kapra near Radhika Theater, Anika Professional Painting Services provides residential and commercial property owners with reliable, high-craftsmanship painting solutions.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Whether protecting exterior facades against intense summer sun and monsoon rains, or introducing luxurious interior textures and teakwood polish, our team delivers systematic surface preparation, honest pricing, and immaculate site cleanup.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-900 block mb-1">Residential & Commercial</span>
                    <p className="text-xs text-slate-500">From 2BHK apartments to gated community villas and corporate suites.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-900 block mb-1">Complete Turnkey Care</span>
                    <p className="text-xs text-slate-500">Crack repair, waterproofing, painting, and meticulous floor cleanup.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onNavigateToServices}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 hover:text-blue-800"
                  >
                    <span>Explore all 22 painting services</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: SERVICES OVERVIEW (Featured) */}
      {config.sections.servicesOverview && (
        <section className="py-16 sm:py-20 bg-slate-50" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider block mb-2">
                  Comprehensive Capabilities
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                  Featured Painting Services
                </h2>
              </div>
              <button
                onClick={onNavigateToServices}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 text-white text-xs font-semibold hover:bg-blue-800 transition shadow-sm shrink-0"
              >
                <span>View All 22 Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-900">
                        {service.categoryLabel}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-slate-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {service.shortDesc}
                      </p>
                      <div className="space-y-1 pt-1 border-t border-slate-100">
                        {service.benefits.slice(0, 2).map((b, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                            <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="truncate">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => onSelectService(service)}
                      className="w-full py-2.5 px-3 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-xl transition text-center flex items-center justify-center gap-1.5"
                    >
                      <span>Explore {service.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: WHY CHOOSE ANIKA */}
      {config.sections.whyChoose && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider block mb-2">
                Our Standards
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Why Property Owners Choose Anika
              </h2>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Focused on craftsmanship, transparent estimates, and careful property protection.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Residential & Commercial',
                  desc: 'Specialized teams equipped for independent villas, apartment complexes, retail spaces, and corporate offices.',
                },
                {
                  title: 'Interior & Exterior Painting',
                  desc: 'Dual-protection capabilities covering weather-proof exterior coats as well as luxury interior royal finishes.',
                },
                {
                  title: 'Designer Texture Finishes',
                  desc: 'Artisanal Italian stucco, metallic glazes, and modern geometric accent wall treatments.',
                },
                {
                  title: 'Premium Paint Options',
                  desc: 'Genuine Asian Paints and Berger formulations chosen for durability, washability, and true color tone.',
                },
                {
                  title: 'Surface Preparation',
                  desc: 'Rigorous crack sealing, efflorescence treatment, and polymer putty smoothing for lasting adhesion.',
                },
                {
                  title: 'Waterproofing Solutions',
                  desc: 'Prevent future damp patches and peeling with integrated crystalline barrier treatments.',
                },
                {
                  title: 'Dust-Controlled Sanding',
                  desc: 'Modern tools reduce airborne fine dust inside living spaces during preparation.',
                },
                {
                  title: 'Professional Cleanup',
                  desc: 'Spotless scrubbing of incidental paint specks off floors and window glass before final handover.',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition">
                  <div className="w-7 h-7 rounded-lg bg-blue-900 text-white font-bold flex items-center justify-center text-xs mb-3">
                    0{idx + 1}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: PAINTING SOLUTIONS (Property Types) */}
      {config.sections.paintingSolutions && (
        <section className="py-16 sm:py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-2">
                Tailored Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Painting Tailored to Your Property Type
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
                <Home className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Independent Homes & Villas</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Full elevation exterior weather coatings, boundary wall enameled gates, teakwood door varnishing, and bespoke interior living room accents.
                </p>
                <span className="text-xs text-blue-300 font-semibold">Kapra · Sainikpuri · Yapral · Alwal</span>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
                <Building className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Apartments & Gated Flats</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Quick turnaround repaint services, rental move-out refreshes, washable silk emulsions, and zero-mess dust masking.
                </p>
                <span className="text-xs text-emerald-300 font-semibold">2BHK & 3BHK flats across Hyderabad</span>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
                <Layers className="w-8 h-8 text-amber-400 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Commercial & Offices</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  High-durability commercial paints, acoustic gypsum false ceiling coatings, anti-rust metal spray painting, and weekend scheduling.
                </p>
                <span className="text-xs text-amber-300 font-semibold">Retail stores, clinics & office complexes</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: BRANDS */}
      {config.sections.brands && (
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Paint Formulations
                </span>
                <p className="text-sm font-bold text-slate-800">
                  We use genuine premium paint brands tailored to your specification
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-700">
                {config.brandList.map((brand, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7: GALLERY PREVIEW (Exact Mandatory Title) */}
      {config.sections.galleryPreview && (
        <GallerySection
          items={homeGallery}
          title="Painting Inspiration & Our Services"
        />
      )}

      {/* SECTION 8: PAINTING PROCESS */}
      {config.sections.process && (
        <section className="py-16 sm:py-20 bg-white" id="process">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider block mb-2">
                Execution Discipline
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Our 6-Step Painting Methodology
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { step: '01', title: 'Contact & Enquiry', desc: 'Call or submit an online request with basic project specifications.' },
                { step: '02', title: 'Site Inspection', desc: 'In-person assessment in Hyderabad/Secunderabad to check dampness and surface condition.' },
                { step: '03', title: 'Estimate & Planning', desc: 'Clear quote detailing paint quantities, preparation scope, and schedule.' },
                { step: '04', title: 'Surface Preparation', desc: 'Scraping, crack patching, putty leveling, and protective masking of belongings.' },
                { step: '05', title: 'Painting & Finishing', desc: 'Even dual-coat topcoats with precision edge cutting and uniform gloss.' },
                { step: '06', title: 'Final Inspection & Cleanup', desc: 'Complete floor wiping, fixture cleaning, and walkthrough with customer.' },
              ].map((p, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-mono font-bold text-blue-900 block mb-2">Step {p.step}</span>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 9: BUSINESS HIGHLIGHTS & STATS */}
      {config.sections.highlights && (
        <section className="py-12 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold block mb-1">
                  {config.suppliedRating} / 5.0
                </span>
                <span className="text-xs text-blue-200">Supplied Business Rating</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold block mb-1">
                  {config.suppliedReviewCount} Verified
                </span>
                <span className="text-xs text-blue-200">Customer Reviews</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold block mb-1">22 Services</span>
                <span className="text-xs text-blue-200">Dedicated Specialized Scopes</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold block mb-1">24 Hours</span>
                <span className="text-xs text-blue-200">Operating Availability</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 10: CUSTOMER REVIEWS */}
      {config.sections.reviews && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider block mb-2">
                Customer Feedback
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Verified Reviews from Hyderabad Homeowners
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: 'Anika Painting repainted our 3BHK flat in Kapra. Their masking of furniture and floor cleanup was exemplary. No paint drips left behind.',
                  author: 'S. Ramanathan',
                  location: 'Kapra, Secunderabad',
                  rating: 5,
                },
                {
                  quote: 'Applied royal texture finishes in our living room TV wall and varnished our main teakwood entrance door. Flawless workmanship.',
                  author: 'M. Krishna',
                  location: 'Sainikpuri, Hyderabad',
                  rating: 5,
                },
                {
                  quote: 'Fixed damp seepage on our exterior balcony wall before repainting with weather-shield primer. Honest pricing and on-time completion.',
                  author: 'V. Laxman Rao',
                  location: 'AS Rao Nagar, Secunderabad',
                  rating: 5,
                },
              ].map((rev, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center text-amber-500 mb-3">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                      "{rev.quote}"
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-xs font-bold text-slate-900 block">{rev.author}</span>
                    <span className="text-[11px] text-slate-500">{rev.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 11: SERVICE AREAS */}
      {config.sections.serviceAreas && (
        <section className="py-14 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider block mb-1">
                Regional Coverage
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Confirmed Service Locations
              </h2>
              <p className="text-xs text-slate-600 mt-2">
                Fast on-site measurement and execution throughout the twin cities.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
              {[
                'Kapra',
                'Secunderabad',
                'Radhika Theater Circle',
                'Sainikpuri',
                'AS Rao Nagar',
                'Yapral',
                'ECIL',
                'Neredmet',
                'Malkajgiri',
                'Tarnaka',
                'Kompally',
                'Alwal',
                'Banjara Hills',
                'Jubilee Hills',
                'Madhapur',
                'Gachibowli',
              ].map((area, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-medium shadow-2xs"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 12: FAQS */}
      {config.sections.faq && (
        <section className="py-16 sm:py-20 bg-white" id="faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider block mb-2">
                Frequently Asked Questions
              </span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Common Questions on Painting & Estimates
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs font-bold text-slate-900"
                  >
                    <span>{f.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 13: FINAL ENQUIRY CTA & FORMSUBMIT FORM */}
      {config.sections.finalCta && (
        <section className="py-16 sm:py-20 bg-slate-900 text-white" id="home-enquiry">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Direct Inquiries
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Ready to Give Your Property a Fresh New Look?
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Schedule your on-site measurement in Hyderabad or Secunderabad. We provide transparent estimates, professional color consultation, and guaranteed dust-controlled execution.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>No-obligation on-site laser measurement</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Enquiries routed safely via FormSubmit.co</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Quick response on WhatsApp (+91 98665 92716)</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <a
                    href={`tel:${config.phone.replace(/\s+/g, '')}`}
                    className="px-5 py-3 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-900" />
                    <span>Call: {config.phone}</span>
                  </a>
                  <a
                    href={`https://wa.me/${config.whatsappWidget.number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(config.whatsappWidget.prefilledMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20bd5a] transition flex items-center gap-2"
                  >
                    <WhatsAppIcon size={16} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* FormSubmit.co Form Container */}
              <div className="lg:col-span-7">
                <EnquiryForm config={config} source="Homepage Final CTA Section" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Standalone or Section Maps Placement if configured on homepage */}
      {config.googleMaps.enabled && config.googleMaps.displayLocation === 'home-section' && (
        <GoogleMapsModule config={config} className="bg-slate-50" />
      )}
    </div>
  );
};
