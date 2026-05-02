import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Добавь этот импорт

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(), // Добавь плагин в список
    ],
    server: {
        port: 3000, // Устанавливаем порт 3000
        strictPort: true, // Если порт 3000 занят, Vite не будет пробовать 3001, а выдаст ошибку
        host: true, // Позволяет открывать сайт по IP в локальной сети
    },
})
