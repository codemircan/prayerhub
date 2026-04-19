import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import useAppStore from '@/store/useAppStore'

const methods = [
  { id: 1, name: "University of Islamic Sciences, Karachi" },
  { id: 2, name: "Islamic Society of North America (ISNA)" },
  { id: 3, name: "Muslim World League" },
  { id: 4, name: "Umm Al-Qura University, Makkah" },
  { id: 5, name: "Egyptian General Authority of Survey" },
  { id: 13, name: "Diyanet İşleri Başkanlığı, Turkey" },
  { id: 15, name: "Spiritual Administration of Muslims of Russia" }
]

const SettingsForm = () => {
  const { t, i18n } = useTranslation()
  const { settings, updateSettings } = useAppStore()

  const handleLanguageChange = (val) => {
    i18n.changeLanguage(val)
    updateSettings({ language: val })
  }

  const handleMethodChange = (val) => {
    updateSettings({ method: parseInt(val) })
  }

  const handleFormatChange = (checked) => {
    updateSettings({ timeFormat: checked ? '24h' : '12h' })
  }

  const handleThemeChange = (checked) => {
    updateSettings({ theme: checked ? 'dark' : 'light' })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Language */}
          <div className="space-y-2">
            <Label>{t('settings.language')}</Label>
            <Select value={settings.language} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="tr">Türkçe</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Calculation Method */}
          <div className="space-y-2">
            <Label>{t('settings.method')}</Label>
            <Select value={settings.method.toString()} onValueChange={handleMethodChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {methods.map((m) => (
                  <SelectItem key={m.id} value={m.id.toString()}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Format */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('settings.timeFormat')}</Label>
              <p className="text-xs text-muted-foreground">
                {settings.timeFormat === '24h' ? t('settings.24h') : t('settings.12h')}
              </p>
            </div>
            <Switch
              checked={settings.timeFormat === '24h'}
              onCheckedChange={handleFormatChange}
            />
          </div>

          {/* Theme */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('settings.theme')}</Label>
              <p className="text-xs text-muted-foreground">
                {settings.theme === 'dark' ? t('settings.dark') : t('settings.light')}
              </p>
            </div>
            <Switch
              checked={settings.theme === 'dark'}
              onCheckedChange={handleThemeChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsForm
