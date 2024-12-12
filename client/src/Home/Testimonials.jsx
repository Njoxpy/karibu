import customer from "../assets/images/male1.jpg";
import customer2 from "../assets/images/female.jpg"
import Godbless from "../assets/images/jefrey.jpg"

const Testimonials = () => {
  return (
    <>
      <section className="bg-gray-50 px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-center text-4xl font-bold tracking-tight text-blue-800 sm:text-5xl">
            Read trusted reviews from our customers
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <img
                  alt="customer 1 testimonilas"
                  src={customer}
                  className="size-14 rounded-full object-cover"
                  loading="lazy"
                />
              </div>

              <p className="mt-4 text-gray-700 italic">
                Savarrah has completely transformed how we manage our operations. From day one, the team provided exceptional support, helping us understand and implement the system seamlessly. The platform’s intuitive design and efficient tools have allowed us to reduce time spent on repetitive tasks and focus more on growing our business.
              </p>
            </blockquote>

            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <img
                  alt="customer 2 testimonilas"
                  src={customer2}
                  className="size-14 rounded-full object-cover"
                  loading="lazy"
                />
              </div>

              <p className="mt-4 text-gray-700 italic">
                The Savarrah Animal Feeding service has been a complete game-changer for our farm operations. Before we started using it, keeping track of feed inventory and managing orders was chaotic and time-consuming. Now, the process is incredibly streamlined—workers can place orders quickly, and we can monitor everything in real time.
              </p>
            </blockquote>

            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <img
                  alt="customer 2 testimonilas"
                  src={Godbless}
                  className="size-14 rounded-full object-cover"
                  loading="lazy"
                />
              </div>

              <p className="mt-4 text-gray-700 italic">
                The Stationery and Godown features on the Savarrah platform are exactly what our team needed to simplify operations. As an admin, I can quickly upload new products, make updates, and track orders without worrying about errors or delays. Our workers also appreciate how easy it is to place orders and view the status of their requests.
              </p>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
