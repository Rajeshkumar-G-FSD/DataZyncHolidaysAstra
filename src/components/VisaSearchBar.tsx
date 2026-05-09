import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Map as MapIcon, Palmtree, Calendar, Binoculars, X, ChevronLeft, ChevronRight } from 'lucide-react';

const countries = [
  { name: 'Albania', flag: '🇦🇱' }, { name: 'Algeria', flag: '🇩🇿', category: 'Sticker' }, { name: 'Andorra', flag: '🇦🇩' },
  { name: 'Angola', flag: '🇦🇴' }, { name: 'Argentina', flag: '🇦🇷', category: 'Sticker Visa' }, { name: 'Armenia', flag: '🇦🇲' },
  { name: 'Australia', flag: '🇦🇺' }, { name: 'Austria', flag: '🇦🇹' }, { name: 'Azerbaijan', flag: '🇦🇿' },
  { name: 'Bahamas', flag: '🇧🇸' }, { name: 'Bahrain', flag: '🇧🇭' }, { name: 'Bangladesh', flag: '🇧🇩' },
  { name: 'Belgium', flag: '🇧🇪' }, { name: 'Belize', flag: '🇧🇿' }, { name: 'Benin', flag: '🇧🇯' },
  { name: 'Bhutan', flag: '🇧🇹' }, { name: 'Bolivia', flag: '🇧🇴' }, { name: 'Botswana', flag: '🇧🇼' },
  { name: 'Brazil', flag: '🇧🇷' }, { name: 'Brunei', flag: '🇧🇳' }, { name: 'Bulgaria', flag: '🇧🇬' },
  { name: 'Cambodia', flag: '🇰🇭' }, { name: 'Cameroon', flag: '🇨🇲' }, { name: 'Canada', flag: '🇨🇦' },
  { name: 'Chile', flag: '🇨🇱' }, { name: 'China', flag: '🇨🇳' }, { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Croatia', flag: '🇭🇷' }, { name: 'Cyprus', flag: '🇨🇾' }, { name: 'Denmark', flag: '🇩🇰' },
  { name: 'Egypt', flag: '🇪🇬' }, { name: 'Estonia', flag: '🇪🇪' }, { name: 'Ethiopia', flag: '🇪🇹' },
  { name: 'Finland', flag: '🇫🇮' }, { name: 'France', flag: '🇫🇷' }, { name: 'Georgia', flag: '🇬🇪' },
  { name: 'Germany', flag: '🇩🇪' }, { name: 'Ghana', flag: '🇬🇭' }, { name: 'Greece', flag: '🇬🇷' },
  { name: 'Hungary', flag: '🇭🇺' }, { name: 'Iceland', flag: '🇮🇸' }, { name: 'India', flag: '🇮🇳' },
  { name: 'Indonesia', flag: '🇮🇩' }, { name: 'Ireland', flag: '🇮🇪' }, { name: 'Israel', flag: '🇮🇱' },
  { name: 'Italy', flag: '🇮🇹' }, { name: 'Japan', flag: '🇯🇵' }, { name: 'Jordan', flag: '🇯🇴' },
  { name: 'Kazakhstan', flag: '🇰🇿' }, { name: 'Kenya', flag: '🇰🇪' }, { name: 'Kuwait', flag: '🇰🇼' },
  { name: 'Latvia', flag: '🇱🇻' }, { name: 'Lithuania', flag: '🇱🇹' }, { name: 'Luxembourg', flag: '🇱🇺' },
  { name: 'Malaysia', flag: '🇲🇾' }, { name: 'Maldives', flag: '🇲🇻' }, { name: 'Malta', flag: '🇲🇹' },
  { name: 'Mauritius', flag: '🇲🇺' }, { name: 'Mexico', flag: '🇲🇽' }, { name: 'Monaco', flag: '🇲🇨' },
  { name: 'Montenegro', flag: '🇲🇪' }, { name: 'Morocco', flag: '🇲🇦' }, { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'New Zealand', flag: '🇳🇿' }, { name: 'Norway', flag: '🇳🇴' }, { name: 'Oman', flag: '🇴🇲' },
  { name: 'Pakistan', flag: '🇵🇰' }, { name: 'Panama', flag: '🇵🇦' }, { name: 'Peru', flag: '🇵🇪' },
  { name: 'Philippines', flag: '🇵🇭' }, { name: 'Poland', flag: '🇵🇱' }, { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Qatar', flag: '🇶🇦' }, { name: 'Romania', flag: '🇷🇴' }, { name: 'Russia', flag: '🇷🇺' },
  { name: 'Saudi Arabia', flag: '🇸🇦' }, { name: 'Singapore', flag: '🇸🇬' }, { name: 'Slovakia', flag: '🇸🇰' },
  { name: 'Slovenia', flag: '🇸🇮' }, { name: 'South Africa', flag: '🇿🇦' }, { name: 'South Korea', flag: '🇰🇷' },
  { name: 'Spain', flag: '🇪🇸' }, { name: 'Sri Lanka', flag: '🇱🇰' }, { name: 'Sweden', flag: '🇸🇪' },
  { name: 'Switzerland', flag: '🇨🇭' }, { name: 'Thailand', flag: '🇹🇭' }, { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Ukraine', flag: '🇺🇦' }, { name: 'United Kingdom', flag: '🇬🇧' }, { name: 'United States', flag: '🇺🇸' },
  { name: 'Uruguay', flag: '🇺🇾' }, { name: 'Uzbekistan', flag: '🇺🇿' }, { name: 'Vietnam', flag: '🇻🇳' },
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
  const [dateRange, setDateRange] = useState<{ start: Date | null, end: Date | null }>({ start: null, end: null });
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  const [showResults, setShowResults] = useState(false);
  
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

  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    const firstDayIndex = date.getDay();
    
    // Fill empty days before first day of month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const handleDateClick = (date: Date) => {
    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      setDateRange({ start: date, end: null });
    } else if (dateRange.start && !dateRange.end) {
      if (date < dateRange.start) {
        setDateRange({ start: date, end: null });
      } else {
        setDateRange({ ...dateRange, end: date });
        setActiveTab(null);
      }
    }
  };

  const isSelected = (date: Date) => {
    if (!date) return false;
    return (dateRange.start?.toDateString() === date.toDateString()) || 
           (dateRange.end?.toDateString() === date.toDateString());
  };

  const isInRange = (date: Date) => {
    if (!date || !dateRange.start || !dateRange.end) return false;
    return date > dateRange.start && date < dateRange.end;
  };

  const isToday = (date: Date) => {
    if (!date) return false;
    return date.toDateString() === new Date().toDateString();
  };

  const isPast = (date: Date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentViewDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentViewDate(newDate);
  };

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const firstMonth = currentViewDate;
  const secondMonth = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, 1);

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

      <div className="relative bg-white rounded-3xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-stretch md:items-center p-2 border border-gray-100">
        {/* Country Search Section */}
        <div 
          className={`flex-1 flex items-center gap-3 px-4 md:px-6 py-3 cursor-pointer rounded-2xl md:rounded-full transition-all duration-300 ${activeTab === 'country' ? 'bg-black/5' : 'hover:bg-black/5'}`}
          onClick={() => setActiveTab('country')}
        >
          {!selectedCountry && (
            <div className="w-10 h-10 bg-black/5 rounded-lg flex items-center justify-center text-xl overflow-hidden shrink-0">
               <img src="https://cdn-icons-png.flaticon.com/512/854/854878.png" alt="location" className="w-6 h-6 object-contain" />
            </div>
          )}
          <div className="flex flex-col flex-1 min-w-0">
            {!selectedCountry && <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-tight">Location</span>}
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Search for a country"
                className={`bg-transparent border-none outline-none text-gray-800 font-medium placeholder:text-gray-400 w-full pr-8 ${selectedCountry ? 'text-base md:text-lg py-1' : 'text-sm md:text-base'}`}
                value={selectedCountry || searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedCountry('');
                }}
                onFocus={() => setActiveTab('country')}
              />
              {(selectedCountry || searchQuery) && (
                <button 
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 hover:bg-black/5 rounded-full text-gray-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCountry('');
                    setSearchQuery('');
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-gray-200" />

        {/* Purpose Section */}
        <div 
          className={`flex-1 flex items-center gap-3 px-4 md:px-6 py-3 cursor-pointer rounded-2xl md:rounded-full transition-all duration-300 ${activeTab === 'purpose' ? 'bg-black/5' : 'hover:bg-black/5'}`}
          onClick={() => setActiveTab('purpose')}
        >
          {!selectedPurpose && (
            <div className="w-10 h-10 bg-black/5 rounded-lg flex items-center justify-center text-xl overflow-hidden shrink-0">
              <img src="https://cdn-icons-png.flaticon.com/512/826/826070.png" alt="purpose" className="w-6 h-6 object-contain" />
            </div>
          )}
          <div className="flex flex-col">
            {!selectedPurpose && <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-tight">Travel Type</span>}
            <span className={`font-medium ${selectedPurpose ? 'text-gray-800 text-base md:text-lg py-1' : 'text-gray-400 text-sm md:text-base'}`}>
              {selectedPurpose || 'Purpose Of Travel'}
            </span>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-gray-200" />

        {/* Date Section */}
        <div 
          className={`flex-[1.2] flex items-center gap-3 px-4 md:px-6 py-3 cursor-pointer rounded-2xl md:rounded-full transition-colors ${activeTab === 'date' ? 'bg-black/5' : 'hover:bg-black/5'}`}
          onClick={() => setActiveTab('date')}
        >
          <div className="w-10 h-10 bg-black/5 rounded-lg flex items-center justify-center text-xl overflow-hidden shrink-0">
            <img src="https://cdn-icons-png.flaticon.com/512/2838/2838779.png" alt="calendar" className="w-6 h-6 object-contain" />
          </div>
          <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-tight shrink-0">Check In</span>
              <span className="text-gray-800 font-medium text-sm md:text-base truncate">{formatDate(dateRange.start) || 'Start Date'}</span>
            </div>
            <div className="text-gray-300 shrink-0">→</div>
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-tight shrink-0">Check Out</span>
              <span className="text-gray-800 font-medium text-sm md:text-base truncate">{formatDate(dateRange.end) || 'End Date'}</span>
            </div>
          </div>
        </div>

        {/* Explore Button */}
        <button 
          onClick={() => setShowResults(!showResults)}
          className="bg-primary hover:brightness-110 text-white px-8 py-4 rounded-2xl md:rounded-full flex items-center justify-center gap-2 font-bold transition-all shadow-xl active:scale-95 md:ml-2 mt-2 md:mt-0"
        >
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
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map(country => (
                    <div 
                      key={country.name} 
                      className="px-6 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-4 group"
                      onClick={() => {
                        setSelectedCountry(`${country.flag} ${country.name}`);
                        setSearchQuery('');
                        setActiveTab(null);
                      }}
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800 group-hover:text-primary transition-colors">{country.name}</span>
                        {country.category && <span className="text-xs text-gray-400">({country.category})</span>}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-4 text-center text-gray-400 text-sm">No results found</div>
                )}
              </div>
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
                    setSelectedPurpose(`${p.icon} ${p.name}`);
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
              className="absolute top-full right-0 mt-4 w-full md:w-[700px] bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 p-6"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* First Month */}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-6">
                    <button 
                      className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                      onClick={() => changeMonth(-1)}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="font-bold text-gray-800 tracking-tight">
                      {months[firstMonth.getMonth()]} {firstMonth.getFullYear()}
                    </span>
                    <div className="w-8 h-8" />
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-4">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                      <span key={d} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{d}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {getDaysInMonth(firstMonth.getFullYear(), firstMonth.getMonth()).map((date, i) => (
                      <div 
                        key={i} 
                        onClick={() => date && !isPast(date) && handleDateClick(date)}
                        className={`
                          py-2 rounded-lg cursor-pointer text-sm font-medium transition-all relative
                          ${!date ? 'pointer-events-none' : ''}
                          ${date && isPast(date) ? 'text-gray-200 cursor-not-allowed opacity-50' : 'text-gray-800 hover:bg-primary/10 hover:text-primary'}
                          ${date && isSelected(date) ? 'bg-primary text-white hover:bg-primary hover:text-white shadow-md z-10' : ''}
                          ${date && isInRange(date) ? 'bg-primary/5 text-primary rounded-none' : ''}
                          ${date && isToday(date) && !isSelected(date) ? 'border border-primary font-bold' : ''}
                        `}
                      >
                        {date?.getDate()}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Second Month */}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-8 h-8" />
                    <span className="font-bold text-gray-800 tracking-tight">
                      {months[secondMonth.getMonth()]} {secondMonth.getFullYear()}
                    </span>
                    <button 
                      className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                      onClick={() => changeMonth(1)}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-4">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                      <span key={d} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{d}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {getDaysInMonth(secondMonth.getFullYear(), secondMonth.getMonth()).map((date, i) => (
                      <div 
                        key={i} 
                        onClick={() => date && !isPast(date) && handleDateClick(date)}
                        className={`
                          py-2 rounded-lg cursor-pointer text-sm font-medium transition-all relative
                          ${!date ? 'pointer-events-none' : ''}
                          ${date && isPast(date) ? 'text-gray-200 cursor-not-allowed opacity-50' : 'text-gray-800 hover:bg-primary/10 hover:text-primary'}
                          ${date && isSelected(date) ? 'bg-primary text-white hover:bg-primary hover:text-white shadow-md z-10' : ''}
                          ${date && isInRange(date) ? 'bg-primary/5 text-primary rounded-none' : ''}
                          ${date && isToday(date) && !isSelected(date) ? 'border border-primary font-bold' : ''}
                        `}
                      >
                        {date?.getDate()}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                <div className="text-sm text-gray-500 font-medium font-sans">
                  Dates: <span className="text-gray-800 font-bold">{formatDate(dateRange.start) || '...'}</span> 
                  {dateRange.end && <span className="text-gray-800 font-bold"> - {formatDate(dateRange.end)}</span>}
                </div>
                <div className="flex gap-4">
                  <button 
                    className="text-gray-400 hover:text-gray-600 px-4 py-2 text-sm font-bold transition-colors"
                    onClick={() => setDateRange({ start: null, end: null })}
                  >
                    Clear
                  </button>
                  <button 
                    className="bg-primary text-white px-8 py-2.5 rounded-full font-bold text-sm tracking-tight transition-all active:scale-95 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!dateRange.start || !dateRange.end}
                    onClick={() => setActiveTab(null)}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-12 overflow-hidden"
          >
            <div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden">
              {/* Results Top Header Bar */}
              <div className="bg-gray-50/50 border-b border-gray-100 px-8 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 font-bold text-gray-800">
                    <span className="text-xl">{selectedCountry.split(' ')[0] || '🌎'}</span>
                    <span>{selectedCountry.split(' ').slice(1).join(' ') || 'Global'}</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <div className="flex items-center gap-2 font-bold text-gray-800 uppercase tracking-wide">
                    <span>{selectedPurpose || 'Travel'}</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <div className="flex items-center gap-2 font-bold text-gray-800">
                    <span className="text-xl">📅</span>
                    <span>{dateRange.start?.toLocaleDateString('en-GB') || '...'} — {dateRange.end?.toLocaleDateString('en-GB') || '...'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-widest">
                    <span>Show prices including taxes</span>
                    <div className="w-8 h-4 bg-primary/20 rounded-full cursor-pointer relative">
                      <div className="w-3 h-3 bg-primary rounded-full absolute right-0.5 top-0.5" />
                    </div>
                  </div>
                  <button className="border border-gray-200 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50 flex items-center gap-2">
                    <X size={12} className="rotate-45" />
                    Share Info
                  </button>
                  <button className="bg-primary text-white px-6 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-primary/20 hover:brightness-110">
                    Apply Visa
                  </button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row min-h-[800px]">
                {/* Left Side: Requirements */}
                <div className="flex-1 p-10 font-sans">
                  <h2 className="text-xl font-bold text-gray-800 mb-8 border-b border-gray-100 pb-4">Tourist Visa</h2>
                  
                  <div className="space-y-10 max-h-[800px] overflow-y-auto pr-6 custom-scrollbar">
                    <section>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4">MANDATORY DETAILS</h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xs font-bold text-gray-700 mb-2">Passport</h4>
                          <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 leading-relaxed">
                            <li>Need to carry original passport at the time of biometric appointment. Old passport if (any)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-700 mb-2">Photograph</h4>
                          <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 leading-relaxed">
                            <li>Photograph required only for Dropbox Fresh Photograph against white background with 80% face close up and matte finish Size 2 X 2 inches Without specs and sunglasses</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-700 mb-2">Cover letter</h4>
                          <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 leading-relaxed">
                            <li>Should indicate the purpose of travel, number of days, passport and travel details</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-700 mb-2">Appointment letter</h4>
                          <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 leading-relaxed">
                            <li>This needs be carried on the day of appointment.</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-700 mb-2">DS 160</h4>
                          <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 leading-relaxed">
                            <li>DS 160 Confirmation page.</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4">FINANCIAL DETAILS</h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xs font-bold text-gray-700 mb-2">Proof of Investment</h4>
                          <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 leading-relaxed">
                            <li>Rental Income Receipt, Interest Income and Other Source of Income proof</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-700 mb-2">IT return</h4>
                          <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 leading-relaxed">
                            <li>Personal Income Tax Return of the last 03 years.</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4">OCCUPATIONAL DETAILS</h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xs font-bold text-gray-700 mb-2">If self-employed</h4>
                          <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 leading-relaxed">
                            <li>Company registration license: Business registration certificate / GST Registration with annex A & B / Partnership. Deed / Proof of proprietorship or other proof of ownership.</li>
                            <li>Company IT return: Income Tax Return of the last 03 years (company)</li>
                            <li>Bank Statement (current/company account or savings) of last 06 month</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-700 mb-2">If employed</h4>
                          <ul className="list-disc list-inside text-xs text-gray-500 space-y-2 leading-relaxed">
                            <li>Employer NOC: Letter from employers statement on approval for holidays.</li>
                            <li>Pay slips: Last 3 months salary slips</li>
                            <li>Bank Statement (both salary and savings) of last 06 month</li>
                          </ul>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>

                {/* Right Side: Options List */}
                <div className="w-full lg:w-[400px] bg-gray-50/30 p-8 border-l border-gray-100 flex flex-col gap-4 max-h-[1000px] overflow-y-auto custom-scrollbar">
                  {[
                    { title: 'Tourist Visa', price: '₹20,120', time: '15 working days', recommended: true },
                    { title: 'USA Dropbox appointment only (Tourist Visa)', price: '₹20,220', time: '15 working days', recommended: true },
                    { title: 'Tourist Visa - Early Appointment - (Appointment Date Within 60 Days)', price: '₹12,000', time: '15 working days', recommended: true },
                    { title: 'Meet & Assist', price: '₹590', time: '1 working days', recommended: false },
                    { title: 'DS Form Filling', price: '₹1,770', time: '4 working days', recommended: false },
                    { title: 'H-1B/H-4 - Early Appointment - (Appointment Date Within 60 Days)', price: '₹25,000', time: '15 working days', recommended: false },
                  ].map((option, i) => (
                    <div 
                      key={i} 
                      className={`p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-primary/50 transition-all cursor-pointer group relative ${option.recommended ? 'border-orange-500/30' : ''}`}
                    >
                      {option.recommended && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-orange-400 to-orange-600 rounded-t-2xl" />
                      )}
                      
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          {option.recommended && (
                            <span className="text-[8px] font-bold text-orange-600 uppercase tracking-widest flex items-center gap-1 mb-2">
                              <div className="w-1 h-1 bg-orange-600 rounded-full" />
                              RECOMMENDED FOR YOUR TRAVEL
                              <div className="w-1 h-1 bg-orange-600 rounded-full" />
                            </span>
                          )}
                          <h4 className="text-sm font-bold text-gray-800 leading-tight group-hover:text-primary transition-colors">{option.title}</h4>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-1 ${i === 0 ? 'bg-primary border-primary' : 'border-gray-200'}`}>
                          {i === 0 && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Processing time:</span>
                          <span className="text-[10px] font-bold text-blue-600 flex items-center gap-1">
                            {option.time} <Search size={8} />
                          </span>
                        </div>
                        <div>
                          <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Visa validity:</span>
                          <span className="text-[10px] font-bold text-gray-800">3650 days post issue</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                        <span className="text-sm font-black text-gray-800">{option.price} <span className="text-[10px] text-gray-400 font-normal">●</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Added Gallery Section */}
              <div className="bg-gray-50/50 p-8 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-gray-800 tracking-tight uppercase">Discover {selectedCountry.split(' ').slice(1).join(' ') || 'the World'}</h3>
                  <button className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">View Destination Guide</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuB2uO-Y5_cZ_0P0uM6o9_g_r5_v_C_t_u_h_o_r_v_r_o_C_i_t_y_v_i_e_w_1',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuB2uO-Y5_cZ_0P0uM6o9_g_r5_v_C_t_u_h_o_r_v_r_o_C_i_t_y_v_i_e_w_2',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuB2uO-Y5_cZ_0P0uM6o9_g_r5_v_C_t_u_h_o_r_v_r_o_C_i_t_y_v_i_e_w_3',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuB2uO-Y5_cZ_0P0uM6o9_g_r5_v_C_t_u_h_o_r_v_r_o_C_i_t_y_v_i_e_w_4'
                  ].map((url, idx) => (
                    <div key={idx} className="h-40 rounded-xl overflow-hidden relative group cursor-pointer shadow-sm">
                      <img 
                        src={`https://images.unsplash.com/photo-${idx === 0 ? '1496442226666-8d4d0e62e6e9' : idx === 1 ? '1501594907352-04cda38ebc29' : idx === 2 ? '1480714378408-67cf0d13bc1b' : '1514924013411-cbf25faa35bb'}?auto=format&fit=crop&w=400&q=80`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        alt="destination" 
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
