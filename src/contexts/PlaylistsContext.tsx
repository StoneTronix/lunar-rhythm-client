import React, { createContext, useEffect, useContext, useState } from 'react';
import { Playlist, Track } from '../utils/types';
import {
  updateTrackPlaylists as updateTrackPlaylistsAPI,
  fetchPlaylists as fetchPlaylistsAPI,
  createPlaylist as createPlaylistAPI,
  updateTrackOrder as updateTrackOrderAPI,
  deletePlaylist as deletePlaylistAPI,
} from '@api/PlayerApi';

interface PlaylistsContextType {
  playlists: Playlist[];
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  fetchPlaylists: () => Promise<void>;
  createPlaylist: (title: string) => Promise<void>;
  deletePlaylist: (id: string) => Promise<void>;
  updateTrackPlaylists: (trackId: string, playlistIds: string[]) => Promise<void>;
  moveTrackWithinPlaylist: (playlistId: string, fromIndex: number, toIndex: number) => void;
  moveTrackToPlaylist: (track: Track, targetPlaylistId: string, fromPlaylistId: string) => void;
}

const PlaylistsContext = createContext<PlaylistsContextType | undefined>(undefined);

export const PlaylistsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  // ToDo: При добавлении авторизации вызвать в другом месте
  useEffect(() => {
    fetchPlaylists();
  }, []); // Пустой массив зависимостей — выполнить только при монтировании

  const fetchPlaylists = async () => {
    try {
      const data = await fetchPlaylistsAPI();
      setPlaylists(data);
    } catch (err) {
      console.error('Не удалось загрузить плейлисты:', err);
    }
  };

  const createPlaylist = async (title: string) => {
    try {
      const newPlaylist = await createPlaylistAPI(title);
      setPlaylists((prev) => [...prev, { ...newPlaylist, tracks: [] }]);
    } catch (err) {
      console.error('Ошибка создания плейлиста:', err);
    }
  };

  const deletePlaylist = async (id: string) => {
    try {
      await deletePlaylistAPI(id);
      setPlaylists((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Ошибка удаления:', error);
      throw error;
    }
  };

  const moveTrackWithinPlaylist = (playlistId: string, fromIndex: number, toIndex: number) => {
    setPlaylists((prev) =>
      prev.map((p) => {
        if (p.id !== playlistId) return p;

        const updatedTracks = [...p.tracks];
        const [movedTrack] = updatedTracks.splice(fromIndex, 1);
        updatedTracks.splice(toIndex, 0, movedTrack);

        updateTrackOrderAPI(playlistId, updatedTracks.map((t) => t.id)).catch((err) =>
          console.error('Ошибка при обновлении порядка:', err)
        );

        return { ...p, tracks: updatedTracks };
      })
    );
  };

  const moveTrackToPlaylist = (track: Track, targetPlaylistId: string, fromPlaylistId: string) => {
    setPlaylists((prev) => {
      const updated = prev.map((p) => {
        if (p.id === fromPlaylistId) {
          return { ...p, tracks: p.tracks.filter((t) => t.id !== track.id) };
        }

        if (p.id === targetPlaylistId && !p.tracks.some((t) => t.id === track.id)) {
          return { ...p, tracks: [...p.tracks, track] };
        }

        return p;
      });

      return updated;
    });

    // Синхронизация после измененния состояния
    updateTrackPlaylists(track.id, [targetPlaylistId]);
  };

  const updateTrackPlaylists = async (trackId: string, playlistIds: string[]) => {
    // Оптимистичное обновление
    setPlaylists((prev) => {
      const track = prev.flatMap((p) => p.tracks).find((t) => t.id === trackId);
      if (!track) return prev;

      return prev.map((playlist) => ({
        ...playlist,
        tracks: playlistIds.includes(playlist.id)
          ? playlist.tracks.some((t) => t.id === trackId)
            ? playlist.tracks
            : [...playlist.tracks, track]
          : playlist.tracks.filter((t) => t.id !== trackId),
      }));
    });
    // Запрос к API
    try {
      await updateTrackPlaylistsAPI(trackId, playlistIds);
    } catch (error) {
      console.error('Ошибка при обновлении плейлистов трека:', error);
      fetchPlaylists(); // Перезагружаем актуальные данные
    }
  };

  return (
    <PlaylistsContext.Provider
      value={{
        playlists,
        setPlaylists,
        fetchPlaylists,
        createPlaylist,
        deletePlaylist,
        updateTrackPlaylists,
        moveTrackWithinPlaylist,
        moveTrackToPlaylist,
      }}
    >
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
