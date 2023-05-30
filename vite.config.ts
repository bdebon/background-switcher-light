import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  server: {
    cors: {
      origin: '*',
    },
    open: true,
  }
})
