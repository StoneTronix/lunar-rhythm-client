import { Track } from '../utils/types';

const API_URL = process.env.API_URL;

export async function fetchAllTracks(): Promise<Track[]> {
  const res = await fetch(`${API_URL}/tracks`);
  if (!res.ok) throw new Error('Failed to fetch tracks');
  return await res.json();
}