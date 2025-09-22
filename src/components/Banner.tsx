import { motion } from 'framer-motion';

export default function Banner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-red-600/90 backdrop-blur-sm text-white text-center py-0.5 px-4"
    >
      <p className="text-xs font-light">
        Prototype • Synthetic data • Not a political committee
      </p>
    </motion.div>
  );
}
