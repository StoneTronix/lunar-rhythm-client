import React, { createContext, useContext, useState } from 'react';
import { Playlist, Track } from '../types';

interface PlaylistsContextType {
  playlists: Playlist[];
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  moveTrack: (
    track: Track, 
    targetPlaylistId: string, 
    sourceIndex?: number, 
    targetIndex?: number, 
    commit?: boolean
  ) => void;
  addPlaylist: (name: string) => void;
}

const PlaylistsContext = createContext<PlaylistsContextType | undefined>(undefined);

export const PlaylistsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const moveTrack = (
    track: Track,
    targetPlaylistId: string,
    sourceIndex?: number,
    targetIndex?: number,
    commit = false
  ) => {
    setPlaylists((prev) => {
      const newPlaylists = prev.map((playlist) => {
        if (playlist.id === targetPlaylistId) {
          // Если трек перемещается внутри плейлиста, меняем только порядок
          const updatedTracks = [...playlist.tracks];
          if (sourceIndex !== undefined && targetIndex !== undefined) {
            updatedTracks.splice(targetIndex, 0, updatedTracks.splice(sourceIndex, 1)[0]);
          } else {
            updatedTracks.push(track);
          }

          // Если коммит включен, отправляем изменения на сервер
          if (commit) {
            fetch(`http://localhost:4000/playlists/${targetPlaylistId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ tracks: updatedTracks }),
            });
          }

          return { ...playlist, tracks: updatedTracks };
        }
        return playlist;
      });

      return newPlaylists;
    });
  };

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
    <PlaylistsContext.Provider value={{ playlists, setPlaylists, moveTrack, addPlaylist }}>
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
