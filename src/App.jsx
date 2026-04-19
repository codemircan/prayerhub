import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useAppStore from '@/store/useAppStore'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import SearchPage from '@/pages/SearchPage'
import MonthlyPage from '@/pages/MonthlyPage'
import SettingsPage from '@/pages/SettingsPage'
import AboutPage from '@/pages/AboutPage'
import LocationPermission from '@/components/LocationPermission'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useGeolocation } from '@/hooks/useGeolocation'
import { WifiOff } from 'lucide-react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: 2,
    },
  },
})

function AppRoutes() {
  const { location, setLocation, settings } = useAppStore()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { getPosition, coords, loading } = useGeolocation()
  const [showPermission, setShowPermission] = useState(false)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // 1. Theme, Lang, Dir logic
  useEffect(() => {
    // Theme
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (settings.theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(settings.theme)
    }

    // Lang & Dir
    const lang = i18n.language || 'en'
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    root.dir = dir
    root.lang = lang
  }, [settings.theme, i18n.language])

  // 2. Initial Location check
  useEffect(() => {
    if (!location.lat && !location.city) {
      setShowPermission(true)
    }
  }, [location])

  // 3. Geolocation effect
  useEffect(() => {
    if (coords) {
      setLocation({
        lat: coords.lat,
        lng: coords.lng,
        city: 'Your Location',
        country: '',
        type: 'coords'
      })
      setShowPermission(false)
    }
  }, [coords, setLocation])

  const handleAllowLocation = () => {
    getPosition()
  }

  const handleSearchInstead = () => {
    setShowPermission(false)
    navigate('/search')
  }

  return (
    <ErrorBoundary>
      {showPermission && (
        <LocationPermission onAllow={handleAllowLocation} onSearch={handleSearchInstead} />
      )}
      {isOffline && (
        <div className="bg-destructive text-destructive-foreground px-4 py-2 text-center text-sm font-medium flex items-center justify-center space-x-2">
          <WifiOff className="h-4 w-4" />
          <span>{t('common.offline')}</span>
        </div>
      )}
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/monthly" element={<MonthlyPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
