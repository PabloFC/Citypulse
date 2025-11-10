"use client";

import { useState, useEffect } from "react";
import { MapPin, Home, ChevronRight, X } from "lucide-react";

interface CityNavBarProps {
  city: string;
  onChangeCity: () => void;
}

export default function CityNavBar({ city, onChangeCity }: CityNavBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar la barra después de hacer scroll de 200px
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Navigation Bar */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 transition-all duration-300 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              {/* Breadcrumbs */}
              <div className="flex items-center space-x-2 text-sm">
                <button
                  onClick={onChangeCity}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Home className="w-4 h-4" />
                </button>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {city}
                  </span>
                </div>
              </div>

              {/* Change City Button */}
              <button
                onClick={onChangeCity}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                <X className="w-4 h-4" />
                <span>Cambiar ciudad</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
