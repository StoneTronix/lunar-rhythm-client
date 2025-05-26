import { FC, Ref, MouseEvent } from 'react';
import { Track } from '@utils/types';

import formatTime from '@utils/formatTime';

import '../TrackItem.scss';

interface Props {
  track: Track;
  index: number;
  isDragging: boolean;
  onPlayPause: () => void;
  onEditPlaylists: (e: MouseEvent) => void;
  refProp: Ref<HTMLDivElement>;
}

const TrackItemTracklist: FC<Props> = ({
  track,
  index,
  isDragging,
  onPlayPause,
  onEditPlaylists,
  refProp,
}) => {
  const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // важно, чтобы не срабатывал `onClick` по родителю
    onEditPlaylists(e);
  };

  return (
    <div
      ref={refProp}
      className={`track-item ${isDragging ? 'track-item_dragging' : ''}`}
      onClick={onPlayPause}
    >
      <div className="track-item__index">{index + 1}</div>

      <div className="track-item__info">
        <div className="track-item__title">{track.title}</div>
        <div className="track-item__artist">{track.artist}</div>
      </div>

      <div className="track-item__duration">{formatTime(track.duration)}</div>

      <button
        className="track-item__controls"
        onClick={handleEditClick}
        aria-label="Редактировать плейлисты"
      />
    </div>
  );
};

export default TrackItemTracklist;
