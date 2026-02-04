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
          I can't wait to celebrate with you. <br/>
          Grab your pass for our special day!
        </p>

        <a 
          href={WALLET_PASS_URL}
          // In a real app, adding download attribute or proper handling for pkpass
          className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl hover:bg-gray-900 transition-all transform hover:scale-105 shadow-xl border border-gray-700"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2">
             <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
             <path d="M15 22V2h9" />
             <circle cx="15" cy="12" r="3" />
          </svg>
          <div className="text-left">
            <div className="text-xs uppercase tracking-wider text-gray-400">Add to</div>
            <div className="text-xl font-bold font-sans">Apple Wallet</div>
          </div>
        </a>
        
        <div className="mt-8 text-sm text-gray-400">
          (Check your downloads folder)
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Success;