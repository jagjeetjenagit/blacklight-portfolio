import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The videos folder is served as the static root, so
// /hero/vfx_ad_1.mp4 -> ./videos/hero/vfx_ad_1.mp4
export default defineConfig({
  plugins: [react()],
  base: './',
  publicDir: 'videos',
})
