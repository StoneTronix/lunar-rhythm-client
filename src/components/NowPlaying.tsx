import React from 'react';
import { Track } from '../types';

interface NowPlayingProps {
  track: Track | null;
}

const NowPlaying: React.FC<NowPlayingProps> = ({ track }) => {
  if (!track) return null;

  return (
    <div className="now-playing">
      <h3>Сейчас играет:</h3>
      <p><strong>{track.title}</strong> — {track.artist}</p>
    </div>
  );
};

export default NowPlaying;
