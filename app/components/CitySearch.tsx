"use client";

import { useState, useRef, useEffect } from "react";

interface CitySearchProps {
  onCitySelect: (city: string) => void;
}

// Lista de ciudades populares como sugerencias
const popularCities = [
  // España - Principales y turísticas
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Zaragoza",
  "Málaga",
  "Marbella",
  "Granada",
  "Bilbao",
  "Córdoba",
  "Palma de Mallorca",
  "Alicante",
  "Murcia",
  "San Sebastián",
  "Toledo",
  "Salamanca",
  "Santiago de Compostela",
  "Cádiz",
  "Ibiza",
  "Benidorm",
  "Tarragona",
  "Santander",
  "Gijón",
  "Oviedo",
  "A Coruña",
  "Pamplona",
  "Valladolid",
  "Vigo",
  "Segovia",
  "Ávila",
  // Europa
  "Londres",
  "París",
  "Berlín",
  "Roma",
  "Ámsterdam",
  "Lisboa",
  "Oporto",
  "Viena",
  "Praga",
  "Budapest",
  "Dubrovnik",
  "Estambul",
  "Atenas",
  "Copenhague",
  "Estocolmo",
  "Oslo",
  "Helsinki",
  "Bruselas",
  "Múnich",
  "Hamburgo",
  // América
  "Nueva York",
  "Los Ángeles",
  "Chicago",
  "Miami",
  "San Francisco",
  "Las Vegas",
  "Washington",
  "Boston",
  "Seattle",
  "Orlando",
  "Ciudad de México",
  "Cancún",
  "Buenos Aires",
  "São Paulo",
  "Río de Janeiro",
  "Lima",
  "Bogotá",
  "Santiago",
  "Cartagena",
  "Cusco",
  // Asia
  "Tokio",
  "Seúl",
  "Pekín",
  "Shanghái",
  "Hong Kong",
  "Singapur",
  "Bangkok",
  "Dubái",
  "Bali",
  "Kuala Lumpur",
  // Oceanía
  "Sídney",
  "Melbourne",
  "Brisbane",
  "Auckland",
  "Wellington",
  // Canadá
  "Toronto",
  "Vancouver",
  "Montreal",
  "Quebec",
  "Calgary",
];

export default function CitySearch({ onCitySelect }: CitySearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtrar ciudades según el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filtered = popularCities.filter((city) =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredCities([]);
      setIsOpen(false);
    }
    setSelectedIndex(-1);
  }, [searchTerm]);

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Manejar navegación con teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCities.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && filteredCities[selectedIndex]) {
          handleCitySelect(filteredCities[selectedIndex]);
        } else if (searchTerm.trim()) {
          handleCitySelect(searchTerm.trim());
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleCitySelect = (city: string) => {
    setSearchTerm(city);
    setIsOpen(false);
    onCitySelect(city);
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleCitySelect(searchTerm.trim());
    }
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          {/* Icono de búsqueda */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
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
          </div>

          {/* Input de búsqueda */}
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => searchTerm && setIsOpen(filteredCities.length > 0)}
            placeholder="Buscar ciudad... (ej: Madrid, París, Nueva York)"
            className="w-full pl-12 pr-12 py-4 text-lg rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />

          {/* Botón de limpiar */}
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Dropdown de sugerencias */}
      {isOpen && filteredCities.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl max-h-64 overflow-y-auto">
          <div className="py-2">
            {filteredCities.map((city, index) => (
              <button
                key={city}
                onClick={() => handleCitySelect(city)}
                className={`w-full text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors ${
                  index === selectedIndex ? "bg-blue-50 dark:bg-gray-700" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-900 dark:text-gray-100">
                    {city}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje cuando no hay resultados */}
      {isOpen && searchTerm && filteredCities.length === 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-4">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No se encontraron ciudades. Presiona Enter para buscar &quot;
            {searchTerm}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
