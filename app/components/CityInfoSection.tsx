"use client";

import { useEffect, useState } from "react";
import { CityInfo, CityInfoResponse } from "../types/cityinfo";

interface CityInfoSectionProps {
  city: string;
}

export default function CityInfoSection({ city }: CityInfoSectionProps) {
  const [cityInfo, setCityInfo] = useState<CityInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCityInfo = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/cityinfo?city=${encodeURIComponent(city)}`
        );

        const data: CityInfoResponse = await response.json();

        if (!data.success || !data.data) {
          // Si no hay datos, simplemente no mostrar nada
          setError("No data");
          return;
        }

        setCityInfo(data.data);
      } catch (err) {
        setError("error");
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchCityInfo();
    }
  }, [city]);

  // No mostrar nada si está cargando, hay error o no hay datos
  if (loading || error || !cityInfo) {
    return null;
  }

  // Formatear población
  const formatPopulation = (pop: number) => {
    if (pop >= 1000000) {
      return `${(pop / 1000000).toFixed(1)}M`;
    }
    if (pop >= 1000) {
      return `${Math.round(pop / 1000)}K`;
    }
    return pop.toString();
  };

  return (
    <div className="mb-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Header con degradado */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {cityInfo.name}
              </h2>
              {cityInfo.nickname && (
                <p className="text-blue-100 text-sm italic">
                  &ldquo;{cityInfo.nickname}&rdquo;
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">
                {formatPopulation(cityInfo.population)}
              </div>
              <div className="text-blue-100 text-sm">habitantes</div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Stats rápidas */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {cityInfo.founded && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-2xl">�️</span>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Fundada
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {cityInfo.founded}
                  </p>
                </div>
              </div>
            )}
            {cityInfo.altitude && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-2xl">⛰️</span>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Altitud
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {cityInfo.altitude}m
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Famosa por */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <span className="mr-2">🌟</span>
              Famosa por
            </h3>
            <div className="flex flex-wrap gap-2">
              {cityInfo.famousFor.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Dato curioso */}
          <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border-l-4 border-amber-400 dark:border-amber-600">
            <div className="flex items-start space-x-3">
              <span className="text-2xl flex-shrink-0">💡</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
                  ¿Sabías que...?
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {cityInfo.funFact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
