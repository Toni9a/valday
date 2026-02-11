import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, PhotoPair } from '../types';
import { MEMORY_PHOTOS } from '../constants';

interface PhotoGameProps {
  onComplete: () => void;
}

const MEMORY_PROMPTS = [
  "When you proposed",
  "Exploring the Jungle & bridges",
  "Vibing in Marrakesh",
  "Agbdada fly",
  "One drink and you were gone",
  "TikTok tryouts",
  "Grad standout",
  "Quadbikingg",
  "SZA twin",
  "Meme",
  "A year ago today"
];

const PhotoGame: React.FC<PhotoGameProps> = ({ onComplete }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [matchedCount, setMatchedCount] = useState(0);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  // 34 cards for the 7-column heart shape
  const TOTAL_CARDS = 34;
  const PAIRS_NEEDED = 17;

  // Heart Grid Layout (7 columns)
  const HEART_GRID = [
    0, 1, 1, 0, 1, 1, 0, // Row 0
    1, 1, 1, 1, 1, 1, 1, // Row 1
    1, 1, 1, 1, 1, 1, 1, // Row 2
    1, 1, 1, 1, 1, 1, 1, // Row 3
    0, 1, 1, 1, 1, 1, 0, // Row 4
    0, 0, 1, 1, 1, 0, 0, // Row 5
    0, 0, 0, 1, 0, 0, 0  // Row 6
  ];

  useEffect(() => {
    // Cycle through prompts every 4 seconds
    const interval = setInterval(() => {
      setCurrentPromptIndex((prev) => (prev + 1) % MEMORY_PROMPTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // We need 17 pairs.
    // Repeat photos enough times to cover the need
    const basePhotos = [...MEMORY_PHOTOS, ...MEMORY_PHOTOS, ...MEMORY_PHOTOS, ...MEMORY_PHOTOS];
    const selectedPhotos = basePhotos.slice(0, PAIRS_NEEDED);
    const gameDeck: PhotoPair[] = [...selectedPhotos, ...selectedPhotos];

    const shuffled = gameDeck
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }, index) => ({
        id: index,
        pairId: value.id,
        imageUrl: value.url,
        isFlipped: false,
        isMatched: false
      }));

    setCards(shuffled);
  }, []);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      setIsProcessing(true);
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.pairId === secondCard.pairId) {
        setCards(prev => prev.map((card, index) =>
          index === firstIndex || index === secondIndex
            ? { ...card, isMatched: true, isFlipped: true }
            : card
        ));
        setMatchedCount(prev => prev + 1);
        setFlippedIndices([]);
        setIsProcessing(false);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((card, index) =>
            index === firstIndex || index === secondIndex
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  }, [flippedIndices, cards]);

  useEffect(() => {
    if (matchedCount > 0 && matchedCount === PAIRS_NEEDED) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  }, [matchedCount, onComplete, PAIRS_NEEDED]);

  const handleCardClick = (cardIndex: number) => {
    if (isProcessing || cards[cardIndex].isMatched || cards[cardIndex].isFlipped || flippedIndices.includes(cardIndex)) {
      return;
    }
    const newCards = [...cards];
    newCards[cardIndex].isFlipped = true;
    setCards(newCards);
    setFlippedIndices([...flippedIndices, cardIndex]);
  };

  let cardCounter = 0;

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-4 z-10 relative w-full overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="flex justify-between w-full max-w-[500px] mb-6 items-end px-2">
        <div>
          <h3 className="text-3xl font-handwriting text-pink-200 drop-shadow-md">Match the memories</h3>
          <p className="text-xs text-pink-200/60 font-sans tracking-widest mt-1">FIND ALL PAIRS</p>
        </div>
      </div>

      {/* 
         Grid Container
         w-[95vw] max-w-[500px] to keep card sizes reasonable
         grid-cols-7 for the heart shape
      */}
      <div className="grid grid-cols-7 gap-1.5 w-[95vw] max-w-[500px] mx-auto">
        {HEART_GRID.map((isCard, gridIndex) => {
          if (!isCard) {
            // Spacer: maintain aspect ratio for perfect grid alignment
            return <div key={`empty-${gridIndex}`} className="w-full pt-[100%]" />;
          }

          const currentCard = cards[cardCounter];
          const currentCardIndex = cardCounter;
          cardCounter++;

          if (!currentCard) return null;

          return (
            <motion.div
              key={currentCard.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: currentCardIndex * 0.03, type: 'spring', stiffness: 260, damping: 20 }}
              className="relative w-full"
              style={{ paddingTop: '100%' }} // Aspect Ratio Hack
              onClick={() => handleCardClick(currentCardIndex)}
            >
              <div className="absolute inset-0 w-full h-full p-[1px]"> {/* Tiny padding for separation */}
                <div
                  className={`w-full h-full relative preserve-3d transition-transform duration-500 ${currentCard.isFlipped ? 'rotate-y-180' : ''}`}
                  style={{ transformStyle: 'preserve-3d', transform: currentCard.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                  {/* Back of Card (Unflipped) */}
                  <div
                    className="absolute inset-0 backface-hidden bg-pink-900/20 backdrop-blur-md rounded-lg border border-pink-500/20 flex items-center justify-center hover:bg-pink-800/30 transition-colors shadow-inner group"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                  </div>

                  {/* Front of Card (Image) */}
                  <div
                    className={`absolute inset-0 backface-hidden rounded-lg overflow-hidden border ${currentCard.isMatched ? 'border-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'border-white/30'}`}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <img
                      src={currentCard.imageUrl}
                      alt="Memory"
                      className="w-full h-full object-cover block"
                    />
                    {/* Matched overlay */}
                    {currentCard.isMatched && (
                      <div className="absolute inset-0 bg-pink-500/10 z-10 animate-pulse" />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fading Memory Prompts */}
      <div className="mt-8 h-8 flex items-center justify-center pointer-events-none w-full max-w-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPromptIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="text-pink-100/80 text-xl font-handwriting tracking-wide drop-shadow-[0_0_10px_rgba(236,72,153,0.3)] text-center px-4"
          >
            {MEMORY_PROMPTS[currentPromptIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PhotoGame;