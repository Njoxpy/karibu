import React from 'react';

const Contact = () => {
  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
          <p className="mt-2 text-gray-600">We'd love to hear from you! Please fill out the form below.</p>

          <form action="#" method="POST" className="mt-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Google Map Embed */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Find Us</h2>
          <p className="mt-2 text-gray-600">Our office is located here:</p>

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
