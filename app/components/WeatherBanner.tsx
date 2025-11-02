"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { WeatherData } from "../types/weather";

interface WeatherBannerProps {
  city: string;
}

export default function WeatherBanner({ city }: WeatherBannerProps) {
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
      <div className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6">
        <div className="animate-pulse flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-white/20 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-6 bg-white/20 rounded w-32"></div>
              <div className="h-4 bg-white/20 rounded w-24"></div>
            </div>
          </div>
          <div className="h-16 bg-white/20 rounded w-48"></div>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="mb-8 bg-red-500 rounded-2xl shadow-xl p-6">
        <div className="flex items-center space-x-3 text-white">
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
            <h3 className="font-semibold">Error al cargar el clima</h3>
            <p className="text-sm text-white/90">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  // Determinar gradiente según condición climática
  const getWeatherGradient = () => {
    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes("clear")) {
      return "from-blue-400 via-blue-500 to-blue-600"; // Despejado
    }
    if (condition.includes("cloud")) {
      return "from-gray-400 via-gray-500 to-gray-600"; // Nublado
    }
    if (condition.includes("rain") || condition.includes("drizzle")) {
      return "from-slate-500 via-slate-600 to-slate-700"; // Lluvia
    }
    if (condition.includes("snow")) {
      return "from-cyan-300 via-blue-400 to-blue-500"; // Nieve
    }
    if (condition.includes("thunder")) {
      return "from-purple-600 via-purple-700 to-purple-800"; // Tormenta
    }
    return "from-blue-500 via-purple-500 to-purple-600"; // Por defecto
  };

  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div
      className={`mb-8 bg-gradient-to-r ${getWeatherGradient()} rounded-2xl shadow-xl overflow-hidden`}
    >
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Sección izquierda: Ciudad y clima principal */}
          <div className="flex items-center space-x-4">
            {/* Icono del clima */}
            <div className="relative h-20 w-20 md:h-24 md:w-24 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center">
              <Image
                src={weatherIconUrl}
                alt={weather.weather[0].description}
                width={80}
                height={80}
                className="drop-shadow-lg"
              />
            </div>

            {/* Info de la ciudad y temperatura */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
                {weather.name}
              </h2>
              <p className="text-lg md:text-xl text-white/90 capitalize">
                {weather.weather[0].description}
              </p>
            </div>
          </div>

          {/* Sección derecha: Temperatura y detalles */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* Temperatura principal */}
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white">
                {Math.round(weather.main.temp)}°
              </div>
              <div className="text-sm text-white/80 mt-1">
                Sensación {Math.round(weather.main.feels_like)}°
              </div>
            </div>

            {/* Grid de detalles */}
            <div className="grid grid-cols-2 gap-4 text-white">
              {/* Humedad */}
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <svg
                  className="h-5 w-5"
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
                  <div className="text-xs opacity-80">Humedad</div>
                  <div className="font-semibold">{weather.main.humidity}%</div>
                </div>
              </div>

              {/* Viento */}
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <svg
                  className="h-5 w-5"
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
                  <div className="text-xs opacity-80">Viento</div>
                  <div className="font-semibold">
                    {Math.round(weather.wind.speed * 3.6)} km/h
                  </div>
                </div>
              </div>

              {/* Presión */}
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <div>
                  <div className="text-xs opacity-80">Presión</div>
                  <div className="font-semibold">
                    {weather.main.pressure} hPa
                  </div>
                </div>
              </div>

              {/* Visibilidad */}
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <div>
                  <div className="text-xs opacity-80">Visibilidad</div>
                  <div className="font-semibold">
                    {weather.visibility
                      ? `${(weather.visibility / 1000).toFixed(1)} km`
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
