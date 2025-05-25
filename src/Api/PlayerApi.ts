import { Playlist, Track } from '../utils/types'

const API_URL = process.env.API_URL;

// Получить список треков
export async function fetchAllTracks(): Promise<Track[]> {
  const res = await fetch(`${API_URL}/tracks`);
  if (!res.ok) throw new Error('Failed to fetch list of tracks');
  return await res.json();
}

// Получение файла трека с сервера
export async function fetchTrackFile(trackId: string): Promise<string> {
  // ToDo: Сделать частичное получение файла трека с сервера
  return Promise.resolve(`${API_URL}/playlists/track/${trackId}`);
}

// Обновить плейлисты для трека
export async function updateTrackPlaylists(trackId: string, playlistIds: string[]) {
  const res = await fetch(
    `${API_URL}/playlists/tracks/${trackId}/playlists`, 
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playlistIds }),
    }
  );
}

// Получить все плейлисты для рендера
export async function fetchPlaylists(): Promise<Playlist[]> {
  const res = await fetch(`${API_URL}/playlists/`);
  if (!res.ok) throw new Error('Не удалось загрузить плейлисты');
  return await res.json()
}

// Обновление порядка треков (через отправку новой последовательности)
export async function updateTrackOrder(playlistId: string, trackOrder: string[]) {
  const res = await fetch(`${API_URL}/playlists/${playlistId}/tracks`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ trackOrder }),
  });
  
  if (!res.ok) {
    throw new Error('Не удалось обновить порядок треков');
  }
  
  return await res.json();
}

// Создание нового плейлиста
export async function createPlaylist(title: string): Promise<Playlist> {
  const res = await fetch(`${API_URL}/playlists/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('Не удалось создать плейлист');
  return await res.json();
}

// Удаление плейлиста по ID
export async function deletePlaylist(playlistId: string): Promise<void> {
  const response = await fetch(`${API_URL}/playlists/${playlistId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Не удалось удалить плейлист');
  }
}