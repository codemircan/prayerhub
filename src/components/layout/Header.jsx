import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useAppStore from '@/store/useAppStore'

const Header = () => {
  const { t, i18n } = useTranslation()
  const { settings, updateSettings } = useAppStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleTheme = () => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark'
    updateSettings({ theme: newTheme })
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    updateSettings({ language: lng })
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-2xl">🕌</span>
          <span className="text-xl font-bold">{t('app.name')}</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center space-x-4 md:flex rtl:space-x-reverse">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {['en', 'tr', 'ar'].map((lang) => (
              <Button
                key={lang}
                variant={i18n.language === lang ? 'default' : 'ghost'}
                size="sm"
                onClick={() => changeLanguage(lang)}
                className="uppercase"
              >
                {lang}
              </Button>
            ))}
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {settings.theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-b bg-background p-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('settings.language')}</span>
              <div className="flex space-x-1 rtl:space-x-reverse">
                {['en', 'tr', 'ar'].map((lang) => (
                  <Button
                    key={lang}
                    variant={i18n.language === lang ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => changeLanguage(lang)}
                    className="uppercase"
                  >
                    {lang}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('settings.theme')}</span>
              <Button variant="outline" size="sm" onClick={toggleTheme} className="flex space-x-2">
                {settings.theme === 'dark' ? (
                  <>
                    <Sun className="h-4 w-4" />
                    <span>{t('settings.light')}</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" />
                    <span>{t('settings.dark')}</span>
                  </>
                )}
              </Button>
            </div>
            <nav className="flex flex-col space-y-2 pt-2 border-t">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-2 text-lg">{t('nav.home')}</Link>
              <Link to="/search" onClick={() => setIsMenuOpen(false)} className="py-2 text-lg">{t('nav.search')}</Link>
              <Link to="/monthly" onClick={() => setIsMenuOpen(false)} className="py-2 text-lg">{t('nav.monthly')}</Link>
              <Link to="/settings" onClick={() => setIsMenuOpen(false)} className="py-2 text-lg">{t('nav.settings')}</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="py-2 text-lg">{t('nav.about')}</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
