import { Playlist } from '../utils/types'

const API_URL = process.env.API_URL;

export async function fetchPlaylists(): Promise<Playlist[]> {
  const res = await fetch(`${API_URL}/playlists/`);
  if (!res.ok) throw new Error('Не удалось загрузить плейлисты');
  return await res.json()
}

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

export async function createPlaylist(title: string): Promise<Playlist> {
  const res = await fetch(`${API_URL}/playlists/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('Не удалось создать плейлист');
  return await res.json();
}

export async function deletePlaylist(playlistId: string): Promise<void> {
  const response = await fetch(`${API_URL}/playlists/${playlistId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Не удалось удалить плейлист');
  }
}