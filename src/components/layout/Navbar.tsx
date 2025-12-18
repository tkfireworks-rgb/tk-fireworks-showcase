import { motion } from 'framer-motion';
import { Menu, X, ShoppingBag, Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import configData from '../../data/config.json';

interface NavbarProps {
  theme: any;
  favoritesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, favoritesCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleWhatsApp = () => {
    const message = encodeURIComponent(configData.whatsappDefaultMessage);
    window.open(`https://wa.me/${configData.whatsappNumber}?text=${message}`, '_blank');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Catalog', path: '/catalog' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Safety', path: '/safety' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 bg-dark-bg/95 backdrop-blur border-b"
      style={{ borderColor: theme.primaryColor }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl">🔥</span>
            <div>
              <h1 className="font-bold text-lg glow-text">TK Fireworks</h1>
              <p className="text-xs text-gray-400">Premium Showcase</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                  location.pathname === item.path
                    ? 'text-white bg-dark-surface'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Shortlist */}
            <Link
              to="/shortlist"
              className="relative p-2 hover:bg-dark-surface rounded-lg transition-colors"
            >
              <Heart size={20} />
              {favoritesCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* WhatsApp */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={handleWhatsApp}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors font-medium text-sm"
            >
              <MessageCircle size={18} /> Chat
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-dark-surface rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 space-y-2 pb-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-dark-surface transition-colors text-sm"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
