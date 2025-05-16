import React, { createContext, useContext, useState } from 'react';
import { Playlist, Track } from '../utils/types';
import { fetchPlaylists as fetchPlaylistsFromAPI, createPlaylist as createPlaylistAPI, updateTrackOrder } from '../api/playlists';


interface PlaylistsContextType {
  playlists: Playlist[];
  fetchPlaylists: () => void;
  createPlaylist: (title: string) => Promise<void>;
  updatePlaylists: (playlist: Playlist) => Promise<void>;
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  moveTrackWithinPlaylist: (playlistId: string, fromIndex: number, toIndex: number) => void;
  moveTrackToPlaylist: (track: Track, targetPlaylistId: string, fromPlaylistId: string) => void;
}

const PlaylistsContext = createContext<PlaylistsContextType | undefined>(undefined);

export const PlaylistsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const fetchPlaylists = async () => {
    try {
      const data = await fetchPlaylistsFromAPI();
      setPlaylists(data);
    } catch (err) {
      console.error('Не удалось загрузить плейлисты:', err);
    }
  };

  const createPlaylist = async (title: string) => {
  try {
    const newPlaylist = await createPlaylistAPI(title);
    setPlaylists(prev => [...prev, { ...newPlaylist, tracks: [] }]);
  } catch (err) {
    console.error('Ошибка создания плейлиста:', err);
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

    console.log(`Плейлист "${playlist.title}" обновлён`);
  } catch (err) {
    console.error('Ошибка отправки:', err);
  }
};


const moveTrackWithinPlaylist = async (playlistId: string, fromIndex: number, toIndex: number) => {
  setPlaylists(prev => {
    return prev.map(playlist => {
      if (playlist.id !== playlistId) return playlist;

      const updatedTracks = [...playlist.tracks];
      const [movedTrack] = updatedTracks.splice(fromIndex, 1);
      updatedTracks.splice(toIndex, 0, movedTrack);

      // Обновляем позиции в UI сразу
      const updatedPlaylist = { ...playlist, tracks: updatedTracks };

      // Отправляем новый порядок на сервер
      updateTrackOrder(playlistId, updatedTracks.map(t => t.id))
        .catch(err => {
          console.error('Ошибка при обновлении порядка:', err);
          // Можно добавить откат состояния, если нужно
        });

      return updatedPlaylist;
    });
  });
};

  const moveTrackToPlaylist = (track: Track, targetPlaylistId: string, fromPlaylistId: string) => {
    setPlaylists(prev => {
      const updated = prev.map(p => {
        if (p.id !== fromPlaylistId && p.id !== targetPlaylistId) return p;

        if (p.id === fromPlaylistId) {
          const newTracks = p.tracks.filter(t => t.id !== track.id);
          const updatedPlaylist = { ...p, tracks: newTracks };
          updatePlaylists(updatedPlaylist); // ✅ Отправляем
          return updatedPlaylist;
        }

        if (p.id === targetPlaylistId) {
          const fromPlaylist = prev.find(pl => pl.id === fromPlaylistId);
          const movedTrack = fromPlaylist?.tracks.find(t => t.id === track.id);
        if (!movedTrack) return p;

          const updatedPlaylist = { ...p, tracks: [...p.tracks, movedTrack] };
          updatePlaylists(updatedPlaylist); // ✅ Отправляем
          return updatedPlaylist;
        }

      return p;
      
      
    });
   return updated;
    });    
  };

  return (
    <PlaylistsContext.Provider value={{ playlists, createPlaylist, fetchPlaylists, setPlaylists, updatePlaylists, moveTrackWithinPlaylist, moveTrackToPlaylist}}>
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
