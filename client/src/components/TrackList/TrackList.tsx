import { forwardRef } from 'react';

import { Playlist } from '../../utils/types';
import TrackItem from '../TrackItem/TrackItem';
// import { useDrop } from 'react-dnd';

import './Tracklist.scss'

interface TracklistProp {
  playlist: Playlist;
}

const Tracklist = forwardRef<HTMLDivElement, TracklistProp>(({ playlist }, ref) => { 
  return (
    <div className="tracklist">
      <div className='tracklist__header'>
        <div className='tracklist__title'>{playlist.title}</div>
        <button className='tracklist__edit'></button>
      </div>
      <div>
        {playlist.tracks.map((track, index) => (
          <TrackItem
            index={index}
            key={track.id}
            track={track}            
            playlistId={playlist.id}
          />
        ))}
      </div>
    </div>
  );
});

export default Tracklist;
