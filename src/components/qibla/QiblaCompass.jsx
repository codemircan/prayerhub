import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { Compass } from 'lucide-react'

const QiblaCompass = ({ angle, distance }) => {
  const { t } = useTranslation()

  return (
    <Card className="flex flex-col items-center p-8 text-center">
      <h3 className="mb-8 text-xl font-bold">{t('qibla.title')}</h3>

      <div className="relative mb-8 h-64 w-64">
        {/* Compass Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs font-bold text-red-500">N</div>

        {/* Needle */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-1000 ease-out"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div className="relative h-48 w-4">
            <div className="absolute top-0 left-1/2 h-24 w-0.5 -translate-x-1/2 bg-primary"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">🕋</div>
            <div className="absolute bottom-0 left-1/2 h-24 w-0.5 -translate-x-1/2 bg-muted-foreground"></div>
            {/* Arrow Head */}
            <div className="absolute top-4 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-primary"></div>
          </div>
        </div>

        {/* Center Dot */}
        <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground border-2 border-background"></div>
      </div>

      <div className="space-y-1">
        <p className="text-2xl font-bold">{Math.round(angle)}°</p>
        <p className="text-sm text-muted-foreground">{t('qibla.degrees')}</p>
        <p className="mt-4 text-sm font-medium">
          {distance} {t('qibla.distance')}
        </p>
      </div>
    </Card>
  )
}

export default QiblaCompass
