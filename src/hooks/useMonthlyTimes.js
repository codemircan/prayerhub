import { useQuery } from '@tanstack/react-query'
import { getMonthlyTimes } from '@/services/aladhanApi'
import useAppStore from '@/store/useAppStore'

export const useMonthlyTimes = (month, year) => {
  const { location, settings } = useAppStore()

  return useQuery({
    queryKey: ['monthlyTimes', location, settings.method, month, year],
    queryFn: () => {
      // Monthly API prefers lat/lng, or we could use another endpoint for city
      // For simplicity, we'll assume we have lat/lng if we have a location
      return getMonthlyTimes(location.lat, location.lng, month, year, settings.method)
    },
    enabled: !!(location.lat && location.lng && month && year),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })
}
