# 📰 Guía de Configuración de GNews API

## ¿Por qué GNews en lugar de NewsAPI?

**NewsAPI tiene limitaciones importantes:**

- ❌ El plan gratuito solo funciona en `localhost`
- ❌ No funciona en producción (Vercel, Netlify, etc.)
- ❌ Requiere plan de pago para usar en dominios públicos

**GNews es mejor para proyectos en producción:**

- ✅ **100 solicitudes/día GRATIS**
- ✅ Funciona en producción sin restricciones
- ✅ Buena cobertura de noticias en español
- ✅ API simple y rápida
- ✅ Sin necesidad de tarjeta de crédito

---

## 🚀 Pasos para obtener tu API Key de GNews

### 1. Registrarse en GNews

1. Ve a [https://gnews.io/](https://gnews.io/)
2. Haz clic en **"Get API Key"** o **"Sign Up"**
3. Completa el registro con tu email
4. Verifica tu email

### 2. Obtener tu API Key

1. Inicia sesión en [https://gnews.io/](https://gnews.io/)
2. En tu dashboard, verás tu **API Key**
3. Copia la API Key

### 3. Configurar en tu proyecto

#### Para desarrollo local:

Añade a tu archivo `.env.local`:

```env
NEXT_PUBLIC_GNEWS_API_KEY=tu_api_key_aqui
```

#### Para producción en Vercel:

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona **Settings** → **Environment Variables**
3. Añade una nueva variable:
   - **Name**: `NEXT_PUBLIC_GNEWS_API_KEY`
   - **Value**: Tu API Key de GNews
   - **Environment**: Selecciona Production, Preview y Development
4. Haz clic en **Save**
5. **Re-deploya** tu aplicación

---

## 📊 Límites del Plan Gratuito

- **100 solicitudes/día**
- Acceso a artículos de los últimos 7 días
- Búsquedas en múltiples idiomas
- Filtrado por país

### Consejos para optimizar el uso:

1. **Implementa caché**: Guarda las noticias en el navegador por algunas horas
2. **Limita las búsquedas**: Solo carga noticias cuando el usuario busca una ciudad
3. **Usa búsquedas específicas**: Busca ciudades específicas, no términos generales

---

## 🔄 Diferencias con NewsAPI

### Formato de Respuesta

**GNews:**

```json
{
  "totalArticles": 100,
  "articles": [
    {
      "title": "...",
      "description": "...",
      "content": "...",
      "url": "...",
      "image": "...",
      "publishedAt": "...",
      "source": {
        "name": "...",
        "url": "..."
      }
    }
  ]
}
```

**NewsAPI:**

```json
{
  "status": "ok",
  "totalResults": 100,
  "articles": [
    {
      "source": { "id": null, "name": "..." },
      "author": "...",
      "title": "...",
      "description": "...",
      "url": "...",
      "urlToImage": "...",
      "publishedAt": "...",
      "content": "..."
    }
  ]
}
```

✅ **La aplicación ya convierte automáticamente el formato de GNews al formato esperado**, por lo que no necesitas cambiar nada más en el código.

---

## 🌍 Endpoint de GNews

```
GET https://gnews.io/api/v4/search
```

### Parámetros principales:

- `q` - Término de búsqueda (ej: "Madrid")
- `lang` - Idioma (ej: "es")
- `country` - País (ej: "es" para España)
- `max` - Máximo de resultados (hasta 10)
- `apikey` - Tu API Key

### Ejemplo:

```
https://gnews.io/api/v4/search?q=Madrid&lang=es&country=es&max=9&apikey=TU_API_KEY
```

---

## 🆘 Solución de Problemas

### Error: "API key inválida"

- Verifica que copiaste la API Key completa
- Asegúrate de que la variable se llame `NEXT_PUBLIC_GNEWS_API_KEY`
- Re-deploya después de añadir la variable en Vercel

### Error: "Has superado el límite"

- Has usado tus 100 solicitudes diarias
- Espera hasta el siguiente día (se resetea a las 00:00 UTC)
- Considera implementar caché para reducir solicitudes

### No aparecen noticias

- Verifica que hay noticias disponibles para esa ciudad
- Prueba con ciudades más grandes (Madrid, Barcelona, etc.)
- Revisa que el idioma y país estén correctamente configurados

---

## 📚 Recursos

- [Documentación oficial de GNews](https://gnews.io/docs/v4)
- [Dashboard de GNews](https://gnews.io/dashboard)
- [Planes y precios](https://gnews.io/pricing)

---

## ✅ Checklist de Configuración

- [ ] Cuenta creada en GNews.io
- [ ] API Key obtenida
- [ ] Variable `NEXT_PUBLIC_GNEWS_API_KEY` añadida en `.env.local`
- [ ] Variable añadida en Vercel (Settings → Environment Variables)
- [ ] Aplicación re-desplegada en Vercel
- [ ] Noticias funcionando correctamente

---

¿Necesitas ayuda? Revisa la [documentación de GNews](https://gnews.io/docs/v4) o verifica tu configuración de variables de entorno.
