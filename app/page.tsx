"use client";

import { useState } from "react";
import CitySearch from "./components/CitySearch";
import WeatherCard from "./components/WeatherCard";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    console.log("Ciudad seleccionada:", city);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CityPulse
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Dashboard urbano en tiempo real
          </p>
          <p className="text-base text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
            Monitorea el clima, calidad del aire y noticias locales de cualquier
            ciudad del mundo
          </p>
        </div>

        {/* Buscador de ciudades */}
        <div className="max-w-2xl mx-auto mb-12">
          <CitySearch onCitySelect={handleCitySelect} />
        </div>

        {/* Dashboard - Solo se muestra si hay una ciudad seleccionada */}
        {selectedCity ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Weather Card */}
            <WeatherCard city={selectedCity} />

            {/* Placeholder para Calidad del Aire */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold mb-2">
                💨 Calidad del Aire
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Índice de calidad del aire (AQI)
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
                Siguiente paso...
              </p>
            </div>

            {/* Placeholder para Noticias */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold mb-2">📰 Noticias</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Últimas noticias locales
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
                Siguiente paso...
              </p>
            </div>
          </div>
        ) : (
          /* Mensaje inicial cuando no hay ciudad seleccionada */
          <div className="text-center py-12">
            <div className="inline-block p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-gray-600 dark:text-gray-400">
                Busca una ciudad para ver su información en tiempo real
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
