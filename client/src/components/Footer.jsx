const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <h2 className="text-2xl font-semibold text-green-400">karibu</h2>
            <p className="mt-4 max-w-xs text-gray-300">
              Mtoa huduma bora wa bidhaa na huduma za hali ya juu katika sekta
              mbalimbali ikiwemo Vifaa vya Ujenzi, Mafuta Safi, Vifaa vya
              Ofisini, Lishe ya Wanyama, na Uchapishaji.
            </p>

            {/* Viungo vya Mitandao ya Kijamii */}
            <ul className="mt-8 flex gap-6">
              {["Facebook", "Instagram", "Twitter", "LinkedIn"].map(
                (platform) => (
                  <li key={platform}>
                    <a
                      href="#"
                      rel="noreferrer"
                      target="_blank"
                      className="text-gray-300 transition hover:opacity-75"
                      aria-label={platform}
                    >
                      {/* Nafasi ya Icons za mitandao */}
                      <span className="sr-only">{platform}</span>
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Viungo vya Uendeshaji */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            {/* Sehemu ya Huduma */}
            <div>
              <h3 className="font-medium text-green-400">Huduma</h3>
              <ul className="mt-6 space-y-4 text-sm text-gray-300">
                {[
                  "Vifaa vya Ujenzi",
                  "Usambazaji wa Mafuta Safi",
                  "Suluhisho za Vifaa vya Ofisini",
                  "Chakula cha Lishe ya Wanyama",
                  "Hifadhi na Usafirishaji",
                  "Uchapishaji",
                ].map((service) => (
                  <li key={service}>
                    <a href="#services" className="hover:opacity-75">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sehemu ya Kampuni */}
            <div>
              <h3 className="font-medium text-green-400">Kampuni</h3>
              <ul className="mt-6 space-y-4 text-sm text-gray-300">
                {[
                  "Kuhusu Sisi",
                  "Kutana na Timu Yetu",
                  "Ajira",
                  "Mahali Yetu",
                ].map((companyInfo) => (
                  <li key={companyInfo}>
                    <a href="#" className="hover:opacity-75">
                      {companyInfo}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Viungo vya Msaada */}
            <div>
              <h3 className="font-medium text-green-400">Viungo vya Msaada</h3>
              <ul className="mt-6 space-y-4 text-sm text-gray-300">
                {["Wasiliana Nasi", "Huduma kwa Wateja"].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:opacity-75">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sehemu ya Sheria */}
            <div>
              <h3 className="font-medium text-green-400">Sheria</h3>
              <ul className="mt-6 space-y-4 text-sm text-gray-300">
                {[
                  "Sera ya Faragha",
                  "Masharti ya Huduma",
                  "Kanusho",
                  "Ufikiaji",
                ].map((legalInfo) => (
                  <li key={legalInfo}>
                    <a href="#" className="hover:opacity-75">
                      {legalInfo}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sehemu ya Chini */}
        <p className="text-xs text-white font-bold text-center mt-8">
          &copy; {new Date().getFullYear()} karibu. Haki zote zimehifadhiwa.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
