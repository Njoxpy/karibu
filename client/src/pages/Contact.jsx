import Footer from "../components/Footer";
import { Form, redirect } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <div className="mt-6">
        <div className="grid sm:grid-cols-2 items-start gap-14 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md font-[sans-serif]">
          <div>
            <h1 className="text-gray-800 text-3xl font-extrabold">
              Get in Touch with Savarrah
            </h1>
            <p className="text-sm text-gray-500 mt-4">
              Have a project idea or need assistance with your brand? Reach out
              to us at Savarrah—we’d love to hear about your vision and provide
              the support you need.
            </p>

            <div className="mt-12">
              <h2 className="text-gray-800 text-base font-bold">Email</h2>
              <ul className="mt-4">
                <li className="flex items-center">
                  <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="#007bff"
                      viewBox="0 0 479.058 479.058"
                    >
                      <path d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z" />
                    </svg>
                  </div>
                  <a
                    href="mailto:info@savarrah.com"
                    className="text-[#007bff] text-sm ml-4"
                  >
                    <small className="block">Mail</small>
                    <strong>info@savarrah.com</strong>
                  </a>
                  <a
                    href="tel:+255 623 216 660"
                    className="text-[#007bff] text-sm ml-4"
                  >
                    <small className="block">Tel</small>
                    <strong>+255 623 216 660</strong>
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="text-gray-800 text-base font-bold">Follow Us</h2>

              <ul className="flex mt-4 space-x-4">
                <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a href="http://facebook.com/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="#007bff"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.812 13.937H9.33v9.312c0 .414.335.75.75.75l4.007.001a.75.75 0 0 0 .75-.75v-9.312h2.387a.75.75 0 0 0 .744-.657l.498-4a.75.75 0 0 0-.744-.843h-2.885c.113-2.471-.435-3.202 1.172-3.202 1.088-.13 2.804.421 2.804-.75V.909a.75.75 0 0 0-.648-.743A26.926 26.926 0 0 0 15.071 0c-7.01 0-5.567 7.772-5.74 8.437H6.812a.75.75 0 0 0-.75.75v4c0 .414.336.75.75.75zm.75-3.999h2.518a.75.75 0 0 0 .75-.75V6.037c0-2.883 1.545-4.536 4.24-4.536.878 0 1.686.043 2.242.087v2.149c-.402.205-3.976-.884-3.976 2.697v2.755c0 .414.336.75.75.75h2.786l-.312 2.5h-2.474a.75.75 0 0 0-.75.75V22.5h-2.505v-9.312a.75.75 0 0 0-.75-.75H7.562z" />
                    </svg>
                  </a>
                </li>
                <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a href="http://x.com/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="#007bff"
                      viewBox="0 0 511 512"
                    >
                      <path d="M111.898 160.664H15.5c-8.285 0-15 6.719-15 15V497c0 8.285 6.715 15 15 15h96.398c8.286 0 15-6.715 15-15V175.664c0-8.281-6.714-15-15-15zM96.898 482H30.5V190.664h66.398zM63.703 0C28.852 0 .5 28.352.5 63.195c0 34.852 28.352 63.2 63.203 63.2 34.848 0 63.195-28.352 63.195-63.2C126.898 28.352 98.551 0 63.703 0zm0 96.395c-18.308 0-33.203-14.891-33.203-33.2C30.5 44.891 45.395 30 63.703 30c18.305 0 33.195 14.89 33.195 33.195 0 18.309-14.89 33.2-33.195 33.2zm289.207 62.148c-22.8 0-45.273 5.496-65.398 15.777-.684-7.652-7.11-13.656-14.942-13.656h-96.406c-8.281 0-15 6.719-15 15V497c0 8.285 6.719 15 15 15h96.406c8.285 0 15-6.715 15-15V320.266c0-22.735 18.5-41.23 41.235-41.23 22.734 0 41.226 18.495 41.226 41.23V497c0 8.285 6.719 15 15 15h96.403c8.285 0 15-6.715 15-15V302.066c0-79.14-64.383-143.523-143.524-143.523zM466.434 482h-66.399V320.266c0-39.278-31.953-71.23-71.226-71.23-39.282 0-71.239 31.952-71.239 71.23V482h-66.402V190.664h66.402v11.082c0 5.77 3.309 11.027 8.512 13.524a15.01 15.01 0 0 0 15.875-1.82c20.313-16.294 44.852-24.907 70.953-24.907 62.598 0 113.524 50.926 113.524 113.523zm-67.51-85.34a15 15 0 0 0-15 15v85.34h-36.543V320.266c0-22.736-18.49-41.23-41.233-41.23-22.735 0-41.226 18.494-41.226 41.23V497h-36.543V320.266c0-39.278-31.953-71.23-71.226-71.23-39.282 0-71.239 31.952-71.239 71.23V482h-36.543V190.664h36.543v11.082c0 5.77 3.309 11.027 8.512 13.524a15.01 15.01 0 0 0 15.875-1.82c20.313-16.294 44.852-24.907 70.953-24.907 62.598 0 113.524 50.926 113.524 113.523z" />
                    </svg>
                  </a>
                </li>
                <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a href="http://instagram.com/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="#007bff"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.416 3.688 9.94 8.438 11.489.618.113.843-.267.843-.594 0-.292-.011-1.278-.018-2.257-3.446.748-4.181-1.635-4.181-1.635-.563-1.433-1.375-1.818-1.375-1.818-1.133-.775.086-.76.086-.76 1.254.088 1.916 1.284 1.916 1.284 1.116 1.907 2.934 1.356 3.646 1.036.113-.807.437-1.356.795-1.668-2.776-.318-5.693-1.39-5.693-6.188 0-1.366.486-2.485 1.288-3.36-.13-.318-.56-1.607.123-3.345 0 0 1.051-.337 3.444 1.285 1.003-.278 2.082-.417 3.16-.42 1.08.004 2.157.142 3.163.42 2.394-1.622 3.444-1.285 3.444-1.285.683 1.738.254 3.027.124 3.345.802.875 1.286 1.994 1.286 3.36 0 4.826-2.922 5.868-5.696 6.188.451.388.854 1.149.854 2.318 0 1.673-.015 3.018-.015 3.42 0 .33.222.712.847.593A11.964 11.964 0 0 0 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <Form className="space-y-6" method="post" action="/contact">
              <div>
                <label className="block text-gray-800 text-base font-bold">
                  Your Name
                </label>
                <input
                  type="text"
                  className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-[#007bff] focus:ring focus:ring-[#007bff]/50"
                  placeholder="Enter Your Name"
                  name="name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-800 text-base font-bold">
                  Your Email
                </label>
                <input
                  type="email"
                  className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-[#007bff] focus:ring focus:ring-[#007bff]/50"
                  placeholder="Enter Your Email"
                  name="email"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-800 text-base font-bold">
                  Your Message
                </label>
                <textarea
                  className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-[#007bff] focus:ring focus:ring-[#007bff]/50"
                  rows="5"
                  placeholder="Type your message here"
                  name="message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-md text-white bg-primary hover:bg-[#0056b3] focus:outline-none"
              >
                Send Message
              </button>
            </Form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;

export const contactAction = async ({ request }) => {
  console.log(request);

  const data = await request.formData();

  const submission = {
    name: data.get("name"),
    email: data.get("email"),
    message: data.get("message"),
  };

  if (submission.message.length < 10) {
    return { error: "message must be over 10 characters long" };
  }

  console.log(submission);
  return redirect("/");
};
