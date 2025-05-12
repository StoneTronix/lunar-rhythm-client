import { forwardRef } from 'react';
import { Track } from '../types';
import { useDrag } from 'react-dnd';
import { usePlayer } from '../context/PlayerContext';
import '../styles/TrackItem.scss';

interface TrackItemProps {
  track: Track;
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const TrackItem = forwardRef<HTMLDivElement, TrackItemProps>(({ track }, ref) => {
  const { currentTrack, isPlaying, playTrack, pause, playlists, setPlaylists } = usePlayer();

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'TRACK',
    item: track,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [track]);

  const handlePlayPause = () => {
    if (currentTrack?.id === track.id) {
      isPlaying ? pause() : playTrack(track);
    } else {
      playTrack(track);
    }
  };

  const handleMoveTrack = (targetPlaylistId: string) => {
    const updatedPlaylists = playlists.map(playlist => {
      let updatedTracks = playlist.tracks;

      if (playlist.id === targetPlaylistId && !playlist.tracks.find(t => t.id === track.id)) {
        updatedTracks = [...updatedTracks, track];
      }

      if (playlist.id !== targetPlaylistId) {
        updatedTracks = updatedTracks.filter(t => t.id !== track.id);
      }

      return { ...playlist, tracks: updatedTracks };
    });

    setPlaylists(updatedPlaylists);
  };

  return (
      <div
        ref={(node) => {
          if (node) dragRef(node);
        }}
        className="track-item"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
      <div>
        <strong>{track.title}</strong> — {track.artist}
      </div>
      <div>{formatDuration(track.duration)}</div>
      <button onClick={handlePlayPause}>
        {currentTrack?.id === track.id && isPlaying ? 'Пауза' : 'Играть'}
      </button>
      <div>
        <h4>Переместить в плейлист:</h4>
        {playlists.map((playlist) => (
          <button key={playlist.id} onClick={() => handleMoveTrack(playlist.id)}>
            {playlist.name}
          </button>
        ))}
      </div>
    </div>
  );
});

TrackItem.displayName = 'TrackItem'; // Установить имя компонента для отладки

export default TrackItem;
