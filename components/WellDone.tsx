
import React from 'react';
import { motion } from 'framer-motion';

interface WellDoneProps {
    onContinue: () => void;
}

const StarIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

const WellDone: React.FC<WellDoneProps> = ({ onContinue }) => {
    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen z-50 relative px-4 bg-purple-900/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="text-center relative"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                {/* Animated Purple SVG Stars */}
                <motion.div
                    className="absolute -top-16 -left-16 text-purple-400"
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                    <StarIcon className="w-16 h-16" />
                </motion.div>
                <motion.div
                    className="absolute -top-20 -right-20 text-purple-300"
                    animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <StarIcon className="w-12 h-12" />
                </motion.div>
                <motion.div
                    className="absolute -bottom-24 -left-20 text-purple-500"
                    animate={{ scale: [1, 1.5, 1], rotate: [-10, 10, -10] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                >
                    <StarIcon className="w-10 h-10" />
                </motion.div>
                <motion.div
                    className="absolute -bottom-16 -right-16 text-purple-400"
                    animate={{ scale: [1, 0.8, 1], filter: ["blur(0px)", "blur(2px)", "blur(0px)"] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                >
                    <StarIcon className="w-20 h-20" />
                </motion.div>

                <h1 className="text-6xl md:text-8xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-fuchsia-400 drop-shadow-[0_0_15px_rgba(192,132,252,0.6)] mb-8">
                    Well Done!!
                </h1>

                <div className="relative w-64 h-64 mx-auto mb-12 rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-400/50">
                    <img
                        src="/images/cattt.gif"
                        alt="Dancing Celebration"
                        className="w-full h-full object-cover"
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onContinue}
                    className="px-10 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-xl rounded-full shadow-lg transition-all border-2 border-purple-300/30"
                >
                    Continue
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default WellDone;
