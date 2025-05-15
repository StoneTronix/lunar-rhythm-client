-- Удалить таблицы и все связанные с ними объекты
DROP TABLE IF EXISTS playlist_tracks CASCADE;
DROP TABLE IF EXISTS tracks CASCADE;
DROP TABLE IF EXISTS playlists CASCADE;

-- Создать плейлисты
CREATE TABLE playlists (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создать треки
CREATE TABLE tracks (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  duration INTEGER NOT NULL
);

-- Связь треков и плейлистов
CREATE TABLE playlist_tracks (
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  PRIMARY KEY (playlist_id, track_id)
);
