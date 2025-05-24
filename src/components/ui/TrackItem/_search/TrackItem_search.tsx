import { FC, Ref } from 'react';
import { Track } from '@utils/types';

import '../TrackItem.scss'

interface Props {
  track: Track;
  onPlayPause: () => void;
  onEditPlaylists: (e: React.MouseEvent) => void;
  refProp: Ref<HTMLDivElement>;
}

const TrackItemSearch: FC<Props> = ({
  track, onPlayPause, onEditPlaylists, refProp
}) => (
  <div
    className='track-item_search'
    ref={refProp}
    onClick={onPlayPause}
  >
    <div className='track-item__pic'></div>
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

export default TrackItemSearch;
