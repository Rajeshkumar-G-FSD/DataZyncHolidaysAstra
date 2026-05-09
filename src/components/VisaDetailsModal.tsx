import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Minus, Plus, ChevronDown, StickyNote, CheckCircle2 } from 'lucide-react';

interface VisaDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: {
    name: string;
    flag: string;
  } | null;
}

export default function VisaDetailsModal({ isOpen, onClose, destination }: VisaDetailsModalProps) {
  const [passengers, setPassengers] = useState(1);
  const [note, setNote] = useState('');
  
  const visaFee = 17760;
  const taxes = 2360;
  const total = (visaFee * passengers) + taxes;

  if (!destination) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] md:min-h-0"
          >
            {/* Header (Mobile Close) */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
              <h2 className="font-bold text-gray-900">Add details</h2>
              <button onClick={onClose} className="p-2"><X size={20} /></button>
            </div>

            {/* Left Section: Form */}
            <div className="flex-1 p-6 md:p-12 overflow-y-auto max-h-[80vh] md:max-h-none">
              <div className="hidden md:flex justify-between items-center mb-10">
                <h2 className="text-xl font-bold text-gray-900">Add details</h2>
              </div>

              <div className="space-y-10">
                {/* Travellers */}
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                      <Users size={24} className="text-primary" strokeWidth={1.5} />
                      <h3 className="text-lg font-bold text-gray-900">Add travellers</h3>
                    </div>
                    <span className="text-primary font-bold text-sm bg-primary/5 px-3 py-1 rounded-lg">{passengers} pax</span>
                  </div>

                  <div className="flex justify-between items-center pb-2">
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-800 text-lg">Passengers</h4>
                      <p className="text-sm text-gray-400 font-medium tracking-tight">All ages</p>
                    </div>
                    <div className="flex items-center gap-8">
                      <button 
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                        className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 hover:text-primary transition-colors"
                      >
                        <Minus size={18} strokeWidth={3} />
                      </button>
                      <span className="font-black text-xl w-4 text-center text-primary">{passengers}</span>
                      <button 
                        onClick={() => setPassengers(passengers + 1)}
                        className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary hover:bg-primary/5 transition-colors"
                      >
                        <Plus size={18} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-200" />

                {/* Point of Contact */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 tracking-tight">
                    Point of Contact<span className="text-primary font-black">*</span>
                  </label>
                  <div className="relative">
                    <select className="w-full h-16 pl-5 pr-12 bg-white border border-gray-100 rounded-2xl appearance-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-bold text-gray-800 shadow-sm shadow-black/5 cursor-pointer">
                      <option>NISHANTH PILLAI</option>
                      <option>OTHER CONTACT</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
                      <ChevronDown size={20} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <StickyNote size={20} className="text-primary" strokeWidth={1.5} />
                    <label className="text-sm font-bold text-gray-700 tracking-tight">Add note (if any)</label>
                  </div>
                  <textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Write it here..."
                    className="w-full p-5 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[140px] resize-none font-medium text-gray-800 shadow-sm shadow-black/5 placeholder:text-gray-300"
                  />
                </div>

                <button className="w-full h-16 bg-primary hover:bg-red-900 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-red-200 group active:scale-[0.98]">
                  StampMyVisa
                  <div className="flex items-center bg-white/20 p-1.5 rounded-lg ml-1 group-hover:translate-x-1 transition-transform">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent" />
                  </div>
                </button>
              </div>
            </div>

            {/* Right Section: Price Summary */}
            <div className="w-full md:w-[400px] md:bg-gray-50/50 p-6 md:p-12 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-center">
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-full transition-colors hidden md:block text-gray-400"
              >
                <X size={20} strokeWidth={2.5} />
              </button>

              <h3 className="text-xl font-bold text-gray-900 mb-10 text-center md:text-left leading-relaxed max-w-[280px]">
                Estimated price for your application
              </h3>

              <div className="bg-white rounded-[32px] p-8 border border-gray-50 shadow-xl shadow-black/5 space-y-8 relative overflow-hidden">
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Visa Fees (x{passengers})</span>
                    <span className="font-bold text-gray-900 text-lg">₹{(visaFee * passengers).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Fees & Taxes</span>
                    <span className="font-bold text-gray-900 text-lg">₹{taxes.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-8 border-t border-dashed border-gray-100 flex justify-between items-center text-primary">
                  <span className="font-black text-lg">Total Fees</span>
                  <span className="font-black text-2xl">₹{total.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-center gap-2.5 text-[#10B981] font-black text-xs tracking-widest bg-emerald-50 py-3 rounded-2xl">
                  <div className="bg-[#10B981] p-0.5 rounded-full">
                    <CheckCircle2 size={16} className="text-white" strokeWidth={3} />
                  </div>
                  BEST PRICE GUARANTEED
                </div>
              </div>
            </div>

            {/* Mobile Footer Spacing */}
            <div className="md:hidden h-20" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

