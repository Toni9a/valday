import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface IntervalProps {
  onComplete: () => void;
}

const Interval: React.FC<IntervalProps> = ({ onComplete }) => {
  
  useEffect(() => {
    // Auto transition after 4 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-4 z-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        className="text-4xl md:text-6xl font-handwriting text-white text-center drop-shadow-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        My best memories are paired with you...
      </motion.h2>
      
      <motion.div
        className="mt-8 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        (Loading memories...)
      </motion.div>
    </motion.div>
  );
};

export default Interval;