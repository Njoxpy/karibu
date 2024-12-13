import { FaRocket, FaLightbulb, FaRoad } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-white px-6 pt-14 lg:px-8 font-sans">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Us Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-600">About Us</h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            At Savarrah, we are committed to providing innovative solutions that
            elevate businesses. Our mission is to create lasting partnerships
            and offer services that contribute to the success of our clients.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow-lg flex items-start transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <FaRocket className="text-blue-600 text-3xl mr-4" />
            <div>
              <h3 className="text-3xl font-extrabold text-blue-600">
                Our Mission
              </h3>
              <p className="mt-4 text-gray-700">
                Our mission is to deliver quality products and services with a
                strong focus on customer satisfaction, continuous innovation, and
                sustainability.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg shadow-lg flex items-start transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <FaLightbulb className="text-blue-600 text-3xl mr-4" />
            <div>
              <h3 className="text-3xl font-extrabold text-blue-600">
                Our Vision
              </h3>
              <p className="mt-4 text-gray-700">
                To become a global leader in our industry, known for empowering
                businesses and fostering sustainable growth through strategic
                solutions and high-quality service delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Learn More Button */}
        <div className="flex justify-center">
          <button className="inline-block text-center bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-md hover:bg-blue-500 mt-8 transition-all duration-300 ease-in-out transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
