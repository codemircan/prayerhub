# 📋 TASKS.md — Phase 1 MVP Atomic Task List

Work through these tasks **in order**. Complete each task fully before moving to the next.
Each task is small enough to implement and verify independently.

---

## BLOCK 1: Project Setup

- [ ] **T01** — Initialize Vite + React 18 project: `npm create vite@latest prayer-times -- --template react`
- [ ] **T02** — Install all dependencies listed in SPEC.md Tech Stack table
- [ ] **T03** — Configure TailwindCSS with `class` dark mode strategy in `tailwind.config.js`
- [ ] **T04** — Initialize shadcn/ui: `npx shadcn-ui@latest init` (use neutral color palette, CSS variables enabled)
- [ ] **T05** — Add shadcn components: `button`, `input`, `select`, `card`, `badge`, `separator`, `skeleton`
- [ ] **T06** — Set up ESLint + Prettier with React rules
- [ ] **T07** — Create the full file/folder structure from SPEC.md File Structure (empty files with comments)
- [ ] **T08** — Configure `vite-plugin-pwa` in `vite.config.js` with manifest (name, icons, theme_color: #1a5276)
- [ ] **T09** — Add global CSS resets + TailwindCSS base in `index.css`

---

## BLOCK 2: i18n Setup

- [ ] **T10** — Create `src/i18n/index.js` — configure i18next with `react-i18next`, `LanguageDetector`, localStorage backend
- [ ] **T11** — Create `src/i18n/locales/en.json` with all keys from SPEC.md i18n section
- [ ] **T12** — Create `src/i18n/locales/tr.json` with all keys translated to Turkish
- [ ] **T13** — Create `src/i18n/locales/ar.json` with all keys translated to Arabic
- [ ] **T14** — Add RTL logic in `App.jsx`: when language is `ar`, set `document.documentElement.dir = 'rtl'` and `document.documentElement.lang = 'ar'`; otherwise set `ltr`
- [ ] **T15** — Import `i18n/index.js` in `main.jsx` before App renders

---

## BLOCK 3: Zustand Store

- [ ] **T16** — Create `src/store/useAppStore.js` with full store shape from SPEC.md (location, settings, recentSearches)
- [ ] **T17** — Add `zustand/middleware` `persist` middleware — persist the entire store to `localStorage` key `prayer-times-app`
- [ ] **T18** — Add `updateSettings` action that merges partial settings
- [ ] **T19** — Add `addRecentSearch` action that prepends to array and keeps max 5 items (deduplicating by city name)

---

## BLOCK 4: API Service Layer

- [ ] **T20** — Create `src/services/aladhanApi.js` — export `getPrayerTimesByCoords(lat, lng, method, date)` using Axios
- [ ] **T21** — Add `getPrayerTimesByCity(city, country, method, date)` to `aladhanApi.js`
- [ ] **T22** — Add `getMonthlyTimes(lat, lng, month, year, method)` to `aladhanApi.js`
- [ ] **T23** — Add Axios instance with base URL `https://api.aladhan.com/v1` and 10s timeout
- [ ] **T24** — Add error normalization wrapper — all API errors should throw `{ message, status }` shape

---

## BLOCK 5: Utility Functions

- [ ] **T25** — Create `src/utils/prayerUtils.js`:
  - `getPrayersArray(timings)` → returns ordered array of `{ key, time }` objects (Fajr through Isha, excluding Imsak/Midnight)
  - `getNextPrayer(prayersArray)` → returns the next upcoming prayer object based on current time
  - `formatTime(timeStr, format)` → converts "HH:MM" to 12h or 24h based on settings
  - `parseTimeToDate(timeStr)` → returns today's Date object for a given "HH:MM" string
- [ ] **T26** — Create `src/utils/qiblaUtils.js`:
  - `calculateQibla(lat, lng)` → returns angle in degrees using formula from SPEC.md
  - `calculateDistance(lat, lng)` → returns distance in km to Kaaba using Haversine formula
- [ ] **T27** — Create `src/utils/csvExport.js`:
  - `exportMonthlyToCsv(monthData, monthName)` → generates and downloads a CSV file

---

## BLOCK 6: React Hooks

- [ ] **T28** — Create `src/hooks/useGeolocation.js` — wraps `navigator.geolocation.getCurrentPosition`, returns `{ lat, lng, error, loading }`
- [ ] **T29** — Create `src/hooks/usePrayerTimes.js` — React Query `useQuery` hook calling `getPrayerTimesByCoords` or `getPrayerTimesByCity` depending on location type in store; cache key includes `[lat, lng, method, date]`; staleTime: 1 hour
- [ ] **T30** — Create `src/hooks/useMonthlyTimes.js` — React Query `useQuery` for monthly data; cache key `[lat, lng, method, month, year]`; staleTime: 24 hours
- [ ] **T31** — Create `src/hooks/useCountdown.js` — accepts a target `Date` object, returns `{ hours, minutes, seconds }` string, updates every second via `setInterval`, cleans up on unmount

---

## BLOCK 7: Layout Components

- [ ] **T32** — Create `src/components/layout/Layout.jsx` — wraps children with `<Header />` on top, `<Footer />` at bottom, main content in between
- [ ] **T33** — Create `src/components/layout/Header.jsx`:
  - Left: app logo + name (use mosque emoji 🕌 + localized app name)
  - Right: language switcher (EN / TR / AR buttons), theme toggle (sun/moon icon)
  - Responsive: hamburger menu on mobile
- [ ] **T34** — Create `src/components/layout/Footer.jsx` — copyright, version `1.0.0`, links to About page

---

## BLOCK 8: Home Page Components

- [ ] **T35** — Create `src/components/home/LocationBanner.jsx` — shows city name, country, Gregorian date (localized), Hijri date
- [ ] **T36** — Create `src/components/home/NextPrayerHero.jsx`:
  - Large card with gradient background
  - Prayer name (in current language) + Arabic name
  - Live countdown using `useCountdown` hook
  - Pulsing dot animation to indicate "live"
- [ ] **T37** — Create `src/components/home/PrayerCard.jsx`:
  - Props: `{ nameKey, arabicName, time, isNext, isPast }`
  - Visual states: default, highlighted (next prayer), past (dimmed)
  - Shows formatted time based on settings
- [ ] **T38** — Create `src/components/home/PrayerList.jsx` — maps over 6 prayers, passes correct props to `PrayerCard`

---

## BLOCK 9: Pages

- [ ] **T39** — Create `src/pages/HomePage.jsx`:
  - On mount: check if location exists in store
  - If no location → trigger `useGeolocation`; if denied → navigate to `/search`
  - If location exists → fetch prayer times via `usePrayerTimes`
  - Show skeleton loading state while fetching
  - Render: `<LocationBanner>`, `<NextPrayerHero>`, `<PrayerList>`
  - Add Qibla direction teaser card at bottom (shows calculated degrees, links to qibla page)

- [ ] **T40** — Create `src/pages/SearchPage.jsx`:
  - Import static city list (JSON array, see SPEC)
  - Render `<CitySearch>` and `<RecentSearches>`
  - On city select: update Zustand store location, navigate to `/`

- [ ] **T41** — Create `src/pages/MonthlyPage.jsx`:
  - Fetch monthly data via `useMonthlyTimes`
  - Render `<MonthNav>` + `<MonthlyTable>`
  - Export CSV button

- [ ] **T42** — Create `src/pages/SettingsPage.jsx` — render `<SettingsForm>` with all controls

- [ ] **T43** — Create `src/pages/AboutPage.jsx` — static info page: app description, API credit (Aladhan), version, GitHub link placeholder

---

## BLOCK 10: Search Components

- [ ] **T44** — Create `src/data/cities.json` — static array of at minimum 50 world cities, each: `{ city, country, lat, lng }`
- [ ] **T45** — Create `src/components/search/CitySearch.jsx`:
  - Controlled input with 300ms debounce
  - Filters `cities.json` by city/country name match
  - Dropdown list with max 6 results
  - Keyboard navigation (up/down arrows, Enter to select, Escape to close)
- [ ] **T46** — Create `src/components/search/RecentSearches.jsx` — reads from Zustand store, renders clickable chips

---

## BLOCK 11: Monthly Components

- [ ] **T47** — Create `src/components/monthly/MonthNav.jsx` — previous/next month buttons, current month/year label
- [ ] **T48** — Create `src/components/monthly/MonthlyTable.jsx`:
  - Responsive table (horizontal scroll on mobile)
  - Row per day, columns for all 6 prayers
  - Today's row: highlighted with accent color
  - Weekend rows: subtle background difference

---

## BLOCK 12: Qibla Component

- [ ] **T49** — Create `src/components/qibla/QiblaCompass.jsx`:
  - SVG-based circular compass
  - North marker at top
  - Needle/arrow rotated by CSS `transform: rotate(Xdeg)` using calculated Qibla angle
  - Shows degree number + distance in km below compass
  - Kaaba icon (🕋) at the pointed direction

---

## BLOCK 13: Settings Component

- [ ] **T50** — Create `src/components/settings/SettingsForm.jsx`:
  - Language: 3 buttons (EN / TR / AR) — clicking updates store + i18n language + document dir
  - Calculation Method: shadcn `Select` dropdown
  - Time Format: shadcn `Switch` toggle
  - Theme: shadcn `Switch` toggle — updates `dark` class on `<html>`

---

## BLOCK 14: Routing & App Shell

- [ ] **T51** — Create `src/App.jsx`:
  - Wrap with `<QueryClientProvider>` (React Query)
  - Wrap with `<BrowserRouter>`
  - Apply dark class to `document.documentElement` based on theme setting
  - Apply dir/lang attributes based on language setting
  - Define all 5 routes wrapped in `<Layout>`
- [ ] **T52** — Create `src/main.jsx` — render App, import i18n, set up React Query `QueryClient` with `defaultOptions: { queries: { staleTime: 60000, retry: 2 } }`

---

## BLOCK 15: Location Permission Screen

- [ ] **T53** — Create `src/components/LocationPermission.jsx` — full-screen overlay shown on first visit with mosque illustration (emoji-based), "Allow Location" button, "Search City Instead" link

---

## BLOCK 16: Polish & Edge Cases

- [ ] **T54** — Add skeleton loading components for `PrayerList` (6 skeleton cards) and `MonthlyTable`
- [ ] **T55** — Add error boundary component — catches API errors, shows retry button
- [ ] **T56** — Add offline detection: listen to `window.addEventListener('offline')` and show banner "Showing cached prayer times"
- [ ] **T57** — Ensure all text is translated (no hardcoded English strings outside locale files)
- [ ] **T58** — Test RTL layout with Arabic: Header, PrayerCards, SearchInput all mirror correctly
- [ ] **T59** — Ensure 12h/24h time format applies everywhere time is displayed
- [ ] **T60** — Add `<title>` tag update per page using `document.title` (localized)

---

## BLOCK 17: Final

- [ ] **T61** — Write `README.md`:
  - Project description
  - Stack list
  - `npm install` + `npm run dev` instructions
  - Feature list
  - API credit
  - Screenshot placeholder
- [ ] **T62** — Run `npm run build` — ensure zero build errors
- [ ] **T63** — Verify PWA: Lighthouse PWA score > 90 in Chrome DevTools
