import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import { WALLET_PASS_URL } from '../constants';

const Success: React.FC = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    // Initial size
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen z-20 relative px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ReactConfetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={true}
        numberOfPieces={200}
        gravity={0.15}
      />

      <motion.div
        className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl text-center max-w-lg"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl mb-6">💖</h1>
        <h2 className="text-4xl md:text-6xl font-handwriting text-pink-400 mb-6">Yayyy!</h2>
        <p className="text-xl text-gray-200 mb-8 font-light">
          I can't wait to celebrate with you. <br />
          Grab your pass for our special day!
        </p>

        {/* Hidden GIF initially, revealed/downloaded on click */}
        <div className="mb-12 flex flex-col items-center">
          <p className="mb-4 text-pink-200/60 text-sm font-sans tracking-widest uppercase">
            Click to Download
          </p>

          <a
            href={WALLET_PASS_URL}
            download="MyValentinePass.gif"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group cursor-pointer transition-transform hover:scale-110 active:scale-95 duration-300"
          >
            {/* 8-Bit Heart Download Icon */}
            <img
              src="/images/downloadpic.png"
              alt="Download Pass"
              className="w-32 md:w-40 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]"
            />
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
          </a>
        </div>

        <div className="mt-4 text-xs text-gray-400">
          (Check your downloads folder after clicking!)
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Success;