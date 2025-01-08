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
          Huduma Zetu
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Gundua huduma zetu mbalimbali zilizobuniwa kukidhi mahitaji yako ya
          kibiashara.
        </p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Uchapishaji",
              image: printingImage,
              alt: "Huduma za Uchapishaji",
              description:
                "Huduma za uchapishaji wa hali ya juu kwa mahitaji yako yote ya kibiashara, kuanzia vipeperushi hadi kadi za biashara.",
            },
            {
              title: "Mafuta Safi",
              image: oilImage,
              alt: "Huduma za Mafuta Safi",
              description:
                "Tunatoa mafuta safi ya hali ya juu kwa matumizi mbalimbali ya viwandani na jikoni.",
            },
            {
              title: "Vifaa vya Ujenzi",
              image: hardImage,
              alt: "Huduma za Vifaa vya Ujenzi",
              description:
                "Bidhaa mbalimbali za vifaa vya ujenzi, kuanzia vifaa vya ujenzi hadi zana za DIY.",
            },
            {
              title: "Lishe ya Wanyama",
              image: animal2Image,
              alt: "Huduma za Lishe ya Wanyama",
              description:
                "Chakula na bidhaa za lishe za hali ya juu kwa mifugo wako, kuhakikisha afya na uzalishaji wao.",
            },
            {
              title: "Maghala",
              image: godownImage,
              alt: "Huduma za Maghala",
              description:
                "Suluhisho salama za hifadhi na maghala mbalimbali yanayokidhi mahitaji yako ya biashara.",
            },
            {
              title: "Vifaa vya Ofisini",
              image: stationeryImage,
              alt: "Huduma za Vifaa vya Ofisini",
              description:
                "Uchaguzi mpana wa bidhaa za ofisini kwa matumizi ya kiofisi na kibiashara, kuanzia kalamu hadi karatasi.",
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
