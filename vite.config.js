import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'movie-search-app' with your exact GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/movie-search-app/',
})