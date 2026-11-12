import React, { useState } from 'react';
import { ThemeConfig, ServiceItem, GalleryItem } from './types/theme';
import { INITIAL_CONFIG, INITIAL_SERVICES, INITIAL_GALLERY } from './data/initialData';
import { AdminDashboard } from './components/AdminDashboard';
import { HomePageView } from './components/HomePageView';
import { ServicesList } from './components/ServicesList';
import { ServiceDetail } from './components/ServiceDetail';
import { GallerySection } from './components/GallerySection';
import { GoogleMapsModule } from './components/GoogleMapsModule';
import { ContactPageView } from './components/ContactPageView';
import { AboutPageView } from './components/AboutPageView';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { generateWordPressThemeZip } from './utils/zipGenerator';
import {
  Paintbrush,
  Phone,
  Settings,
  Sparkles,
  Download,
  Menu,
  X,
  MapPin,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<ThemeConfig>(INITIAL_CONFIG);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);

  // Active view states
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'services' | 'service-detail' | 'gallery' | 'location' | 'contact' | 'admin'>('home');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Handlers
  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setCurrentView('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquireService = (service: ServiceItem) => {
    setSelectedService(service);
    setCurrentView('service-detail');
    setTimeout(() => {
      const el = document.getElementById('service-enquiry');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleExportZip = async () => {
    setIsExporting(true);
    try {
      const blob = await generateWordPressThemeZip(config, services, gallery);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'anika-professional-painting.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (e) {
      console.error('ZIP generation error:', e);
    } finally {
      setIsExporting(false);
    }
  };

  const handleResetDefaults = () => {
    setConfig(INITIAL_CONFIG);
    setServices(INITIAL_SERVICES);
    setGallery(INITIAL_GALLERY);
  };

  // Nav switcher supporting Single-Page, Multi-Page, and Hybrid
  const handleNavClick = (view: 'home' | 'about' | 'services' | 'gallery' | 'location' | 'contact') => {
    setMobileMenuOpen(false);

    if (config.structureMode === 'single') {
      setCurrentView('home');
      setTimeout(() => {
        const idMap: Record<string, string> = {
          home: 'masthead',
          about: 'about',
          services: 'services',
          gallery: 'gallery',
          location: 'location-map',
          contact: 'home-enquiry',
        };
        const target = document.getElementById(idMap[view]);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Universal Mode & Admin Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 sm:px-6 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white flex items-center gap-1.5">
            <Paintbrush className="w-3.5 h-3.5 text-blue-400" />
            <span>WordPress Theme Engine</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Mode: <strong className="text-slate-200 capitalize">{config.structureMode}</strong> · Style: <strong className="text-slate-200 capitalize">{config.designStyle}</strong> · Preset: <strong className="text-slate-200 capitalize">{config.colorPreset.replace('-', ' ')}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {downloadSuccess && (
            <span className="text-emerald-400 font-medium text-[11px] flex items-center gap-1 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              <CheckCircle2 className="w-3 h-3" /> ZIP Downloaded
            </span>
          )}

          <button
            onClick={handleExportZip}
            disabled={isExporting}
            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-md transition flex items-center gap-1.5 text-[11px] shadow-sm"
          >
            <Download className="w-3 h-3" />
            <span>{isExporting ? 'Building ZIP...' : 'Export Theme ZIP'}</span>
          </button>

          <button
            onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
            className={`px-3 py-1 rounded-md transition font-medium flex items-center gap-1.5 text-[11px] ${
              currentView === 'admin'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <Settings className="w-3 h-3" />
            <span>{currentView === 'admin' ? 'Exit WP Admin' : 'WP Admin Dashboard'}</span>
          </button>
        </div>
      </div>

      {currentView === 'admin' ? (
        <AdminDashboard
          config={config}
          onUpdateConfig={setConfig}
          onResetDefaults={handleResetDefaults}
          onExportZip={handleExportZip}
          isExportingZip={isExporting}
        />
      ) : (
        <>
          {/* HEADER & NAVIGATION (Strict Top Bar Contract) */}
          <header
            id="masthead"
            className={`site-header ${
              config.header.sticky ? 'sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs' : 'bg-white'
            } border-b border-slate-200/80 transition-all`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-8">
              {/* Zone 1: Brand Wordmark (Single Text Element) */}
              <div
                onClick={() => handleNavClick('home')}
                className="cursor-pointer whitespace-nowrap shrink-0 group"
              >
                <div className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-900 transition">
                  {config.businessName}
                </div>
                <div className="text-[11px] text-slate-500 font-normal">
                  {config.primaryCity} & {config.secondaryCity}
                </div>
              </div>

              {/* Zone 2: Navigation Links (Single-Line, 4-5 Concise Labels) */}
              <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
                <button
                  onClick={() => handleNavClick('home')}
                  className={`hover:text-slate-900 transition whitespace-nowrap shrink-0 ${
                    currentView === 'home' ? 'text-blue-900 font-bold' : ''
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('about')}
                  className={`hover:text-slate-900 transition whitespace-nowrap shrink-0 ${
                    currentView === 'about' ? 'text-blue-900 font-bold' : ''
                  }`}
                >
                  About Us
                </button>
                <button
                  onClick={() => handleNavClick('services')}
                  className={`hover:text-slate-900 transition whitespace-nowrap shrink-0 ${
                    currentView === 'services' || currentView === 'service-detail' ? 'text-blue-900 font-bold' : ''
                  }`}
                >
                  22 Services
                </button>
                <button
                  onClick={() => handleNavClick('gallery')}
                  className={`hover:text-slate-900 transition whitespace-nowrap shrink-0 ${
                    currentView === 'gallery' ? 'text-blue-900 font-bold' : ''
                  }`}
                >
                  Gallery
                </button>
                {config.googleMaps.enabled && (
                  <button
                    onClick={() => handleNavClick('location')}
                    className={`hover:text-slate-900 transition whitespace-nowrap shrink-0 ${
                      currentView === 'location' ? 'text-blue-900 font-bold' : ''
                    }`}
                  >
                    Google Maps
                  </button>
                )}
                <button
                  onClick={() => handleNavClick('contact')}
                  className={`hover:text-slate-900 transition whitespace-nowrap shrink-0 ${
                    currentView === 'contact' ? 'text-blue-900 font-bold' : ''
                  }`}
                >
                  Contact
                </button>
              </nav>

              {/* Zone 3: 1 Primary Action + Quick Call */}
              <div className="flex items-center gap-3 shrink-0">
                {config.header.showPhone && (
                  <a
                    href={`tel:${config.phone.replace(/\s+/g, '')}`}
                    className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{config.phone}</span>
                  </a>
                )}

                <button
                  onClick={() => handleNavClick('contact')}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-900 hover:bg-blue-800 text-white transition shadow-sm whitespace-nowrap shrink-0"
                >
                  {config.header.ctaLabel}
                </button>

                {/* Mobile Hamburger Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 text-xs font-medium">
                <button
                  onClick={() => handleNavClick('home')}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 text-slate-800"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('about')}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 text-slate-800"
                >
                  About Us
                </button>
                <button
                  onClick={() => handleNavClick('services')}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 text-slate-800"
                >
                  All 22 Painting Services
                </button>
                <button
                  onClick={() => handleNavClick('gallery')}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 text-slate-800"
                >
                  Gallery Inspiration
                </button>
                {config.googleMaps.enabled && (
                  <button
                    onClick={() => handleNavClick('location')}
                    className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 text-slate-800"
                  >
                    Google Maps Module (Independent)
                  </button>
                )}
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 text-slate-800"
                >
                  Contact & Enquiry
                </button>

                <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                  <a
                    href={`tel:${config.phone.replace(/\s+/g, '')}`}
                    className="py-2.5 px-3 rounded-lg bg-slate-100 text-slate-900 font-semibold flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Call: {config.phone}</span>
                  </a>
                </div>
              </div>
            )}
          </header>

          {/* MAIN CONTENT VIEW ROUTING */}
          <main className="flex-1">
            {currentView === 'home' && (
              <HomePageView
                config={config}
                services={services}
                gallery={gallery}
                onNavigateToServices={() => handleNavClick('services')}
                onNavigateToGallery={() => handleNavClick('gallery')}
                onNavigateToContact={() => handleNavClick('contact')}
                onSelectService={handleSelectService}
              />
            )}

            {currentView === 'about' && (
              <AboutPageView
                config={config}
                onNavigateToServices={() => handleNavClick('services')}
                onNavigateToContact={() => handleNavClick('contact')}
              />
            )}

            {currentView === 'services' && (
              <ServicesList
                services={services}
                onSelectService={handleSelectService}
                onEnquireService={handleEnquireService}
              />
            )}

            {currentView === 'service-detail' && selectedService && (
              <ServiceDetail
                service={selectedService}
                config={config}
                onBack={() => handleNavClick('services')}
                onSelectOtherService={handleSelectService}
                allServices={services}
              />
            )}

            {currentView === 'gallery' && (
              <GallerySection
                items={gallery}
                title="Painting Inspiration & Our Services"
                isFullPage={true}
              />
            )}

            {/* MANDATORY INDEPENDENT GOOGLE MAPS MODULE: Standalone Route */}
            {currentView === 'location' && (
              <div className="bg-slate-50 min-h-[70vh]">
                <GoogleMapsModule config={config} isStandalone={true} />
              </div>
            )}

            {/* CONTACT US PAGE: Never contains the Google Map per mandatory rule */}
            {currentView === 'contact' && (
              <ContactPageView config={config} />
            )}
          </main>

          {/* Full-width standalone map above footer if configured */}
          {config.googleMaps.enabled && config.googleMaps.displayLocation === 'bottom-all-pages' && currentView !== 'location' && (
            <GoogleMapsModule config={config} className="bg-slate-100" />
          )}

          {/* FOOTER */}
          <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pt-16 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="md:col-span-1 space-y-3">
                <span className="text-white text-base font-bold tracking-tight block">
                  {config.businessName}
                </span>
                <p className="text-slate-400 leading-relaxed text-xs">
                  {config.footer.shortDesc}
                </p>
                {config.showRating && (
                  <div className="text-amber-400 font-medium">
                    ★ {config.suppliedRating}/5 from {config.suppliedReviewCount} customer reviews
                  </div>
                )}
              </div>

              <div>
                <span className="text-white text-xs font-semibold uppercase tracking-wider block mb-3">
                  Quick Navigation
                </span>
                <ul className="space-y-2">
                  <li><button onClick={() => handleNavClick('home')} className="hover:text-white transition">Home</button></li>
                  <li><button onClick={() => handleNavClick('about')} className="hover:text-white transition">About Us</button></li>
                  <li><button onClick={() => handleNavClick('services')} className="hover:text-white transition">All 22 Painting Services</button></li>
                  <li><button onClick={() => handleNavClick('gallery')} className="hover:text-white transition">Gallery Inspiration</button></li>
                  {config.googleMaps.enabled && (
                    <li><button onClick={() => handleNavClick('location')} className="hover:text-white transition">Google Maps Location</button></li>
                  )}
                  <li><button onClick={() => handleNavClick('contact')} className="hover:text-white transition">Contact & Estimate</button></li>
                </ul>
              </div>

              <div>
                <span className="text-white text-xs font-semibold uppercase tracking-wider block mb-3">
                  Key Painting Services
                </span>
                <ul className="space-y-2">
                  <li><span className="text-slate-300">Exterior Villa Painting</span></li>
                  <li><span className="text-slate-300">Luxury Interior Emulsions</span></li>
                  <li><span className="text-slate-300">Designer Texture Accent Walls</span></li>
                  <li><span className="text-slate-300">Teakwood PU Varnish & Polish</span></li>
                  <li><span className="text-slate-300">Waterproofing & Damp Repair</span></li>
                  <li><span className="text-slate-300">Wrought Iron & Gate Spraying</span></li>
                </ul>
              </div>

              <div>
                <span className="text-white text-xs font-semibold uppercase tracking-wider block mb-3">
                  Verified Contact
                </span>
                <p className="text-slate-400 leading-relaxed mb-3">
                  {config.address}
                </p>
                <p className="text-slate-300 mb-1">
                  <strong>Phone:</strong> {config.phone}
                </p>
                <p className="text-slate-300 mb-3">
                  <strong>Hours:</strong> {config.businessHours}
                </p>
                <a
                  href={config.googleMaps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
                >
                  <span>Google Maps Location</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
              <p>{config.footer.copyrightText}</p>
              <p>Serving Kapra, Sainikpuri, Secunderabad & Hyderabad, Telangana 500062.</p>
            </div>
          </footer>

          {/* FLOATING WHATSAPP SUPPORT WIDGET (Official WhatsApp Icon) */}
          {config.whatsappWidget.enabled && (
            <a
              href={`https://wa.me/${config.whatsappWidget.number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(config.whatsappWidget.prefilledMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Anika Professional Painting Services on WhatsApp"
              className={`fixed bottom-6 ${
                config.whatsappWidget.position === 'left' ? 'left-6' : 'right-6'
              } z-40 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-xl hover:scale-110 active:scale-95 transition flex items-center justify-center`}
            >
              <WhatsAppIcon size={26} />
            </a>
          )}
        </>
      )}
    </div>
  );
}
