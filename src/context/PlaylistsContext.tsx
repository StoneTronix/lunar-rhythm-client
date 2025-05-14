import React, { createContext, useContext, useState } from 'react';
import { Playlist, Track } from '../types';

interface PlaylistsContextType {
  playlists: Playlist[];
  fetchPlaylists: () => void;
  updatePlaylists: (playlist: Playlist) => Promise<void>;
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  moveTrackWithinPlaylist: (playlistId: string, fromIndex: number, toIndex: number) => void;
  moveTrackToPlaylist: (track: Track, targetPlaylistId: string, fromPlaylistId: string) => void;
}

const PlaylistsContext = createContext<PlaylistsContextType | undefined>(undefined);

export const PlaylistsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const fetchPlaylists = async () => {
    const response = await fetch('http://localhost:4000/playlists');
    if (!response.ok) {
      const data = await response.json();
      setPlaylists(data);
    } else {
      console.error('Не удалось загрузить плейлисты');
    }
  };

  const updatePlaylists = async (playlist: Playlist) => {
  try {
    const response = await fetch(`http://localhost:4000/playlists/${playlist.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playlist),
    });

    if (!response.ok) {
      throw new Error('Ошибка при отправке плейлиста на сервер');
    }

    console.log(`Плейлист "${playlist.name}" обновлён`);
  } catch (err) {
    console.error('Ошибка отправки:', err);
  }
};


  const moveTrackWithinPlaylist = (playlistId: string, fromIndex: number, toIndex: number) => {
    setPlaylists(prev => {
      return prev.map(playlist => {
        if (playlist.id !== playlistId) return playlist;

        const updatedTracks = [...playlist.tracks];
        const [movedTrack] = updatedTracks.splice(fromIndex, 1);
        updatedTracks.splice(toIndex, 0, movedTrack);

        const updatedPlaylist = { ...playlist, tracks: updatedTracks };

        updatePlaylists(updatedPlaylist);

        return updatedPlaylist;
      });
    });
  };

  const moveTrackToPlaylist = (track: Track, targetPlaylistId: string, fromPlaylistId: string) => {
    setPlaylists(prev => {
      return prev.map(playlist => {
        if (playlist.id === fromPlaylistId) {
          return {
            ...playlist,
            tracks: playlist.tracks.filter(t => t.id !== track.id),
          };
        } else if (playlist.id === targetPlaylistId) {
          return {
            ...playlist,
            tracks: [...playlist.tracks, track],
          };
        } else {
          return playlist;
        }
      });
    });    
  };

  // Доработать
  const addPlaylist = (name: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      createdAt: new Date().toISOString(),
      tracks: [],
    };
    setPlaylists(prev => [...prev, newPlaylist]);
  };

  return (
    <PlaylistsContext.Provider value={{ playlists, fetchPlaylists, setPlaylists, updatePlaylists, moveTrackWithinPlaylist, moveTrackToPlaylist}}>
      {children}
    </PlaylistsContext.Provider>
  );
};

export const usePlaylists = () => {
  const context = useContext(PlaylistsContext);
  if (!context) {
    throw new Error('usePlaylists must be used within a PlaylistsProvider');
  }
  return context;
};
