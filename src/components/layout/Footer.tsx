import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import configData from '../../data/config.json';

interface FooterProps {
  theme: any;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-dark-surface/50 border-t"
      style={{ borderColor: theme.primaryColor }}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg glow-text mb-4">About Us</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {configData.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/catalog" className="text-gray-400 hover:text-primary transition-colors">
                  Catalog
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-gray-400 hover:text-primary transition-colors">
                  Safety
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get in Touch</h3>
            <div className="space-y-2 text-sm">
              <a
                href={`https://wa.me/${configData.whatsappNumber}`}
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a
                href={configData.branches[0]?.mapUrl}
                className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
              >
                <MapPin size={16} /> Visit Store
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
          <p>
            © {currentYear} {configData.siteName}. Display-only showcase.
            <span
              className="mx-1 inline-block"
              style={{ color: theme.primaryColor }}
            >
              🔥
            </span>
            Enquire via WhatsApp.
          </p>
          <p className="mt-2 text-xs">Made with ❤️ for premium fireworks experience</p>
        </div>
      </div>
    </footer>
  );
};

const MessageCircle = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
