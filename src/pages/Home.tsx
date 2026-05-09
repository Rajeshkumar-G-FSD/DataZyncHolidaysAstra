import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowLeft, ArrowRight, PlaneTakeoff, Diamond, HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const destinations = [
  {
    name: 'Maldives',
    tag: 'Coastal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW7BlRBcIpaaXLTBFkTVJAa-B95pk-kELYfDJTPTqN5QgEc1Z1f2fnUUIHYV3j4ufDpH1XLdzBiVZlTvjWH3aR55Y1tbHTJSKtKdJqGSyByFf3mVy8wA8cFY3E1bYySYFyKC20X4GJtTMWZIzPFmO74JuF42nzagYsBDguA1fwb00Z1gaAWbvGGmWAMWwlRLHMEk2QaOXHpSTOQ3Nzx0UYZM9g6mZfquojNRhnPU4lXnHHkq_iKkVd8v4Xzf-WeAbbUv7Acey8Vs0j',
  },
  {
    name: 'Dubai',
    tag: 'Urban',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBjbZsDd9BW7aNuhv8fNfT51l2WUV5s5cKYWPPEaJD2lE3RPBnhP962VXu1toRfuTde1gymO_svsgEdaCIwPfFNrisaMoy1Ub4xtMBdqcK3nY0VR4Hv-AR3KVabM7bQ7FyzNlUeMMylqsaUc162sT2VDGbnmckleCz1oKVvmo1EI4D1LDY7JaogkhMOqMl5lC6Yw4_tcAl7F36Cpy8hWPMXM8OdO3lb1Fw9iFCL3FZIU5hQBQ7F0_pktRHci2356hcUn546CAfdfkq',
  },
  {
    name: 'Switzerland',
    tag: 'Alpine',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCt0mrPs-1wPtbyfX84LwLPSCGodmriHGEM3wir_YMQ8d1Q-VXAar48Wzsc-RcTS9d42rYoyJwS9HEmV2C476sO02brycvfeBOLSU30vEg7Y14FPrWEojkrS50A39tFQyzLX4uIwZHo0z55RdGWaJGPiin5Wvfn2wMV8N5MqGqXing5YIMpmLfxmZsu96ss9REXp5RaXlKEgJ9NBJ0z7SrUh_X4IRasp2c1fm4DqMJpt5vQaoTxJRy6dXboUEILNH3Y3Vy63uxPA4YG',
  },
];

const services = [
  {
    title: 'Private Aviation',
    description: 'Seamless global connectivity with our exclusive charter networks and priority routing.',
    icon: <PlaneTakeoff className="text-primary" size={32} />,
  },
  {
    title: 'Curated Experiences',
    description: 'Access the inaccessible. From private viewings to exclusive culinary events.',
    icon: <Diamond className="text-primary" size={32} />,
    featured: true,
  },
  {
    title: 'Villa Estates',
    description: 'Handpicked luxury residences offering unparalleled privacy and personalized staff.',
    icon: <HomeIcon className="text-primary" size={32} />,
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Section flow transformations
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);

  return (
    <div ref={containerRef} className="w-full relative">
      {/* Hero Section */}
      <header className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqvEe30uMt82qg-x4GRBqCqVSWrcpWeGE78HcuMMUdx7B5ON17aIuwmy-VNO0ckcHp7Iithq9u9PDf0pci9uO4b4mrimsTKTrfVwrI2zBFRSvZW069oq6WeJJUkUmltdL-ehTk5ueZJVZNA7k9S9EjBKz52ST8bYAspcTamaGoATScFKuAVgCShh_yqWWFdafHGW902Q-v7TG4j0_gdMfydvhHAcoXiZ7haKrdtiM3IjzMvOAU9f3jjkFJRuG2OmHu3d4m4DxbGnNZ" 
            alt="Maldives Resort"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-surface-dim via-surface-dim/40 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 text-center px-6 md:px-20 max-w-7xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-8xl text-gradient mb-6 leading-tight"
          >
            Explore the World <br /> in Luxury
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-sans text-lg text-on-surface-variant max-w-2xl mx-auto mb-10"
          >
            Premium international tours, curated travel experiences, and unforgettable journeys designed for the world's most discerning travelers.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/booking" className="bg-primary-container text-on-primary-container font-sans font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-lg hover:scale-105 transition-all shadow-lg shadow-primary/20 w-full sm:w-auto text-center">
              Explore Tours
            </Link>
            <Link to="/contact" className="glass-panel text-on-surface font-sans font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-lg hover:scale-105 transition-all w-full sm:w-auto text-center">
              Book Now
            </Link>
          </motion.div>
        </div>
      </header>


      {/* Destinations Section */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-on-surface mb-2">Iconic Destinations</h2>
            <p className="font-sans text-on-surface-variant">Curated locations for the extraordinary traveler.</p>
          </div>
          <div className="hidden md:flex gap-4">
            <button className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:scale-105 transition-all">
              <ArrowLeft size={20} />
            </button>
            <button className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:scale-105 transition-all">
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>

        <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide snap-x group/carousel">
          {destinations.map((dest, i) => (
            <motion.div 
              key={dest.name}
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
              className="min-w-[300px] md:min-w-[400px] h-[500px] rounded-2xl overflow-hidden relative group snap-center cursor-pointer"
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-surface-dim/90 via-surface-dim/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-6 glass-panel border-t-0 border-x-0 group-hover:translate-y-0 translate-y-4 transition-transform duration-500">
                <div className="flex justify-between items-center">
                  <h3 className="font-display text-3xl text-on-surface">{dest.name}</h3>
                  <span className="bg-surface-dim/50 text-secondary text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                    {dest.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="font-display text-5xl text-center text-on-surface mb-16"
        >
          Bespoke Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`glass-panel p-10 rounded-2xl hover:scale-[1.02] transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden ${service.featured ? 'border-primary/30' : ''}`}
            >
              {service.featured && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent z-0" 
                />
              )}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 relative z-10 ${service.featured ? 'bg-primary/20 shadow-xl shadow-primary/10' : 'bg-surface-container-high'}`}>
                {service.icon}
              </div>
              <h3 className="font-display text-2xl text-on-surface mb-4 relative z-10">{service.title}</h3>
              <p className="font-sans text-on-surface-variant leading-relaxed relative z-10">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-24 px-6 md:px-20 bg-surface-container-lowest/50 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3"
          >
            <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">CLIENT VOICES</span>
            <h2 className="font-display text-4xl md:text-5xl text-on-surface mb-6">The Dossier of <br /> Excellence</h2>
            <p className="text-on-surface-variant font-sans leading-relaxed">Hear from those who have traversed the globe with Tourium.</p>
          </motion.div>
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-8 rounded-2xl space-y-6"
            >
              <div className="flex gap-1 text-primary">
                {[1,2,3,4,5].map(i => <Diamond key={i} size={12} fill="currentColor" />)}
              </div>
              <p className="text-on-surface font-sans italic leading-relaxed">"The attention to detail was beyond anything I've experienced. From the private jet routing to the villa staff, every moment was perfection."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-high" />
                <div>
                  <h4 className="text-sm font-bold text-on-surface">Alexander V.</h4>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Hedge Fund CEO</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="glass-panel p-8 rounded-2xl space-y-6"
            >
              <div className="flex gap-1 text-primary">
                {[1,2,3,4,5].map(i => <Diamond key={i} size={12} fill="currentColor" />)}
              </div>
              <p className="text-on-surface font-sans italic leading-relaxed">"Discretion is paramount for my family. Tourium delivered a seamless, anonymous journey that felt both safe and incredibly grand."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-high" />
                <div>
                  <h4 className="text-sm font-bold text-on-surface">Elena R.</h4>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Creative Director</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Decorative elements with parallax */}
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0.6, 1], [0, -100]) }}
          className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" 
        />
      </section>

      {/* Newsletter / Dossier Signup */}
      <section className="py-32 px-6 md:px-20 text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="max-w-4xl mx-auto glass-panel p-16 rounded-[2.5rem] border-white/5 space-y-10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent pointer-events-none" />
          <h2 className="font-display text-4xl md:text-6xl text-on-surface tracking-tighter">Join the Dossier</h2>
          <p className="text-on-surface-variant font-sans text-lg max-w-xl mx-auto">Receive priority access to off-market estates, private island rentals, and exclusive diplomatic routing updates.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow bg-white/5 border border-white/10 px-6 py-4 rounded-xl focus:outline-none focus:border-primary/50 text-on-surface transition-all"
            />
            <button className="bg-primary text-on-primary font-bold tracking-widest text-[10px] uppercase px-8 py-4 rounded-xl hover:scale-105 transition-all">Request Access</button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
