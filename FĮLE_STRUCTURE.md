# 📁 FILE_STRUCTURE.md — Complete Project File Tree

```
prayer-times/
├── public/
│   ├── favicon.ico
│   ├── mosque-192.png          # PWA icon 192x192
│   ├── mosque-512.png          # PWA icon 512x512
│   └── robots.txt
│
├── src/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx          # Main wrapper: Header + children + Footer
│   │   │   ├── Header.jsx          # Logo, language switcher, theme toggle
│   │   │   └── Footer.jsx          # Copyright, version, about link
│   │   │
│   │   ├── home/
│   │   │   ├── LocationBanner.jsx  # City + country + Gregorian + Hijri date
│   │   │   ├── NextPrayerHero.jsx  # Big countdown hero card
│   │   │   ├── PrayerCard.jsx      # Single prayer row card
│   │   │   └── PrayerList.jsx      # Renders 6x PrayerCard
│   │   │
│   │   ├── search/
│   │   │   ├── CitySearch.jsx      # Debounced search input + dropdown
│   │   │   └── RecentSearches.jsx  # Last 5 searched cities (chips)
│   │   │
│   │   ├── monthly/
│   │   │   ├── MonthNav.jsx        # Prev/next month navigation
│   │   │   └── MonthlyTable.jsx    # Full month prayer times table
│   │   │
│   │   ├── qibla/
│   │   │   └── QiblaCompass.jsx    # SVG compass with Qibla needle
│   │   │
│   │   ├── settings/
│   │   │   └── SettingsForm.jsx    # Language, method, format, theme controls
│   │   │
│   │   ├── ui/                     # shadcn/ui auto-generated (DO NOT EDIT MANUALLY)
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   ├── select.jsx
│   │   │   ├── badge.jsx
│   │   │   ├── separator.jsx
│   │   │   └── skeleton.jsx
│   │   │
│   │   ├── LocationPermission.jsx  # First-visit location permission screen
│   │   └── ErrorBoundary.jsx       # Catches render errors, shows retry UI
│   │
│   ├── pages/
│   │   ├── HomePage.jsx            # Route: /
│   │   ├── SearchPage.jsx          # Route: /search
│   │   ├── MonthlyPage.jsx         # Route: /monthly
│   │   ├── SettingsPage.jsx        # Route: /settings
│   │   └── AboutPage.jsx           # Route: /about
│   │
│   ├── store/
│   │   └── useAppStore.js          # Zustand store (persisted to localStorage)
│   │
│   ├── hooks/
│   │   ├── useGeolocation.js       # GPS location hook
│   │   ├── usePrayerTimes.js       # React Query: daily prayer times
│   │   ├── useMonthlyTimes.js      # React Query: monthly prayer times
│   │   └── useCountdown.js         # Live countdown timer hook
│   │
│   ├── services/
│   │   └── aladhanApi.js           # All Aladhan API calls (Axios)
│   │
│   ├── utils/
│   │   ├── prayerUtils.js          # Next prayer detection, time formatting
│   │   ├── qiblaUtils.js           # Qibla angle + distance calculation
│   │   └── csvExport.js            # Monthly CSV download helper
│   │
│   ├── data/
│   │   └── cities.json             # Static list of 50+ world cities
│   │
│   ├── i18n/
│   │   ├── index.js                # i18next initialization + config
│   │   └── locales/
│   │       ├── en.json             # English translations
│   │       ├── tr.json             # Turkish translations
│   │       └── ar.json             # Arabic translations
│   │
│   ├── App.jsx                     # Root component: providers + router
│   ├── main.jsx                    # Entry point
│   └── index.css                   # TailwindCSS directives + global resets
│
├── index.html                      # Vite HTML entry
├── vite.config.js                  # Vite + PWA plugin config
├── tailwind.config.js              # Tailwind + dark mode config
├── postcss.config.js               # PostCSS for Tailwind
├── components.json                 # shadcn/ui config
├── eslint.config.js                # ESLint rules
├── .prettierrc                     # Prettier config
├── .gitignore
├── package.json
└── README.md
```

---

## Key Config File Contents

### `vite.config.js`
```javascript
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
```

### `tailwind.config.js`
```javascript
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eef9ff',
          100: '#dcf2ff',
          500: '#1a7ab5',
          600: '#1a5276',
          700: '#154360',
          900: '#0d2b40',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
      }
    }
  },
  plugins: []
}
```

### `components.json` (shadcn/ui)
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

---

## cities.json Sample Structure

```json
[
  { "city": "Istanbul", "country": "Turkey", "lat": 41.0082, "lng": 28.9784 },
  { "city": "Ankara", "country": "Turkey", "lat": 39.9334, "lng": 32.8597 },
  { "city": "Mecca", "country": "Saudi Arabia", "lat": 21.3891, "lng": 39.8579 },
  { "city": "Medina", "country": "Saudi Arabia", "lat": 24.5247, "lng": 39.5692 },
  { "city": "Cairo", "country": "Egypt", "lat": 30.0444, "lng": 31.2357 },
  { "city": "Dubai", "country": "UAE", "lat": 25.2048, "lng": 55.2708 },
  { "city": "Riyadh", "country": "Saudi Arabia", "lat": 24.7136, "lng": 46.6753 },
  { "city": "Tehran", "country": "Iran", "lat": 35.6892, "lng": 51.3890 },
  { "city": "Karachi", "country": "Pakistan", "lat": 24.8607, "lng": 67.0011 },
  { "city": "Dhaka", "country": "Bangladesh", "lat": 23.8103, "lng": 90.4125 },
  { "city": "Jakarta", "country": "Indonesia", "lat": -6.2088, "lng": 106.8456 },
  { "city": "Kuala Lumpur", "country": "Malaysia", "lat": 3.1390, "lng": 101.6869 },
  { "city": "London", "country": "United Kingdom", "lat": 51.5074, "lng": -0.1278 },
  { "city": "Berlin", "country": "Germany", "lat": 52.5200, "lng": 13.4050 },
  { "city": "Paris", "country": "France", "lat": 48.8566, "lng": 2.3522 },
  { "city": "New York", "country": "USA", "lat": 40.7128, "lng": -74.0060 },
  { "city": "Toronto", "country": "Canada", "lat": 43.6532, "lng": -79.3832 },
  { "city": "Sydney", "country": "Australia", "lat": -33.8688, "lng": 151.2093 },
  { "city": "Moscow", "country": "Russia", "lat": 55.7558, "lng": 37.6173 },
  { "city": "Lagos", "country": "Nigeria", "lat": 6.5244, "lng": 3.3792 }
]
```
*(Add 30+ more cities to reach the 50 city minimum)*
