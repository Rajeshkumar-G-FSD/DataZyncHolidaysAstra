import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, PlayCircle, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-white/5 py-16 px-6 md:px-20 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/">
              <img 
                src="https://i.postimg.cc/Jnrg4Jqr/gootoholidays-yellow.png" 
                alt="GooToHolidays Logo" 
                className="h-12 w-auto object-contain" 
                style={{ filter: 'invert(1) hue-rotate(180deg) brightness(1.2)' }}
              />
            </Link>
            <p className="text-on-surface-variant font-sans leading-relaxed max-w-xs">
              Elevating global travel to an art form for the discerning few. Redefining luxury for the modern connoisseur.
            </p>
            <div className="flex gap-4">
              <Instagram size={20} className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors" />
              <PlayCircle size={20} className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors" />
              <Linkedin size={20} className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Legal Column */}
          <div className="space-y-6 font-sans">
            <h4 className="text-primary font-bold text-xs uppercase tracking-widest">Legal & Privacy</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Global Terms', 'Cookies', 'Legal'].map(item => (
                <li key={item}>
                  <a href="#" className="text-on-surface-variant hover:text-on-surface text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Placeholder */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-primary font-bold text-xs uppercase tracking-widest">Private Concierge</h4>
            <p className="text-on-surface-variant text-sm">Available 24/7 for our esteemed clientele. Join the dossier.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Request an invitation" 
                className="bg-transparent border-b border-white/20 pb-2 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary flex-grow transition-colors"
                id="footer-email-input"
              />
              <button className="text-primary hover:text-white transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-on-surface-variant text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} GOOTOHOLIDAYS. PRIVATE & CONFIDENTIAL.
          </p>
        </div>
      </div>
    </footer>
  );
}
