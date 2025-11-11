import { Link } from "react-router-dom";
import { useAllFacilityDetails } from "../hooks/useFacilities";
import { FacilitiesList } from "../components/FacilitiesList";
import { FavoritesFacilities } from "../components/FavoritesFacilities";
import { useFavorites } from "../hooks/useFavorites";

export const Facilities = () => {
  const { lists, loading } = useAllFacilityDetails();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <>
      <div className="banner-image">
        <div className="text-center text-white px-4">
          {/* <h1 className="text-4xl md:text-6xl font-bold mb-3 drop-shadow-lg">
            Liityntäpysäköinti
          </h1>
          <p className="text-lg md:text-xl font-medium drop-shadow-md">
            Reaaliaikainen seuranta HSL-alueella
          </p> */}
        </div>
      </div>

      <div className="bg-gradient-to-b from-gray-50 to-white pt-6 sm:pt-8">
        {/* Favorites Section */}
        {!loading && (
          <FavoritesFacilities
            lists={lists}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {/* Quick Navigation */}
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
          <div className="bg-white rounded-3xl shadow-soft p-4 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Valitse alue
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {lists.map((item) => (
                <Link
                  key={item.areaId}
                  to={`/area/${item.areaId}`}
                  className="group relative bg-gradient-to-br from-primary-500 to-primary-700 text-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-accent rounded-full animate-pulse"></div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{item.listName}</h3>
                  <p className="text-primary-100 text-xs sm:text-sm">
                    {item.items.length} pysäköintialuetta
                  </p>
                  <div className="mt-2 sm:mt-4 flex items-center text-xs sm:text-sm font-medium">
                    Näytä tiedot
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
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
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Reaaliaikainen tieto
              </h3>
              <p className="text-gray-600 text-sm">
                Seuraa pysäköintipaikkojen saatavuutta reaaliajassa ja suunnittele
                matkasi tehokkaasti!
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-accent-dark"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ekologinen valinta
              </h3>
              <p className="text-gray-600 text-sm">
                Yhdistä auto ja julkinen liikenne – vähennä ruuhkia ja päästöjä
                ympäristöystävällisesti.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Säästä aikaa
              </h3>
              <p className="text-gray-600 text-sm">
                Tarkista paikkatilanne etukäteen – ei tarvetta etsiä vapaata
                parkkipaikkaa paikan päällä.
              </p>
            </div>
          </div>
        </div>

        {/* Facilities List */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Kaikki pysäköintialueet
          </h2>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-medium">Ladataan tietoja...</p>
            </div>
          ) : (
            <>
              {lists.map((item) => (
                <FacilitiesList
                  key={item.areaId}
                  facilityList={item}
                  showLink={true}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                />
              ))}

              <div className="bg-gradient-to-br from-primary-50 to-accent-light rounded-3xl p-8 mt-12 shadow-soft">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Lisätietoja liityntäpysäköinnistä
                </h2>
                <p className="text-gray-700 mb-6">
                  Liityntäpysköinti.fi on yksityisen osapuolen ylläpitämä sivusto
                  ja se ei ole liitoksissa HSL:n palveluihin. Hinnat ja
                  aikarajoitukset saattavat vaihdella pysäköintitilan mukaan, joten
                  tarkista lisätiedot etukäteen{" "}
                  <a
                    className="text-primary-600 hover:text-primary-700 font-semibold underline underline-offset-2"
                    href="https://www.hsl.fi/matkustaminen/liityntapysakointi"
                    title="hsl info liityntäpysäköinnistä"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    HSL:n sivustolta
                  </a>
                  .
                </p>
                <div className="border-t border-primary-200 pt-4">
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    Ota yhteyttä
                  </p>
                  <a
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                    href="mailto:liityntapysakointi@gmail.com?subject=Kysyttävää liintyntäpysköinti.fi -sivustosta"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    liityntapysakointi@gmail.com
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
