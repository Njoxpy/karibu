import { useForm } from "react-hook-form";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Here you can handle the form submission (e.g., send the data to the backend)
    console.log("Form submitted", data);
  };

  return (
    <section className="px-4 py-8 max-w-7xl mx-auto" id="contact">
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fomu ya Mawasiliano */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">
            Wasiliana Nasi
          </h2>
          <p className="mt-2 text-gray-600">
            Tunapenda kusikia kutoka kwako! Tafadhali jaza fomu iliyo hapa
            chini.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium"
                >
                  Jina Lako
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Jaza Jina Lako"
                  {...register("name", { required: "Jina Lako ni la muhimu" })}
                  className={`mt-1 p-3 w-full border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium"
                >
                  Barua Pepe Yako
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Jaza Barua Pepe Yako"
                  {...register("email", {
                    required: "Barua pepe ni la muhimu",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Tafadhali weka barua pepe halali",
                    },
                  })}
                  className={`mt-1 p-3 w-full border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium"
                >
                  Ujumbe Wako
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Jaza Ujumbe Wako"
                  {...register("message", { required: "Ujumbe ni la muhimu" })}
                  rows="4"
                  className={`mt-1 p-3 w-full border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Tuma Ujumbe
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Ramani ya Google */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Tupate Hapa</h2>
          <p className="mt-2 text-gray-600">Ofisi yetu iko hapa:</p>

          <iframe
            className="mt-4 rounded-md shadow-md w-full"
            height="350"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126135.17325900163!2d33.45245035!3d-8.905215799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1900a01e711399cd%3A0x4012f53f751f23a5!2sMbeya!5e0!3m2!1sen!2stz!4v1731783752039!5m2!1sen!2stz"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
