import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'mosque-192.png', 'mosque-512.png'],
      manifest: {
        name: 'Prayer Times',
        short_name: 'PrayerTimes',
        description: 'Accurate Islamic prayer times worldwide',
        theme_color: '#1a5276',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          { src: 'mosque-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'mosque-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.aladhan\.com/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'aladhan-api-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  }
})
