import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { Track } from '@utils/types';
import { usePlayer } from '@contexts/PlayerContext';
import { usePlaylists } from '@contexts/PlaylistsContext';
import PlaylistSelectorModal from '@ui/PlaylistSelectorModal/PlaylistSelectorModal';

import './TrackItem.scss';

interface TrackItemProp {
  index: number;
  track: Track;  
  playlistId: string;
  disableDnD?: boolean;
  layout?: 'search' | 'tracklist';
}

const TrackItem: React.FC<TrackItemProp> = ({ 
  track, index, playlistId, disableDnD = false, layout = 'default' 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { currentTrack, isPlaying, togglePlay, playTrack } = usePlayer();
  const { playlists, moveTrackWithinPlaylist, updateTrackPlaylists } = usePlaylists();
  const [showModal, setShowModal] = useState(false);  

  const [{ isDragging }, drag] = useDrag({
    canDrag: !disableDnD,
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

  const handleEditPlaylists = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      className={`track-item ${isDragging ? 'track-item_dragging' : ''}`}
      ref={ref}
      onClick={handlePlayPause} 
    >
      <div className='track-item__index' > {index + 1}</div>
      {/* <button className="track-item__play-button" >
        {currentTrack?.id === track.id && isPlaying ? "Pause" : "Play"}
      </button> */}
      <div className='track-item__info'>
        <div className='track-item__title'>{track.title}</div>
        <div className='track-item__artist'>{track.artist}</div>
      </div>
      
      <div className='track-item__duration'>{Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}</div>
      <button
        className='track-item__controls'
        onClick={handleEditPlaylists}
      >        
      </button>
      
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
