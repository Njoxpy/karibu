const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <h2 className="text-2xl font-semibold text-green-400">Savarrah</h2>
            <p className="mt-4 max-w-xs text-gray-300">
              Leading provider of quality services and products across
              industries including Hardware, Fresh Oil, Stationery, and more.
            </p>

            {/* Social Media Links */}
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
                      {/* Placeholder for social media icons */}
                      <span className="sr-only">{platform}</span>
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Footer Navigation Links */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            {/* Services Section */}
            <div>
              <h3 className="font-medium text-green-400">Services</h3>
              <ul className="mt-6 space-y-4 text-sm text-gray-300">
                {[
                  "Hardware Supplies",
                  "Fresh Oil Distribution",
                  "Stationery Solutions",
                  "Animal Feed Supplies",
                  "Storage and Logistics",
                ].map((service) => (
                  <li key={service}>
                    <a href="#" className="hover:opacity-75">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h3 className="font-medium text-green-400">Company</h3>
              <ul className="mt-6 space-y-4 text-sm text-gray-300">
                {["About Us", "Meet Our Team", "Careers", "Our Locations"].map(
                  (companyInfo) => (
                    <li key={companyInfo}>
                      <a href="#" className="hover:opacity-75">
                        {companyInfo}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Helpful Links Section */}
            <div>
              <h3 className="font-medium text-green-400">Helpful Links</h3>
              <ul className="mt-6 space-y-4 text-sm text-gray-300">
                {[
                  "Contact Us",
                  "FAQs",
                  "Customer Support",
                  "Shipping & Returns",
                ].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:opacity-75">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="font-medium text-green-400">Legal</h3>
              <ul className="mt-6 space-y-4 text-sm text-gray-300">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Disclaimer",
                  "Accessibility",
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

        {/* Bottom Bar */}
        <p className="text-xs text-white font-bold text-center mt-8">
          &copy; {new Date().getFullYear()} Savarrah. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
