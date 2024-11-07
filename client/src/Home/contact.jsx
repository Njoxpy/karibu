import React from "react";

function contact() {
  return (
    <div className="bg-blue-50 p-8 rounded-md shadow-md">
      <h3 className="text-2xl font-semibold text-blue-600">Our Office</h3>
      <p className="mt-2 text-lg text-gray-600">1234 Savarrah St, Suite 100</p>
      <p className="text-lg text-gray-600">City, Country</p>

      <div className="mt-4">
        <p className="text-lg font-medium text-blue-600">Email:</p>
        <a
          href="mailto:info@savarrah.com"
          className="text-blue-500 hover:text-blue-600"
        >
          info@savarrah.com
        </a>
      </div>

      <div className="mt-4">
        <p className="text-lg font-medium text-blue-600">Phone:</p>
        <a href="tel:+1234567890" className="text-blue-500 hover:text-blue-600">
          +1 234 567 890
        </a>
      </div>

      {/* Google Map Embed */}
      <div className="mt-8">
        <p className="text-xl font-semibold text-blue-600">Visit Us</p>
        <iframe
          className="mt-4 rounded-md shadow-md w-full"
          height="350"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.27991763746!2d-74.25986633119252!3d40.69767006608675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23462b8f99%3A0x739c9fa30a90a71a!2s1234%20Savarrah%20St%2C%20Suite%20100%2C%20City%2C%20Country!5e0!3m2!1sen!2sus!4v1632699391343!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Contact Form */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-blue-600">Contact Us</h3>
        <form className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="message" className="text-lg text-gray-600">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Write your message here"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="col-span-2 bg-green-600 text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default contact;
