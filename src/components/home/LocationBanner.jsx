import React from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin } from 'lucide-react'

const LocationBanner = ({ city, country, date, hijriDate }) => {
  const { t, i18n } = useTranslation()

  // Format Gregorian date
  const formattedDate = new Intl.DateTimeFormat(i18n.language, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  return (
    <div className="mb-6 flex flex-col items-center justify-between gap-2 text-center md:flex-row md:text-left rtl:md:text-right">
      <div>
        <div className="flex items-center justify-center space-x-2 md:justify-start rtl:space-x-reverse">
          <MapPin className="h-5 w-5 text-primary-600" />
          <h2 className="text-xl font-bold">
            {city}{country ? `, ${country}` : ''}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">{formattedDate}</p>
      </div>
      <div className="rounded-lg bg-secondary px-4 py-2">
        <p className="text-sm font-medium text-secondary-foreground">
          {t('home.hijriDate')}: {hijriDate}
        </p>
      </div>
    </div>
  )
}

export default LocationBanner
