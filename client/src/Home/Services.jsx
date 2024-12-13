import printingImage from "../assets/images/printing.jpg";
import oilImage from "../assets/images/oil5.jpg";
import hardImage from "../assets/images/hard.jpg";
import animal2Image from "../assets/images/animal2.jpg";
import godownImage from "../assets/images/godown-new-11.jpg";
import stationeryImage from "../assets/images/stationery1.jpg";

function Services() {
  return (
    <section className="bg-white px-6 pt-14 lg:px-8" id="services">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold text-blue-600 mb-6">
          Our Services
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Discover our wide range of services tailored to meet your business
          needs.
        </p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Printing",
              image: printingImage,
              alt: "Printing Services",
              description:
                "High-quality printing services for all your business needs, from brochures to business cards.",
            },
            {
              title: "Fresh Oil",
              image: oilImage,
              alt: "Fresh Oil Services",
              description:
                "Providing high-quality, fresh oils for various industrial and culinary applications.",
            },
            {
              title: "Hardware",
              image: hardImage,
              alt: "Hardware Services",
              description:
                "A wide range of hardware products, from construction materials to DIY tools.",
            },
            {
              title: "Animal Feeding",
              image: animal2Image,
              alt: "Animal Feeding Services",
              description:
                "High-quality feed and nutrition products for your livestock, ensuring their health and productivity.",
            },
            {
              title: "Godown",
              image: godownImage,
              alt: "Godown Services",
              description:
                "Secure storage solutions with a range of warehouses tailored to your business needs.",
            },
            {
              title: "Stationery",
              image: stationeryImage,
              alt: "Stationery Services",
              description:
                "A wide selection of stationery products for office and business use, from pens to paper.",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="service-item bg-blue-50 p-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-lg duration-300 cursor-pointer"
            >
              <img
                src={service.image}
                alt={service.alt}
                className="w-full h-48 object-cover rounded-md mb-4"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
