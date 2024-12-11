import printingImage from "../assets/images/printing.jpg";
import oilImage from "../assets/images/oil5.jpg";
import hardImage from "../assets/images/hard.jpg";
import animal2Image from "../assets/images/animal2.jpg";
import godownImage from "../assets/images/godown-new-11.jpg";
import stationeryImage from "../assets/images/stationery1.jpg";

function Services() {
  return (
    <div className="bg-white px-6 pt-14 lg:px-8">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold text-blue-600 mb-6">
          Our Services
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Discover our wide range of services tailored to meet your business
          needs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Service 1: Printing */}
          <div className="service-item bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <img
              src={printingImage}
              alt="Printing"
              className="w-full h-48 object-cover rounded-md mb-4"
              fetchPriority="high"
            />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Printing
            </h3>
            <p className="text-gray-600">
              High-quality printing services for all your business needs, from
              brochures to business cards.
            </p>
          </div>

          {/* Service 2: Fresh Oil */}
          <div className="service-item bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <img
              src={oilImage}
              alt="Fresh Oil"
              className="w-full h-48 object-cover rounded-md mb-4"
              fetchPriority="high"
            />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Fresh Oil
            </h3>
            <p className="text-gray-600">
              Providing high-quality, fresh oils for various industrial and
              culinary applications.
            </p>
          </div>

          {/* Service 3: Hardware */}
          <div className="service-item bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <img
              src={hardImage}
              alt="Hardware"
              className="w-full h-48 object-cover rounded-md mb-4"
              fetchPriority="high"
            />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Hardware
            </h3>
            <p className="text-gray-600">
              A wide range of hardware products, from construction materials to
              DIY tools.
            </p>
          </div>

          {/* Service 4: Animal Feeding */}
          <div className="service-item bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <img
              src={animal2Image}
              alt="Animal Feeding"
              className="w-full h-48 object-cover rounded-md mb-4"
              fetchPriority="high"
            />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Animal Feeding
            </h3>
            <p className="text-gray-600">
              High-quality feed and nutrition products for your livestock,
              ensuring their health and productivity.
            </p>
          </div>

          {/* Service 5: Godown */}
          <div className="service-item bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <img
              src={godownImage}
              alt="Godown"
              className="w-full h-48 object-cover rounded-md mb-4"
              fetchPriority="high"
            />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Godown</h3>
            <p className="text-gray-600">
              Secure storage solutions with a range of warehouses tailored to
              your business needs.
            </p>
          </div>

          {/* Service 6: Stationery */}
          <div className="service-item bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <img
              src={stationeryImage}
              alt="Stationery"
              className="w-full h-48 object-cover rounded-md mb-4"
              fetchPriority="high"
            />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Stationery
            </h3>
            <p className="text-gray-600">
              A wide selection of stationery products for office and business
              use, from pens to paper.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
