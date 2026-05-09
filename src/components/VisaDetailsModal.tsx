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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left Section: Form */}
            <div className="flex-1 p-6 md:p-10">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-900">Add details</h2>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-8">
                {/* Travellers */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3 text-indigo-600">
                      <Users size={24} />
                      <h3 className="font-bold text-gray-900">Add travellers</h3>
                    </div>
                    <span className="text-indigo-600 font-medium text-sm">{passengers} pax</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                    <div>
                      <h4 className="font-bold text-gray-900">Passengers</h4>
                      <p className="text-xs text-gray-500">All ages</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                        className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-lg w-4 text-center text-indigo-600">{passengers}</span>
                      <button 
                        onClick={() => setPassengers(passengers + 1)}
                        className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <hr className="border-dashed border-gray-200" />

                {/* Point of Contact */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Point of Contact<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select className="w-full h-14 pl-4 pr-12 bg-white border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-medium text-gray-900">
                      <option>NISHANTH PILLAI</option>
                      <option>OTHER CONTACT</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <ChevronDown size={20} />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <div className="flex items-center gap-2 mb-2 text-indigo-600">
                    <StickyNote size={18} />
                    <label className="text-sm font-bold text-gray-700">Add note (if any)</label>
                  </div>
                  <textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Write it here..."
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none min-h-[100px] resize-none font-medium text-gray-900"
                  />
                </div>

                <button className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-200 group">
                  StampMyVisa
                  <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Section: Price */}
            <div className="w-full md:w-[380px] bg-white md:bg-gray-50 p-6 md:p-10 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-center">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-gray-200 rounded-full transition-colors hidden md:block"
              >
                <X size={20} />
              </button>

              <h3 className="text-lg font-bold text-gray-900 mb-8 text-center md:text-left">
                Estimated price for your application
              </h3>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span className="font-medium text-sm">Visa Fees (x{passengers})</span>
                    <span className="font-bold text-gray-900">₹{(visaFee * passengers).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="font-medium text-sm">Fees & Taxes</span>
                    <span className="font-bold text-gray-900">₹{taxes.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-dashed border-gray-200 flex justify-between items-center text-indigo-600">
                  <span className="font-bold text-base">Total Fees</span>
                  <span className="font-black text-xl">₹{total.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-emerald-500 font-bold text-xs">
                  <CheckCircle2 size={16} fill="currentColor" className="text-white bg-emerald-500 rounded-full border-none" />
                  BEST PRICE GUARANTEED
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
