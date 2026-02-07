import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RECIPIENT_NAME } from '../constants';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'GREETING' | 'MAIN'>('GREETING');

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
  const [showButton, setShowButton] = useState(false);

  // 1. Initial Greeting Screen
  useEffect(() => {
    if (step === 'GREETING') {
      const timer = setTimeout(() => {
        setStep('MAIN');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // 2. Main Text Sequence
  useEffect(() => {
    if (step === 'MAIN') {
      if (currentLineIndex >= lines.length) {
        setShowButton(true);
        return;
      }

      const duration = 4000; // Hold each line
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, lines.length, step]);

  // Greeting View
  if (step === 'GREETING') {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen px-6 text-center z-50 bg-black absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
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
          transition={{ delay: 2, duration: 1 }}
        >
          ~ Love, Timi
        </motion.div>
      </motion.div>
    );
  }

  // Main Writing View
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center z-10 relative overflow-hidden">

      <AnimatePresence mode="wait">
        {currentLineIndex < lines.length && (
          <motion.div
            key={currentLineIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-32 flex items-center justify-center w-full"
          >
            {/* 
                Stable Writing Animation:
                1. Render the text invisibly (opacity-0) to establish the full width and center it.
                2. Overlay an absolute container that animates width 0->100% to 'reveal' the visible text.
                3. The pen attaches to the right edge of the revealing container.
             */}
            <div className="relative inline-block">
              {/* Ghost Text for Layout */}
              <span className="text-2xl md:text-4xl lg:text-5xl font-handwriting text-transparent opacity-0 whitespace-nowrap px-2">
                {lines[currentLineIndex]}
              </span>

              {/* Animating Reveal Mask */}
              <motion.div
                className="absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
              >
                <span className="text-2xl md:text-4xl lg:text-5xl font-handwriting text-blue-200 leading-relaxed drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] px-2">
                  {lines[currentLineIndex]}
                </span>

                {/* Pen Tip - Following the right edge of this container */}
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 1, 0] }}
                    transition={{ times: [0, 0.95, 1], duration: 3 }}
                  >
                    <span className="text-3xl md:text-5xl -mt-8 block animate-writing">
                      🖊️
                    </span>
                  </motion.div>
                </div>
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

      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(236, 72, 153, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="mt-12 px-10 py-4 bg-transparent border border-pink-500/50 text-pink-100 font-handwriting text-2xl md:text-3xl rounded-full shadow-[0_0_15px_rgba(236,72,153,0.3)] backdrop-blur-sm relative group overflow-hidden"
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