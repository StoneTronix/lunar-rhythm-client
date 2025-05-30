import { render, screen, fireEvent } from '@testing-library/react';
import ControlBar from './ControlBar';

jest.mock('../../contexts/PlayerContext', () => ({
  usePlayer: jest.fn(),
}));
jest.mock('../ProgressBar/ProgressBar', () => () => <div data-testid="mock-progress-bar" />);
jest.mock('../VolumeControl/VolumeControl', () => () => <div data-testid="mock-volume-control" />);

import { usePlayer } from '../../contexts/PlayerContext';

describe('ControlBar', () => {
  const mockTogglePlay = jest.fn();

  beforeEach(() => {
    (usePlayer as jest.Mock).mockReturnValue({
      currentTrack: { title: 'Test Track', artist: 'Test Artist' },
      isPlaying: false,
      togglePlay: mockTogglePlay,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders current track title and artist', () => {
    render(<ControlBar />);
    expect(screen.getByText('Test Track')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByTestId('mock-progress-bar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-volume-control')).toBeInTheDocument();
  });

  it('calls togglePlay when play button is clicked', () => {
    render(<ControlBar />);
    const playButton = screen.getByLabelText('Play/Pause');
    fireEvent.click(playButton);
    expect(mockTogglePlay).toHaveBeenCalledTimes(1);
  });

  it('does not render anything if there is no currentTrack', () => {
    (usePlayer as jest.Mock).mockReturnValue({
      currentTrack: null,
      isPlaying: false,
      togglePlay: jest.fn(),
    });
    const { container } = render(<ControlBar />);
    expect(container.firstChild).toBeNull();
  });
});
