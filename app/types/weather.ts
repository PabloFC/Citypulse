// Tipos para la respuesta de la API de OpenWeatherMap
export interface WeatherData {
  name: string
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  visibility?: number
  dt: number
  coord: {
    lat: number
    lon: number
  }
}
