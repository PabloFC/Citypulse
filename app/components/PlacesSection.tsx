"use client";

import { useEffect, useState } from "react";
import {
  PlacesResponse,
  PlaceCategory,
  PlaceCategoryOption,
} from "../types/places";
import PlaceCard from "./PlaceCard";
import {
  MapPin,
  Building2,
  UtensilsCrossed,
  Trees,
  ShoppingBag,
} from "lucide-react";

interface PlacesSectionProps {
  city: string;
}

// Categorías de lugares disponibles con iconos SVG profesionales
const categories: PlaceCategoryOption[] = [
  { id: "tourist_attraction", label: "Turismo", icon: MapPin },
  { id: "museum", label: "Museos", icon: Building2 },
  { id: "restaurant", label: "Restaurantes", icon: UtensilsCrossed },
  { id: "park", label: "Parques", icon: Trees },
  { id: "shopping_mall", label: "Tiendas", icon: ShoppingBag },
];

export default function PlacesSection({ city }: PlacesSectionProps) {
  const [places, setPlaces] = useState<PlacesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<PlaceCategory>("tourist_attraction");

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      setError(null);

      try {
        // Llamar a nuestra API route en lugar de directamente a Google
        const response = await fetch(
          `/api/places?city=${encodeURIComponent(
            city
          )}&type=${selectedCategory}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Error al obtener lugares de interés"
          );
        }

        const placesData: PlacesResponse = await response.json();

        if (placesData.status === "ZERO_RESULTS") {
          setPlaces({ ...placesData, results: [] });
        } else if (placesData.status !== "OK") {
          throw new Error(
            placesData.error_message || "Error al obtener lugares"
          );
        } else {
          // Filtrar y ordenar lugares
          const filteredPlaces = placesData.results
            .filter((place) => place.rating && place.rating >= 3.5) // Solo lugares con buena puntuación
            .sort((a, b) => {
              // Priorizar por rating y número de reviews
              const scoreA =
                (a.rating || 0) * Math.log(a.user_ratings_total || 1);
              const scoreB =
                (b.rating || 0) * Math.log(b.user_ratings_total || 1);
              return scoreB - scoreA;
            })
            .slice(0, 6); // Limitar a 6 lugares

          setPlaces({ ...placesData, results: filteredPlaces });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchPlaces();
    }
  }, [city, selectedCategory]);

  // Estado de carga
  if (loading) {
    return (
      <div className="col-span-full mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <span>🗺️</span>
          <span>Lugares de Interés</span>
        </h2>

        {/* Filtros skeleton */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
            ></div>
          ))}
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="col-span-full mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <span>🗺️</span>
          <span>Lugares de Interés</span>
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-red-200 dark:border-red-800 p-6">
          <div className="flex items-center space-x-3 text-red-600 dark:text-red-400">
            <svg
              className="h-6 w-6 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-semibold">Error al cargar lugares</h3>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!places) return null;

  return (
    <div className="col-span-full mb-8">
      {/* Título con barra de color */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-1 h-8 bg-gradient-to-b from-teal-500 to-green-500 rounded-full"></div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Lugares de Interés
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">
          Descubre los mejores lugares para visitar en {city}
        </p>
      </div>

      {/* Filtros por categoría */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => {
          const IconComponent = category.icon as React.ComponentType<{
            className?: string;
          }>;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid de lugares */}
      {places.results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.results.map((place) => (
            <PlaceCard key={place.place_id} place={place} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8 text-center">
          <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No se encontraron lugares en esta categoría
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Prueba con otra categoría o ciudad
          </p>
        </div>
      )}
    </div>
  );
}
