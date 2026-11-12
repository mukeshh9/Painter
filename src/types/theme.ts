export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: 'exterior' | 'interior' | 'wood' | 'specialized' | 'additional';
  categoryLabel: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  applications: string[];
  ctaLabel: string;
  ctaDestination: string;
  order: number;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  visible: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  altText: string;
  featuredOnHome: boolean;
  order: number;
}

export type DesignStyleId = 'classic' | 'modern' | 'minimal' | 'bold';

export type ColorPresetId = 'royal-blue' | 'emerald-green' | 'premium-gold' | 'ocean-teal' | 'burgundy' | 'modern-purple';

export interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
  accent: string;
  text?: string;
}

export interface ThemeConfig {
  // General & Business Info
  businessName: string;
  category: string;
  primaryCity: string;
  secondaryCity: string;
  state: string;
  country: string;
  address: string;
  phone: string;
  whatsapp: string;
  businessHours: string;
  suppliedRating: string;
  suppliedReviewCount: string;
  showRating: boolean;
  mapsUrl: string;
  googleListingUrl: string;
  brandList: string[];

  // Structure Mode
  structureMode: 'single' | 'multi' | 'hybrid';

  // Design & Style
  designStyle: DesignStyleId;
  colorPreset: ColorPresetId;
  customColors: {
    enabled: boolean;
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };

  // Header
  header: {
    logoText: string;
    logoSubtitle?: string;
    sticky: boolean;
    ctaLabel: string;
    ctaLink: string;
    showPhone: boolean;
    showWhatsapp: boolean;
  };

  // Homepage Sections toggles
  sections: {
    hero: boolean;
    about: boolean;
    servicesOverview: boolean;
    whyChoose: boolean;
    paintingSolutions: boolean;
    brands: boolean;
    galleryPreview: boolean;
    process: boolean;
    highlights: boolean;
    reviews: boolean;
    serviceAreas: boolean;
    faq: boolean;
    finalCta: boolean;
  };

  // Google Maps independent module
  googleMaps: {
    enabled: boolean;
    displayLocation: 'home-section' | 'standalone-page' | 'bottom-all-pages';
    title: string;
    description: string;
    embedUrl: string;
    directionsUrl: string;
    directionsLabel: string;
    height: number;
  };

  // Enquiry Form Settings (FormSubmit.co integration)
  enquiryForm: {
    enabled: boolean;
    receivingEmail: string;
    title: string;
    submitLabel: string;
    successMessage: string;
    errorMessage: string;
    subject: string;
    thankYouRedirect: string;
  };

  // WhatsApp Floating Widget
  whatsappWidget: {
    enabled: boolean;
    number: string;
    prefilledMessage: string;
    position: 'right' | 'left';
    desktopVisible: boolean;
    mobileVisible: boolean;
  };

  // Footer
  footer: {
    shortDesc: string;
    copyrightText: string;
    showSocial: boolean;
  };
}
