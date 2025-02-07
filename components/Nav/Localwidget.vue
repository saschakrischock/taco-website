<!-- WeatherLocation.vue -->
<template>
    <div class="w-96 text-center absolute left-1/2 -translate-x-1/2 text-black text-sm font-mono">
      <div v-if="loading">Loading...</div>
      <div v-else>{{ formattedOutput }}</div>
    </div>
  </template>
  
  <script setup>
  const loading = ref(true)
  const temperature = ref(null)
  const latitude = ref(null)
  const longitude = ref(null)
  const currentTime = ref('')
  
  // Update time every second
  let timeInterval = null
  
  // Format temperature
  const formatTemperature = (temp) => {
    if (!temp) return ''
    return `${temp}°C`
  }
  
  // Convert decimal coordinates to DMS format
  const decimalToDMS = (decimal, isLatitude) => {
    if (!decimal) return ''
    
    const absolute = Math.abs(parseFloat(decimal))
    const degrees = Math.floor(absolute)
    const minutesNotTruncated = (absolute - degrees) * 60
    const minutes = Math.floor(minutesNotTruncated)
    const seconds = Math.floor((minutesNotTruncated - minutes) * 60)
    
    const direction = isLatitude
      ? (decimal >= 0 ? 'N' : 'S')
      : (decimal >= 0 ? 'E' : 'W')
    
    return `${degrees}°${minutes}'${seconds}"${direction}`
  }
  
  // Format coordinates
  const formatCoordinates = (lat, long) => {
    if (!lat || !long) return ''
    return `${decimalToDMS(lat, true)}, ${decimalToDMS(long, false)}`
  }
  
  // Update current time
  const updateTime = () => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const period = hours >= 12 ? 'PM' : 'AM'
    const hour12 = hours % 12 || 12
    currentTime.value = `${hour12}:${minutes.toString().padStart(2, '0')}${period}`
  }
  
  // Combine all formatted values
  const formattedOutput = computed(() => {
    if (!temperature.value || !latitude.value || !longitude.value) {
      return 'Loading data...'
    }
    
    return [
      formatTemperature(temperature.value),
      formatCoordinates(latitude.value, longitude.value),
      currentTime.value
    ].join(' | ')
  })
  
  // Fetch weather and location data once
  const fetchData = async () => {
    loading.value = true
    try {
      // Get location from IP
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      
      latitude.value = data.latitude
      longitude.value = data.longitude
      
      // Get temperature from OpenMeteo
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&current=temperature_2m`
      const weatherResponse = await fetch(weatherUrl)
      const weatherData = await weatherResponse.json()
      temperature.value = Math.round(weatherData.current.temperature_2m)
    } catch (error) {
      console.error('Error fetching data:', error)
      // Fallback values
      latitude.value = 40.75
      longitude.value = -73.98
      temperature.value = -2
    } finally {
      loading.value = false
    }
  }
  
  // Start time updates
  onMounted(() => {
    fetchData()
    updateTime() // Initial time update
    timeInterval = setInterval(updateTime, 1000) // Update every second
  })
  
  // Clean up interval when component is unmounted
  onUnmounted(() => {
    if (timeInterval) {
      clearInterval(timeInterval)
    }
  })
  </script>