// Tipos para la respuesta de la API de Geocodificación
export interface GeoData {
  name: string
  lat: number
  lon: number
  country: string
}

// Tipos para la respuesta de la API de Calidad del Aire
export interface AirQualityData {
  coord: {
    lon: number
    lat: number
  }
  list: Array<{
    main: {
      aqi: 1 | 2 | 3 | 4 | 5 // Índice de Calidad del Aire (1-Bueno, 2-Aceptable, 3-Moderado, 4-Malo, 5-Muy Malo)
    }
    components: {
      co: number       // Monóxido de carbono, μg/m3
      no: number       // Monóxido de nitrógeno, μg/m3
      no2: number      // Dióxido de nitrógeno, μg/m3
      o3: number       // Ozono, μg/m3
      so2: number      // Dióxido de azufre, μg/m3
      pm2_5: number    // Partículas finas, μg/m3
      pm10: number     // Partículas gruesas, μg/m3
      nh3: number      // Amoníaco, μg/m3
    }
    dt: number
  }>
}
