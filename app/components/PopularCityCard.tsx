"use client";

interface PopularCityCardProps {
  city: string;
  image: string;
  description: string;
  highlights: string[];
  onSelect: (city: string) => void;
}

export default function PopularCityCard({
  city,
  image,
  description,
  highlights,
  onSelect,
}: PopularCityCardProps) {
  return (
    <button
      onClick={() => onSelect(city)}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
    >
      {/* Imagen de fondo */}
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
        {/* Overlay con degradado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Nombre de la ciudad */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-1">{city}</h3>
          <p className="text-sm text-gray-200">{description}</p>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {highlights.map((highlight, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between text-blue-600 dark:text-blue-400 font-semibold">
          <span>Explorar {city}</span>
          <svg
            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
