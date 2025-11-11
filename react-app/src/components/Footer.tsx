export const Footer = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm mb-2">
              Liikennetietojen lähde:{" "}
              <a
                href="https://www.digitraffic.fi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 font-medium"
              >
                Fintraffic / digitraffic.fi
              </a>
            </p>
            <p className="text-xs text-gray-400">
              Lisenssi CC 4.0 BY. Liityntäpysäköinti.fi:n ylläpito ei vastaa
              tietojen oikeellisuudesta.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              © 2025 liityntäpysäköinti.fi
            </p>
          </div>

          <button
            onClick={refreshPage}
            className="group bg-gray-800 hover:bg-primary-600 text-gray-300 hover:text-white p-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            title="Päivitä sivu"
          >
            <svg
              className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};
