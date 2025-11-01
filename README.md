# 🌆 CityPulse

Dashboard urbano en tiempo real que muestra clima, calidad del aire y noticias locales de cualquier ciudad del mundo.

## 🛠️ Stack Técnico

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Framer Motion** (animaciones)
- **SWR** (data fetching)

## 🚀 Instalación

1. Clona el repositorio
2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env.local` basado en `.env.local.example` y agrega tus API keys:

```env
OPENWEATHER_API_KEY=tu_api_key
NEWS_API_KEY=tu_api_key
AIR_API_KEY=tu_api_key
```

4. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📋 APIs Utilizadas

- [OpenWeatherMap](https://openweathermap.org/api) - Clima y calidad del aire
- [NewsAPI](https://newsapi.org) - Noticias locales

## 📝 Licencia

MIT
