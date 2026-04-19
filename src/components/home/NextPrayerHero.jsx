import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { useCountdown } from '@/hooks/useCountdown'

const NextPrayerHero = ({ nextPrayer }) => {
  const { t } = useTranslation()
  const countdown = useCountdown(nextPrayer?.time, nextPrayer?.isTomorrow)

  if (!nextPrayer) return null

  return (
    <Card className="mb-8 overflow-hidden bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg border-none">
      <CardContent className="flex flex-col items-center p-8 text-center">
        <div className="mb-2 flex items-center space-x-2 rtl:space-x-reverse">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
          <span className="text-sm font-medium uppercase tracking-wider text-primary-100">
            {t('home.nextPrayer')}
          </span>
        </div>

        <h3 className="mb-1 text-4xl font-bold">
          {t(`prayers.${nextPrayer.key.toLowerCase()}`)}
        </h3>
        <p className="mb-6 text-xl font-arabic text-primary-100/80">
          {/* We'll add Arabic names to a map in utils or here */}
          {getArabicName(nextPrayer.key)}
        </p>

        <div className="mb-2 text-sm text-primary-100/80">
          {t('home.timeRemaining')}
        </div>
        <div className="flex space-x-4 text-5xl font-mono font-bold tracking-tighter rtl:space-x-reverse">
          <div className="flex flex-col">
            <span>{countdown.hours}</span>
            <span className="text-[10px] uppercase font-sans font-normal opacity-70">hrs</span>
          </div>
          <span>:</span>
          <div className="flex flex-col">
            <span>{countdown.minutes}</span>
            <span className="text-[10px] uppercase font-sans font-normal opacity-70">min</span>
          </div>
          <span>:</span>
          <div className="flex flex-col">
            <span>{countdown.seconds}</span>
            <span className="text-[10px] uppercase font-sans font-normal opacity-70">sec</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getArabicName(key) {
  const names = {
    Fajr: 'الفجر',
    Sunrise: 'الشروق',
    Dhuhr: 'الظهر',
    Asr: 'العصر',
    Maghrib: 'المغرب',
    Isha: 'العشاء'
  }
  return names[key] || ''
}

export default NextPrayerHero
