import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '923218956107';
  const message = 'Hello Faizan! I would like to discuss a WordPress project with you.';

  // Detect mobile to pick the URL that won't be blocked by browsers/extensions.
  // wa.me redirects through api.whatsapp.com which is sometimes blocked (ERR_BLOCKED_BY_RESPONSE).
  const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const whatsappUrl = isMobile
    ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} className="text-white" fill="white" />
    </motion.a>
  );
};

export default WhatsAppButton;