import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-surface-dim/80 backdrop-blur-xl border-white/5 h-20' : 'bg-transparent border-transparent h-24'}`}>
      <div className="flex justify-between items-center h-full px-6 md:px-20 max-w-7xl mx-auto w-full">
        <Link to="/" className="font-display text-2xl text-primary tracking-tighter uppercase font-bold">
          Tourium
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

        <div className="flex items-center gap-4">
          <Link to="/contact" className="hidden md:block bg-primary-container text-on-primary-container px-6 py-2.5 rounded-lg font-sans font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform">
            Inquire
          </Link>
          <button className="md:hidden text-primary">
            <Menu size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
}
