import { FC, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { Track } from '@utils/types';
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
  layout?: 'tracklist' | 'search';
}

const TrackItem: FC<TrackItemProps> = ({
  index,
  track,
  playlistId,
  disableDnD = false,
  layout = 'tracklist',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { currentTrack, isPlaying, togglePlay, playTrack } = usePlayer();
  const { moveTrackWithinPlaylist, updateTrackPlaylists } = usePlaylists();
  const [showModal, setShowModal] = useState(false);

  const handlePlayPause = () => {
    currentTrack?.id === track.id ? togglePlay() : playTrack(track);
  };

  const handleEditPlaylists = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleSavePlaylists = (selectedPlaylistIds: string[]) => {
    // Оптимистичное обновление перед запросом к API
    updateTrackPlaylists(track.id, selectedPlaylistIds)
      .finally(() => setShowModal(false));
  };

  // DnD логика
const [{ isDragging }, drag] = useDrag({
  type: 'TRACK',
  item: { track, index, playlistId },
  canDrag: !disableDnD,
  collect: (monitor) => ({ isDragging: monitor.isDragging() }),
});

const [, drop] = useDrop({
  accept: 'TRACK',
  hover: (item: any) => {
    if (!disableDnD && item.playlistId === playlistId && item.index !== index) {
      moveTrackWithinPlaylist(playlistId, item.index, index);
      item.index = index;
    }
  },
});

if (!disableDnD) drag(drop(ref));

  const LayoutComponent = layout === 'tracklist' ? TrackItemTracklist : TrackItemSearch;

  return (
    <>
      <LayoutComponent
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
          onSave={handleSavePlaylists}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default TrackItem;
