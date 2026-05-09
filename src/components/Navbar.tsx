import { Link, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Visa', path: '/visa' },
  { name: 'Booking', path: '/booking' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled || isOpen ? 'bg-black/90 backdrop-blur-xl border-white/5 h-20' : 'bg-transparent border-transparent h-24'}`}>
      <div className="flex justify-between items-center h-full px-6 md:px-20 max-w-7xl mx-auto w-full">
        <Link to="/" className="relative z-50">
          <img src="https://i.postimg.cc/Jnrg4Jqr/gootoholidays-yellow.png" alt="GooToHolidays Logo" className="h-10 md:h-14 w-auto object-contain" />
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-sans font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 ${
                pathname === link.path 
                  ? 'text-primary border-b-2 border-primary pb-1' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 relative z-50">
          <Link to="/contact" className="hidden md:block bg-primary-container text-on-primary-container px-6 py-2.5 rounded-lg font-sans font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform">
            Inquire
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 bg-black/95 backdrop-blur-3xl z-40 md:hidden flex flex-col p-8"
          >
            <div className="flex flex-col gap-5 pt-8 items-center justify-center h-full">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    className={`font-display font-bold text-2xl tracking-[0.1em] uppercase transition-all ${
                      pathname === link.path ? 'text-primary' : 'text-on-surface'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                className="mt-6 w-full max-w-xs"
              >
                <Link
                  to="/contact"
                  className="bg-primary text-on-primary px-6 py-3.5 rounded-full font-sans font-bold text-[10px] tracking-widest uppercase shadow-2xl shadow-primary/40 block text-center"
                >
                  Start Inquiring
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
