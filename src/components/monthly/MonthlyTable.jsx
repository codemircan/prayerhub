import React from 'react'
import { useTranslation } from 'react-i18next'
import { isToday, isWeekend, parse } from 'date-fns'
import { cn } from '@/lib/utils'
import { formatTime } from '@/utils/prayerUtils'
import useAppStore from '@/store/useAppStore'

const MonthlyTable = ({ data }) => {
  const { t } = useTranslation()
  const { settings } = useAppStore()

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 border-b">
          <tr>
            <th className="px-4 py-3 text-left font-medium">{t('monthly.date')}</th>
            <th className="px-4 py-3 text-left font-medium">{t('prayers.fajr')}</th>
            <th className="px-4 py-3 text-left font-medium">{t('prayers.sunrise')}</th>
            <th className="px-4 py-3 text-left font-medium">{t('prayers.dhuhr')}</th>
            <th className="px-4 py-3 text-left font-medium">{t('prayers.asr')}</th>
            <th className="px-4 py-3 text-left font-medium">{t('prayers.maghrib')}</th>
            <th className="px-4 py-3 text-left font-medium">{t('prayers.isha')}</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((day) => {
            const date = parse(day.date.readable, 'dd MMM yyyy', new Date())
            const active = isToday(date)
            const weekend = isWeekend(date)

            return (
              <tr
                key={day.date.timestamp}
                className={cn(
                  active && "bg-primary/10",
                  weekend && !active && "bg-muted/30"
                )}
              >
                <td className="px-4 py-3 font-medium">
                  {day.date.gregorian.day} {day.date.gregorian.month.en.slice(0, 3)}
                </td>
                <td className="px-4 py-3">{formatTime(day.timings.Fajr.split(' ')[0], settings.timeFormat)}</td>
                <td className="px-4 py-3">{formatTime(day.timings.Sunrise.split(' ')[0], settings.timeFormat)}</td>
                <td className="px-4 py-3">{formatTime(day.timings.Dhuhr.split(' ')[0], settings.timeFormat)}</td>
                <td className="px-4 py-3">{formatTime(day.timings.Asr.split(' ')[0], settings.timeFormat)}</td>
                <td className="px-4 py-3">{formatTime(day.timings.Maghrib.split(' ')[0], settings.timeFormat)}</td>
                <td className="px-4 py-3">{formatTime(day.timings.Isha.split(' ')[0], settings.timeFormat)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MonthlyTable
