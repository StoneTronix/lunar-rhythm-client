const express = require('express');
const cors = require('cors');
const path = require('path');
const playlistsRouter = require('./routes/playlists');
const syncTracksWithFiles = require('./music/autoSync');

const app = express();
const PORT = process.env.PORT || 4000;
const musicDir = path.join(__dirname, 'music');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/music', express.static(musicDir));  // Отдача музыки
app.use('/playlists', playlistsRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
  syncTracksWithFiles(); // импортировано из music/autoSync.js
});
