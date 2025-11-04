# 🌆 CityPulse

Tu guía completa de las principales ciudades españolas. Descubre clima actual, lugares imprescindibles, eventos próximos y noticias locales en tiempo real.

## ✨ Características

- 🌡️ **Clima actual**: Temperatura, sensación térmica, humedad y condiciones meteorológicas
- 🗺️ **Lugares de interés**: Descubre museos, restaurantes, parques y atracciones turísticas con fotos, ratings y enlaces a Google Maps
- ℹ️ **Información de la ciudad**: Datos históricos, población, curiosidades y lugares emblemáticos
- 🎭 **Eventos próximos**: Los mejores eventos de la ciudad (conciertos, deportes, teatro, festivales)
- 📰 **Noticias locales**: Las noticias más relevantes de cada ciudad
- 🌓 **Modo oscuro**: Interfaz adaptable a tus preferencias
- 📱 **Responsive**: Funciona perfectamente en móvil, tablet y desktop
- 🔍 **Filtros inteligentes**: Filtra lugares por categoría (turismo, museos, restaurantes, parques, tiendas)
- 💾 **Historial**: Guarda tus búsquedas recientes para acceso rápido

## 🛠️ Stack Técnico

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **React Hooks**

## 🚀 Instalación

1. Clona el repositorio

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env.local` en la raíz del proyecto con tus API keys:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=tu_api_key_openweather
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=tu_api_key_google_places
NEXT_PUBLIC_NEWS_API_KEY=tu_api_key_newsapi
NEXT_PUBLIC_TICKETMASTER_API_KEY=tu_api_key_ticketmaster
```

4. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## � Obtención de API Keys

### OpenWeatherMap (Clima)

- Visita [https://openweathermap.org/api](https://openweathermap.org/api)
- Crea una cuenta gratuita
- Obtén tu API key del dashboard
- **Límite gratuito**: 1,000 llamadas/día

### NewsAPI (Noticias)

- Consulta la guía detallada: [`NEWS_API_GUIDE.md`](./NEWS_API_GUIDE.md)
- Visita [https://newsapi.org](https://newsapi.org)
- Regístrate gratis
- **Límite gratuito**: 100 solicitudes/día

### Google Places API (Lugares de Interés)

- Consulta la guía detallada: [`GOOGLE_PLACES_API_GUIDE.md`](./GOOGLE_PLACES_API_GUIDE.md)
- Visita [https://console.cloud.google.com](https://console.cloud.google.com)
- Crea un nuevo proyecto o selecciona uno existente
- Habilita las siguientes APIs:
  - **Places API**
  - **Geocoding API**
- Ve a "Credenciales" y crea una API key
- **Importante**: Restringe tu API key por dominio o dirección IP para seguridad
- **Límite gratuito**: $200 en créditos mensuales (aprox. 28,000 solicitudes de búsqueda de lugares)

### Ticketmaster (Eventos)

- Consulta la guía detallada: [`TICKETMASTER_API_GUIDE.md`](./TICKETMASTER_API_GUIDE.md)
- Visita [https://developer.ticketmaster.com](https://developer.ticketmaster.com)
- Crea una aplicación y obtén tu Consumer Key
- **Límite gratuito**: 5,000 llamadas/día

## 📋 APIs Utilizadas

- **OpenWeatherMap** - Información meteorológica en tiempo real
- **Google Places API** - Lugares de interés, atracciones turísticas y puntos de interés
- **NewsAPI** - Noticias locales y relevantes
- **Ticketmaster Discovery API** - Eventos y entretenimiento

## 📂 Estructura del Proyecto

```
CityPulse/
├── app/
│   ├── components/
│   │   ├── CitySearch.tsx      # Buscador de ciudades
│   │   ├── WeatherBanner.tsx   # Banner de clima
│   │   ├── PlaceCard.tsx       # Tarjeta de lugar individual
│   │   ├── PlacesSection.tsx   # Sección de lugares de interés
│   │   ├── EventCard.tsx       # Tarjeta de evento individual
│   │   ├── EventsSection.tsx   # Sección de eventos
│   │   ├── NewsCard.tsx        # Tarjeta de noticia individual
│   │   ├── NewsSection.tsx     # Sección de noticias
│   │   ├── Navbar.tsx          # Barra de navegación
│   │   └── Footer.tsx          # Pie de página
│   ├── types/
│   │   ├── weather.ts          # Tipos para clima
│   │   ├── places.ts           # Tipos para lugares
│   │   ├── events.ts           # Tipos para eventos
│   │   └── news.ts             # Tipos para noticias
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── TICKETMASTER_API_GUIDE.md   # Guía de Ticketmaster
├── NEWS_API_GUIDE.md           # Guía de NewsAPI
├── API_KEYS_GUIDE.md           # Guía general de APIs
└── README.md
```

## 🎨 Capturas de Pantalla

_(Añade capturas de pantalla de tu aplicación aquí)_

## 🚀 Despliegue

### Vercel (Recomendado)

1. Sube tu proyecto a GitHub
2. Importa el repositorio en [Vercel](https://vercel.com)
3. Añade las variables de entorno en la configuración
4. Despliega automáticamente

### Otras plataformas

Compatible con cualquier plataforma que soporte Next.js:

- Netlify
- Railway
- Render
- AWS Amplify

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

MIT
