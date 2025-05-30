# Stage 1: сборка приложения
FROM node:18-alpine AS build

WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код
COPY . .

# Сборка фронтенда (замени на свою команду, если нужно)
RUN npm run build

# Stage 2: запуск через nginx
FROM nginx:alpine

# Копируем собранную статику из предыдущего этапа в папку nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем кастомный конфиг nginx (опционально, если нужен SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# expose 80 порт
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
