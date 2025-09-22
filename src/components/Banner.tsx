import { motion } from 'framer-motion';

export default function Banner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white text-center py-2 px-4"
    >
      <p className="text-sm font-medium">
        Prototype. Synthetic data. Not a political committee.
      </p>
    </motion.div>
  );
}
