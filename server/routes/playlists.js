const express = require('express');
const pool = require('../db');
const router = express.Router();

// Получить все плейлисты с треками
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

// Обновить порядок треков в плейлисте
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, trackOrder } = req.body;

  // Обновление названия
  await pool.query('UPDATE playlists SET title = $1 WHERE id = $2', [name, id]);

  // Обновление треков (удалить старые и вставить заново)
  await pool.query('DELETE FROM playlist_tracks WHERE playlist_id = $1', [id]);

  for (let i = 0; i < trackOrder.length; i++) {
    await pool.query(`
      INSERT INTO playlist_tracks (playlist_id, track_id, position)
      VALUES ($1, $2, $3)
    `, [id, trackOrder[i], i]);
  }

  res.json({ message: 'Плейлист обновлён' });
});

module.exports = router;
