import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'

const LocationPermission = ({ onAllow, onSearch }) => {
  const { t } = useTranslation()

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md animate-in zoom-in-95 duration-300">
        <CardContent className="flex flex-col items-center p-8 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <span className="text-6xl">🕌</span>
          </div>
          <h2 className="mb-2 text-2xl font-bold">{t('location.permissionTitle')}</h2>
          <p className="mb-8 text-muted-foreground">{t('location.permissionDesc')}</p>

          <div className="flex w-full flex-col gap-3">
            <Button size="lg" className="w-full" onClick={onAllow}>
              <MapPin className="mr-2 h-5 w-5" />
              {t('location.allowButton')}
            </Button>
            <Button variant="ghost" className="w-full" onClick={onSearch}>
              {t('location.searchInstead')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LocationPermission
