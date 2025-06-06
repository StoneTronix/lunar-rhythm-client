import { forwardRef } from 'react';

import { Playlist } from '../../utils/types';
import TrackItem from '../TrackItem/TrackItem';
import { useSelectedPlaylist } from '../../hooks/useSelectedPlaylist';

import ButtonIcon from 'src/shared/Button/_icon/Button_icon';
import './Tracklist.scss'

interface TracklistProp {
  playlist: Playlist;
}

const Tracklist = forwardRef<HTMLDivElement, TracklistProp>(({ 
  playlist, 
}, ref) => { 
  const { selectPlaylist } = useSelectedPlaylist();

  const handleBackClick = () => {
    selectPlaylist(null);
  };

  return (
    <div className="tracklist">
      <div className='tracklist__header'>
        <ButtonIcon 
          className='tracklist__back-button'
          icon='Back'
          onClick={handleBackClick}
          aria-label="Назад к списку плейлистов"
        />

        <div className='tracklist__title'>{playlist.title}</div>
        
        <ButtonIcon className='tracklist__edit' icon='Edit' />        
      </div>
      <div>
        {playlist.tracks.map((track, index) => (
          <TrackItem
            layout='tracklist'
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
