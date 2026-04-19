import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'

const MonthNav = ({ date, onPrev, onNext }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <Button variant="outline" size="icon" onClick={onPrev}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <h2 className="text-xl font-bold capitalize">
        {format(date, 'MMMM yyyy')}
      </h2>
      <Button variant="outline" size="icon" onClick={onNext}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default MonthNav
