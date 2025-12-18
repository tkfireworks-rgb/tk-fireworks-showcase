import { motion } from 'framer-motion';
import { Heart, Play, MessageCircle } from 'lucide-react';
import { Product } from '../../types';
import { useNavigate } from 'react-router-dom';
import configData from '../../data/config.json';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  theme: any;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onFavoriteToggle,
  theme,
}) => {
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${product.name} (${product.id}). Please share details.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${configData.whatsappNumber}?text=${encodedMessage}`,
      '_blank'
    );
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-dark-surface rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 glass-effect"
      style={{
        borderColor: theme.primaryColor,
        borderWidth: '1px',
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-dark-bg h-48">
        <img
          src={product.thumbnail3D}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />

        {/* Badge */}
        <div className="absolute top-2 right-2 flex gap-2">
          {product.isNew && (
            <span
              className="px-3 py-1 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: theme.primaryColor }}
            >
              NEW
            </span>
          )}
          {product.isFeatured && (
            <span
              className="px-3 py-1 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: theme.accentColor, color: '#000' }}
            >
              FEATURED
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          onClick={onFavoriteToggle}
          className="absolute top-2 left-2 p-2 rounded-full bg-dark-bg/80 hover:bg-dark-bg/100 transition-colors"
        >
          <Heart
            size={20}
            fill={isFavorite ? theme.primaryColor : 'none'}
            stroke={isFavorite ? theme.primaryColor : '#fff'}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs opacity-70 mb-1">{product.categoryId.toUpperCase()}</p>
        <h3 className="text-lg font-bold mb-2 truncate">{product.name}</h3>
        <p className="text-sm opacity-75 mb-3 line-clamp-2">{product.descriptionShort}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 bg-dark-bg rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div>
            <p className="opacity-70">Effect</p>
            <p className="font-semibold">{product.effectType}</p>
          </div>
          <div>
            <p className="opacity-70">Noise</p>
            <p className="font-semibold">{product.noiseLevel}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/product/${product.id}`)}
            className="flex-1 py-2 rounded-lg bg-dark-bg hover:opacity-80 transition-opacity flex items-center justify-center gap-1 text-sm font-semibold"
            style={{ borderColor: theme.primaryColor, borderWidth: '1px' }}
          >
            <Play size={16} /> Details
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleWhatsApp}
            className="flex-1 py-2 rounded-lg font-semibold text-white flex items-center justify-center gap-1 text-sm transition-all"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle size={16} /> Ask
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
