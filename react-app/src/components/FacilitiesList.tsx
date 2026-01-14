import { Link } from "react-router-dom";
import { Timestamp } from "./Timestamp";
import type { FacilityList } from "../types";

interface FacilitiesListProps {
  facilityList: FacilityList;
  showLink?: boolean;
  onToggleFavorite?: (facilityId: string) => void;
  isFavorite?: (facilityId: string) => boolean;
}

export const FacilitiesList = ({
  facilityList,
  showLink = true,
  onToggleFavorite,
  isFavorite,
}: FacilitiesListProps) => {
  return (
    <div className="mb-8">
      <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-5">
          <h2 className="text-2xl font-bold text-gray-900">
            {showLink && facilityList.areaId ? (
              <Link
                className="hover:text-primary-100 transition-colors inline-flex items-center"
                to={`/area/${facilityList.areaId}`}
              >
                {facilityList.listName}
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            ) : (
              facilityList.listName
            )}
          </h2>
        </div>

        {/* Facilities Grid */}
        <div className="p-3 sm:p-6">
          <div className="grid gap-3 sm:gap-4">
            {facilityList.items.map((facility) => (
              <div
                key={facility.id}
                className="group bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-3 sm:p-5 hover:shadow-card hover:border-primary-200 transition-all duration-200"
              >
                <div className="flex flex-col gap-3">
                  {/* Main content: Name & Stats */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                    {/* Facility Name & Timestamp */}
                    <div className="flex-1 min-w-0 flex items-start gap-2 sm:gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 break-words">
                          {facility.name}
                        </h3>
                        {String(facility.id).startsWith("990") && (
                          <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium mb-2 border border-amber-100 w-fit">
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                            Vapaiden paikkojen määrä saattaa näkyä väärin
                            tietolähteestä johtuen
                          </div>
                        )}
                        {facility.timestamp && (
                          <Timestamp timestamp={facility.timestamp} />
                        )}
                      </div>
                    {/* Star Icon */}
                    {onToggleFavorite && isFavorite && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onToggleFavorite(String(facility.id));
                        }}
                        className="flex-shrink-0 p-1 sm:p-2 hover:bg-primary-50 rounded-full transition-colors"
                        aria-label={
                          isFavorite(String(facility.id))
                            ? "Poista suosikeista"
                            : "Lisää suosikkeihin"
                        }
                      >
                        {isFavorite(String(facility.id)) ? (
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-yellow-500 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
                    {/* Available Spaces - Large for easy reading while driving */}
                    <div className="text-center">
                      <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-0.5 sm:mb-1 font-medium">
                        Vapaana
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                        <div
                          className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
                            String(facility.id).startsWith("990")
                              ? "text-red-600"
                              : (facility.spacesAvailable ?? 0) > 10
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

                    {/* Total Capacity - Show actual capacity if available, otherwise builtCapacity */}
                    {facility.capacity !== undefined && (
                      <div className="text-center border-l border-gray-200 pl-2 sm:pl-4 md:pl-6">
                        <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-0.5 sm:mb-1 font-medium">
                          Yhteensä
                        </div>
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
                          {facility.capacity}
                        </div>
                      </div>
                    )}

                    {/* Electric Capacity - Always visible when > 0 */}
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

                  {/* Footer: Address */}
                  {facility.address && (
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        📍 {facility.address}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
