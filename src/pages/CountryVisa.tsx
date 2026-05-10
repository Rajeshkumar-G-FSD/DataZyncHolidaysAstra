import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  CheckCircle2, Clock, Landmark, FileText, 
  HelpCircle, ChevronRight, Phone, MessageCircle 
} from 'lucide-react';
import InquiryForm from '../components/InquiryForm';

const visaData: Record<string, any> = {
  'usa': {
    name: 'USA Visa Assistance',
    type: 'B1/B2 Visitor Visa',
    validity: 'Up to 10 Years',
    processing: '2-4 Weeks + Appointment Availability',
    fees: '₹15,540 (Approx. $185 USD)',
    bg: 'https://images.unsplash.com/photo-1508433957232-3107f5fd5995?w=1600',
    eligibility: [
      'Valid Indian Passport (at least 6 months validity)',
      'Stable Income Proof / Financial Assets',
      'Specific Purpose of Travel (Tourism/Family/Business)',
      'Ties to Home Country (Employment/Family)'
    ],
    documents: [
      'DS-160 Confirmation Page',
      'Current & Old Passports',
      'Recent Photo (2x2 inches, white background)',
      '6 Months Bank Statements',
      'ITR for last 3 years',
      'Employment Certificate / Business Proof'
    ],
    faqs: [
      { q: 'How early can I get an appointment?', a: 'Appointment dates vary. We offer monitoring services to help you find the earliest possible slots.' },
      { q: 'Is the visa fee refundable?', a: 'No, the US Embassy visa fee is non-refundable and non-transferable.' },
      { q: 'What is B1/B2 visa?', a: 'B1 is for business, and B2 is for tourism/medical treatment. Usually, they are issued together.' }
    ]
  },
  'uk': {
    name: 'UK Visitor Visa',
    type: 'Standard Visitor Visa',
    validity: '6 Months / 2 Years / 5 Years / 10 Years',
    processing: '15 Working Days',
    fees: '₹12,400 (Approx. £115) for 6 months',
    bg: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600',
    eligibility: [
      'Demonstrate intention to leave UK at end of visit',
      'Sufficient funds for stay and return',
      'Clean travel history',
      'Confirmed itinerary'
    ],
    documents: [
      'Valid Passport',
      'Bank Statements (last 6 months)',
      'Covering Letter explaining tour plan',
      'Leave Approval or Business Registration',
      'Income Tax Returns',
      'Hotel & Flight bookings'
    ],
    faqs: [
      { q: 'Can I apply for a 10-year visa directly?', a: 'Yes, if you can demonstrate a frequent and sustained need to visit the UK.' },
      { q: 'Is there a fast-track service?', a: 'Yes, Priority (5 days) and Super Priority (24h) services are available at an extra cost.' }
    ]
  },
  'schengen': {
    name: 'Schengen Visa (Europe)',
    type: 'Type C Short Stay',
    validity: '90 Days within 180 Days',
    processing: '15-30 Days',
    fees: '₹7,200 (Approx. €80)',
    bg: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600',
    eligibility: [
      'Confirmed Travel Insurance (€30,000 cover)',
      'Specific entry/exit points defined',
      'Financial stability evidence',
      'Strong ties to home country'
    ],
    documents: [
      'Visa Application Form',
      'Flight Reservation (Round Trip)',
      'Travel Insurance Policy',
      'Proof of Accommodation (Hotel Voucher)',
      'NOC from Employer',
      'Personal Bank Statement (Manual Seal)'
    ],
    faqs: [
      { q: 'Which country should I apply to?', a: 'Apply to the country of your primary destination or where you stay the longest.' },
      { q: 'Do I need an interview?', a: 'Biometrics are required, but a formal interview is usually only for specific cases.' }
    ]
  },
  'singapore': {
    name: 'Singapore E-Visa',
    type: 'Level 1 Individual Visa',
    validity: 'Up to 2 Years Multiple Entry',
    processing: '3-4 Working Days',
    fees: '₹2,500 - ₹3,500 (Varies by agent)',
    bg: 'https://images.unsplash.com/photo-1525625293386-3fb0ad7c1fe6?w=1600',
    eligibility: [
      'Confirmed Flight Tickets',
      'Hotel Reservation',
      'Clear digital photo'
    ],
    documents: [
      'Passport Copy (Front & Back)',
      'Digital Photo (35mm x 45mm)',
      'Last 3 months Bank Balance',
      'V39A (Letter of Introduction) - if applicable'
    ],
    faqs: [
      { q: 'Is it a sticker visa?', a: 'No, it is an electronic visa (E-Visa) which comes as a PDF.' },
      { q: 'Can I get it in 24 hours?', a: 'Sometimes yes, but standard processing is 3-4 days.' }
    ]
  },
  'australia': {
    name: 'Australia Visitor Visa',
    type: 'Subclass 600',
    validity: 'Up to 1 Year',
    processing: '20-30 Working Days',
    fees: '₹10,500 (Approx. AUD 190)',
    bg: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1600',
    eligibility: [
      'Genuine Visitor requirement',
      'Health & Character requirements',
      'Adequate funds for stay'
    ],
    documents: [
      'Notarized Passport copies',
      'Employment documents',
      'Bank Statements (last 6 months)',
      'Family information form',
      'Detailed Itinerary'
    ],
    faqs: [
      { q: 'Is a medical exam required?', a: 'Usually not for stays under 3 months, unless you are over 75 years old.' },
      { q: 'What is a Subclass 600 visa?', a: 'It is a visitor visa that allows travel for tourism or business visitor activities.' }
    ]
  }
};

export default function CountryVisa() {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  const data = countrySlug ? visaData[countrySlug.toLowerCase()] : null;

  if (!data) {
    return <Navigate to="/visa" />;
  }

  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      {/* Hero Section */}
      <header className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={data.bg} alt={data.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 text-center container mx-auto px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-[#990011] text-white text-[10px] font-black tracking-[0.4em] uppercase px-4 py-1.5 rounded-full mb-6"
          >
            Specialized Visa Service
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-4"
          >
            {data.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-xl font-medium"
          >
            {data.type} • {data.validity}
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-20 -mt-20 relative z-20 pb-32">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Details Column */}
          <div className="lg:w-2/3 space-y-8">
            {/* Quick Info Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { label: 'Processing', value: data.processing, icon: <Clock size={16} /> },
                 { label: 'Visa Fees', value: data.fees, icon: <Landmark size={16} /> },
                 { label: 'Documentation', value: 'Complete Support', icon: <FileText size={16} /> },
                 { label: 'Assistance', value: '24/7 Hotline', icon: <Phone size={16} /> },
               ].map((item, i) => (
                 <div key={i} className="bg-white p-6 rounded-3xl shadow-xl shadow-black/[0.02] border border-gray-50">
                    <div className="text-[#990011] mb-3">{item.icon}</div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-sm font-black text-gray-900">{item.value}</p>
                 </div>
               ))}
            </div>

            {/* Eligibility & Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-black/[0.02] border border-gray-50">
                <h3 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Eligibility Criteria</h3>
                <div className="space-y-4">
                  {data.eligibility.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-4">
                      <CheckCircle2 size={18} className="text-[#990011] mt-1 shrink-0" />
                      <p className="text-gray-500 font-medium leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-black text-white p-10 rounded-[3rem] shadow-2xl">
                <h3 className="text-2xl font-black mb-8 tracking-tight">Documents Required</h3>
                <div className="space-y-4">
                  {data.documents.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#990011] mt-2 shrink-0" />
                      <p className="text-white/60 font-medium leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white p-10 md:p-14 rounded-[4rem] shadow-xl shadow-black/[0.02] border border-gray-50">
               <div className="flex items-center gap-4 mb-10">
                 <div className="w-12 h-12 bg-[#990011]/5 text-[#990011] rounded-2xl flex items-center justify-center">
                   <HelpCircle size={24} />
                 </div>
                 <h3 className="text-3xl font-black text-gray-900 tracking-tight">Frequently Asked Questions</h3>
               </div>
               <div className="space-y-8">
                 {data.faqs.map((faq: any, i: number) => (
                   <div key={i} className="space-y-3">
                     <h4 className="text-lg font-black text-gray-900 tracking-tight">{faq.q}</h4>
                     <p className="text-gray-500 font-medium leading-relaxed">{faq.a}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-6">
              <InquiryForm />
              
              {/* Assistance Card */}
              <div className="bg-[#990011] p-10 rounded-[2.5rem] text-white overflow-hidden relative">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-black/10 rounded-full -mb-16 -mr-16" />
                <h4 className="text-xl font-black mb-4">Urgent Assistance?</h4>
                <p className="text-white/60 font-medium mb-8">Speak directly with our {data.name.split(' ')[0]} expert.</p>
                <div className="space-y-4">
                  <a href="tel:9840454061" className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl group hover:bg-white hover:text-black transition-all">
                    <Phone size={20} />
                    <span className="font-black text-xs uppercase tracking-widest">+91 984045 4061</span>
                  </a>
                  <a href="https://wa.me/8939423442" className="flex items-center gap-4 bg-[#25D366] p-4 rounded-2xl group hover:scale-105 transition-all">
                    <MessageCircle size={20} fill="currentColor" />
                    <span className="font-black text-xs uppercase tracking-widest italic">WhatsApp Instant Chat</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
