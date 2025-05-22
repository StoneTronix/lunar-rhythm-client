import React from 'react';
import { Track } from '@utils/types';

interface Props {
  track: Track;
  index: number;  
  onPlayPause: () => void;
  onEditPlaylists: (e: React.MouseEvent) => void;
  refProp: React.Ref<HTMLDivElement>;
}

const TrackItemDefaultLayout: React.FC<Props> = ({
  track, index, onPlayPause, onEditPlaylists, refProp
}) => (
  <div
    className={`track-item`}
    ref={refProp}
    onClick={onPlayPause}
  >    
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

export default TrackItemDefaultLayout;
