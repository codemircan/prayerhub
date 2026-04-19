import { format, parse, isAfter, addDays } from 'date-fns'

export const getPrayersArray = (timings) => {
  if (!timings) return []
  const keys = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
  return keys.map((key) => ({
    key,
    time: timings[key],
  }))
}

export const parseTimeToDate = (timeStr, baseDate = new Date()) => {
  return parse(timeStr, 'HH:mm', baseDate)
}

export const getNextPrayer = (prayersArray) => {
  const now = new Date()

  // Find first prayer that is after now
  let next = prayersArray.find((p) => {
    const prayerDate = parseTimeToDate(p.time, now)
    return isAfter(prayerDate, now)
  })

  // If no prayer left today, next is tomorrow's Fajr
  if (!next) {
    next = { ...prayersArray[0], isTomorrow: true }
  }

  return next
}

export const formatTime = (timeStr, timeFormat = '24h') => {
  if (!timeStr) return ''
  const date = parse(timeStr, 'HH:mm', new Date())
  return format(date, timeFormat === '12h' ? 'hh:mm a' : 'HH:mm')
}
