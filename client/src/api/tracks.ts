import { Track } from '../utils/types';

export async function fetchAllTracks(): Promise<Track[]> {
  const res = await fetch('http://localhost:4000/tracks');
  if (!res.ok) throw new Error('Failed to fetch tracks');
  return await res.json();
}