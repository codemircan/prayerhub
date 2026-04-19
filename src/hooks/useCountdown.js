import { useState, useEffect } from 'react'
import { differenceInSeconds, addDays } from 'date-fns'
import { parseTimeToDate } from '@/utils/prayerUtils'

export const useCountdown = (targetTimeStr, isTomorrow = false) => {
  const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' })

  useEffect(() => {
    if (!targetTimeStr) return

    const timer = setInterval(() => {
      const now = new Date()
      let targetDate = parseTimeToDate(targetTimeStr, now)

      if (isTomorrow) {
        targetDate = addDays(targetDate, 1)
      }

      const diff = differenceInSeconds(targetDate, now)

      if (diff <= 0) {
        setTimeLeft({ hours: '00', minutes: '00', seconds: '00' })
        // Optionally trigger a refresh or next prayer update here
      } else {
        const h = Math.floor(diff / 3600)
        const m = Math.floor((diff % 3600) / 60)
        const s = diff % 60
        setTimeLeft({
          hours: h.toString().padStart(2, '0'),
          minutes: m.toString().padStart(2, '0'),
          seconds: s.toString().padStart(2, '0'),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetTimeStr, isTomorrow])

  return timeLeft
}
