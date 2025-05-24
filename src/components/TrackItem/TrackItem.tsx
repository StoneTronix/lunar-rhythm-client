import { FC, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { Track } from '../../utils/types';
import { usePlayer } from '@contexts/PlayerContext';
import { usePlaylists } from '@contexts/PlaylistsContext';

import PlaylistSelectorModal from '@ui/PlaylistSelectorModal/PlaylistSelectorModal';
import TrackItemTracklist from '@ui/TrackItem/_tracklist/TrackItem_tracklist';
import TrackItemSearch from '@ui/TrackItem/_search/TrackItem_search';

interface TrackItemProps {
  index: number;
  track: Track;
  playlistId: string;
  disableDnD?: boolean;
  layout?: 'tracklist' | 'search';  // ToDo: Заменить на объект из types
}

const TrackItem: React.FC<TrackItemProps> = ({
  index, track, playlistId, disableDnD = false, layout = 'tracklist'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { currentTrack, isPlaying, togglePlay, playTrack } = usePlayer();
  const { moveTrackWithinPlaylist, playlists, updateTrackPlaylists } = usePlaylists();
  const [showModal, setShowModal] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: 'TRACK',
    item: { track, index, playlistId },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !disableDnD,
  });

  const [, drop] = useDrop({
    accept: 'TRACK',
    hover(item: any) {
      if (!disableDnD && item.playlistId === playlistId && item.index !== index) {
        moveTrackWithinPlaylist(playlistId, item.index, index);
        item.index = index;
      }
    },
  });

  if (!disableDnD) {
    drag(drop(ref));
  }

  const handlePlayPause = () => {
    currentTrack?.id === track.id ? togglePlay() : playTrack(track);
  };

  const handleEditPlaylists = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleSavePlaylists = async (trackId: string, selectedPlaylistIds: string[]) => {
    await updateTrackPlaylists(trackId, selectedPlaylistIds);
  };

  const playlistCheckboxes = playlists.map(p => ({
    ...p,
    checked: p.tracks.some(t => t.id === track.id),
  }));

  const CurrentLayout = layout === 'tracklist' ? TrackItemTracklist : TrackItemSearch;

  return (      
    <>
      <CurrentLayout
        refProp={ref}
        index={index}
        track={track}
        isDragging={isDragging}
        onPlayPause={handlePlayPause}
        onEditPlaylists={handleEditPlaylists}
      />
      {showModal && (
        <PlaylistSelectorModal
          trackId={track.id}
          playlists={playlistCheckboxes}
          onSave={handleSavePlaylists}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default TrackItem;
