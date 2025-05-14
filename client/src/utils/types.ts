export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number; // в секундах
}

export interface Playlist {
  id: string;
  name: string;
  createdAt: string;
  tracks: Track[];  
}
