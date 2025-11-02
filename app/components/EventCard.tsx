import { TicketmasterEvent } from "../types/events";
import Image from "next/image";

interface EventCardProps {
  event: TicketmasterEvent;
}

export default function EventCard({ event }: EventCardProps) {
  // Obtener la imagen de mejor calidad
  const getImage = () => {
    if (!event.images || event.images.length === 0) {
      return "/placeholder-event.jpg";
    }
    // Buscar imagen 16:9 o la primera disponible
    const image =
      event.images.find((img) => img.ratio === "16_9") || event.images[0];
    return image.url;
  };

  // Formatear fecha
  const formatDate = () => {
    const date = new Date(event.dates.start.localDate);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("es-ES", options);
  };

  // Formatear hora
  const formatTime = () => {
    if (!event.dates.start.localTime) return null;
    return event.dates.start.localTime.slice(0, 5); // HH:MM
  };

  // Obtener categoría
  const getCategory = () => {
    if (!event.classifications || event.classifications.length === 0) {
      return "Evento";
    }
    const classification = event.classifications[0];
    return classification.segment?.name || "Evento";
  };

  // Obtener género
  const getGenre = () => {
    if (!event.classifications || event.classifications.length === 0) {
      return null;
    }
    const classification = event.classifications[0];
    return classification.genre?.name || null;
  };

  // Obtener venue
  const getVenue = () => {
    if (!event._embedded?.venues || event._embedded.venues.length === 0) {
      return "Lugar por confirmar";
    }
    return event._embedded.venues[0].name;
  };

  // Obtener precio
  const getPriceRange = () => {
    if (!event.priceRanges || event.priceRanges.length === 0) {
      return null;
    }
    const price = event.priceRanges[0];
    if (price.min === price.max) {
      return `${price.min} ${price.currency}`;
    }
    return `${price.min} - ${price.max} ${price.currency}`;
  };

  // Obtener emoji según categoría
  const getCategoryEmoji = () => {
    const category = getCategory().toLowerCase();
    if (category.includes("music") || category.includes("música")) return "🎵";
    if (category.includes("sport") || category.includes("deporte")) return "⚽";
    if (category.includes("art") || category.includes("arte")) return "🎨";
    if (category.includes("theater") || category.includes("teatro"))
      return "🎭";
    if (category.includes("family") || category.includes("familia"))
      return "👨‍👩‍👧‍👦";
    return "🎪";
  };

  const time = formatTime();
  const genre = getGenre();
  const priceRange = getPriceRange();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Imagen del evento */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={getImage()}
          alt={event.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
          {getCategoryEmoji()} {getCategory()}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 space-y-3">
        {/* Título */}
        <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 leading-tight">
          {event.name}
        </h3>

        {/* Género */}
        {genre && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{genre}</p>
        )}

        {/* Fecha y hora */}
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <svg
            className="h-5 w-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm font-medium">
            {formatDate()}
            {time && <span className="ml-1">• {time}</span>}
          </span>
        </div>

        {/* Lugar */}
        <div className="flex items-start space-x-2 text-gray-700 dark:text-gray-300">
          <svg
            className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5"
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
          <span className="text-sm line-clamp-2">{getVenue()}</span>
        </div>

        {/* Precio */}
        {priceRange && (
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <svg
              className="h-5 w-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium">{priceRange}</span>
          </div>
        )}

        {/* Botón de compra */}
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-all duration-300 mt-4"
        >
          🎫 Ver entradas
        </a>
      </div>
    </div>
  );
}
