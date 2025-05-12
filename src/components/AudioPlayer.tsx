import React, { useEffect, useRef } from 'react';
import { Track } from '../types';

interface AudioPlayerProps {
  track: Track | null;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ track }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.load(); // перезагружаем новый трек
      audioRef.current.play().catch(console.error);
    }
  }, [track]);

  if (!track) return null;

  return (
    <div className="audio-player">
      <p>Сейчас играет: {track.title} — {track.artist}</p>
      <audio ref={audioRef} controls>
        <source src={`/audio/${track.id}.mp3`} type="audio/mpeg" />
        Ваш браузер не поддерживает аудио.
      </audio>
    </div>
  );
};