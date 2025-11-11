import { useParams, Navigate, Link } from "react-router-dom";
import { useAreaFacilities } from "../hooks/useFacilities";
import { FacilitiesList } from "../components/FacilitiesList";
import { useFavorites } from "../hooks/useFavorites";

const VALID_AREA_IDS = ["001", "002", "003", "004"];

export const AreaFacilities = () => {
  const { id } = useParams<{ id: string }>();

  if (!id || !VALID_AREA_IDS.includes(id)) {
    return <Navigate to="/" replace />;
  }

  const { list, loading } = useAreaFacilities(id);
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-6 group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Takaisin etusivulle
        </Link>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Ladataan tietoja...</p>
          </div>
        ) : list ? (
          <FacilitiesList
            facilityList={list}
            showLink={false}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        ) : (
          <Navigate to="/" replace />
        )}
      </div>
    </div>
  );
};
