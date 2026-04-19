# 🕌 Global Prayer Times App — Full Specification (Phase 1 MVP)

## Project Overview

Build a modern, production-ready **Global Islamic Prayer Times** web application using React 18 + Vite + TailwindCSS. The app detects or accepts the user's location, fetches accurate daily prayer times from the Aladhan API, and displays them in a clean, responsive UI. It supports three languages (English, Turkish, Arabic with RTL layout) and works as a PWA (Progressive Web App) for mobile use.

---

## Tech Stack

| Layer | Library / Tool | Version |
|---|---|---|
| Framework | React | 18.x |
| Build tool | Vite | 5.x |
| Styling | TailwindCSS | 3.x |
| UI Components | shadcn/ui | latest |
| Routing | React Router DOM | 6.x |
| State management | Zustand | 4.x |
| Server state / caching | TanStack React Query | 5.x |
| Internationalization | i18next + react-i18next | latest |
| HTTP client | Axios | 1.x |
| Icons | Lucide React | latest |
| Date utilities | date-fns + date-fns-tz | latest |
| PWA | vite-plugin-pwa | latest |
| Linting | ESLint + Prettier | latest |

---

## External API

**Primary:** [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api) — Free, no API key required.

### Endpoints Used

#### 1. Prayer times by coordinates
```
GET https://api.aladhan.com/v1/timings/:date
Query params:
  - latitude: number
  - longitude: number
  - method: number (calculation method, default: 13 = Diyanet)
  - date: DD-MM-YYYY (optional, defaults to today)
```

#### 2. Prayer times by city name
```
GET https://api.aladhan.com/v1/timingsByCity/:date
Query params:
  - city: string
  - country: string
  - method: number
```

#### 3. Hijri calendar date
```
GET https://api.aladhan.com/v1/gToH/:date
Path param: date = DD-MM-YYYY
```

### Response Shape (timings)
```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "timings": {
      "Fajr": "05:12",
      "Sunrise": "06:45",
      "Dhuhr": "12:30",
      "Asr": "15:45",
      "Maghrib": "18:15",
      "Isha": "19:45",
      "Imsak": "05:02",
      "Midnight": "00:30"
    },
    "date": {
      "readable": "01 Jan 2025",
      "timestamp": "1735689600",
      "hijri": {
        "date": "01-07-1446",
        "month": { "en": "Rajab", "ar": "رَجَب" },
        "year": "1446"
      },
      "gregorian": {
        "date": "01-01-2025",
        "month": { "en": "January" },
        "year": "2025"
      }
    },
    "meta": {
      "latitude": 41.0,
      "longitude": 28.9,
      "timezone": "Europe/Istanbul",
      "method": { "id": 13, "name": "Diyanet İşleri Başkanlığı, Turkey" }
    }
  }
}
```

---

## Calculation Methods

Support the following methods selectable by user:

| ID | Name |
|---|---|
| 1 | University of Islamic Sciences, Karachi |
| 2 | Islamic Society of North America (ISNA) |
| 3 | Muslim World League |
| 4 | Umm Al-Qura University, Makkah |
| 5 | Egyptian General Authority of Survey |
| 13 | Diyanet İşleri Başkanlığı, Turkey (**default**) |
| 15 | Spiritual Administration of Muslims of Russia |

---

## Supported Languages

| Code | Language | Direction |
|---|---|---|
| `en` | English | LTR |
| `tr` | Turkish | LTR |
| `ar` | Arabic | RTL |

- RTL layout must be applied globally when Arabic is selected via `dir="rtl"` on `<html>` element
- Language preference persisted in `localStorage`
- Default: detect browser language, fallback to `en`

---

## Application Pages & Routes

```
/              → Home (today's prayer times for user location)
/search        → City search page
/monthly       → Monthly calendar view
/settings      → Settings page
/about         → About page
```

---

## Feature Specifications

### FEATURE 1: Location Detection

**Behavior:**
1. On first load, show a welcome screen asking permission to use location
2. If user grants permission → use `navigator.geolocation.getCurrentPosition()` to get lat/lng
3. If user denies → redirect to `/search` city search page
4. Location stored in Zustand store + persisted to `localStorage`
5. User can manually override location anytime via search

**Acceptance criteria:**
- [ ] GPS location works and fetches prayer times correctly
- [ ] Denied permission gracefully redirects to search
- [ ] Location is remembered on next visit (no re-prompt)
- [ ] Loading state shown during geolocation fetch

---

### FEATURE 2: Daily Prayer Times Display (Home Page)

**Layout:**
- Top section: Current location name, Gregorian + Hijri date
- Hero card: Next upcoming prayer name + countdown timer (HH:MM:SS live update)
- Prayer list: 6 prayer cards (Fajr/İmsak, Sunrise, Dhuhr, Asr, Maghrib, Isha)
- Each prayer card shows: Arabic name, localized name, time, and a subtle indicator if it's the current/next prayer

**Prayer name mapping (all 3 languages):**

| Key | English | Turkish | Arabic |
|---|---|---|---|
| Fajr | Dawn (Fajr) | Sabah (İmsak) | الفجر |
| Sunrise | Sunrise | Güneş | الشروق |
| Dhuhr | Noon (Dhuhr) | Öğle | الظهر |
| Asr | Afternoon (Asr) | İkindi | العصر |
| Maghrib | Sunset (Maghrib) | Akşam | المغرب |
| Isha | Night (Isha) | Yatsı | العشاء |

**Countdown logic:**
- Calculate which prayer time is the next upcoming one based on current local time
- Show live countdown (updates every second via `setInterval`)
- After last prayer (Isha) → countdown to next day's Fajr
- Highlight the active "next prayer" card visually

**Acceptance criteria:**
- [ ] All 6 prayer times displayed correctly
- [ ] Correct prayer highlighted as "next"
- [ ] Countdown timer is accurate and live
- [ ] Hijri date displayed correctly
- [ ] Date updates at midnight without page refresh

---

### FEATURE 3: City Search

**Behavior:**
- Input field with debounced search (300ms)
- Use a static JSON list of major world cities (capital cities + major Islamic cities) for autocomplete suggestions
- On city select → fetch prayer times for that city using `timingsByCity` endpoint
- Recent searches stored in `localStorage` (max 5)

**Static city list must include at minimum:**
Istanbul, Ankara, Izmir, Mecca, Medina, Cairo, Istanbul, Dubai, Riyadh, Tehran, Karachi, Dhaka, Jakarta, Kuala Lumpur, London, Berlin, Paris, New York, Toronto, Sydney, Moscow, Lagos, Nairobi

**Acceptance criteria:**
- [ ] Search input with autocomplete dropdown
- [ ] Selecting a city updates prayer times on home page
- [ ] Recent searches shown below input
- [ ] Loading state during API fetch

---

### FEATURE 4: Monthly Calendar View (`/monthly`)

**Behavior:**
- Display current month's prayer times in a table
- Columns: Date, Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha
- Today's row highlighted
- Navigate to previous/next month with arrow buttons
- Fetch entire month's data using Aladhan API (loop through days or use monthly endpoint if available)
- Export to CSV button (download)

**Aladhan monthly endpoint:**
```
GET https://api.aladhan.com/v1/calendar/:year/:month
Query: latitude, longitude, method
```

**Acceptance criteria:**
- [ ] Full month table renders correctly
- [ ] Today highlighted
- [ ] Month navigation works
- [ ] CSV export downloads properly

---

### FEATURE 5: Qibla Direction

**Behavior:**
- Show a simple compass-style circular UI
- Calculate Qibla angle from user's current coordinates toward Kaaba (21.4225° N, 39.8262° E) using the great-circle formula
- Display the angle in degrees + a rotating needle graphic
- No device rotation sensor required for MVP — just show the static calculated degree

**Formula:**
```javascript
function calculateQibla(lat, lng) {
  const kaabaLat = 21.4225 * (Math.PI / 180);
  const kaabaLng = 39.8262 * (Math.PI / 180);
  const userLat = lat * (Math.PI / 180);
  const deltaLng = kaabaLng - (lng * (Math.PI / 180));
  const y = Math.sin(deltaLng) * Math.cos(kaabaLat);
  const x = Math.cos(userLat) * Math.sin(kaabaLat) -
            Math.sin(userLat) * Math.cos(kaabaLat) * Math.cos(deltaLng);
  const angle = (Math.atan2(y, x) * (180 / Math.PI) + 360) % 360;
  return angle;
}
```

**Acceptance criteria:**
- [ ] Correct Qibla angle calculated and displayed
- [ ] Compass needle points to calculated direction
- [ ] Shows distance to Kaaba in km

---

### FEATURE 6: Settings Page (`/settings`)

**Options to expose:**

| Setting | Type | Options |
|---|---|---|
| Language | Select | English / Türkçe / العربية |
| Calculation Method | Select | See method list above |
| Time Format | Toggle | 12h / 24h |
| Theme | Toggle | Light / Dark |

**Persistence:** All settings saved to `localStorage` and applied globally via Zustand.

**Acceptance criteria:**
- [ ] All settings persist across page refreshes
- [ ] Language change updates entire UI including RTL for Arabic
- [ ] Calculation method change re-fetches prayer times
- [ ] Time format applies throughout the app

---

### FEATURE 7: Dark / Light Theme

- Default: detect system preference via `prefers-color-scheme`
- Togglable in settings
- Implement using TailwindCSS `dark:` variant with `class` strategy
- Add `dark` class to `<html>` element when dark mode active

---

### FEATURE 8: PWA Support

Configure `vite-plugin-pwa` with:
- App name: "Prayer Times" / "Namaz Vakitleri" / "أوقات الصلاة"
- Icons: 192x192 and 512x512 (provide placeholder SVG-based icons)
- `networkFirst` caching strategy for API calls
- `cacheFirst` for static assets
- Offline fallback: show last cached prayer times with an "offline" badge

---

## Component Map

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx          # Logo, language switcher, theme toggle
│   │   ├── Footer.jsx          # Links, version
│   │   └── Layout.jsx          # Wrapper with Header + Footer
│   ├── home/
│   │   ├── LocationBanner.jsx  # City name + dates
│   │   ├── NextPrayerHero.jsx  # Big countdown card
│   │   ├── PrayerCard.jsx      # Single prayer time card
│   │   └── PrayerList.jsx      # Maps over all 6 prayers
│   ├── search/
│   │   ├── CitySearch.jsx      # Search input + autocomplete
│   │   └── RecentSearches.jsx  # Last 5 cities
│   ├── monthly/
│   │   ├── MonthlyTable.jsx    # Full month grid
│   │   └── MonthNav.jsx        # Prev/next month navigation
│   ├── qibla/
│   │   └── QiblaCompass.jsx    # Compass UI
│   ├── settings/
│   │   └── SettingsForm.jsx    # All settings controls
│   └── ui/                     # shadcn/ui auto-generated components
├── pages/
│   ├── HomePage.jsx
│   ├── SearchPage.jsx
│   ├── MonthlyPage.jsx
│   ├── SettingsPage.jsx
│   └── AboutPage.jsx
├── store/
│   └── useAppStore.js          # Zustand store (location, settings, theme)
├── hooks/
│   ├── usePrayerTimes.js       # React Query hook for daily times
│   ├── useMonthlyTimes.js      # React Query hook for monthly times
│   ├── useGeolocation.js       # GPS location hook
│   └── useCountdown.js         # Live countdown timer hook
├── services/
│   └── aladhanApi.js           # All Aladhan API calls via Axios
├── utils/
│   ├── prayerUtils.js          # Next prayer detection, time parsing
│   ├── qiblaUtils.js           # Qibla calculation formula
│   └── csvExport.js            # Monthly CSV export helper
├── i18n/
│   ├── index.js                # i18next config
│   └── locales/
│       ├── en.json
│       ├── tr.json
│       └── ar.json
├── App.jsx
└── main.jsx
```

---

## i18n Keys Structure

All three locale files (`en.json`, `tr.json`, `ar.json`) must contain these keys:

```json
{
  "app": {
    "name": "Prayer Times",
    "tagline": "Accurate prayer times for everywhere"
  },
  "nav": {
    "home": "Home",
    "search": "Search",
    "monthly": "Monthly",
    "settings": "Settings",
    "about": "About"
  },
  "prayers": {
    "fajr": "Dawn",
    "sunrise": "Sunrise",
    "dhuhr": "Noon",
    "asr": "Afternoon",
    "maghrib": "Sunset",
    "isha": "Night",
    "imsak": "Imsak"
  },
  "home": {
    "nextPrayer": "Next Prayer",
    "timeRemaining": "Time Remaining",
    "hijriDate": "Hijri Date",
    "location": "Location"
  },
  "search": {
    "placeholder": "Search for a city...",
    "recentSearches": "Recent Searches",
    "noResults": "No cities found"
  },
  "monthly": {
    "title": "Monthly Prayer Times",
    "exportCsv": "Export CSV",
    "date": "Date"
  },
  "qibla": {
    "title": "Qibla Direction",
    "degrees": "degrees from North",
    "distance": "km to Kaaba"
  },
  "settings": {
    "title": "Settings",
    "language": "Language",
    "method": "Calculation Method",
    "timeFormat": "Time Format",
    "theme": "Theme",
    "dark": "Dark",
    "light": "Light",
    "12h": "12 Hour",
    "24h": "24 Hour"
  },
  "common": {
    "loading": "Loading...",
    "error": "Something went wrong",
    "retry": "Try Again",
    "offline": "You are offline — showing cached data"
  },
  "location": {
    "permissionTitle": "Allow Location Access",
    "permissionDesc": "We need your location to show accurate prayer times",
    "allowButton": "Allow Location",
    "searchInstead": "Search for a city instead",
    "detecting": "Detecting your location..."
  }
}
```

---

## Zustand Store Shape

```javascript
// store/useAppStore.js
{
  // Location
  location: {
    lat: null,
    lng: null,
    city: null,
    country: null,
    timezone: null,
  },
  setLocation: (location) => {},

  // Settings
  settings: {
    language: 'en',         // 'en' | 'tr' | 'ar'
    method: 13,             // Aladhan method ID
    timeFormat: '24h',      // '12h' | '24h'
    theme: 'system',        // 'light' | 'dark' | 'system'
  },
  updateSettings: (partial) => {},

  // Recent searches
  recentSearches: [],       // [{ city, country, lat, lng }]
  addRecentSearch: (item) => {},
}
```

---

## DO NOT Instructions for Jules

> **Important:** Do NOT do any of the following unless explicitly asked:

- ❌ Do NOT add user authentication or accounts
- ❌ Do NOT add a backend server — this is a pure frontend app
- ❌ Do NOT add payment or subscription logic
- ❌ Do NOT use Redux — use Zustand only
- ❌ Do NOT install or use `moment.js` — use `date-fns` only
- ❌ Do NOT create `.env` files with placeholder API keys — the Aladhan API requires no key
- ❌ Do NOT add test files in Phase 1
- ❌ Do NOT use inline styles — TailwindCSS classes only
- ❌ Do NOT create separate CSS files unless for global resets
- ❌ Do NOT add social media login, Google Maps, or payment integrations
- ❌ Do NOT use `class` components — functional components with hooks only

---

## Deliverables Checklist

- [ ] Vite + React project initialized with all dependencies installed
- [ ] TailwindCSS configured with dark mode (`class` strategy)
- [ ] shadcn/ui initialized and base components available
- [ ] i18next configured with EN / TR / AR locales
- [ ] Zustand store with localStorage persistence (via `zustand/middleware` persist)
- [ ] All 8 features implemented per acceptance criteria above
- [ ] React Router with all 5 routes
- [ ] Aladhan API service layer complete
- [ ] PWA manifest and service worker configured
- [ ] Responsive layout (mobile-first, works on 320px–1440px)
- [ ] README.md with setup instructions and `npm run dev` command
