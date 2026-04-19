import { useQuery } from '@tanstack/react-query'
import { getPrayerTimesByCoords, getPrayerTimesByCity } from '@/services/aladhanApi'
import useAppStore from '@/store/useAppStore'

export const usePrayerTimes = (date = null) => {
  const { location, settings } = useAppStore()

  return useQuery({
    queryKey: ['prayerTimes', location, settings.method, date],
    queryFn: () => {
      if (location.type === 'city') {
        return getPrayerTimesByCity(location.city, location.country, settings.method, date)
      } else if (location.lat && location.lng) {
        return getPrayerTimesByCoords(location.lat, location.lng, settings.method, date)
      }
      return null
    },
    enabled: !!((location.lat && location.lng) || (location.type === 'city' && location.city)),
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}
