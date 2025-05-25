import { FC, Ref, MouseEvent } from 'react';
import { Track } from '@utils/types';

import '../TrackItem.scss';

interface Props {
  track: Track;
  onPlayPause: () => void;
  onEditPlaylists: (e: MouseEvent) => void;
  refProp: Ref<HTMLDivElement>;
}

const formatDuration = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = String(duration % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const TrackItemSearch: FC<Props> = ({
  track,
  onPlayPause,
  onEditPlaylists,
  refProp,
}) => {
  const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEditPlaylists(e);
  };

  return (
    <div
      className="track-item_search"
      ref={refProp}
      onClick={onPlayPause}
    >
      <div className="track-item__pic" />

      <div className="track-item__info">
        <div className="track-item__title">{track.title}</div>
        <div className="track-item__artist">{track.artist}</div>
      </div>

      <div className="track-item__duration">{formatDuration(track.duration)}</div>

      <button
        className="track-item__controls"
        onClick={handleEditClick}
        aria-label="Редактировать плейлисты"
      />
    </div>
  );
};

export default TrackItemSearch;
