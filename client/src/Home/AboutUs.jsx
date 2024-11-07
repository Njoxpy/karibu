import Male from "../assets/images/male.jpg";

const AboutUs = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-600">About Us</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            At Savarrah, we are committed to providing innovative solutions that
            elevate businesses. Our mission is to create lasting partnerships
            and offer services that contribute to the success of our clients.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold text-blue-600">
              Our Mission
            </h3>
            <p className="mt-4 text-gray-600">
              Our mission is to deliver quality products and services with a
              strong focus on customer satisfaction, continuous innovation, and
              sustainability.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold text-blue-600">Our Vision</h3>
            <p className="mt-4 text-gray-600">
              To become a global leader in our industry, known for empowering
              businesses and fostering sustainable growth through strategic
              solutions and high-quality service delivery.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-12 text-center">
          <h3 className="text-3xl font-semibold text-blue-600">
            Our Core Values
          </h3>
          <ul className="mt-8 space-y-6 text-lg text-gray-600 max-w-3xl mx-auto">
            <li className="flex items-center justify-start">
              <span className="inline-block h-2 w-2 bg-green-600 rounded-full mr-4"></span>
              Innovation: We drive innovation in everything we do to create
              value and improve businesses.
            </li>
            <li className="flex items-center justify-start">
              <span className="inline-block h-2 w-2 bg-green-600 rounded-full mr-4"></span>
              Integrity: We act ethically and maintain transparency in all our
              business operations.
            </li>
            <li className="flex items-center justify-start">
              <span className="inline-block h-2 w-2 bg-green-600 rounded-full mr-4"></span>
              Customer-Centric: We put our clients first by offering tailored
              services that meet their specific needs.
            </li>
            <li className="flex items-center justify-start">
              <span className="inline-block h-2 w-2 bg-green-600 rounded-full mr-4"></span>
              Sustainability: We are dedicated to environmentally sustainable
              practices in all areas of our business.
            </li>
          </ul>
        </div>

        {/* Optional Team Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-semibold text-blue-600 text-center">
            Meet Our Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <img
                src={Male}
                alt="Team member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
                loading="lazy"
              />
              <h4 className="text-xl font-medium text-blue-600">John Doe</h4>
              <p className="text-gray-600">CEO & Founder</p>
            </div>

            <div className="text-center">
              <img
                src={Male}
                alt="Team member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
                loading="lazy"
              />
              <h4 className="text-xl font-medium text-blue-600">Jane Smith</h4>
              <p className="text-gray-600">COO</p>
            </div>

            <div className="text-center">
              <img
                src={Male}
                s
                alt="Team member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
                loading="lazy"
              />
              <h4 className="text-xl font-medium text-blue-600">
                Mary Johnson
              </h4>
              <p className="text-gray-600">Head of Marketing</p>
            </div>
          </div>
        </div>

        {/* Optional History */}
        <div className="mt-16">
          <h3 className="text-3xl font-semibold text-blue-600 text-center">
            Our Journey
          </h3>
          <p className="mt-6 text-lg text-gray-600 text-center">
            Founded in 2010, Savarrah has evolved from a small startup into a
            recognized leader in multiple industries. We are proud of our growth
            and excited for the future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
