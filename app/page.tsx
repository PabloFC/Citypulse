export default function Home() {
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

        {/* Placeholder para búsqueda */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              🔍 El buscador de ciudades aparecerá aquí en el siguiente paso
            </p>
          </div>
        </div>

        {/* Placeholder para tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold mb-2">☀️ Clima</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Información del clima en tiempo real
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold mb-2">💨 Calidad del Aire</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Índice de calidad del aire (AQI)
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold mb-2">📰 Noticias</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Últimas noticias locales
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
