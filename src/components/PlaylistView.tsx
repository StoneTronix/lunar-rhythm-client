import { forwardRef } from 'react';
import { useDrop } from 'react-dnd';
import { Track, Playlist } from '../types';
import { usePlaylists } from '../context/PlaylistsContext';
import TrackItem from './TrackItem';

interface PlaylistViewProps {
  playlist: Playlist;
}

const PlaylistView = forwardRef<HTMLDivElement, PlaylistViewProps>(({ playlist }, ref) => {
  const { moveTrack } = usePlaylists();

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'TRACK',
    drop: (track: Track) => moveTrack(track, playlist.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [playlist]);

  return (
    <div
      ref={(node) => {
        if (node) dropRef(node);
      }}
      className="playlist-view"
      style={{ backgroundColor: isOver ? '#f0f0f0' : 'white' }}
    >
      <h2>{playlist.name}</h2>
      <div>
        {playlist.tracks.map((track, index) => (
          <TrackItem key={track.id} track={track} index={index} playlistId={playlist.id} />
        ))}
      </div>
    </div>
  );
});

PlaylistView.displayName = 'PlaylistView'; // Установить имя компонента для отладки

export default PlaylistView;
