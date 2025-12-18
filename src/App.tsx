import { Suspense } from 'react';
import { useTheme } from './hooks/useTheme';
import { useFavorites } from './hooks/useFavorites';
import { useGA4 } from './hooks/useGA4';
import { AppRouter } from './router/AppRouter';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { motion } from 'framer-motion';

function App() {
  const { theme: currentTheme } = useTheme();
  const { favorites } = useFavorites();
  const { trackEvent } = useGA4();

  // Track page view
  const theme = currentTheme as any;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-dark-bg text-white min-h-screen"
      style={{
        background: theme?.background || 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      }}
    >
      {/* Global Floating WhatsApp Button */}
      <FloatingWhatsAppButton theme={theme} />

      {/* Navigation */}
      <Navbar theme={theme} favoritesCount={favorites.length} />

      {/* Routes */}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <AppRouter theme={theme} favoritesCount={favorites.length} />
      </Suspense>

      {/* Footer */}
      <Footer theme={theme} />
    </motion.div>
  );
}

const FloatingWhatsAppButton: React.FC<{ theme: any }> = ({ theme }) => {
  const handleClick = () => {
    import('./data/config.json').then((config) => {
      const message = encodeURIComponent(config.default.whatsappDefaultMessage);
      window.open(`https://wa.me/${config.default.whatsappNumber}?text=${message}`, '_blank');
    });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl z-30 hover:shadow-3xl transition-shadow"
      style={{ backgroundColor: '#25D366' }}
      title="Chat with us on WhatsApp"
    >
      💬
    </motion.button>
  );
};

export default App;
