const express = require('express');
const fs = require('fs')
const pool = require('../db');
const router = express.Router();
const path = require('path');

const MUSIC_DIR = path.join(__dirname, '../music');

// Получить список плейлистов с треками
router.get('/', async (req, res) => {
  const { rows: playlists } = await pool.query('SELECT * FROM playlists ORDER BY title');

  const result = [];
  for (const p of playlists) {
    const { rows: tracks } = await pool.query(`
      SELECT t.*, pt.position FROM playlist_tracks pt
      JOIN tracks t ON t.id = pt.track_id
      WHERE pt.playlist_id = $1
      ORDER BY pt.position
    `, [p.id]);

    result.push({ ...p, tracks });
  }

  res.json(result);
});

// Создать новый плейлист
router.post('/', async (req, res) => {
  const { title } = req.body;
  try {
    const { rows: [playlist] } = await pool.query(
      `INSERT INTO playlists (id, title)
       VALUES (gen_random_uuid(), $1)
       RETURNING *`,
      [title]
    );
    res.status(201).json(playlist);
  } catch (error) {
    console.error('Ошибка при создании плейлиста:', error);
    res.status(500).json({ error: 'Не удалось создать плейлист' });
  }
});


// Получить список файл трека по id
router.get('/track/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query(
      'SELECT file_path FROM tracks WHERE id = $1',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Трек не найден' });
    }

    const relativePath = rows[0].file_path;
    const absolutePath = path.join(MUSIC_DIR, relativePath);    

    // Проверка, существует ли файл
    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ error: 'Файл не найден на сервере' });
    }

    res.sendFile(absolutePath);
  } catch (error) {
    console.error('Ошибка при получении трека:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Обновить порядок треков в плейлисте
router.put('/:id/tracks', async (req, res) => {
  const { id: playlistId } = req.params;
  const { trackOrder } = req.body;

  if (!Array.isArray(trackOrder)) {
    return res.status(400).json({ error: 'Неверный формат данных: ожидается массив trackOrder' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Упорядочиваем треки по ID перед обновлением
    const orderedTrackIds = [...trackOrder].sort();
    
    // Сначала блокируем все нужные строки в определенном порядке
    await client.query(
      `SELECT pt.track_id 
       FROM playlist_tracks pt
       WHERE pt.playlist_id = $1 AND pt.track_id = ANY($2::uuid[])
       ORDER BY pt.track_id
       FOR UPDATE`,
      [playlistId, orderedTrackIds]
    );

    // Получаем текущие позиции
    const { rows: currentTracks } = await client.query(
      'SELECT track_id, position FROM playlist_tracks WHERE playlist_id = $1',
      [playlistId]
    );

    const currentPositions = new Map();
    currentTracks.forEach(track => {
      currentPositions.set(track.track_id, track.position);
    });

    // Обновляем позиции
    for (let newPosition = 0; newPosition < trackOrder.length; newPosition++) {
      const trackId = trackOrder[newPosition];
      const currentPosition = currentPositions.get(trackId);

      if (currentPosition !== newPosition) {
        await client.query(
          'UPDATE playlist_tracks SET position = $1 WHERE playlist_id = $2 AND track_id = $3',
          [newPosition, playlistId, trackId]
        );
      }
    }

    await client.query('COMMIT');
    res.json({ message: 'Порядок треков успешно обновлён' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Ошибка при обновлении порядка треков:', error);
    res.status(400).json({ 
      error: error.message || 'Ошибка сервера при обновлении порядка треков' 
    });
  } finally {
    client.release();
  }
});

module.exports = router;
