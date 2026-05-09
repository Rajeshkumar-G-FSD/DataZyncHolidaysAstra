import { motion } from 'motion/react';
import { ArrowUpRight, ClipboardCheck, FileSignature, RefreshCw, UserCheck } from 'lucide-react';

const visaDestinations = [
  { name: 'Schengen Area', desc: 'Seamless entry across 27 nations.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6Wese6sJs6k5mX6TAHYxbW6nlLJ9Qo1BPFVXh-hCWAdVUqaEeo0IPGbsRIPe_KosHn-hnRLNqCqRYQGmuQGeLpNRuCmWDJ8g2IP0I3R2EQxfZ1A46E2A3iP4UkDSHdxS8BPfqzF1HTBh3BWnL0sjv0BmLaEy9OfZ4Ywl_tc5xGSvth0gO7K0d5etH-7UrjUs3chyy2kFe4n9wML8jbbk64iq63gsY2BaLtN3MiGmV4go-wCBA_iCYlBt9wUrVEWE3oD9wNLdZ8Xqv', large: true },
  { name: 'USA', desc: 'Premium Processing.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy3_B9p7XuRf7uVGLBGmQ4sYWtm4BTnYUBe4VYSJafVexMMDcmiRa9SuqlSCJsREEg5DpsDvBdoGUA7aXwoQit1QzsE55YVWluu_Drv1iGaWuaR8Q7O448hAsTajx1hZzXjd6mRniEMn6A42jQEjQRkNgzfEJbwSeM7YeiJw56ooHqPxalHZJBUrfI1fIJfki0s4fZzeWuDSN0uxXv868_nu5JexSbs5ZRUwM-rUkLaUDs9uYC1LadpnW_PSQuVPYrQY-Pg7iKPtRk' },
  { name: 'UAE', desc: 'Golden Visa Experts.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_45BlzvysNRUz62jfl0Emr59t-O7C-bDxwjleQ0DWXBGyb5kaaowo0KhuEINzlqonqd7Y--L7M74urldLVlpeRCrIZOBeM8cg9aIkbUY1-8XrvkpVykSjkiqN9oZYvmXA3iTWsD2rVDijh3xANfCHj9a19RdKeZhveCUWI1nIvVhOlrNn6Ghf4TSpZ1IMmTx5bsKRIACSpA7XTfY7H4sWLxFsyLm_9ic5cB5h1X_P8J5N6l7VhZmtGTKFQ0HNaw4OZdEv5NclDPcL' },
  { name: 'UK', desc: 'Investor Visa Specialists.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC_GYCTt0PVEdFqLmqvb_clVc2O0Qkc-srjaVCYBWR7qhy4CDrbJk4wKWSroC8YAxveakp1KDRS2GJYewEuGA35Pfk1RiJpso_pMFhId0obnne9ZXLJUH8CNDgMj07SXVfoZIHc1J8P_HpRCPKpgyjcAFNKjNsj9JtAXtffDlZHR9EliruFz092umEQ5SuSHNIMKOY4vAb4thgWdmlabnke3XPrjHKV-T5DOpPdYbOh5f_NGjKZPKGfhelc_IGjSlEp2r9jo0TQjft' },
];

const protocol = [
  { id: '01', title: 'Document Audit', desc: 'Rigorous review by legal specialists.', icon: <ClipboardCheck /> },
  { id: '02', title: 'Application', desc: 'Dedicated concierge drafting.', icon: <FileSignature /> },
  { id: '03', title: 'Processing', desc: 'Active diplomatic engagement.', icon: <RefreshCw /> },
  { id: '04', title: 'Approval', desc: 'Insured credential delivery.', icon: <UserCheck />, active: true },
];

export default function Visa() {
  return (
    <div className="w-full">
      {/* Hero */}
      <header className="relative h-[80vh] flex items-center justify-center mt-24">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhiz0ny9QAVtO5G8O1xJRwjnkVxPBjPxgLoBi-a9Y2-agk_K_rKEVLJwjEY45sHUMH3Suh8s05DPukC5yDvu-UKEzHdNHwaE1J8S15LSNfTec-u2JN6m6rz_dK02dFPbqnE0b_jZyjNpPXYtuywe2sQtaLC6ubuDmWDjZyPHd1AWeLDactknG6WucfKY2NwRBjJmiTchcixO01nm7vIQgBf3ld5yzo-FIWv-VY44-jRDgMa1Kf9PpJqBoYPQTW0kgb-U_gVXycFG9Y" 
            className="w-full h-full object-cover" 
            alt="Visas" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-surface-dim via-surface-dim/70 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-6">
          <span className="inline-block px-4 py-1.5 rounded-full glass-panel text-xs font-bold tracking-widest text-primary mb-6">GLOBAL ENTRY CONCIERGE</span>
          <h1 className="font-display text-5xl md:text-8xl text-on-surface mb-8 tracking-tighter">Effortless Borders. <br /><span className="text-primary italic">Boundless Travel.</span></h1>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold tracking-widest text-xs uppercase hover:scale-105 transition-all">Begin Consultation</button>
            <button className="glass-panel text-on-surface px-8 py-4 rounded-lg font-bold tracking-widest text-xs uppercase hover:scale-105 transition-all">Explore Destinations</button>
          </div>
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
              className={`relative rounded-3xl overflow-hidden min-h-[300px] group cursor-pointer ${dest.large ? 'md:col-span-2' : ''}`}
            >
              <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-linear-to-t from-surface-dim/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end">
                <div>
                  <h3 className="font-display text-2xl text-on-surface mb-1">{dest.name}</h3>
                  <p className="text-on-surface-variant text-sm font-sans">{dest.desc}</p>
                </div>
                {dest.large && (
                  <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
                    <ArrowUpRight size={20} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Protocol */}
      <section className="py-24 px-6 md:px-20 bg-surface-container-lowest/30 relative">
        <h2 className="font-display text-5xl text-center mb-16">The Tourium Protocol</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative max-w-5xl mx-auto">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-[48px] left-[10%] right-[10%] h-px bg-white/10" />
          
          {protocol.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center border transition-all duration-500 ${step.active ? 'bg-primary border-primary text-on-primary shadow-2xl shadow-primary/30' : 'bg-surface-dim border-white/10 text-primary hover:border-primary/50'}`}>
                <div className="scale-125">{step.icon}</div>
              </div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mt-6 mb-2">PHASE {step.id}</span>
              <h4 className="font-display text-lg text-on-surface mb-2">{step.title}</h4>
              <p className="text-on-surface-variant text-xs text-center leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
