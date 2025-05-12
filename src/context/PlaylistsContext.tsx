import React, { createContext, useContext, useState } from 'react';
import { Playlist, Track } from '../types';
import mockPlaylists from '../data/mockPlaylists.json';

interface PlaylistsContextType {
  playlists: Playlist[];
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  moveTrack: (track: Track, targetPlaylistId: string) => void;
  addPlaylist: (name: string) => void;
}

const PlaylistsContext = createContext<PlaylistsContextType | undefined>(undefined);

export const PlaylistsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>(mockPlaylists);

  const moveTrack = (track: Track, targetPlaylistId: string) => {
    setPlaylists(prev => {
      const newPlaylists = prev.map(playlist => {
        const isInTarget = playlist.id === targetPlaylistId;
        const isTrackPresent = playlist.tracks.some(t => t.id === track.id);

        if (isInTarget && !isTrackPresent) {
          return {
            ...playlist,
            tracks: [...playlist.tracks, track],
          };
        }

        return {
          ...playlist,
          tracks: playlist.tracks.filter(t => t.id !== track.id),
        };
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