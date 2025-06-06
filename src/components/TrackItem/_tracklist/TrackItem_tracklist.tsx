import { FC, Ref, MouseEvent } from 'react';
import { Track } from '@utils/types';

import formatTime from '@utils/formatTime';
import Icon from 'src/shared/Icon/Icon';
import ButtonIcon from 'src/shared/Button/_icon/Button_icon';

import '../TrackItem.scss';
import './TrackItem_tracklist.scss';

interface Props {
  track: Track;
  index: number;
  isActive: boolean;
  isDragging: boolean;  
  onPlayPause: () => void;
  onEditPlaylists: (e: MouseEvent) => void;
  refProp: Ref<HTMLDivElement>;
}

const TrackItemTracklist: FC<Props> = ({
  track,
  index,
  isDragging,
  isActive,
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
      ref={refProp}
      className={`
        track-item track-item_tracklist 
        ${isDragging ? 'track-item_dragging' : ''} 
        ${isActive ? 'track-item_active' : ''}
      `}
      onClick={onPlayPause}
    >
      {!isActive 
        ? <div className="track-item__index">{index + 1}</div> 
        : <Icon className="track-item__plays" name={'IsPlaying'} />
      }
      

      <div className="track-item__info">
        <div className="track-item__title">{track.title}</div>
        <div className="track-item__artist">{track.artist}</div>
      </div>

      <div className="track-item__duration">{formatTime(track.duration)}</div>

      <ButtonIcon
        className="track-item__controls"
        icon="Playlists"
        type="button"
        onClick={handleEditClick}
        aria-label="Редактировать плейлисты"
      />
    </div>
  );
};

export default TrackItemTracklist;
