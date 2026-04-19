export const calculateQibla = (lat, lng) => {
  const kaabaLat = 21.4225 * (Math.PI / 180)
  const kaabaLng = 39.8262 * (Math.PI / 180)
  const userLat = lat * (Math.PI / 180)
  const deltaLng = kaabaLng - lng * (Math.PI / 180)
  const y = Math.sin(deltaLng) * Math.cos(kaabaLat)
  const x =
    Math.cos(userLat) * Math.sin(kaabaLat) -
    Math.sin(userLat) * Math.cos(kaabaLat) * Math.cos(deltaLng)
  const angle = (Math.atan2(y, x) * (180 / Math.PI) + 360) % 360
  return angle
}

export const calculateDistance = (lat1, lng1) => {
  const lat2 = 21.4225
  const lng2 = 39.8262
  const R = 6371 // km
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLng = (lng2 - lng1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  return Math.round(d)
}
