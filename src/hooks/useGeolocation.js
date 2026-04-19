import { useState, useCallback } from 'react'

export const useGeolocation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [coords, setCoords] = useState(null)

  const getPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setLoading(false)
        setError(null)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )
  }, [])

  return { coords, error, loading, getPosition }
}
