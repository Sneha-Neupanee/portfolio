import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import '../styles/MusicToggle.css';

const MusicToggle = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Set default volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.25;
        }
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                // play() returns a promise, we handle it to catch autoplay policy errors just in case
                audioRef.current.play().catch(err => {
                    console.error("Audio playback failed:", err);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="music-toggle-container">
            <audio
                ref={audioRef}
                src="/jazz-background.mp3"
                loop
                preload="auto"
            />
            <button
                className="music-toggle-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Mute Music' : 'Play Music'}
                title={isPlaying ? 'Mute Music' : 'Play Music'}
            >
                {isPlaying ? (
                    <Volume2 size={18} strokeWidth={1.75} />
                ) : (
                    <VolumeX size={18} strokeWidth={1.75} />
                )}
            </button>
        </div>
    );
};

export default MusicToggle;
