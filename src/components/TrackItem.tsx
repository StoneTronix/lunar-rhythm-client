import React from 'react';
import { Howl } from 'howler';
import { Track } from '../types';
import { usePlayer } from '../context/PlayerContext';
import '../styles/TrackItem.scss';


interface TrackItemProps {
  track: Track;
  onPlay: (track: Track) => void;
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  const { setCurrentTrack, audioRef, setProgress } = usePlayer();
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayPause = () => {
    if (audioRef.current && audioRef.current.playing()) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    const newAudio = new Howl({
      src: [`/music/${track.id}.mp3`],
      html5: true,
      onend: () => {
        setIsPlaying(false);
        setProgress(0);
      },
    });

    audioRef.current = newAudio;
    setCurrentTrack(track);
    newAudio.play();
    setIsPlaying(true);
  };

  return (
    <div className="track-item">
      <div>
        <strong>{track.title}</strong> — {track.artist}
      </div>
      <div>{formatDuration(track.duration)}</div>
      <button onClick={handlePlayPause}>
        {isPlaying ? 'Пауза' : 'Играть'}
      </button>
    </div>
  );
};
