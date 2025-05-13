const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));  // Раздаём статику из папки public
app.use('/music', express.static(path.join(__dirname, 'public/music')));  // Музыка лежит в public/music — раздаём как /music
app.use(express.json());  // Позволяем серверу читать JSON и тело запроса

const playlistsPath = path.join(__dirname, 'public/playlists.json');  // Путь к файлу с плейлистами

// Получить все плейлисты
app.get('/api/playlists', (req, res) => {
  fs.readFile(playlistsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения playlists.json:', err);
      return res.status(500).json({ error: 'Не удалось загрузить плейлисты' });
    }
    res.json(JSON.parse(data));
  });
});

// Сохранить обновлённые плейлисты (при перетаскивании и т.п.)
app.post('/api/playlists', (req, res) => {
  const newPlaylists = req.body;

  fs.writeFile(playlistsPath, JSON.stringify(newPlaylists, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Ошибка записи playlists.json:', err);
      return res.status(500).json({ error: 'Не удалось сохранить плейлисты' });
    }
    res.json({ success: true });
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
