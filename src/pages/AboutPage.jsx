import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink, Github } from 'lucide-react'

const AboutPage = () => {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = `${t('nav.about')} | ${t('app.name')}`
  }, [t])

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-8 animate-in fade-in duration-500">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <span className="text-4xl">🕌</span>
        </div>
        <h1 className="text-3xl font-bold">{t('app.name')}</h1>
        <p className="mt-2 text-muted-foreground">v1.0.0</p>
      </div>

      <Card>
        <CardContent className="space-y-4 p-6 leading-relaxed">
          <p>{t('app.tagline')}</p>
          <p>
            This application provides accurate Islamic prayer times for users worldwide.
            It automatically detects your location or allows you to search for any city to get
            precise timings based on multiple calculation methods.
          </p>
          <div className="pt-4 border-t space-y-4">
              <h3 className="font-bold flex items-center">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Data Provider
              </h3>
              <p className="text-sm">
                Prayer times are fetched from the <strong>Aladhan Prayer Times API</strong>.
                This service is free and provides data from several reliable Islamic authorities
                around the world.
              </p>
              <a
                href="https://aladhan.com"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline text-sm inline-block"
              >
                Visit Aladhan.com
              </a>
          </div>

          <div className="pt-4 border-t">
              <h3 className="font-bold flex items-center mb-2">
                  <Github className="mr-2 h-4 w-4" />
                  Open Source
              </h3>
              <p className="text-sm text-muted-foreground">
                  Built with React, Vite, TailwindCSS, and shadcn/ui.
              </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AboutPage
