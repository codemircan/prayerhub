import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex h-16 max-w-4xl flex-col items-center justify-between gap-4 md:flex-row px-4">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} {t('app.name')}. v1.0.0
        </p>
        <div className="flex items-center space-x-4 text-sm font-medium rtl:space-x-reverse">
          <Link to="/about" className="hover:underline">{t('nav.about')}</Link>
          <Link to="/settings" className="hover:underline">{t('nav.settings')}</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
