# 🔑 Cómo obtener tu API Key de NewsAPI

## Paso 1: Crear cuenta en NewsAPI

1. Ve a [https://newsapi.org/](https://newsapi.org/)
2. Haz clic en **"Get API Key"** (botón naranja en la parte superior)
3. Completa el formulario de registro
4. Verifica tu email

## Paso 2: Obtener tu API Key

1. Una vez logueado, serás redirigido a tu dashboard
2. Verás tu **API Key** directamente en la página principal
3. Copia esa clave (algo como: `abc123def456ghi789jkl012mno345pq`)

## Paso 3: Configurar en tu proyecto

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Añade la línea:
   ```
   NEXT_PUBLIC_NEWS_API_KEY=tu_clave_aqui
   ```
3. **Guarda el archivo**
4. **Reinicia el servidor de desarrollo** (Ctrl+C y luego `npm run dev`)

## Paso 4: Probar

1. Ve a http://localhost:3000
2. Busca una ciudad (ej: "Madrid")
3. Deberías ver las noticias relacionadas con esa ciudad

## ⚠️ Limitaciones del plan gratuito

- ✅ **100 solicitudes por día**
- ✅ **Noticias de hasta 1 mes de antigüedad**
- ✅ **Múltiples idiomas y fuentes**
- ⚠️ **Solo funciona en `localhost` o `127.0.0.1`**
- ⚠️ **Para producción necesitas un plan de pago** ($449/mes Developer plan)

## 🔄 Alternativa para producción (sin costo)

Si quieres desplegar tu proyecto sin pagar por NewsAPI, tienes estas opciones:

1. **Usar NewsAPI solo en desarrollo** y desactivar las noticias en producción
2. **Usar otra API gratuita** como:
   - [GNews API](https://gnews.io/) - 100 requests/día gratis
   - [Currents API](https://currentsapi.services/) - 600 requests/día gratis
   - [NewsData.io](https://newsdata.io/) - 200 requests/día gratis

## 📝 Nota importante

El archivo `.env.local` ya está en `.gitignore`, así que tu API key **no se subirá a GitHub**. ¡Mantén tus claves seguras!
