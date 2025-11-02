"use client";

import { useEffect, useState } from "react";
import { TicketmasterResponse } from "../types/events";
import EventCard from "./EventCard";

interface EventsSectionProps {
  city: string;
  countryCode?: string; // Opcional: para mejorar la búsqueda
}

// Lista de ciudades españolas con eventos de Ticketmaster
const SPANISH_CITIES_WITH_EVENTS = [
  // Principales ciudades
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Zaragoza",
  "Málaga",
  "Murcia",
  "Palma",
  "Las Palmas de Gran Canaria",
  "Bilbao",

  // Ciudades turísticas y culturales
  "Alicante",
  "Córdoba",
  "Valladolid",
  "Vigo",
  "Gijón",
  "Hospitalet de Llobregat",
  "Vitoria",
  "Granada",
  "A Coruña",
  "Elche",
  "Oviedo",
  "Terrassa",
  "Badalona",
  "Cartagena",
  "Jerez de la Frontera",
  "Sabadell",
  "Santa Cruz de Tenerife",
  "Pamplona",
  "Almería",
  "Leganés",
  "Fuenlabrada",
  "Santander",

  // Ciudades medianas con actividad cultural
  "Burgos",
  "Albacete",
  "Castellón de la Plana",
  "Alcalá de Henares",
  "Getafe",
  "Salamanca",
  "Logroño",
  "San Sebastián",
  "Badajoz",
  "Huelva",
  "Lleida",
  "Tarragona",
  "Marbella",
  "León",
  "Cádiz",
  "Dos Hermanas",
  "Torrejón de Ardoz",
  "Parla",
  "Reus",
  "Mataró",
  "Alcorcón",
  "Toledo",
  "Girona",
  "Ávila",
  "Cáceres",
  "Segovia",
  "Cuenca",
  "Jaén",
  "Guadalajara",
  "Ourense",
  "Palencia",
  "Zamora",
];

export default function EventsSection({
  city,
  countryCode = "ES",
}: EventsSectionProps) {
  const [eventsData, setEventsData] = useState<TicketmasterResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      // Verificar si es una ciudad española con eventos
      const normalizedCity = city
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const isSupportedCity = SPANISH_CITIES_WITH_EVENTS.some(
        (supportedCity) =>
          supportedCity
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") === normalizedCity
      );

      // Si no es una ciudad soportada, no mostrar la sección
      if (!isSupportedCity) {
        setShouldShow(false);
        setLoading(false);
        return;
      }

      setShouldShow(true);

      try {
        const apiKey = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY;

        if (!apiKey) {
          throw new Error(
            "API key de Ticketmaster no configurada. Añade NEXT_PUBLIC_TICKETMASTER_API_KEY en .env.local"
          );
        }

        // Construir URL con parámetros - Traer más eventos para filtrar los de baja calidad
        const params = new URLSearchParams({
          apikey: apiKey,
          city: city,
          countryCode: "ES", // Forzar España
          size: "10", // Traer 10 eventos para filtrar y quedarnos con 3 de calidad
          sort: "date,asc", // Ordenar por fecha ascendente (próximos eventos)
          locale: "es-ES",
        });

        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?${params}`
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("API key inválida o no autorizada");
          }
          if (response.status === 429) {
            throw new Error("Has superado el límite de solicitudes");
          }
          throw new Error("Error al obtener eventos");
        }

        const data: TicketmasterResponse = await response.json();

        // Filtrar eventos con imágenes de alta calidad
        if (data._embedded?.events) {
          const highQualityEvents = data._embedded.events.filter((event) => {
            if (!event.images || event.images.length === 0) return false;

            // Buscar imágenes de buena calidad (ancho >= 640px)
            const hasHighQualityImage = event.images.some(
              (img) => img.width >= 640
            );
            return hasHighQualityImage;
          });

          // Limitar a 3 eventos de calidad
          setEventsData({
            ...data,
            _embedded: {
              events: highQualityEvents.slice(0, 3),
            },
            page: {
              ...data.page,
              totalElements: highQualityEvents.length,
            },
          });
        } else {
          setEventsData(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchEvents();
    }
  }, [city, countryCode]);

  // Si no es una ciudad soportada, no renderizar nada
  if (!shouldShow) {
    return null;
  }

  // Estado de carga
  if (loading) {
    return (
      <div className="col-span-full">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <span>🎭</span>
          <span>Eventos Próximos</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <span>🎭</span>
          <span>Eventos Próximos</span>
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
              <h3 className="font-semibold">Error al cargar eventos</h3>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sin resultados
  if (
    !eventsData?._embedded?.events ||
    eventsData._embedded.events.length === 0
  ) {
    return (
      <div className="col-span-full">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <span>🎭</span>
          <span>Eventos Próximos</span>
        </h2>
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
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            />
          </svg>
          <p className="text-gray-600 dark:text-gray-400 mb-2 font-semibold">
            No se encontraron eventos próximos en &quot;{city}&quot;
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Intenta buscar una ciudad más grande o revisa más tarde
          </p>
        </div>
      </div>
    );
  }

  const events = eventsData._embedded.events;

  return (
    <div className="col-span-full">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
        <span>🎭</span>
        <span>Eventos Próximos</span>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
          ({eventsData.page.totalElements} eventos disponibles)
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
