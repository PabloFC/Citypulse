# 🔑 Cómo obtener tu API Key de OpenWeatherMap

## Paso 1: Crear cuenta en OpenWeatherMap

1. Ve a [https://openweathermap.org/](https://openweathermap.org/)
2. Haz clic en **"Sign In"** (arriba a la derecha)
3. Selecciona **"Create an Account"**
4. Completa el formulario de registro
5. Verifica tu email

## Paso 2: Obtener tu API Key

1. Una vez logueado, ve a [https://home.openweathermap.org/api_keys](https://home.openweathermap.org/api_keys)
2. Verás tu **Default API Key** ya generada
3. Copia esa clave (algo como: `abc123def456ghi789jkl012mno345pq`)

## Paso 3: Configurar en tu proyecto

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Reemplaza la línea:
   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=
   ```
   por:
   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=tu_clave_aqui
   ```
3. **Guarda el archivo**
4. **Reinicia el servidor de desarrollo** (Ctrl+C y luego `npm run dev`)

## Paso 4: Probar

1. Ve a http://localhost:3000
2. Busca una ciudad (ej: "Madrid")
3. Deberías ver la tarjeta del clima con datos reales

## ⚠️ Notas importantes

- La API Key puede tardar unos **10-15 minutos en activarse** después de crearla
- El plan gratuito permite **1,000 llamadas por día** (más que suficiente para desarrollo)
- **NUNCA** subas el archivo `.env.local` a GitHub (ya está en `.gitignore`)

## 🆓 Plan Gratuito incluye:

- ✅ Clima actual
- ✅ Calidad del aire
- ✅ 60 llamadas por minuto
- ✅ 1,000,000 llamadas al mes

¡Perfecto para tu proyecto!
