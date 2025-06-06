import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TrackItem from './TrackItem';
import { Track } from '../../utils/types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const mockMoveTrackWithinPlaylist = jest.fn();
const mockUpdateTrackPlaylists = jest.fn(() => Promise.resolve());

jest.mock('@contexts/PlaylistsContext', () => ({
  usePlaylists: () => ({
    moveTrackWithinPlaylist: mockMoveTrackWithinPlaylist,
    updateTrackPlaylists: mockUpdateTrackPlaylists,
  }),
}));

jest.mock('@contexts/PlayerContext', () => ({
  usePlayer: () => ({
    currentTrack: null,
    isPlaying: false,
    togglePlay: jest.fn(),
    playTrack: jest.fn(),
  }),
}));

jest.mock('@ui/PlaylistSelectorModal/PlaylistSelectorModal', () => (props: any) => (
  <div data-testid="playlist-modal">
    <button onClick={() => props.onSave(['playlist-1'])}>сохранить</button>
    <button onClick={props.onClose}>закрыть</button>
  </div>
));

const track: Track = {
  id: 'track-123',
  title: 'Test Track',
  artist: 'Test Artist',
  duration: 180,
};

describe('TrackItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('opens modal and updates playlists on save', async () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <TrackItem
          index={0}
          track={track}
          playlistId="playlist-1"
          disableDnD={true}
          layout="tracklist"
        />
      </DndProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /редактировать плейлисты/i }));
    expect(screen.getByTestId('playlist-modal')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/сохранить/i));


    await waitFor(() => {
      expect(mockUpdateTrackPlaylists).toHaveBeenCalledWith('track-123', ['playlist-1']);
      expect(screen.queryByTestId('playlist-modal')).not.toBeInTheDocument();
    });
  });
});
