import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/ToDoList-React-TS/', 
  plugins: [react()],
   server: {
    open: true, // 🔥 Эта строка откроет браузер автоматически
  },
})
