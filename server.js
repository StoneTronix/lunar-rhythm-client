const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mm = require('music-metadata');

const app = express();
const PORT = process.env.PORT || 4000;

// Пути
const musicDir = path.join(__dirname, 'public/music');
const playlistsPath = path.join(__dirname, 'public/playlists.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/music', express.static(musicDir)); // Отдача музыки

// Получить плейлисты
app.get('/playlists', (req, res) => {
  try {
    const data = fs.readFileSync(playlistsPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    console.error('Ошибка чтения playlists.json:', err);
    res.status(500).json({ error: 'Ошибка чтения плейлистов' });
  }
});

// Синхронизация треков с файлами
async function syncTracksWithFiles() {
  let playlists = [];
  try {
    const raw = fs.readFileSync(playlistsPath, 'utf8');
    playlists = JSON.parse(raw);
  } catch (err) {
    console.warn('Создаём новый playlists.json');
  }

  const files = fs.readdirSync(musicDir).filter(f => f.endsWith('.wav'));
  const existingTrackIds = new Set(
    playlists.flatMap(p => p.tracks.map(t => t.id))
  );

  let updated = false;

  for (const file of files) {
    const id = path.parse(file).name;
    if (existingTrackIds.has(id)) continue;

    let duration = 0;
    try {
      const metadata = await mm.parseFile(path.join(musicDir, file));
      duration = Math.floor(metadata.format.duration || 0);
    } catch (err) {
      console.warn(`Не удалось получить длительность для ${file}`);
    }

    const newTrack = {
      id,
      title: id,
      artist: 'Неизвестный исполнитель',
      duration,
    };

    if (playlists.length === 0) {
      playlists.push({
        id: '1',
        name: 'Автоматический',
        createdAt: new Date().toISOString(),
        tracks: [],
      });
    }

    playlists[0].tracks.push(newTrack);
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(playlistsPath, JSON.stringify(playlists, null, 2), 'utf8');
    console.log('Обновлён playlists.json');
  } else {
    console.log('Плейлисты уже актуальны');
  }
}

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
  syncTracksWithFiles();
});
