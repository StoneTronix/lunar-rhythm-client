export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number; // в секундах
}

export interface Playlist {
  id: string;
  title: string;
  tracks: Track[];  
}

export interface PlaylistCheckbox extends Playlist {
  checked: boolean;
}