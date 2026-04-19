import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import SettingsForm from '@/components/settings/SettingsForm'

const SettingsPage = () => {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = `${t('nav.settings')} | ${t('app.name')}`
  }, [t])

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{t('nav.settings')}</h1>
        <p className="mt-2 text-muted-foreground">{t('settings.title')}</p>
      </div>

      <SettingsForm />
    </div>
  )
}

export default SettingsPage
