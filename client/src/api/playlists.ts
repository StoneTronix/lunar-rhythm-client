import { Playlist } from '../utils/types'

export async function fetchPlaylists(): Promise<Playlist[]> {
  const res = await fetch('/api/playlists');
  if (!res.ok) throw new Error('Не удалось загрузить плейлисты');
  return await res.json()
}

export async function updateTrackOrder(playlistId: string, trackOrder: string[]) {
  await fetch(`/api/playlists/${playlistId}/tracks`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ trackOrder }),
  });
}
