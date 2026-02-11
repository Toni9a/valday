import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RECIPIENT_NAME } from '../constants';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'GREETING' | 'MAIN' | 'PHOTO_NOTE'>('GREETING');
  const [showClickMe, setShowClickMe] = useState(false);

  const lines = [
    `I love you so much ${RECIPIENT_NAME},`,
    "more than all the time and space",
    "in the universe can contain",
    "and I can't wait to spend",
    "all the time in the world",
    "to share that love with you!",
    "Happy Valentine's Day <3"
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // 1. Initial Greeting Screen
  useEffect(() => {
    if (step === 'GREETING') {
      const timer = setTimeout(() => {
        setStep('MAIN');
      }, 3000); // 3 seconds instead of 4
      return () => clearTimeout(timer);
    }
  }, [step]);

  // 2. Main Text Sequence
  useEffect(() => {
    if (step === 'MAIN') {
      if (currentLineIndex >= lines.length) {
        setStep('PHOTO_NOTE');
        return;
      }

      const duration = 3000; // Speed up: 3s instead of 4s
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, lines.length, step]);

  // 3. Photo Note Timer
  useEffect(() => {
    if (step === 'PHOTO_NOTE') {
      const timer = setTimeout(() => {
        setShowClickMe(true);
      }, 30000); // 30 seconds wait
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Greeting View
  if (step === 'GREETING') {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen px-6 text-center z-50 bg-black absolute inset-0 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        onClick={() => {
          // Touching/Clicking anywhere here will trigger the BackgroundMusic's window listeners
          setStep('MAIN');
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-handwriting text-3xl md:text-5xl text-pink-200"
        >
          Hey {RECIPIENT_NAME}, <br />
          this is something I made for you...
        </motion.div>
        <motion.div
          className="mt-8 text-xl text-gray-400 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          ~ Love, Timi
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          className="mt-12 text-pink-500/50 text-sm font-sans tracking-widest uppercase"
        >
          ( Tap to begin )
        </motion.div>
      </motion.div>
    );
  }

  // Main Writing View
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 text-center z-10 relative overflow-y-auto">

      <AnimatePresence mode="wait">
        {step === 'MAIN' && currentLineIndex < lines.length && (
          <motion.div
            key={currentLineIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-24 md:h-32 flex items-center justify-center w-full"
          >
            <div className="relative inline-block">
              {/* Ghost Text for Layout */}
              <span className="text-xl md:text-4xl lg:text-5xl font-handwriting text-transparent opacity-0 whitespace-nowrap px-2">
                {lines[currentLineIndex]}
              </span>

              {/* Animating Reveal Mask */}
              <motion.div
                className="absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "linear" }}
              >
                <span className="text-xl md:text-4xl lg:text-5xl font-handwriting text-blue-200 leading-relaxed drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] px-2">
                  {lines[currentLineIndex]}
                </span>

                {/* Pen Tip - Following the right edge of this container */}
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 1, 0] }}
                    transition={{ times: [0, 0.95, 1], duration: 2.5 }}
                  >
                    <span className="text-2xl md:text-5xl -mt-6 md:-mt-8 block animate-writing">
                      🖊️
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {step === 'PHOTO_NOTE' && (
          <motion.div
            key="photo-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center w-full max-w-4xl pt-10"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="font-handwriting font-bold text-2xl md:text-5xl text-pink-200 mb-8 px-4"
            >
              handwritten, as requested
            </motion.h2>

            {/* Envelope Container */}
            <div className="relative w-[90vw] h-[60vw] max-w-[500px] md:h-[320px]">

              {/* Envelope Back */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: 50 }}
                transition={{ delay: 5, duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-pink-50 rounded-lg shadow-xl border border-pink-100"
              />

              {/* The Note (Sliding out) - Optimization for Scroll/View */}
              <motion.div
                initial={{ y: 0, opacity: 0, rotate: 0 }}
                animate={{ y: -180, opacity: 1, rotate: -1 }}
                transition={{
                  delay: 2.5,
                  duration: 2.5,
                  ease: "easeOut"
                }}
                className="absolute left-4 right-4 top-4 bottom-4 z-20"
              >
                <div className="w-full h-[70vh] max-h-[600px] md:h-[600px] overflow-hidden shadow-2xl rounded-sm border border-gray-100 bg-white">
                  <img
                    src="/handwritten_note.png"
                    alt="Handwritten Note"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </motion.div>

              {/* Envelope Flap (Top) */}
              <motion.div
                initial={{ rotateX: 0, opacity: 1, y: 0 }}
                animate={{ rotateX: 180, opacity: 0, y: 50 }}
                transition={{
                  rotateX: { delay: 1.5, duration: 1.2, ease: "easeInOut" },
                  opacity: { delay: 5, duration: 1.5 },
                  y: { delay: 5, duration: 1.5 }
                }}
                className="absolute top-0 left-0 right-0 h-1/2 bg-pink-100 rounded-t-lg shadow-md z-40 origin-top"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  borderBottom: "1px solid rgba(244, 114, 182, 0.2)"
                }}
              />

              {/* Envelope Front Layer (Pocket) */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: 50 }}
                transition={{ delay: 5, duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-white/90 rounded-lg z-30 shadow-inner"
                style={{
                  clipPath: "polygon(0 100%, 0 0, 50% 50%, 100% 0, 100% 100%)",
                  background: "linear-gradient(to bottom, #fff5f7, #fdf2f8)"
                }}
              />

              {/* Envelope Bottom Seal */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: 50 }}
                transition={{ delay: 5, duration: 1.5, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 right-0 h-1/2 bg-pink-50 z-30 flex items-end justify-center pb-6"
                style={{ clipPath: "polygon(0 100%, 50% 50%, 100% 100%)" }}
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-pink-400 text-3xl drop-shadow-sm"
                >
                  ❤️
                </motion.span>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes writing-wiggle {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-2px) rotate(-10deg); }
            75% { transform: translateY(2px) rotate(10deg); }
        }
        .animate-writing {
            animation: writing-wiggle 0.2s infinite;
        }
      `}</style>

      {showClickMe && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(236, 72, 153, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="mt-64 md:mt-40 mb-20 px-10 py-4 bg-transparent border border-pink-500/50 text-pink-100 font-handwriting text-2xl md:text-3xl rounded-full shadow-[0_0_15px_rgba(236,72,153,0.3)] backdrop-blur-sm relative group overflow-hidden shrink-0"
        >
          <span className="relative z-10 flex items-center gap-2">
            Click Me! <span className="animate-pulse">❤️</span>
          </span>
          <div className="absolute inset-0 bg-pink-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
        </motion.button>
      )}
    </div>
  );
};

export default Intro;