"use client";

import { useEffect, useState } from "react";
import { AirQualityData, GeoData } from "../types/airQuality";

interface AirQualityCardProps {
  city: string;
}

// Mapeo de AQI a texto y color
const aqiMap = {
  1: {
    text: "Bueno",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-900/30",
  },
  2: {
    text: "Aceptable",
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
  },
  3: {
    text: "Moderado",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-100 dark:bg-orange-900/30",
  },
  4: {
    text: "Malo",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-900/30",
  },
  5: {
    text: "Muy Malo",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-900/30",
  },
};

export default function AirQualityCard({ city }: AirQualityCardProps) {
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAirQuality = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        if (!apiKey) {
          throw new Error("API key no configurada");
        }

        // 1. Obtener coordenadas de la ciudad
        const geoResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            city
          )}&limit=1&appid=${apiKey}`
        );
        if (!geoResponse.ok) throw new Error("Error al obtener coordenadas");
        const geoData: GeoData[] = await geoResponse.json();
        if (geoData.length === 0)
          throw new Error("Ciudad no encontrada para calidad del aire");

        const { lat, lon } = geoData[0];

        // 2. Obtener calidad del aire con las coordenadas
        const airResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        if (!airResponse.ok)
          throw new Error("Error al obtener calidad del aire");
        const airData: AirQualityData = await airResponse.json();

        setAirQuality(airData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchAirQuality();
    }
  }, [city]);

  // Estado de carga
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4"></div>
          <div className="flex items-center justify-center mb-4">
            <div className="h-24 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
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
            <h3 className="font-semibold">Error al cargar calidad del aire</h3>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!airQuality || airQuality.list.length === 0) return null;

  const aqi = airQuality.list[0].main.aqi;
  const { text, color, bg } = aqiMap[aqi];
  const components = airQuality.list[0].components;

  return (
    <div
      className={`bg-gradient-to-br ${bg} rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300`}
    >
      {/* Header */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2 mb-4">
        <span>💨</span>
        <span>Calidad del Aire</span>
      </h3>

      {/* Círculo de AQI */}
      <div className="flex flex-col items-center justify-center text-center mb-4">
        <div
          className={`relative w-32 h-32 rounded-full flex items-center justify-center ${bg}`}
        >
          <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full"></div>
          <div className="relative z-10">
            <p className="text-xs text-gray-500 dark:text-gray-400">AQI</p>
            <p className={`text-4xl font-bold ${color}`}>{aqi}</p>
            <p className={`text-lg font-semibold ${color}`}>{text}</p>
          </div>
        </div>
      </div>

      {/* Detalles de componentes */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <ComponentDetail name="PM2.5" value={components.pm2_5} unit="μg/m³" />
        <ComponentDetail name="PM10" value={components.pm10} unit="μg/m³" />
        <ComponentDetail name="O₃" value={components.o3} unit="μg/m³" />
        <ComponentDetail name="NO₂" value={components.no2} unit="μg/m³" />
        <ComponentDetail name="SO₂" value={components.so2} unit="μg/m³" />
        <ComponentDetail name="CO" value={components.co} unit="μg/m³" />
      </div>
    </div>
  );
}

// Componente para mostrar cada detalle
function ComponentDetail({
  name,
  value,
  unit,
}: {
  name: string;
  value: number;
  unit: string;
}) {
  return (
    <div className="flex justify-between items-baseline text-sm">
      <p className="text-gray-600 dark:text-gray-400">{name}</p>
      <p className="font-semibold text-gray-900 dark:text-white">
        {value.toFixed(2)} <span className="text-xs text-gray-500">{unit}</span>
      </p>
    </div>
  );
}
