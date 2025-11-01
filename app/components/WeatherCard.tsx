"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { WeatherData } from "../types/weather";

interface WeatherCardProps {
  city: string;
}

export default function WeatherCard({ city }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

        if (!apiKey) {
          throw new Error(
            "API key no configurada. Por favor, añade NEXT_PUBLIC_OPENWEATHER_API_KEY en .env.local"
          );
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
          )}&appid=${apiKey}&units=metric&lang=es`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Ciudad no encontrada");
          }
          throw new Error("Error al obtener datos del clima");
        }

        const data: WeatherData = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  // Estado de carga
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-red-200 dark:border-red-800 p-6">
        <div className="flex items-center space-x-3 text-red-600 dark:text-red-400">
          <svg
            className="h-6 w-6"
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
            <h3 className="font-semibold">Error al cargar el clima</h3>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-800 p-6 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <span>☀️</span>
            <span>Clima</span>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {weather.name}, {weather.sys.country}
          </p>
        </div>
        <Image
          src={iconUrl}
          alt={weather.weather[0].description}
          width={64}
          height={64}
          className="w-16 h-16"
        />
      </div>

      {/* Temperatura principal */}
      <div className="mb-4">
        <div className="flex items-baseline space-x-2">
          <span className="text-5xl font-bold text-gray-900 dark:text-white">
            {Math.round(weather.main.temp)}°
          </span>
          <span className="text-2xl text-gray-600 dark:text-gray-400">C</span>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 capitalize mt-1">
          {weather.weather[0].description}
        </p>
      </div>

      {/* Detalles */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-200 dark:border-blue-700">
        <div className="flex items-center space-x-2">
          <svg
            className="h-5 w-5 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sensación
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {Math.round(weather.main.feels_like)}°C
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <svg
            className="h-5 w-5 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Humedad</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {weather.main.humidity}%
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <svg
            className="h-5 w-5 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Viento</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {Math.round(weather.wind.speed * 3.6)} km/h
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <svg
            className="h-5 w-5 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
            />
          </svg>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Presión</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {weather.main.pressure} hPa
            </p>
          </div>
        </div>
      </div>

      {/* Máxima y mínima */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
        <div className="flex items-center space-x-1 text-sm">
          <span className="text-gray-500 dark:text-gray-400">↑</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {Math.round(weather.main.temp_max)}°
          </span>
        </div>
        <div className="flex items-center space-x-1 text-sm">
          <span className="text-gray-500 dark:text-gray-400">↓</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {Math.round(weather.main.temp_min)}°
          </span>
        </div>
      </div>
    </div>
  );
}
