import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import stationery from "../assets/images/stationery1.webp";
import printing from "../assets/images/printing.webp";
import godown from "../assets/images/godown-new-11.webp";
import animalFeeding from "../assets/images/animalFeeding.webp";

const images = [
    { id: 1, src: stationery, alt: "Bidhaa za vifaa vya ofisini zikiwa kwenye onyesho" },
    { id: 2, src: printing, alt: "Huduma za uchapishaji zikiendelea" },
    { id: 3, src: godown, alt: "Ghala lililopangwa vizuri" },
    { id: 4, src: animalFeeding, alt: "Huduma za kulisha wanyama" },
];

const HelloSection = () => {
    return (
        <div className="relative bg-gray-100">
            {/* Sehemu ya Kwanza */}
            <div className="py-16 text-center bg-indigo-600 text-white">
                <h1 className="text-4xl font-bold">
                    Karibu kutoka kwa Mtoa Huduma Bora wa Bidhaa za Ubora wa Hali ya Juu
                </h1>
                <p className="mt-4 text-lg">
                    Tunatoa huduma na bidhaa za hali ya juu katika sekta mbalimbali kama vile Vifaa vya Ofisini, Mafuta Safi, Uchapishaji, na mengine mengi.
                </p>
                <a href="#contact">
                    <button className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                        Wasiliana Nasi
                    </button>
                </a>
            </div>

            {/* Sehemu ya Slideshow */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    navigation
                    autoplay={{ delay: 3000 }}
                    pagination={{ clickable: true }}
                    a11y={{ enabled: true }}
                    aria-label="Slideshow inayoonyesha huduma na bidhaa zetu kuu"
                    className="rounded-lg overflow-hidden shadow-lg bg-gray-200"
                >
                    {images.map((image) => (
                        <SwiperSlide key={image.id}>
                            <div className="relative">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-64 object-cover sm:h-96"
                                    loading="lazy"
                                    onError={(e) => (e.target.src = "/path/to/fallback-image.jpg")}
                                />
                                <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded">
                                    <h3 className="text-lg font-bold">{image.alt}</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HelloSection;
