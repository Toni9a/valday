import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  top: string;
  left: string;
  size: string;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
}

interface ShootingStar {
  id: number;
  top: string;
  left: string;
  delay: string;
}

const StarryBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    // Generate Static Twinkling Stars
    const newStars: Star[] = [];
    for (let i = 0; i < 200; i++) {
      newStars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 2 + 1}px`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 2}s`,
        opacity: Math.random(),
      });
    }
    setStars(newStars);

    // Generate Shooting Stars
    const newShootingStars: ShootingStar[] = [];
    for (let i = 0; i < 8; i++) {
        newShootingStars.push({
            id: i,
            top: `${Math.random() * 60}%`, // Start mostly in upper half
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 10 + 2}s` // More frequent
        });
    }
    setShootingStars(newShootingStars);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black overflow-hidden pointer-events-none">
      
      {/* 1. Pink Supernova Gradients - Increased Opacity & Size */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-pink-700/40 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-800/40 rounded-full blur-[120px] animate-pulse-slow delay-1000 mix-blend-screen" />
      
      {/* 2. Aurora Flashes */}
      <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] bg-yellow-600/20 rounded-full blur-[100px] animate-pulse-slower mix-blend-screen" />
      <div className="absolute bottom-[20%] left-[20%] w-[30%] h-[30%] bg-emerald-600/20 rounded-full blur-[100px] animate-pulse-slower delay-2000 mix-blend-screen" />

      {/* 3. Standard Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
          }}
        />
      ))}

      {/* 4. Shooting Stars */}
      {shootingStars.map((star) => (
         <div 
            key={star.id}
            className="absolute h-[2px] w-[120px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
            style={{
                top: star.top,
                left: star.left,
                animation: `shooting-star 4s linear infinite`,
                animationDelay: star.delay
            }}
         />
      ))}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 10px white; }
        }
        .animate-twinkle {
          animation-name: twinkle;
          animation-iteration-count: infinite;
        }
        .animate-pulse-slow {
            animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulse-slower {
            animation: pulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes shooting-star {
            0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; }
            10% { opacity: 1; }
            20% { transform: translateX(-300px) translateY(300px) rotate(-45deg); opacity: 0; }
            100% { transform: translateX(-300px) translateY(300px) rotate(-45deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default StarryBackground;