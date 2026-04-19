import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.aladhan.com/v1',
  timeout: 10000,
})

const handleApiError = (error) => {
  if (error.response) {
    throw {
      message: error.response.data.data || error.response.data.message || 'API Error',
      status: error.response.status,
    }
  }
  throw { message: error.message || 'Network Error', status: 500 }
}

export const getPrayerTimesByCoords = async (lat, lng, method = 13, date = null) => {
  try {
    const endpoint = date ? `/timings/${date}` : '/timings'
    const response = await api.get(endpoint, {
      params: { latitude: lat, longitude: lng, method },
    })
    return response.data.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getPrayerTimesByCity = async (city, country, method = 13, date = null) => {
  try {
    const endpoint = date ? `/timingsByCity/${date}` : '/timingsByCity'
    const response = await api.get(endpoint, {
      params: { city, country, method },
    })
    return response.data.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getMonthlyTimes = async (lat, lng, month, year, method = 13) => {
  try {
    const response = await api.get(`/calendar/${year}/${month}`, {
      params: { latitude: lat, longitude: lng, method },
    })
    return response.data.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getHijriDate = async (date) => {
  try {
    const response = await api.get(`/gToH/${date}`)
    return response.data.data
  } catch (error) {
    handleApiError(error)
  }
}

export default api
