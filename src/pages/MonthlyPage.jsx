import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMonthlyTimes } from '@/hooks/useMonthlyTimes'
import useAppStore from '@/store/useAppStore'
import MonthNav from '@/components/monthly/MonthNav'
import MonthlyTable from '@/components/monthly/MonthlyTable'
import { Button } from '@/components/ui/button'
import { Download, Loader2 } from 'lucide-react'
import { exportMonthlyToCsv } from '@/utils/csvExport'
import { format, addMonths, subMonths } from 'date-fns'
import QiblaCompass from '@/components/qibla/QiblaCompass'
import { calculateQibla, calculateDistance } from '@/utils/qiblaUtils'

const MonthlyPage = () => {
  const { t } = useTranslation()
  const { location } = useAppStore()
  const [currentDate, setCurrentDate] = useState(new Date())

  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()

  const { data, isLoading, error } = useMonthlyTimes(month, year)

  useEffect(() => {
    document.title = `${t('nav.monthly')} | ${t('app.name')}`
  }, [t])

  const handlePrev = () => setCurrentDate(subMonths(currentDate, 1))
  const handleNext = () => setCurrentDate(addMonths(currentDate, 1))

  const handleExport = () => {
    if (data) {
      exportMonthlyToCsv(data, format(currentDate, 'MMMM yyyy'))
    }
  }

  const qiblaAngle = location.lat ? calculateQibla(location.lat, location.lng) : 0
  const qiblaDist = location.lat ? calculateDistance(location.lat, location.lng) : 0

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h1 className="text-3xl font-bold">{t('monthly.title')}</h1>
        <Button
          onClick={handleExport}
          disabled={!data || isLoading}
          variant="outline"
          className="w-full md:w-auto"
        >
          <Download className="mr-2 h-4 w-4" />
          {t('monthly.exportCsv')}
        </Button>
      </div>

      <MonthNav
        date={currentDate}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="rounded-md border border-destructive bg-destructive/10 p-4 text-center text-destructive">
          {error.message}
        </div>
      ) : data ? (
        <MonthlyTable data={data} />
      ) : null}

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <QiblaCompass angle={qiblaAngle} distance={qiblaDist} />

        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="text-lg font-bold mb-4">{t('home.location')}</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">City</span>
                    <span className="font-medium">{location.city}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Country</span>
                    <span className="font-medium">{location.country || '-'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Coordinates</span>
                    <span className="font-medium">{location.lat?.toFixed(4)}, {location.lng?.toFixed(4)}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MonthlyPage
