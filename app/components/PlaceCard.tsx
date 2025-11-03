import { Place } from "../types/places";
import Image from "next/image";

interface PlaceCardProps {
  place: Place;
}

export default function PlaceCard({ place }: PlaceCardProps) {
  // Obtener URL de la foto del lugar
  const getPhotoUrl = () => {
    if (place.photos && place.photos.length > 0) {
      const photoReference = place.photos[0].photo_reference;
      return `/api/places/photo?photo_reference=${photoReference}`;
    }
    return null;
  };

  // Generar enlace a Google Maps
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place.name
  )}&query_place_id=${place.place_id}`;

  // Renderizar estrellas según rating
  const renderStars = () => {
    if (!place.rating) return null;

    const fullStars = Math.floor(place.rating);
    const hasHalfStar = place.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-1">
        {/* Estrellas llenas */}
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-4 h-4 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        {/* Media estrella */}
        {hasHalfStar && (
          <svg
            className="w-4 h-4 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half)"
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            />
          </svg>
        )}
        {/* Estrellas vacías */}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-4 h-4 text-gray-300 dark:text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
          {place.rating.toFixed(1)}
        </span>
        {place.user_ratings_total && (
          <span className="text-xs text-gray-500 dark:text-gray-500">
            ({place.user_ratings_total})
          </span>
        )}
      </div>
    );
  };

  // Obtener icono según el tipo de lugar
  const getPlaceIcon = () => {
    if (place.types.includes("museum")) return "🏛️";
    if (place.types.includes("restaurant")) return "🍽️";
    if (place.types.includes("cafe")) return "☕";
    if (place.types.includes("park")) return "🌳";
    if (place.types.includes("shopping_mall")) return "🛍️";
    if (place.types.includes("church")) return "⛪";
    if (place.types.includes("art_gallery")) return "🎨";
    return "📍";
  };

  const photoUrl = getPhotoUrl();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Imagen del lugar */}
      <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={place.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-6xl">
            {getPlaceIcon()}
          </div>
        )}

        {/* Badge de estado (abierto/cerrado) */}
        {place.opening_hours?.open_now !== undefined && (
          <div className="absolute top-3 right-3">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                place.opening_hours.open_now
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {place.opening_hours.open_now ? "Abierto" : "Cerrado"}
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 space-y-3">
        {/* Título */}
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2">
          {place.name}
        </h3>

        {/* Dirección */}
        {place.vicinity && (
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2">
            <svg
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="line-clamp-2">{place.vicinity}</span>
          </p>
        )}

        {/* Rating */}
        {renderStars()}

        {/* Nivel de precio */}
        {place.price_level !== undefined && (
          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
            <span>Precio:</span>
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className={
                  i < place.price_level!
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-300 dark:text-gray-600"
                }
              >
                €
              </span>
            ))}
          </div>
        )}

        {/* Botón para ver en Google Maps */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
        >
          Ver en Google Maps
        </a>
      </div>
    </div>
  );
}
