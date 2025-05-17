import React, { createContext, useContext, useState } from 'react';
import { Playlist, Track } from '../utils/types';
import { fetchPlaylists as fetchPlaylistsFromAPI, createPlaylist as createPlaylistAPI, updateTrackOrder, deletePlaylist as deletePlaylistAPI } from '../api/playlists';


interface PlaylistsContextType {
  playlists: Playlist[];
  fetchPlaylists: () => void;
  createPlaylist: (title: string) => Promise<void>;
  deletePlaylist: (id: string) => Promise<void>;
  updatePlaylists: (playlist: Playlist) => Promise<void>;
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  moveTrackWithinPlaylist: (playlistId: string, fromIndex: number, toIndex: number) => void;
  moveTrackToPlaylist: (track: Track, targetPlaylistId: string, fromPlaylistId: string) => void;
  updateTrackPlaylists: (trackId: string, playlistIds: string[]) => Promise<void>;  
}

const PlaylistsContext = createContext<PlaylistsContextType | undefined>(undefined);

export const PlaylistsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  // Получить все плейлисты
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
      return prev.map(p => {
        if (p.id !== playlistId) return p;

        const updatedTracks = [...p.tracks];
        const [movedTrack] = updatedTracks.splice(fromIndex, 1);
        updatedTracks.splice(toIndex, 0, movedTrack);
        
        const updatedPlaylist = { ...p, tracks: updatedTracks };  // Обновляем позиции в UI сразу

        // Отправляем новый порядок на сервер
        updateTrackOrder(playlistId, updatedTracks.map(t => t.id))
          .catch(err => {
            console.error('Ошибка при обновлении порядка:', err);
            // Можно добавить откат состояния
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
          updatePlaylists(updatedPlaylist); // Отправляем
          return updatedPlaylist;
        }

        if (p.id === targetPlaylistId) {
          const fromPlaylist = prev.find(p => p.id === fromPlaylistId);
          const movedTrack = fromPlaylist?.tracks.find(t => t.id === track.id);
        if (!movedTrack) return p;

          const updatedPlaylist = { ...p, tracks: [...p.tracks, movedTrack] };
          updatePlaylists(updatedPlaylist); // Отправляем
          return updatedPlaylist;
        }

        return p;      
      });
      return updated;
    });    
  };

  const updateTrackPlaylists = async (trackId: string, playlistIds: string[]) => {       
    try {
      await fetch(`http://localhost:4000/playlists/tracks/${trackId}/playlists`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playlistIds }),
      });
      
      // Обновляем локальное состояние
      setPlaylists(prev => {
        const targetTrack = prev
          .flatMap(p => p.tracks)
          .find(t => t.id === trackId); // Находим трек по ID
        return prev.map(playlist => ({
          ...playlist,
          tracks: playlistIds.includes(playlist.id)
            ? playlist.tracks.some(t => t.id === trackId)
              ? playlist.tracks
              : targetTrack 
                ? [...playlist.tracks, targetTrack] 
                : playlist.tracks
            : playlist.tracks.filter(t => t.id !== trackId)
        }));
      });
    } catch (error) {
      console.error('Ошибка при обновлении плейлистов трека:', error);
    }
  };

  const deletePlaylist = async (id: string) => {
    try {      
      await deletePlaylistAPI(id);
      setPlaylists(prev => prev.filter(p => p.id !== id)); 
    } catch (error) {
    // Откатываем изменения при ошибке
      setPlaylists(prev => [...prev]);
      console.error('Ошибка удаления:', error);
      throw error; // Пробрасываем ошибку для обработки в UI
    }
  };

  return (
    <PlaylistsContext.Provider value={{ playlists, deletePlaylist, createPlaylist, fetchPlaylists, setPlaylists, updatePlaylists, moveTrackWithinPlaylist, moveTrackToPlaylist, updateTrackPlaylists}}>
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
