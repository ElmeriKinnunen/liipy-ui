import * as Dialog from "@radix-ui/react-dialog";
import { useCookieConsent } from "../hooks/useCookies";
import { Link } from "react-router-dom";

export const CookieBanner = () => {
  const { cookiesAccepted, cookiesSettingSaved, acceptCookies, rejectCookies } =
    useCookieConsent();

  const showBanner = !cookiesAccepted && !cookiesSettingSaved;

  if (!showBanner) return null;

  return (
    <Dialog.Root open={showBanner}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed bottom-0 left-0 right-0 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl md:rounded-3xl bg-white shadow-2xl z-50 animate-slide-up">
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
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
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <Dialog.Title className="text-xl font-bold text-gray-900 mb-2">
                  Evästeiden käyttö
                </Dialog.Title>
                <Dialog.Description className="text-gray-600 text-sm leading-relaxed">
                  Käytämme evästeitä parantaaksemme käyttökokemusta ja
                  analytiikkaa. Hyväksymällä evästeet autat sivuston kehityksessä
                  ja hyväksyt selosteen mukaiset ehdot.
                </Dialog.Description>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={acceptCookies}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Hyväksyn evästeet
              </button>
              <button
                onClick={rejectCookies}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all duration-200"
              >
                En hyväksy
              </button>
            </div>

            <Link
              to="/privacy"
              className="block text-center text-sm text-primary-600 hover:text-primary-700 font-medium mt-4 underline underline-offset-2"
            >
              Lue lisää evästeistä
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
