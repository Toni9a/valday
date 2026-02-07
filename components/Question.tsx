import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MEERKAT_IMAGE, MEMORY_PHOTOS } from '../constants';

interface QuestionProps {
  onYes: () => void;
}

const Question: React.FC<QuestionProps> = ({ onYes }) => {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);

  const moveNoButton = () => {
    const x = (Math.random() - 0.5) * 150;
    const y = (Math.random() - 0.5) * 150;
    setNoBtnPosition({ x, y });
    setHoverCount(prev => prev + 1);
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Blurred Background Collage (Fixed) */}
      <div className="absolute inset-0 z-0 opacity-20 flex flex-wrap content-center justify-center overflow-hidden pointer-events-none">
        {/* Repeating photos to fill background */}
        {[...MEMORY_PHOTOS, ...MEMORY_PHOTOS, ...MEMORY_PHOTOS].map((photo, i) => (
          <div key={i} className="w-1/3 md:w-1/4 aspect-square relative">
            <img src={photo.url} className="w-full h-full object-cover grayscale blur-[2px]" alt="" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      <div className="z-20 flex flex-col items-center w-full max-w-lg px-6">

        {/* Content Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 1 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center shadow-2xl w-full"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-white/20 mb-6 shadow-lg relative">
            <img src="/images/page4pic.png" alt="Please?" className="w-full h-full object-cover" />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <motion.h2
            className="text-4xl md:text-5xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-8 text-center drop-shadow-sm"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
          >
            Will you be my Valentine?
          </motion.h2>

          <div className="flex flex-col gap-4 w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onYes}
              className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-bold text-white text-xl shadow-[0_0_20px_rgba(236,72,153,0.4)] border border-white/10 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Yes, I will! <span className="text-2xl">💖</span>
              </span>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </motion.button>

            <motion.button
              animate={noBtnPosition}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-xl font-medium text-gray-300 text-lg border border-white/5 transition-colors"
            >
              {hoverCount > 0 ? "Are you sure? 🥺" : "No, I won't"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Question;