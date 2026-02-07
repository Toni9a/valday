
import React from 'react';
import { motion } from 'framer-motion';

interface WellDoneProps {
    onContinue: () => void;
}

const WellDone: React.FC<WellDoneProps> = ({ onContinue }) => {
    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen z-50 relative px-4 bg-teal-900/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                {/* Animated Gold Stars */}
                <div className="absolute top-10 left-10 text-6xl animate-pulse">⭐</div>
                <div className="absolute top-20 right-20 text-5xl animate-bounce delay-100">🌟</div>
                <div className="absolute bottom-32 left-20 text-4xl animate-pulse delay-200">✨</div>
                <div className="absolute bottom-10 right-10 text-7xl animate-bounce">⭐️</div>

                <h1 className="text-6xl md:text-8xl font-handwriting text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)] mb-8">
                    Well Done!!
                </h1>

                <div className="relative w-64 h-64 mx-auto mb-12 rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400/50">
                    <img
                        src="https://misharabinovich.com/student_work/web2/NetArt/img/ddamce.gif"
                        alt="Dancing Celebration"
                        className="w-full h-full object-cover"
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onContinue}
                    className="px-10 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xl rounded-full shadow-lg transition-colors border-2 border-yellow-300"
                >
                    Continue ➡️
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default WellDone;
