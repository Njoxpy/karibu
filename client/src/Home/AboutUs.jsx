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
            <h3 className="text-3xl font-extrabold text-blue-600">
              Our Mission
            </h3>
            <p className="mt-4 text-gray-600">
              Our mission is to deliver quality products and services with a
              strong focus on customer satisfaction, continuous innovation, and
              sustainability.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
            <h3 className="text-3xl font-extrabold text-blue-600">
              Our Vision
            </h3>
            <p className="mt-4 text-gray-600">
              To become a global leader in our industry, known for empowering
              businesses and fostering sustainable growth through strategic
              solutions and high-quality service delivery.
            </p>
          </div>
        </div>

        {/* Optional History */}
        <div className="mt-16">
          <h3 className="text-3xl  text-blue-600 text-center font-extrabold">
            Our Journey
          </h3>
          <p className="text-sm text-gray-500 mt-4 text-center">
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
