import { FC, Ref, MouseEvent } from 'react';

import formatTime from '@utils/formatTime';
import { Track } from '@utils/types';
import ButtonIcon from 'src/shared/Button/_icon/Button_icon';

import '../../../TrackItem/TrackItem.scss';
import './TrackItem_search.scss';

interface Props {
  track: Track;
  onPlayPause: () => void;
  onEditPlaylists: (e: MouseEvent) => void;
  refProp: Ref<HTMLDivElement>;
}

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
      className="track-item track-item_search"
      ref={refProp}
      onClick={onPlayPause}
    >
      <div className="track-item__pic" />

      <div className="track-item__info">
        <div className="track-item__title">{track.title}</div>
        <div className="track-item__artist">{track.artist}</div>
      </div>

      <div className="track-item__duration">{formatTime(track.duration)}</div>

      <ButtonIcon 
        className="track-item__controls"
        icon='Playlists'
        type='button'
        onClick={handleEditClick}
        aria-label="Редактировать плейлисты"
      />
    </div>
  );
};

export default TrackItemSearch;
