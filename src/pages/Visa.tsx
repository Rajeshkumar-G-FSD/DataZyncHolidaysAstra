import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ClipboardCheck, FileSignature, Mail, MapPin, Phone, RefreshCw, UserCheck } from 'lucide-react';
import VisaSearchBar from '../components/VisaSearchBar';
import VisaDetailsModal from '../components/VisaDetailsModal';

const visaDestinations = [
  { name: 'Schengen Area', desc: 'Seamless entry across 27 nations.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6Wese6sJs6k5mX6TAHYxbW6nlLJ9Qo1BPFVXh-hCWAdVUqaEeo0IPGbsRIPe_KosHn-hnRLNqCqRYQGmuQGeLpNRuCmWDJ8g2IP0I3R2EQxfZ1A46E2A3iP4UkDSHdxS8BPfqzF1HTBh3BWnL0sjv0BmLaEy9OfZ4Ywl_tc5xGSvth0gO7K0d5etH-7UrjUs3chyy2kFe4n9wML8jbbk64iq63gsY2BaLtN3MiGmV4go-wCBA_iCYlBt9wUrVEWE3oD9wNLdZ8Xqv', large: true, flag: '🇪🇺' },
  { name: 'USA', desc: 'Premium Processing.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy3_B9p7XuRf7uVGLBGmQ4sYWtm4BTnYUBe4VYSJafVexMMDcmiRa9SuqlSCJsREEg5DpsDvBdoGUA7aXwoQit1QzsE55YVWluu_Drv1iGaWuaR8Q7O448hAsTajx1hZzXjd6mRniEMn6A42jQEjQRkNgzfEJbwSeM7YeiJw56ooHqPxalHZJBUrfI1fIJfki0s4fZzeWuDSN0uxXv868_nu5JexSbs5ZRUwM-rUkLaUDs9uYC1LadpnW_PSQuVPYrQY-Pg7iKPtRk', flag: '🇺🇸' },
  { name: 'UAE', desc: 'Golden Visa Experts.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_45BlzvysNRUz62jfl0Emr59t-O7C-bDxwjleQ0DWXBGyb5kaaowo0KhuEINzlqonqd7Y--L7M74urldLVlpeRCrIZOBeM8cg9aIkbUY1-8XrvkpVykSjkiqN9oZYvmXA3iTWsD2rVDijh3xANfCHj9a19RdKeZhveCUWI1nIvVhOlrNn6Ghf4TSpZ1IMmTx5bsKRIACSpA7XTfY7H4sWLxFsyLm_9ic5cB5h1X_P8J5N6l7VhZmtGTKFQ0HNaw4OZdEv5NclDPcL', flag: '🇦🇪' },
  { name: 'UK', desc: 'Investor Visa Specialists.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC_GYCTt0PVEdFqLmqvb_clVc2O0Qkc-srjaVCYBWR7qhy4CDrbJk4wKWSroC8YAxveakp1KDRS2GJYewEuGA35Pfk1RiJpso_pMFhId0obnne9ZXLJUH8CNDgMj07SXVfoZIHc1J8P_HpRCPKpgyjcAFNKjNsj9JtAXtffDlZHR9EliruFz092umEQ5SuSHNIMKOY4vAb4thgWdmlabnke3XPrjHKV-T5DOpPdYbOh5f_NGjKZPKGfhelc_IGjSlEp2r9jo0TQjft', flag: '🇬🇧' },
];

const supportedCountries = [
  { name: 'Albania', flag: '🇦🇱' }, { name: 'Algeria', flag: '🇩🇿' }, { name: 'Andorra', flag: '🇦🇩' },
  { name: 'Angola', flag: '🇦🇴' }, { name: 'Argentina', flag: '🇦🇷' }, { name: 'Armenia', flag: '🇦🇲' },
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

const protocol = [
  { id: '01', title: 'Document Audit', desc: 'Rigorous review by legal specialists.', icon: <ClipboardCheck /> },
  { id: '02', title: 'Application', desc: 'Dedicated concierge drafting.', icon: <FileSignature /> },
  { id: '03', title: 'Processing', desc: 'Active diplomatic engagement.', icon: <RefreshCw /> },
  { id: '04', title: 'Approval', desc: 'Insured credential delivery.', icon: <UserCheck />, active: true },
];

export default function Visa() {
  const [selectedDest, setSelectedDest] = useState<{ name: string; flag: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = (dest: { name: string; flag: string }) => {
    setSelectedDest(dest);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <header className="relative min-h-screen flex flex-col items-center justify-start pt-32 pb-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhiz0ny9QAVtO5G8O1xJRwjnkVxPBjPxgLoBi-a9Y2-agk_K_rKEVLJwjEY45sHUMH3Suh8s05DPukC5yDvu-UKEzHdNHwaE1J8S15LSNfTec-u2JN6m6rz_dK02dFPbqnE0b_jZyjNpPXYtuywe2sQtaLC6ubuDmWDjZyPHd1AWeLDactknG6WucfKY2NwRBjJmiTchcixO01nm7vIQgBf3ld5yzo-FIWv-VY44-jRDgMa1Kf9PpJqBoYPQTW0kgb-U_gVXycFG9Y" 
            className="w-full h-full object-cover fixed" 
            alt="Visas" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-surface-dim via-surface-dim/70 to-transparent" />
        </div>
        <div className="relative z-10 w-full px-6">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full glass-panel text-xs font-bold tracking-widest text-primary mb-6">GLOBAL ENTRY CONCIERGE</span>
            <h1 className="font-display text-5xl md:text-8xl text-on-surface mb-8 tracking-tighter">Effortless Borders. <br /><span className="text-primary italic">Boundless Travel.</span></h1>
          </div>
          <VisaSearchBar />
        </div>
      </header>

      {/* Grid */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <h2 className="font-display text-5xl mb-12">Prime Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {visaDestinations.map((dest, i) => (
            <motion.div 
              key={dest.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => handleApply(dest)}
              className={`relative rounded-3xl overflow-hidden min-h-[300px] group cursor-pointer ${dest.large ? 'md:col-span-2' : ''}`}
            >
              <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-linear-to-t from-surface-dim/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end">
                <div className="flex items-end gap-3">
                  <span className="text-4xl mb-1">{dest.flag}</span>
                  <div>
                    <h3 className="font-display text-2xl text-on-surface mb-1">{dest.name}</h3>
                    <p className="text-on-surface-variant text-sm font-sans">{dest.desc}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <button className="bg-primary text-on-primary px-6 py-2.5 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 invisible group-hover:visible shadow-xl shadow-primary/20">
                    Apply Now
                  </button>
                  {dest.large && (
                    <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
                      <ArrowUpRight size={20} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <VisaDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        destination={selectedDest} 
      />

      <section className="relative py-32 px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-[0.3]" 
            alt="background" 
          />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-center text-white mb-20 tracking-tight">Our Elite <span className="text-primary italic">Process</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px bg-white/10" />
            
            {protocol.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center group">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 mb-8 ${step.active ? 'bg-primary text-white shadow-2xl shadow-primary/40' : 'bg-white text-primary shadow-xl'}`}>
                  <div className="scale-150">{step.icon}</div>
                </div>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-3">PHASE {step.id}</span>
                <h4 className="font-display text-2xl text-white mb-3 text-center">{step.title}</h4>
                <p className="text-white/60 text-sm text-center leading-relaxed max-w-[200px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="bg-white py-32 px-6 md:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-4 block">Global Coverage</span>
              <h2 className="font-display text-5xl md:text-6xl text-gray-900 leading-tight">Supported <br /><span className="text-primary italic">Nations</span></h2>
            </div>
            <p className="text-gray-500 font-sans max-w-xs text-sm leading-relaxed mb-4">
              Providing bespoke visa solutions and diplomatic liaison services across major global territories with unprecedented accuracy.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {supportedCountries.map((country, i) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 5) * 0.03 }}
                className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex items-center gap-4 hover:border-primary/40 hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group cursor-default"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{country.flag}</span>
                <span className="text-[11px] font-bold tracking-wider text-gray-800 uppercase group-hover:text-primary transition-colors">{country.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer className="bg-gray-950 py-32 px-6 md:px-20 relative z-10 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            <div className="max-w-md">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-8 block">Contact Information</span>
              <h2 className="font-display text-5xl md:text-6xl mb-10 leading-tight tracking-tighter">Let's Discuss <br /><span className="text-primary italic">Your Journey</span></h2>
              <p className="text-white/50 font-sans text-sm leading-relaxed mb-10">
                Our elite concierge team is ready to facilitate your global passage. Reach out for customized strategic guidance.
              </p>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-all duration-300">
                  <Phone size={20} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-12 pt-4">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-2">Email Inquiries</h4>
                  <a href="mailto:gotoholidaysandvisa@gmail.com" className="text-xl font-medium hover:text-primary transition-colors">
                    gotoholidaysandvisa@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-2">Priority Hotline</h4>
                  <a href="tel:9840454061" className="text-xl font-medium hover:text-primary transition-colors">
                    +91 984045 4061
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6 pt-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-2">Headquarters</h4>
                <address className="not-italic text-white/70 font-sans text-base leading-loose">
                  No:2/305<br />
                  Puzgalanthi salai ki<br />
                  J.J nagar east<br />
                  Mugappair east<br />
                  Chennai 600037
                </address>
              </div>
            </div>
          </div>
          
          <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">© 2026 DataZync.com — All Rights Reserved</span>
            <div className="flex gap-12">
              <button className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 hover:text-white transition-colors">Privacy Ethics</button>
              <button className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 hover:text-white transition-colors">Client Confidentiality</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
