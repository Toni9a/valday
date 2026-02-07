import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import StarryBackground from './components/StarryBackground';
import Intro from './components/Intro';
import Interval from './components/Interval';
import PhotoGame from './components/PhotoGame';
import Question from './components/Question';
import Success from './components/Success';
import WellDone from './components/WellDone';
import BackgroundMusic from './components/BackgroundMusic';
import { PageState } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageState>(PageState.INTRO);

  const renderPage = () => {
    switch (currentPage) {
      case PageState.INTRO:
        return <Intro key="intro" onComplete={() => setCurrentPage(PageState.INTERVAL)} />;
      case PageState.INTERVAL:
        return <Interval key="interval" onComplete={() => setCurrentPage(PageState.GAME)} />;
      case PageState.GAME:
        return <PhotoGame key="game" onComplete={() => setCurrentPage(PageState.WELL_DONE)} />;
      case PageState.WELL_DONE:
        return <WellDone key="welldone" onContinue={() => setCurrentPage(PageState.QUESTION)} />;
      case PageState.QUESTION:
        return <Question key="question" onYes={() => setCurrentPage(PageState.SUCCESS)} />;
      case PageState.SUCCESS:
        return <Success key="success" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black text-white font-sans selection:bg-pink-500 selection:text-white">
      {/* Global Background */}
      <StarryBackground />
      <BackgroundMusic />

      {/* Main Content Area with Transitions */}
      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>

      {/* Footer / Music Credit (Optional) */}
      <div className="absolute bottom-2 right-4 text-xs text-white/20 z-50 pointer-events-none">
        Made with ❤️ for You
      </div>
    </div>
  );
};

export default App;