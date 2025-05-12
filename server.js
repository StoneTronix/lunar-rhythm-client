const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

// Настроим сервер для отдачи статики
app.use(express.static(path.join(__dirname, 'public')));

// Указываем путь для музыки
app.use('/music', express.static(path.join(__dirname, 'public/music')));

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
