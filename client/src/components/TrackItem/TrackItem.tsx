import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Track } from '../../utils/types';
import { usePlayer } from '../../contexts/PlayerContext';
import { usePlaylists } from '../../contexts/PlaylistsContext';
import PlaylistSelectorModal from '../ui/PlaylistSelectorModal/PlaylistSelectorModal'

interface Props {
  index: number;
  track: Track;  
  playlistId: string;
}

const TrackItem: React.FC<Props> = ({ track, index, playlistId }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { currentTrack, isPlaying, togglePlay, playTrack } = usePlayer();
  const { moveTrackWithinPlaylist } = usePlaylists();

  const [{ isDragging }, drag] = useDrag({
    type: 'TRACK',
    item: { track, index, playlistId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TRACK',
    hover(item: any) {
      if (item.playlistId === playlistId && item.index !== index) {
        moveTrackWithinPlaylist(playlistId, item.index, index);
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  const [showModal, setShowModal] = useState(false);
  const { playlists, updateTrackPlaylists } = usePlaylists();

  const handleEditPlaylists = () => {
    setShowModal(true);
  };

  const handleSavePlaylists = async (trackId: string, selectedPlaylistIds: string[]) => {
    await updateTrackPlaylists(trackId, selectedPlaylistIds);
  };

  const handlePlayPause = () => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  const playlistCheckboxes = playlists.map(p => ({
    ...p,
    checked: p.tracks.some(t => t.id === track.id)
  }));

  return (
    <div
      ref={ref}
      className={`track-item ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
    >
      {/* <div>{index + 1}</div> */}
      <button onClick={handlePlayPause}>
        {currentTrack?.id === track.id && isPlaying ? 'Pause' : 'Play'}
      </button>
      <div>
        <strong>{track.title}</strong> — {track.artist}
      </div>
      <div>{Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}</div>
      <button onClick={handleEditPlaylists}>Изменить плейлисты</button>
      
      {showModal && (
        <PlaylistSelectorModal
          trackId={track.id}
          playlists={playlistCheckboxes}
          onSave={handleSavePlaylists}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default TrackItem;
