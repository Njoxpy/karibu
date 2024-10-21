import Footer from '../components/Footer';

function Contact() {
  return (
    <>
      <div className="p-4">
        <section className="contact">
          <h1>Contact Support</h1>
          <form id="contactForm">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required></textarea>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              submit
            </button>
          </form>
        </section>
        <div className="contact-owner">
          <address>
            <p>
              Emnail:{' '}
              <a href="mailto:savarrahprineters@gmail.com">
                savarrahprineters@gmail.com
              </a>
            </p>
            <p>
              Phone Number
              <a href="tel:+255 623 216 660">+255 623 216 660</a>
            </p>
          </address>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
