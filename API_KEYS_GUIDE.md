# 🔑 Guía completa de API Keys para CityPulse

Esta guía te ayudará a obtener todas las API keys necesarias para que CityPulse funcione correctamente.

## 📋 APIs necesarias

1. **OpenWeatherMap** - Para información del clima
2. **NewsAPI** - Para noticias locales
3. **Ticketmaster** - Para eventos próximos

---

## 🌡️ OpenWeatherMap (Clima)

### Paso 1: Crear cuenta en OpenWeatherMap

1. Ve a [https://openweathermap.org/](https://openweathermap.org/)
2. Haz clic en **"Sign In"** (arriba a la derecha)
3. Selecciona **"Create an Account"**
4. Completa el formulario de registro
5. Verifica tu email

### Paso 2: Obtener tu API Key

1. Una vez logueado, ve a [https://home.openweathermap.org/api_keys](https://home.openweathermap.org/api_keys)
2. Verás tu **Default API Key** ya generada
3. Copia esa clave (algo como: `abc123def456ghi789jkl012mno345pq`)

### Plan Gratuito incluye:

- ✅ Clima actual
- ✅ 60 llamadas por minuto
- ✅ 1,000,000 llamadas al mes

---

## 📰 NewsAPI (Noticias)

Para obtener tu API Key de NewsAPI, consulta la guía detallada:
👉 **[NEWS_API_GUIDE.md](./NEWS_API_GUIDE.md)**

### Resumen rápido:

1. Ve a [https://newsapi.org/](https://newsapi.org/)
2. Regístrate con tu email
3. Verifica tu cuenta
4. Copia tu API key del dashboard

### Plan Gratuito incluye:

- ✅ 100 solicitudes al día
- ✅ Noticias de hasta 1 mes de antigüedad
- ⚠️ Solo para desarrollo (no producción)

---

## 🎭 Ticketmaster (Eventos)

Para obtener tu API Key de Ticketmaster, consulta la guía detallada:
👉 **[TICKETMASTER_API_GUIDE.md](./TICKETMASTER_API_GUIDE.md)**

### Resumen rápido:

1. Ve a [https://developer.ticketmaster.com/](https://developer.ticketmaster.com/)
2. Crea una cuenta
3. Crea una nueva aplicación
4. Copia tu **Consumer Key**

### Plan Gratuito incluye:

- ✅ 5,000 llamadas por día
- ✅ 5 llamadas por segundo
- ✅ Acceso a todos los eventos públicos
- ✅ Eventos en todo el mundo

---

## ⚙️ Configurar en tu proyecto

### Paso 1: Crear archivo de configuración

1. En la raíz del proyecto, crea un archivo llamado `.env.local`
2. Añade las siguientes líneas:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=tu_clave_openweather_aqui
NEXT_PUBLIC_NEWS_API_KEY=tu_clave_newsapi_aqui
NEXT_PUBLIC_TICKETMASTER_API_KEY=tu_clave_ticketmaster_aqui
```

3. Reemplaza cada `tu_clave_..._aqui` con las claves que obtuviste

### Paso 2: Ejemplo de archivo `.env.local`

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=abc123def456ghi789jkl012mno345pq
NEXT_PUBLIC_NEWS_API_KEY=xyz789uvw456rst123opq012lmn345hij
NEXT_PUBLIC_TICKETMASTER_API_KEY=pqr345stu678vwx901yz234abc567def
```

### Paso 3: Reiniciar el servidor

1. Si el servidor está corriendo, detenlo (Ctrl+C)
2. Inicia el servidor de nuevo:
   ```bash
   npm run dev
   ```

---

## 🧪 Probar que funciona

1. Ve a http://localhost:3000
2. Busca una ciudad grande como **"Madrid"** o **"Barcelona"**
3. Deberías ver:
   - ✅ Tarjeta de clima con temperatura actual
   - ✅ Eventos próximos en la ciudad
   - ✅ Noticias locales relevantes

---

## ⚠️ Notas importantes

### Seguridad

- **NUNCA** subas el archivo `.env.local` a GitHub
- El archivo ya está en `.gitignore` para protegerte
- No compartas tus API keys públicamente

### Tiempo de activación

- OpenWeatherMap: 10-15 minutos
- NewsAPI: Inmediato
- Ticketmaster: Inmediato

### Límites diarios

- OpenWeatherMap: 1,000,000 llamadas/mes (sin problema)
- NewsAPI: 100 solicitudes/día (ajustado)
- Ticketmaster: 5,000 llamadas/día (más que suficiente)

### Para producción

- NewsAPI requiere plan de pago para producción
- OpenWeatherMap y Ticketmaster permiten uso en producción con plan gratuito
- Considera actualizar los planes según tus necesidades

---

## ❓ Solución de problemas

### "API key no configurada"

- Verifica que el archivo `.env.local` existe en la raíz del proyecto
- Verifica que los nombres de las variables sean exactos (incluyendo `NEXT_PUBLIC_`)
- Reinicia el servidor de desarrollo

### "API key inválida"

- Verifica que copiaste las claves correctamente (sin espacios)
- Espera 10-15 minutos si acabas de crear la cuenta de OpenWeatherMap
- Verifica que tu cuenta de NewsAPI esté verificada

### No aparecen datos

- Abre la consola del navegador (F12) para ver errores
- Verifica que las tres API keys estén configuradas
- Intenta con ciudades grandes primero (Madrid, Barcelona, Nueva York)

---

## 📚 Recursos adicionales

- [Documentación de OpenWeatherMap](https://openweathermap.org/api)
- [Documentación de NewsAPI](https://newsapi.org/docs)
- [Documentación de Ticketmaster](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/)

---

¿Necesitas más ayuda? Abre un issue en el repositorio o consulta las guías detalladas de cada API.
