import React from 'react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import useAppStore from '@/store/useAppStore'

const RecentSearches = ({ onSelect }) => {
  const { t } = useTranslation()
  const { recentSearches } = useAppStore()

  if (recentSearches.length === 0) return null

  return (
    <div className="mt-8">
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        {t('search.recentSearches')}
      </h3>
      <div className="flex flex-wrap gap-2">
        {recentSearches.map((item) => (
          <Badge
            key={`${item.city}-${item.country}`}
            variant="secondary"
            className="cursor-pointer px-3 py-1 text-sm hover:bg-secondary/80"
            onClick={() => onSelect(item)}
          >
            {item.city}, {item.country}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default RecentSearches
