import type { FacilityList, FacilityListItem } from "../types";
import { Timestamp } from "./Timestamp";

interface FavoritesFacilitiesProps {
  lists: FacilityList[];
  favorites: string[];
  onToggleFavorite: (facilityId: string) => void;
}

export const FavoritesFacilities = ({
  lists,
  favorites,
  onToggleFavorite,
}: FavoritesFacilitiesProps) => {
  // Get all facilities from all lists
  const allFacilities: FacilityListItem[] = lists.flatMap((list) => list.items);

  // Filter to only show favorites
  const favoriteFacilities = allFacilities.filter((facility) =>
    favorites.includes(String(facility.id))
  );

  if (favoriteFacilities.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-4 sm:pb-6">
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl sm:rounded-3xl shadow-soft p-3 sm:p-6 border-2 border-yellow-200">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            Suosikkipysäköinnit ({favoriteFacilities.length})
          </h2>
        </div>

        <div className="grid gap-3">
          {favoriteFacilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-white border border-yellow-300 rounded-2xl p-3 sm:p-5 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                {/* Facility Name & Timestamp */}
                <div className="flex-1 min-w-0 flex items-start gap-2 sm:gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 break-words">
                      {facility.name}
                    </h3>
                    {facility.timestamp && (
                      <Timestamp timestamp={facility.timestamp} />
                    )}
                  </div>
                  {/* Remove from favorites button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onToggleFavorite(String(facility.id));
                    }}
                    className="flex-shrink-0 p-1 sm:p-2 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Poista suosikeista"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 hover:text-red-500 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
                  {/* Available Spaces */}
                  <div className="text-center">
                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-0.5 sm:mb-1 font-medium">
                      Vapaana
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                      <div
                        className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
                          (facility.spacesAvailable ?? 0) > 10
                            ? "text-green-600"
                            : (facility.spacesAvailable ?? 0) > 5
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {facility.spacesAvailable ?? "-"}
                      </div>
                      <div className="flex flex-col">
                        <svg
                          className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 ${
                            (facility.spacesAvailable ?? 0) > 10
                              ? "text-green-500"
                              : (facility.spacesAvailable ?? 0) > 5
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 11h14c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2h-1c0 1.1-.9 2-2 2s-2-.9-2-2h-4c0 1.1-.9 2-2 2s-2-.9-2-2H5c-1.1 0-2-.9-2-2v-5c0-1.1.9-2 2-2zm1-6l1.5-4.5h9L18 5v6h-2V6H8v5H6V5z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Total Capacity */}
                  <div className="text-center border-l border-gray-200 pl-2 sm:pl-4 md:pl-6">
                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-0.5 sm:mb-1 font-medium">
                      Kapasiteetti
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
                      {facility.builtCapacityCar ?? "-"}
                    </div>
                  </div>

                  {/* Electric Capacity */}
                  {facility.builtCapacityElectricCar !== undefined &&
                    facility.builtCapacityElectricCar > 0 && (
                      <div className="text-center border-l border-gray-200 pl-2 sm:pl-4 md:pl-6">
                        <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-0.5 sm:mb-1 font-medium flex items-center justify-center gap-0.5 sm:gap-1">
                          <svg
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          <span>Lataus</span>
                        </div>
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
                          {facility.builtCapacityElectricCar}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
