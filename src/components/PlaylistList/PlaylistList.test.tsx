import { render, screen, fireEvent, act } from '@testing-library/react';
import PlaylistList from './PlaylistList';
import React from 'react';

const createPlaylistMock = jest.fn(() => Promise.resolve());
const deletePlaylistMock = jest.fn(() => Promise.resolve());

jest.mock('../../contexts/PlaylistsContext', () => ({
  usePlaylists: () => ({
    playlists: [{ id: '1', title: 'Мой плейлист', tracks: [] }],
    createPlaylist: createPlaylistMock,
    deletePlaylist: deletePlaylistMock,
  }),
}));

test('открывает модалку создания плейлиста и создаёт новый плейлист', async () => {
  render(<PlaylistList />);

  fireEvent.click(screen.getByLabelText(/добавить плейлист/i));

  fireEvent.change(screen.getByPlaceholderText(/введите название/i), {
    target: { value: 'Новый плейлист' },
  });

  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: /создать/i }));
  });

  expect(createPlaylistMock).toHaveBeenCalledWith('Новый плейлист');
});

test('удаляет плейлист через PlaylistListItem', async () => {
  render(<PlaylistList />);

  fireEvent.click(screen.getByLabelText(/удалить плейлист/i));

  await act(async () => {
    fireEvent.click(screen.getByLabelText(/удалить/i));
  });
});
