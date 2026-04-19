import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set) => ({
      // Location
      location: {
        lat: null,
        lng: null,
        city: null,
        country: null,
        timezone: null,
        type: null, // 'coords' or 'city'
      },
      setLocation: (location) => set({ location }),

      // Settings
      settings: {
        language: 'en', // 'en' | 'tr' | 'ar'
        method: 13, // Aladhan method ID (Diyanet default)
        timeFormat: '24h', // '12h' | '24h'
        theme: 'system', // 'light' | 'dark' | 'system'
      },
      updateSettings: (partial) =>
        set((state) => ({
          settings: { ...state.settings, ...partial },
        })),

      // Recent searches
      recentSearches: [], // [{ city, country, lat, lng }]
      addRecentSearch: (item) =>
        set((state) => {
          const filtered = state.recentSearches.filter(
            (s) => s.city.toLowerCase() !== item.city.toLowerCase()
          )
          return {
            recentSearches: [item, ...filtered].slice(0, 5),
          }
        }),
    }),
    {
      name: 'prayer-times-app',
    }
  )
)

export default useAppStore
