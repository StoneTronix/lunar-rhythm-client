import { useState, useCallback, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Playlist, Track } from '../types';
import TrackItem from './TrackItem';

interface PlaylistViewProps {
  playlist: Playlist;
}

const PlaylistView: React.FC<PlaylistViewProps> = ({ playlist }) => {
  const [tracks, setTracks] = useState<Track[]>(playlist.tracks);

  const moveTrack = useCallback((fromIndex: number, toIndex: number) => {
    setTracks((prevTracks) => {
      const updated = [...prevTracks];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }, []);

  // Используем реф для элемента, на который будет происходить сброс (drop)
  const dropRef = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop(() => ({
    accept: 'TRACK',
    drop: (item: { index: number }) => {
      // Обработчик при сбросе элемента
    },
  }));

  // Связываем drop с рефом
  drop(dropRef);

  return (
    <div ref={dropRef} className="playlist-view" style={{ padding: '1rem', backgroundColor: '#fafafa' }}>
      <h2>{playlist.name}</h2>
      {tracks.map((track, index) => (
        <TrackItem
          key={track.id}
          track={track}
          index={index}
          moveTrack={moveTrack}
        />
      ))}
    </div>
  );
};

export default PlaylistView;
