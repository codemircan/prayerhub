import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import cities from '@/data/cities.json'

const CitySearch = ({ onSelect }) => {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 1) {
        const filtered = cities
          .filter(
            (c) =>
              c.city.toLowerCase().includes(query.toLowerCase()) ||
              c.country.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 6)
        setResults(filtered)
        setIsOpen(true)
      } else {
        setResults([])
        setIsOpen(false)
      }
      setSelectedIndex(-1)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0) {
        onSelect(results[selectedIndex])
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t('search.placeholder')}
          className="pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-1 shadow-md outline-none">
          {results.map((city, index) => (
            <div
              key={`${city.city}-${city.country}`}
              className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none ${
                selectedIndex === index ? 'bg-accent text-accent-foreground' : ''
              }`}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => onSelect(city)}
            >
              <div className="flex flex-col">
                <span className="font-medium">{city.city}</span>
                <span className="text-xs text-muted-foreground">{city.country}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {isOpen && results.length === 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-4 text-center text-sm text-muted-foreground shadow-md">
          {t('search.noResults')}
        </div>
      )}
    </div>
  )
}

export default CitySearch
