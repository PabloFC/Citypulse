"use client";

import { useEffect, useState } from "react";
import { NewsResponse } from "../types/news";
import NewsCard from "./NewsCard";

interface NewsSectionProps {
  city: string;
}

export default function NewsSection({ city }: NewsSectionProps) {
  const [news, setNews] = useState<NewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        // Llamar a nuestra API Route en lugar de GNews directamente
        const response = await fetch(
          `/api/news?city=${encodeURIComponent(city)}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error al obtener noticias");
        }

        const newsData: NewsResponse = await response.json();

        // Filtrar noticias que realmente contengan el nombre de la ciudad
        const filteredArticles = newsData.articles.filter((article) => {
          const titleLower = article.title.toLowerCase();
          const descLower = (article.description || "").toLowerCase();
          const cityLower = city.toLowerCase();
          return (
            titleLower.includes(cityLower) || descLower.includes(cityLower)
          );
        });

        // Ordenar por fecha de publicación (las más recientes primero) para obtener las más importantes
        const sortedArticles = filteredArticles.sort((a, b) => {
          const dateA = new Date(a.publishedAt).getTime();
          const dateB = new Date(b.publishedAt).getTime();
          return dateB - dateA; // Descendente (más reciente primero)
        });

        setNews({
          ...newsData,
          articles: sortedArticles.slice(0, 3), // Limitar a 3 noticias más importantes
          totalResults: sortedArticles.length,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchNews();
    }
  }, [city]);

  // Estado de carga
  if (loading) {
    return (
      <div className="col-span-full">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-amber-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Noticias Locales
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 ml-4">
            Últimas noticias de {city}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
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
      <div className="col-span-full">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-amber-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Noticias Locales
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 ml-4">
            Últimas noticias de {city}
          </p>
        </div>
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
              <h3 className="font-semibold">Error al cargar noticias</h3>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sin resultados
  if (!news || news.articles.length === 0) {
    return (
      <div className="col-span-full">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-amber-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Noticias Locales
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 ml-4">
            Últimas noticias de {city}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-yellow-200 dark:border-yellow-800 p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-yellow-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
          <p className="text-gray-600 dark:text-gray-400 mb-2 font-semibold">
            No se encontraron noticias relevantes para &quot;{city}&quot;
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Intenta buscar una ciudad más grande o popular
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-full">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-amber-600 rounded-full"></div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Noticias Locales
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 ml-4">
          Últimas noticias de {city}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.articles.map((article, index) => (
          <NewsCard key={`${article.url}-${index}`} article={article} />
        ))}
      </div>
    </div>
  );
}
