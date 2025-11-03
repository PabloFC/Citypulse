export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo y descripción */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CityPulse
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              Dashboard urbano en tiempo real
            </p>
          </div>

          {/* Enlaces */}
          <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:contact@example.com"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Contacto
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} CityPulse. Todos los derechos reservados.
          </div>
        </div>

        {/* Powered by */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Created by PabloFC - Powered by Next.js, Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
