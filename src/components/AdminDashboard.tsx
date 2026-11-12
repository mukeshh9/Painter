import React, { useState } from 'react';
import { ThemeConfig } from '../types/theme';
import { COLOR_PRESETS } from '../data/initialData';
import { Palette, Layout, Settings, Mail, MapPin, MessageCircle, Sliders, CheckCircle2, RefreshCw } from 'lucide-react';

interface AdminDashboardProps {
  config: ThemeConfig;
  onUpdateConfig: (newConfig: ThemeConfig) => void;
  onResetDefaults: () => void;
  onExportZip: () => void;
  isExportingZip: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  config,
  onUpdateConfig,
  onResetDefaults,
  onExportZip,
  isExportingZip,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'structure' | 'design' | 'sections' | 'maps' | 'formsubmit' | 'whatsapp'>('general');
  const [localConfig, setLocalConfig] = useState<ThemeConfig>(config);
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = () => {
    onUpdateConfig(localConfig);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen">
      {/* Top Admin Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-sm">
            W
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">Anika Theme Administration Panel</h1>
            <p className="text-xs text-slate-400">Native WordPress Settings & Configuration Simulator</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saveToast && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-950/80 px-3 py-1.5 rounded-md border border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" /> Settings Saved to Preview
            </span>
          )}
          <button
            onClick={onExportZip}
            disabled={isExportingZip}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-2 shadow-sm"
          >
            {isExportingZip ? 'Packaging ZIP...' : 'Download Theme ZIP (Installable)'}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm"
          >
            Save All Changes
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="md:col-span-3 space-y-1">
          <button
            onClick={() => setActiveTab('general')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2.5 transition ${activeTab === 'general' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <Settings className="w-4 h-4" /> 1. Business Information
          </button>
          <button
            onClick={() => setActiveTab('structure')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2.5 transition ${activeTab === 'structure' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <Layout className="w-4 h-4" /> 2. Website Structure Mode
          </button>
          <button
            onClick={() => setActiveTab('design')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2.5 transition ${activeTab === 'design' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <Palette className="w-4 h-4" /> 3. Design & Color Presets
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2.5 transition ${activeTab === 'sections' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <Sliders className="w-4 h-4" /> 4. Homepage Sections
          </button>
          <button
            onClick={() => setActiveTab('maps')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2.5 transition ${activeTab === 'maps' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <MapPin className="w-4 h-4" /> 5. Independent Google Maps
          </button>
          <button
            onClick={() => setActiveTab('formsubmit')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2.5 transition ${activeTab === 'formsubmit' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <Mail className="w-4 h-4" /> 6. FormSubmit.co Integration
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2.5 transition ${activeTab === 'whatsapp' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <MessageCircle className="w-4 h-4" /> 7. WhatsApp Widget
          </button>

          <div className="pt-6 border-t border-slate-800 mt-6">
            <button
              onClick={onResetDefaults}
              className="w-full text-left px-3.5 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-950/40 flex items-center gap-2 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset All to Default Content
            </button>
          </div>
        </div>

        {/* Tab Panel */}
        <div className="md:col-span-9 bg-slate-950/70 border border-slate-800 rounded-xl p-6 sm:p-8">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">Business Information</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Editable identity and contact records verified for Anika Professional Painting Services.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={localConfig.businessName}
                    onChange={(e) => setLocalConfig({ ...localConfig, businessName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Business Category</label>
                  <input
                    type="text"
                    value={localConfig.category}
                    onChange={(e) => setLocalConfig({ ...localConfig, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Primary City</label>
                  <input
                    type="text"
                    value={localConfig.primaryCity}
                    onChange={(e) => setLocalConfig({ ...localConfig, primaryCity: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Secondary City</label>
                  <input
                    type="text"
                    value={localConfig.secondaryCity}
                    onChange={(e) => setLocalConfig({ ...localConfig, secondaryCity: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">State & Country</label>
                  <input
                    type="text"
                    value={`${localConfig.state}, ${localConfig.country}`}
                    disabled
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Official Address</label>
                <textarea
                  rows={2}
                  value={localConfig.address}
                  onChange={(e) => setLocalConfig({ ...localConfig, address: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone</label>
                  <input
                    type="text"
                    value={localConfig.phone}
                    onChange={(e) => setLocalConfig({ ...localConfig, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp</label>
                  <input
                    type="text"
                    value={localConfig.whatsapp}
                    onChange={(e) => setLocalConfig({ ...localConfig, whatsapp: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Business Hours</label>
                  <input
                    type="text"
                    value={localConfig.businessHours}
                    onChange={(e) => setLocalConfig({ ...localConfig, businessHours: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white">Supplied Rating Display</span>
                  <p className="text-[11px] text-slate-400">
                    Display verified rating {localConfig.suppliedRating}/5 from {localConfig.suppliedReviewCount} customer reviews.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={localConfig.showRating}
                  onChange={(e) => setLocalConfig({ ...localConfig, showRating: e.target.checked })}
                  className="w-4 h-4 accent-blue-600 rounded"
                />
              </div>
            </div>
          )}

          {activeTab === 'structure' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">Website Structure Mode</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Choose between single-page scroll navigation, distinct multi-page routing, or hybrid mode.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setLocalConfig({ ...localConfig, structureMode: 'single' })}
                  className={`p-4 rounded-xl border text-left transition ${localConfig.structureMode === 'single' ? 'border-blue-500 bg-blue-950/40 text-white' : 'border-slate-800 bg-slate-900 text-slate-300'}`}
                >
                  <span className="text-xs font-bold block mb-1">Mode A: Single Page</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    All website sections rendered sequentially on one long homepage with smooth anchor scroll.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setLocalConfig({ ...localConfig, structureMode: 'multi' })}
                  className={`p-4 rounded-xl border text-left transition ${localConfig.structureMode === 'multi' ? 'border-blue-500 bg-blue-950/40 text-white' : 'border-slate-800 bg-slate-900 text-slate-300'}`}
                >
                  <span className="text-xs font-bold block mb-1">Mode B: Multi-Page (Recommended)</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Dedicated pages for Home, About, Services, Gallery, Contact, and Standalone Google Maps.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setLocalConfig({ ...localConfig, structureMode: 'hybrid' })}
                  className={`p-4 rounded-xl border text-left transition ${localConfig.structureMode === 'hybrid' ? 'border-blue-500 bg-blue-950/40 text-white' : 'border-slate-800 bg-slate-900 text-slate-300'}`}
                >
                  <span className="text-xs font-bold block mb-1">Mode C: Hybrid</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Selected key sections on the homepage plus full standalone inner pages for deep exploration.
                  </p>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">Design Style & Independent Color Presets</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Design styles govern typography and card treatment. Presets control brand palette independently.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">1. Select Design Style</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'classic', label: 'Classic Professional' },
                    { id: 'modern', label: 'Modern Premium' },
                    { id: 'minimal', label: 'Elegant Minimal' },
                    { id: 'bold', label: 'Bold Creative' },
                  ].map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setLocalConfig({ ...localConfig, designStyle: style.id as any })}
                      className={`px-3 py-2.5 text-xs font-medium rounded-lg border text-center transition ${localConfig.designStyle === style.id ? 'border-blue-500 bg-blue-950 text-white' : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'}`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">2. Select Color Preset</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(COLOR_PRESETS).map(([id, scheme]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setLocalConfig({ ...localConfig, colorPreset: id as any, customColors: { ...localConfig.customColors, enabled: false } })}
                      className={`p-3 rounded-lg border flex items-center justify-between text-left transition ${localConfig.colorPreset === id && !localConfig.customColors.enabled ? 'border-blue-500 bg-slate-900' : 'border-slate-800 bg-slate-950'}`}
                    >
                      <div>
                        <span className="text-xs font-semibold capitalize text-white">{id.replace('-', ' ')}</span>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: scheme.primary }} />
                          <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: scheme.secondary }} />
                          <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: scheme.accent }} />
                        </div>
                      </div>
                      {localConfig.colorPreset === id && !localConfig.customColors.enabled && (
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white">Custom Color Overrides</span>
                    <p className="text-[11px] text-slate-400">Override preset hex values with tailor-made corporate palette.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={localConfig.customColors.enabled}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      customColors: { ...localConfig.customColors, enabled: e.target.checked },
                    })}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                </div>

                {localConfig.customColors.enabled && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Primary Color</label>
                      <input
                        type="color"
                        value={localConfig.customColors.primary}
                        onChange={(e) => setLocalConfig({
                          ...localConfig,
                          customColors: { ...localConfig.customColors, primary: e.target.value },
                        })}
                        className="w-full h-8 bg-transparent cursor-pointer rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Secondary Color</label>
                      <input
                        type="color"
                        value={localConfig.customColors.secondary}
                        onChange={(e) => setLocalConfig({
                          ...localConfig,
                          customColors: { ...localConfig.customColors, secondary: e.target.value },
                        })}
                        className="w-full h-8 bg-transparent cursor-pointer rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Accent Color</label>
                      <input
                        type="color"
                        value={localConfig.customColors.accent}
                        onChange={(e) => setLocalConfig({
                          ...localConfig,
                          customColors: { ...localConfig.customColors, accent: e.target.value },
                        })}
                        className="w-full h-8 bg-transparent cursor-pointer rounded"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'sections' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">Homepage Section Visibility Toggles</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Independently enable, disable, or reorganize the 13 homepage sections without losing content.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(localConfig.sections).map(([key, isEnabled]) => (
                  <label key={key} className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-lg cursor-pointer hover:border-slate-700">
                    <span className="text-xs text-slate-200 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        sections: { ...localConfig.sections, [key]: e.target.checked },
                      })}
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'maps' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">Mandatory Independent Google Maps Module</h2>
                <p className="text-xs text-slate-400 mt-1">
                  CRITICAL: The Google Maps module is strictly independent and NEVER embedded inside Contact Us.
                </p>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white">Enable Independent Google Maps Module</span>
                  <p className="text-[11px] text-slate-400">
                    Toggling OFF hides the map from the frontend without deleting saved coordinates or settings.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={localConfig.googleMaps.enabled}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    googleMaps: { ...localConfig.googleMaps, enabled: e.target.checked },
                  })}
                  className="w-4 h-4 accent-blue-600 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Display Location</label>
                <select
                  value={localConfig.googleMaps.displayLocation}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    googleMaps: { ...localConfig.googleMaps, displayLocation: e.target.value as any },
                  })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                >
                  <option value="standalone-page">Dedicated Standalone Page (/location)</option>
                  <option value="home-section">Separate Homepage Section (Above FAQ)</option>
                  <option value="bottom-all-pages">Independent Full-Width Section Above Footer</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Map Title</label>
                  <input
                    type="text"
                    value={localConfig.googleMaps.title}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      googleMaps: { ...localConfig.googleMaps, title: e.target.value },
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Get Directions Button Label</label>
                  <input
                    type="text"
                    value={localConfig.googleMaps.directionsLabel}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      googleMaps: { ...localConfig.googleMaps, directionsLabel: e.target.value },
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Google Maps Embed URL</label>
                <input
                  type="text"
                  value={localConfig.googleMaps.embedUrl}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    googleMaps: { ...localConfig.googleMaps, embedUrl: e.target.value },
                  })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Official Google Maps Listing Destination</label>
                <input
                  type="text"
                  value={localConfig.googleMaps.directionsUrl}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    googleMaps: { ...localConfig.googleMaps, directionsUrl: e.target.value },
                  })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          )}

          {activeTab === 'formsubmit' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">FormSubmit.co Integration (Enquiry Delivery)</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Enquiry emails are sent via FormSubmit.co to the administrator-configurable inbox below.
                </p>
              </div>

              <div className="p-4 bg-blue-950/40 border border-blue-900 rounded-lg text-xs text-blue-200 leading-relaxed">
                <strong>Recipient Verification Note:</strong> When you submit a test enquiry to a new receiving email address for the first time, FormSubmit will dispatch an activation link. After clicking that one-time confirmation link, all subsequent submissions will land directly in your inbox.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Receiving Email Address * (Configurable in Admin, Never Hardcoded)
                </label>
                <input
                  type="email"
                  value={localConfig.enquiryForm.receivingEmail}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    enquiryForm: { ...localConfig.enquiryForm, receivingEmail: e.target.value },
                  })}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-xs text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Form Heading</label>
                  <input
                    type="text"
                    value={localConfig.enquiryForm.title}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      enquiryForm: { ...localConfig.enquiryForm, title: e.target.value },
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Submit Button Label</label>
                  <input
                    type="text"
                    value={localConfig.enquiryForm.submitLabel}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      enquiryForm: { ...localConfig.enquiryForm, submitLabel: e.target.value },
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Success Message</label>
                <input
                  type="text"
                  value={localConfig.enquiryForm.successMessage}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    enquiryForm: { ...localConfig.enquiryForm, successMessage: e.target.value },
                  })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          )}

          {activeTab === 'whatsapp' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">WhatsApp Floating Support Widget</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Features the authentic official WhatsApp icon and connects straight to Anika client support.
                </p>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white">Enable Floating WhatsApp Button</span>
                  <p className="text-[11px] text-slate-400">Positioned fixed in the bottom corner across all pages.</p>
                </div>
                <input
                  type="checkbox"
                  checked={localConfig.whatsappWidget.enabled}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    whatsappWidget: { ...localConfig.whatsappWidget, enabled: e.target.checked },
                  })}
                  className="w-4 h-4 accent-blue-600 rounded"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={localConfig.whatsappWidget.number}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      whatsappWidget: { ...localConfig.whatsappWidget, number: e.target.value },
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Corner Position</label>
                  <select
                    value={localConfig.whatsappWidget.position}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      whatsappWidget: { ...localConfig.whatsappWidget, position: e.target.value as any },
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  >
                    <option value="right">Bottom Right Corner</option>
                    <option value="left">Bottom Left Corner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Prefilled Customer Message</label>
                <textarea
                  rows={2}
                  value={localConfig.whatsappWidget.prefilledMessage}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    whatsappWidget: { ...localConfig.whatsappWidget, prefilledMessage: e.target.value },
                  })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
