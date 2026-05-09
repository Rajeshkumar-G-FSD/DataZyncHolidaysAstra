import { motion } from 'motion/react';
import { Phone, Mail, MessageSquare, MapPin, Send, Globe } from 'lucide-react';

const contactMethods = [
  { icon: <Phone size={20} />, label: 'Phone', value: '+1 (800) 123-4567' },
  { icon: <Mail size={20} />, label: 'Email', value: 'concierge@tourium.com' },
  { icon: <MessageSquare size={20} />, label: 'WhatsApp', value: 'Message Us' },
  { icon: <MapPin size={20} />, label: 'Headquarters', value: 'Geneva, Switzerland' },
];

export default function Contact() {
  return (
    <main className="pt-40 pb-24 px-6 md:px-20 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Form Column */}
        <div className="space-y-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h1 className="font-display text-6xl md:text-8xl text-primary tracking-tighter">Let's Connect</h1>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">Reach out to our dedicated concierge team for personalized travel inquiries and exclusive arrangements.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactMethods.map((method, i) => (
              <motion.div 
                key={method.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 rounded-2xl flex items-center gap-4 group cursor-pointer hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
                  {method.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{method.label}</span>
                  <p className="text-on-surface text-sm font-semibold">{method.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-10 rounded-3xl space-y-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
              <div className="space-y-2 group">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-colors group-focus-within:text-primary">First Name</label>
                <input type="text" placeholder="John" className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-primary transition-all" />
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-colors group-focus-within:text-primary">Last Name</label>
                <input type="text" placeholder="Doe" className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-primary transition-all" />
              </div>
            </div>
            
            <div className="space-y-2 group font-sans">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-colors group-focus-within:text-primary">Email Address</label>
              <input type="email" placeholder="john@example.com" className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-primary transition-all" />
            </div>

            <div className="space-y-2 group font-sans">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-colors group-focus-within:text-primary">Inquiry Type</label>
              <select className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-primary transition-all text-on-surface appearance-none">
                <option className="bg-surface-dim">Bespoke Travel</option>
                <option className="bg-surface-dim">Corporate Retreat</option>
                <option className="bg-surface-dim">Private Villa</option>
              </select>
            </div>

            <div className="space-y-2 group font-sans">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-colors group-focus-within:text-primary">Message</label>
              <textarea placeholder="How can we assist you?" rows={3} className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-primary transition-all resize-none" />
            </div>

            <button type="button" className="w-full bg-primary-container text-on-primary-container py-5 rounded-xl font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl shadow-primary/10">
              Send Message <Send size={16} />
            </button>
          </motion.form>
        </div>

        {/* Visual Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative rounded-3xl overflow-hidden group shadow-2xl h-full min-h-[600px]"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4DWc1sJC4LRs0F92xYmvlsYRsf1Bb6RN4VLpL6fDzKuEqv3WZZcJYcXfPJ-v0eBGRo4GoLZigjPJPO3JgxvxU-itO5QMCUKb15bLDHkKynRq84ebSyWNXnX3kj-gdRuiNBbvmXxSdhVbps_i1-t_o8bM0rP5BSf7onr6np5oTzGdsEfnqrt4qDxmbwfKgPl4aC5yHNF7YkbvXBgm21tD2omd-gEH28ll5xPhYTqSrwLW1ia5Nt4NSSTtjXxEePG-xHuGpMwNam6T_" 
            alt="Paris at dusk" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-surface-dim/90 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 glass-panel p-8 rounded-3xl border-white/5 backdrop-blur-3xl">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <h3 className="font-display text-4xl text-on-surface">Global Presence</h3>
                <p className="text-on-surface-variant font-sans leading-relaxed max-w-sm">Curating extraordinary experiences from our hubs in Geneva, Dubai, and New York.</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-2xl shadow-primary/20">
                <Globe size={28} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
