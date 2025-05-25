import { usePlaylists } from '../contexts/PlaylistsContext';

export const useSelectedPlaylist = () => {
  const { playlists, selectedPlaylistId, setSelectedPlaylistId } = usePlaylists();
  
  const selectedPlaylist = playlists.find(p => p.id === selectedPlaylistId) || null;

  const selectPlaylist = (playlistId: string) => {
    setSelectedPlaylistId(playlistId);
  };

  return {
    selectedPlaylist,
    selectPlaylist,
    isSelected: (playlistId: string) => playlistId === selectedPlaylistId
  };
};