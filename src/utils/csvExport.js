export const exportMonthlyToCsv = (monthData, monthName) => {
  if (!monthData || monthData.length === 0) return

  const headers = ['Date', 'Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
  const rows = monthData.map((day) => [
    day.date.readable,
    day.timings.Fajr.split(' ')[0],
    day.timings.Sunrise.split(' ')[0],
    day.timings.Dhuhr.split(' ')[0],
    day.timings.Asr.split(' ')[0],
    day.timings.Maghrib.split(' ')[0],
    day.timings.Isha.split(' ')[0],
  ])

  const csvContent = [headers, ...rows].map((e) => e.join(',')).join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `prayer_times_${monthName.replace(/\s+/g, '_')}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
