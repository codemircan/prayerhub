import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useAppStore from '@/store/useAppStore'
import CitySearch from '@/components/search/CitySearch'
import RecentSearches from '@/components/search/RecentSearches'
import { Button } from '@/components/ui/button'
import { MapPin, Navigation } from 'lucide-react'
import { useGeolocation } from '@/hooks/useGeolocation'

const SearchPage = () => {
  const { t } = useTranslation()
  const { setLocation, addRecentSearch } = useAppStore()
  const navigate = useNavigate()
  const { getPosition, coords, loading, error } = useGeolocation()

  useEffect(() => {
    document.title = `${t('nav.search')} | ${t('app.name')}`
  }, [t])

  useEffect(() => {
    if (coords) {
      setLocation({
        lat: coords.lat,
        lng: coords.lng,
        city: 'Your Location', // Will be updated by API or timezone
        country: '',
        type: 'coords'
      })
      navigate('/')
    }
  }, [coords, navigate, setLocation])

  const handleSelect = (city) => {
    setLocation({
      ...city,
      type: 'city'
    })
    addRecentSearch(city)
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-md space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{t('nav.search')}</h1>
        <p className="mt-2 text-muted-foreground">{t('app.tagline')}</p>
      </div>

      <div className="space-y-4">
        <CitySearch onSelect={handleSelect} />

        <Button
          variant="outline"
          className="w-full flex items-center justify-center space-x-2 h-12"
          onClick={getPosition}
          disabled={loading}
        >
          <Navigation className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? t('location.detecting') : t('location.allowButton')}</span>
        </Button>
        {error && <p className="text-center text-xs text-destructive">{error}</p>}
      </div>

      <RecentSearches onSelect={handleSelect} />
    </div>
  )
}

export default SearchPage
