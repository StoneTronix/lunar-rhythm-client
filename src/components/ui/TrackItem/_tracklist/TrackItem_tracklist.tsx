import { FC, Ref, MouseEvent } from 'react';

import { Track } from '@utils/types';

import '../TrackItem.scss'

interface Props {
  track: Track;
  index: number;
  isDragging: boolean;
  onPlayPause: () => void;
  onEditPlaylists: (e: MouseEvent) => void;
  refProp: Ref<HTMLDivElement>;
}

const TrackItemTracklist: FC<Props> = ({
  track, index, isDragging, onPlayPause, onEditPlaylists, refProp
}) => (
  <div
    className={`track-item ${isDragging ? 'track-item_dragging' : ''}`}
    ref={refProp}
    onClick={onPlayPause}
  >
    <div className='track-item__index'>{index + 1}</div>
    <div className='track-item__info'>
      <div className='track-item__title'>{track.title}</div>
      <div className='track-item__artist'>{track.artist}</div>
    </div>
    <div className='track-item__duration'>
      {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
    </div>
    <button
      className='track-item__controls'
      onClick={onEditPlaylists}
    />
  </div>
);

export default TrackItemTracklist;
