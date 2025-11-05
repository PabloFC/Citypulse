"use client";

import { useState, useEffect } from "react";
import CitySearch from "./components/CitySearch";
import WeatherBanner from "./components/WeatherBanner";
import CityInfoSection from "./components/CityInfoSection";
import PlacesSection from "./components/PlacesSection";
import EventsSection from "./components/EventsSection";
import NewsSection from "./components/NewsSection";
import PopularCityCard from "./components/PopularCityCard";

// Ciudades populares destacadas
const featuredCities = [
  {
    city: "Madrid",
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
    description: "Capital de España",
    highlights: ["🏛️ Museos", "🌳 Retiro", "🍽️ Gastronomía"],
  },
  {
    city: "Barcelona",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
    description: "Ciudad Condal",
    highlights: ["🏰 Sagrada Familia", "🏖️ Playas", "🎨 Gaudí"],
  },
  {
    city: "Valencia",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    description: "Ciudad de las Artes",
    highlights: ["🎭 Ciudad Artes", "🥘 Paella", "🎆 Fallas"],
  },
  {
    city: "Sevilla",
    image:
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80",
    description: "Capital andaluza",
    highlights: ["🕌 Alcázar", "🌸 Primavera", "💃 Flamenco"],
  },
];

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [recentCities, setRecentCities] = useState<string[]>([]);

  // Cargar última ciudad y historial al montar
  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    const recent = localStorage.getItem("recentCities");

    if (recent) {
      setRecentCities(JSON.parse(recent));
    }

    // Opcional: cargar automáticamente la última ciudad
    // if (lastCity) {
    //   setSelectedCity(lastCity);
    // }
  }, []);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);

    // Guardar en localStorage
    localStorage.setItem("lastCity", city);

    // Actualizar historial (máximo 5 ciudades)
    const updatedRecent = [
      city,
      ...recentCities.filter((c) => c !== city),
    ].slice(0, 5);
    setRecentCities(updatedRecent);
    localStorage.setItem("recentCities", JSON.stringify(updatedRecent));

    // Smooth scroll al contenido
    setTimeout(() => {
      window.scrollTo({ top: 400, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center space-y-5 mb-16">
          <div className="inline-block">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CityPulse
            </h1>
            <div className="mt-3 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto w-20"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium">
            Tu guía completa de ciudades españolas
          </p>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Descubre el clima actual, lugares de interés, eventos próximos y
            noticias locales de las ciudades más importantes de España
          </p>
          {!selectedCity && (
            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <svg
                  className="w-4 h-4 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span>Empieza buscando una ciudad abajo</span>
              </div>
            </div>
          )}
        </div>

        {/* Buscador de ciudades */}
        <div className="max-w-2xl mx-auto mb-12">
          <CitySearch onCitySelect={handleCitySelect} />
        </div>

        {/* Dashboard - Solo se muestra si hay una ciudad seleccionada */}
        {selectedCity ? (
          <div className="space-y-8 animate-fadeIn">
            {/* 1. Weather Banner - Info práctica inmediata */}
            <div className="animate-slideUp" style={{ animationDelay: "0.1s" }}>
              <WeatherBanner city={selectedCity} />
            </div>

            {/* 2. Places Section - Acción inmediata: ¿Qué ver/hacer? */}
            <div className="animate-slideUp" style={{ animationDelay: "0.2s" }}>
              <PlacesSection city={selectedCity} />
            </div>

            {/* 3. Grid de Eventos y Noticias - ¿Qué está pasando? */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slideUp"
              style={{ animationDelay: "0.3s" }}
            >
              {/* Events Section */}
              <EventsSection city={selectedCity} />

              {/* News Section */}
              <NewsSection city={selectedCity} />
            </div>

            {/* 4. City Info Section - Contexto cultural (al final) */}
            <div className="animate-slideUp" style={{ animationDelay: "0.4s" }}>
              <CityInfoSection city={selectedCity} />
            </div>
          </div>
        ) : (
          /* Estado inicial mejorado con ciudades destacadas */
          <div className="space-y-12">
            {/* Ciudades recientes (si existen) */}
            {recentCities.length > 0 && (
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center space-x-2 mb-4">
                  <svg
                    className="w-5 h-5 text-gray-600 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Ciudades recientes
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:shadow-md"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Ciudades destacadas */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Explora ciudades populares
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Descubre clima, lugares imprescindibles, eventos y noticias de
                  cada ciudad
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredCities.map((featured) => (
                  <PopularCityCard
                    key={featured.city}
                    city={featured.city}
                    image={featured.image}
                    description={featured.description}
                    highlights={featured.highlights}
                    onSelect={handleCitySelect}
                  />
                ))}
              </div>
            </div>

            {/* CTA adicional */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <svg
                  className="w-5 h-5"
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
                <span className="text-sm">
                  O busca cualquier ciudad española en el buscador de arriba
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
