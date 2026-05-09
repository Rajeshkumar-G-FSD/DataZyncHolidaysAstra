import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Map as MapIcon, Palmtree, Calendar, Binoculars, X, ChevronLeft, ChevronRight } from 'lucide-react';

const countries = [
  { name: 'Algeria', category: 'Sticker', flag: '🇩🇿' },
  { name: 'Argentina', category: 'Sticker Visa', flag: '🇦🇷' },
  { name: 'Armenia', flag: '🇦🇲' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Austria', flag: '🇦🇹' },
  { name: 'Azerbaijan', flag: '🇦🇿' },
];

const purposes = [
  { name: 'Tourism', icon: '🏖️' },
  { name: 'Business', icon: '💼' },
  { name: 'Education', icon: '🎓' },
  { name: 'Family Visit', icon: '🏠' },
];

export default function VisaSearchBar() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveTab(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4" ref={containerRef}>
      <div className="mb-6 text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-semibold text-on-surface">
          Which country would you like to <span className="text-primary cursor-pointer hover:underline">explore?</span>
        </h2>
      </div>

      <div className="relative bg-white rounded-full shadow-2xl flex flex-col md:flex-row items-center p-2 border border-gray-100">
        {/* Country Search Section */}
        <div 
          className={`flex-1 flex items-center gap-3 px-6 py-3 cursor-pointer rounded-full transition-colors ${activeTab === 'country' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
          onClick={() => setActiveTab('country')}
        >
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-xl overflow-hidden">
             <img src="https://em-content.zobj.net/source/apple/354/world-map_1f5fa-fe0f.png" alt="map" className="w-6 h-6 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">Location</span>
            <input 
              type="text" 
              placeholder="Search for a country"
              className="bg-transparent border-none outline-none text-gray-800 font-medium placeholder:text-gray-400 w-full"
              value={selectedCountry || searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedCountry('');
              }}
              onFocus={() => setActiveTab('country')}
            />
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-gray-200" />

        {/* Purpose Section */}
        <div 
          className={`flex-1 flex items-center gap-3 px-6 py-3 cursor-pointer rounded-full transition-colors ${activeTab === 'purpose' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
          onClick={() => setActiveTab('purpose')}
        >
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl overflow-hidden">
            <img src="https://em-content.zobj.net/source/apple/354/island-with-palm-tree_1f3dd-fe0f.png" alt="palm" className="w-6 h-6 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">Travel Type</span>
            <span className={`font-medium ${selectedPurpose ? 'text-gray-800' : 'text-gray-400'}`}>
              {selectedPurpose || 'Purpose Of Travel'}
            </span>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-gray-200" />

        {/* Date Section */}
        <div 
          className={`flex-[1.2] flex items-center gap-3 px-6 py-3 cursor-pointer rounded-full transition-colors ${activeTab === 'date' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
          onClick={() => setActiveTab('date')}
        >
          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-xl overflow-hidden">
            <img src="https://em-content.zobj.net/source/apple/354/calendar_1f4c5.png" alt="calendar" className="w-6 h-6 object-contain" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">Check In</span>
              <span className="text-gray-800 font-medium">{dateRange.start || 'Start Date'}</span>
            </div>
            <div className="text-gray-300">→</div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">Check Out</span>
              <span className="text-gray-800 font-medium">{dateRange.end || 'End Date'}</span>
            </div>
          </div>
        </div>

        {/* Explore Button */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full flex items-center gap-2 font-bold transition-all shadow-lg active:scale-95 ml-2">
          <Binoculars size={20} />
          <span>Explore</span>
        </button>

        {/* Dropdowns */}
        <AnimatePresence>
          {activeTab === 'country' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 mt-4 w-full md:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 py-2"
            >
              {filteredCountries.map(country => (
                <div 
                  key={country.name} 
                  className="px-6 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-4 group"
                  onClick={() => {
                    setSelectedCountry(country.name);
                    setActiveTab(null);
                  }}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 group-hover:text-primary transition-colors">{country.name}</span>
                    {country.category && <span className="text-xs text-gray-400">({country.category})</span>}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'purpose' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-[25%] mt-4 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 py-2"
            >
              {purposes.map(p => (
                <div 
                  key={p.name} 
                  className="px-6 py-4 hover:bg-gray-50 cursor-pointer flex items-center gap-4 group"
                  onClick={() => {
                    setSelectedPurpose(p.name);
                    setActiveTab(null);
                  }}
                >
                  <span className="text-xl">{p.icon}</span>
                  <span className="font-semibold text-gray-800 group-hover:text-primary transition-colors">{p.name}</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'date' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full right-0 mt-4 w-full md:w-[600px] bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 p-6"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* May 2026 */}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-6">
                    <button className="p-2 hover:bg-gray-50 rounded-full"><ChevronLeft size={16} /></button>
                    <span className="font-bold text-gray-800">May 2026</span>
                    <div className="w-8 h-8" />
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-4">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                      <span key={d} className="text-xs font-bold text-gray-400">{d}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center font-medium">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d, i) => (
                      <div 
                        key={d} 
                        className={`py-2 rounded-lg cursor-pointer text-sm ${d >= 10 ? 'text-orange-600' : 'text-gray-800'} hover:bg-orange-50`}
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Jun 2026 */}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-8 h-8" />
                    <span className="font-bold text-gray-800">Jun 2026</span>
                    <button className="p-2 hover:bg-gray-50 rounded-full"><ChevronRight size={16} /></button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-4">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                      <span key={d} className="text-xs font-bold text-gray-400">{d}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center font-medium">
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((d, i) => (
                      <div 
                        key={d} 
                        className={`py-2 rounded-lg cursor-pointer text-sm ${d <= 6 ? 'text-green-600' : 'text-gray-800'} hover:bg-green-50`}
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                <div className="text-sm text-gray-500 font-medium">
                  Dates: <span className="text-gray-800">.. - ..</span>
                </div>
                <button 
                  className="bg-blue-100 text-blue-600 px-6 py-2 rounded-lg font-bold text-sm tracking-tight transition-all active:scale-95"
                  onClick={() => setActiveTab(null)}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
