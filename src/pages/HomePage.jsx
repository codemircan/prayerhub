import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePrayerTimes } from '@/hooks/usePrayerTimes'
import { useGeolocation } from '@/hooks/useGeolocation'
import useAppStore from '@/store/useAppStore'
import LocationBanner from '@/components/home/LocationBanner'
import NextPrayerHero from '@/components/home/NextPrayerHero'
import PrayerList from '@/components/home/PrayerList'
import { getPrayersArray, getNextPrayer } from '@/utils/prayerUtils'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Compass, ArrowRight } from 'lucide-react'
import { calculateQibla } from '@/utils/qiblaUtils'

const HomePage = () => {
  const { t } = useTranslation()
  const { location, setLocation } = useAppStore()
  const navigate = useNavigate()
  const { data, isLoading, error } = usePrayerTimes()

  useEffect(() => {
    if (!location.lat && !location.city) {
      // Check if we should show the permission screen or just go to search
      // For MVP we'll redirect to search if no location
      navigate('/search')
    }

    if (data) {
        document.title = `${t('nav.home')} | ${t('app.name')}`
    }
  }, [location, navigate, data, t])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-64 w-full" />
        <div className="grid gap-4 sm:grid-cols-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="mb-4 text-red-500">{t('common.error')}</p>
        <p className="text-sm text-muted-foreground">{error.message}</p>
      </div>
    )
  }

  if (!data) return null

  const prayers = getPrayersArray(data.timings)
  const nextPrayer = getNextPrayer(prayers)
  const qiblaAngle = calculateQibla(location.lat, location.lng)

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <LocationBanner
        city={location.city || data.meta.timezone.split('/')[1].replace('_', ' ')}
        country={location.country}
        date={data.date.readable}
        hijriDate={`${data.date.hijri.day} ${data.date.hijri.month.en} ${data.date.hijri.year}`}
      />

      <NextPrayerHero nextPrayer={nextPrayer} />

      <PrayerList prayers={prayers} nextPrayer={nextPrayer} />

      {/* Qibla Teaser */}
      <Link to="/monthly" className="block mt-8">
        <Card className="hover:bg-accent transition-colors">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Compass className="h-5 w-5 text-primary" />
                    <span className="font-medium">{t('monthly.title')}</span>
                </div>
                <ArrowRight className="h-4 w-4" />
            </CardContent>
        </Card>
      </Link>
    </div>
  )
}

export default HomePage
