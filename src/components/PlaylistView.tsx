import React, { useState } from 'react';
import { Playlist, Track } from '../types';
import { TrackItem } from './TrackItem';
import { AudioPlayer } from './AudioPlayer';

interface PlaylistViewProps {
  playlist: Playlist;
}

export const PlaylistView: React.FC<PlaylistViewProps> = ({ playlist }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  return (
    <div className="playlist-view">
      <h2>{playlist.name}</h2>
      <div>
        {playlist.tracks.map(track => (
          <TrackItem key={track.id} track={track} onPlay={setCurrentTrack} />
        ))}
      </div>
      <AudioPlayer track={currentTrack} />
    </div>
  );
};
