import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import stationery from "../assets/images/stationery1.jpg";
import printing from "../assets/images/printing.jpg";
import godown from "../assets/images/godown-new-11.jpg";
import animalFeeding from "../assets/images/animalFeeding.jpg"

const images = [
    { id: 1, src: stationery, alt: "Stationery products on display" },
    { id: 2, src: printing, alt: "Printing services in action" },
    { id: 3, src: godown, alt: "Well-organized warehouse" },
    { id: 4, src: animalFeeding, alt: "animal feeding" },
];

const HelloSection = () => {
    return (
        <div className="relative bg-gray-100">
            {/* Hero Section */}
            <div className="py-16 text-center bg-indigo-600 text-white">
                <h1 className="text-4xl font-bold">Greetings from Your Leading Provider of Quality Products</h1>
                <p className="mt-4 text-lg">Leading provider of quality services and products across industries including Hardware, Fresh Oil, Stationery, and more..</p>
            </div>

            {/* Slideshow Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    navigation
                    autoplay={{ delay: 3000 }}
                    pagination={{ clickable: true }}
                    a11y={{ enabled: true }}
                    className="rounded-lg overflow-hidden shadow-lg bg-gray-200"
                >
                    {images.map((image) => (
                        <SwiperSlide key={image.id}>
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-64 object-cover sm:h-96"
                                loading="lazy"
                                onError={(e) => (e.target.src = "/path/to/fallback-image.jpg")}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HelloSection;
