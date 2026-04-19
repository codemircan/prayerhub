import React from 'react'
import PrayerCard from './PrayerCard'
import { isBefore, isAfter } from 'date-fns'
import { parseTimeToDate } from '@/utils/prayerUtils'

const PrayerList = ({ prayers, nextPrayer }) => {
  const now = new Date()

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {prayers.map((prayer) => {
        const prayerDate = parseTimeToDate(prayer.time, now)
        const isPast = isBefore(prayerDate, now) && !nextPrayer?.isTomorrow
        const isNext = prayer.key === nextPrayer?.key && !nextPrayer?.isTomorrow

        return (
          <PrayerCard
            key={prayer.key}
            nameKey={prayer.key}
            time={prayer.time}
            isNext={isNext}
            isPast={isPast}
          />
        )
      })}
    </div>
  )
}

export default PrayerList
