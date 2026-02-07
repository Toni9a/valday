
import React, { useState, useEffect, useRef } from 'react';

const BackgroundMusic: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Auto-play attempt on mount & handle interaction
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Try to play immediately
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    setIsPlaying(true);
                })
                .catch(() => {
                    // Auto-play was prevented
                    setIsPlaying(false);
                });
        }

        // Attempt to start playing on any user interaction if autoplay failed
        const enableAudio = () => {
            if (audio.paused) {
                audio.play().then(() => setIsPlaying(true)).catch(() => { });
            }
        };

        window.addEventListener('click', enableAudio);
        window.addEventListener('keydown', enableAudio);

        return () => {
            window.removeEventListener('click', enableAudio);
            window.removeEventListener('keydown', enableAudio);
        };
    }, []);

    return (
        <>
            {/* Native Audio Element for local file */}
            <audio
                ref={audioRef}
                src="/audio/rm-come-back-to-me.mp3"
                loop
                preload="auto"
            />
        </>
    );
};

export default BackgroundMusic;
