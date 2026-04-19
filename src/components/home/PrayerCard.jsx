import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { formatTime } from '@/utils/prayerUtils'
import useAppStore from '@/store/useAppStore'
import { cn } from '@/lib/utils'

const PrayerCard = ({ nameKey, time, isNext, isPast }) => {
  const { t } = useTranslation()
  const { settings } = useAppStore()

  return (
    <Card
      className={cn(
        "transition-all duration-300",
        isNext && "border-primary ring-2 ring-primary ring-offset-2 scale-[1.02] shadow-md",
        isPast && "opacity-60 bg-muted/50"
      )}
    >
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex flex-col">
          <span className="text-lg font-bold">
            {t(`prayers.${nameKey.toLowerCase()}`)}
          </span>
          <span className="text-xs text-muted-foreground font-arabic">
            {getArabicName(nameKey)}
          </span>
        </div>
        <div className="text-2xl font-semibold">
          {formatTime(time, settings.timeFormat)}
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
    Isha: 'العشاء',
    Imsak: 'إمساك'
  }
  return names[key] || ''
}

export default PrayerCard
