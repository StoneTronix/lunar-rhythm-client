import { forwardRef } from 'react';
import { useDrop } from 'react-dnd';
import { Track, Playlist } from '../utils/types';
import { usePlaylists } from '../context/PlaylistsContext';
import TrackItem from './TrackItem';

interface PlaylistViewProps {
  playlist: Playlist;
}

const PlaylistView = forwardRef<HTMLDivElement, PlaylistViewProps>(({ playlist }, ref) => { 
  return (
    <div className="playlist-view"
      style={{ backgroundColor : 'white' }}
    >
      <h2>{playlist.title}</h2>
      <div>
        {playlist.tracks.map((track, index) => (
          <TrackItem
          index={index}
            key={track.id}
            track={track}            
            playlistId={playlist.id}
          />
        ))}
      </div>
    </div>
  );
});

PlaylistView.displayName = 'PlaylistView';

export default PlaylistView;
