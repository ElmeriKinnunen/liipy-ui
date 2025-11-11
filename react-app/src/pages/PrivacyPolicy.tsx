import { Link } from "react-router-dom";

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-8 group"
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

        <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Tietosuojaseloste
          </h1>
          <p className="text-gray-500 mb-8">Päivitetty viimeksi: 20.09.2023</p>

          <div className="prose prose-primary max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Tämä tietosuojaseloste selittää, miten liityntapysakointi.fi
              käyttää evästeitä ja Google Tag Manageria ("GTM") kerätäkseen
              tietoa verkkosivuston käytöstäsi ja parantaakseen
              käyttökokemustasi. Hyväksymällä evästeet hyväksyt evästeiden ja
              GTM:n käytön tämän selosteen mukaisesti.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Mitä ovat evästeet?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Evästeet ovat pieniä tekstitiedostoja, jotka tallennetaan
              laitteellesi, kun vierailet verkkosivustolla. Ne auttavat
              verkkosivustoja tunnistamaan selaimen ja tallentamaan tiettyjä
              tietoja ja asetuksia.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Miten käytämme evästeitä ja GTM:ää?
            </h2>
            <p className="text-gray-700 mb-4">
              Käytämme evästeitä ja GTM:ää seuraaviin tarkoituksiin:
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-primary-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Analytiikka
                </h3>
                <p className="text-gray-700 text-sm">
                  Evästeiden ja GTM:n avulla keräämme anonyymiä tietoa siitä,
                  miten käytät verkkosivustoamme. Tämä auttaa meitä ymmärtämään
                  paremmin käyttäjiemme tarpeita ja parantamaan sivuston
                  toimivuutta.
                </p>
              </div>

              <div className="bg-accent-light rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Mainonta</h3>
                <p className="text-gray-700 text-sm">
                  Saatamme käyttää evästeitä kohdentaaksemme mainontaa
                  käyttäjille, jotka ovat vierailleet sivustollamme aiemmin.
                  Tämä auttaa meitä tarjoamaan relevantimpaa mainontaa.
                </p>
              </div>

              <div className="bg-orange-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Toiminnallisuus
                </h3>
                <p className="text-gray-700 text-sm">
                  Joissakin tapauksissa käytämme evästeitä ja GTM:ää
                  parantaaksemme verkkosivustomme toiminnallisuutta.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Evästeiden hallinta
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Voit hallita evästeitä ja estää niiden käytön selaimessasi. Voit
              yleensä mukauttaa evästeasetuksiasi selaimen asetuksissa. Ole
              kuitenkin tietoinen siitä, että evästeiden estäminen saattaa
              vaikuttaa verkkosivuston toimintaan ja käyttäjäkokemukseen.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Kolmannen osapuolen evästeet
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Huomioithan, että kolmannen osapuolen palvelut, kuten
              mainosverkostot, saattavat myös asettaa omia evästeitään
              verkkosivustollemme. Emme valvo näiden evästeiden käyttöä.
              Suosittelemme tarkistamaan kyseisten kolmannen osapuolen
              palvelujen tietosuojaselosteet lisätietojen saamiseksi.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Muutokset tietosuojaselosteeseen
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Pidätämme oikeuden päivittää tätä tietosuojaselostetta
              tarvittaessa, joten suosittelemme säännöllistä tarkistamista
              mahdollisten muutosten varalta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
