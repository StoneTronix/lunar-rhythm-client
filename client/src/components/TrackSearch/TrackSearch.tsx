import React, { useState, useEffect } from 'react';
import TrackItem from '../TrackItem/TrackItem';

import { Track } from '../../utils/types'
import { fetchAllTracks } from '../../Api/PlayerApi';

import './TrackSearch.scss'

const TrackSearch: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const allTracks = await fetchAllTracks();
        setTracks(allTracks);
      } catch (error) {
        console.error('Failed to load tracks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTracks();
  }, []);

  const filteredTracks = tracks.filter(track => 
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="track-search">      
      <input
        type="text"
        placeholder="Поиск треков..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className='track-search__settings'>
        <button className="track-search__option">Sort</button>
      </div>

      {isLoading ? (
          <div className="track-search__loading">Загрузка...</div>
        ) : (
        <div className="track-search__list">
          {filteredTracks.map((track, index) => (
            <TrackItem 
              key={track.id}
              track={track}
              index={index}
              playlistId="" // Специальный ID для поиска
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackSearch;