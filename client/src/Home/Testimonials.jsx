import customer from "../assets/images/male1.jpg";
import customer2 from "../assets/images/female.jpg";
import Godbless from "../assets/images/jefrey.jpg";

const Testimonials = () => {
  return (
    <section className="bg-gray-50 px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-center text-4xl font-bold tracking-tight text-blue-800 sm:text-5xl">
          Read trusted reviews from our customers
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {[
            {
              image: customer,
              alt: "Male customer testimonial",
              text: "Savarrah has completely transformed how we manage our operations. From day one, the team provided exceptional support, helping us understand and implement the system seamlessly. The platform’s intuitive design and efficient tools have allowed us to reduce time spent on repetitive tasks and focus more on growing our business.",
            },
            {
              image: customer2,
              alt: "Female customer testimonial",
              text: "The Savarrah Animal Feeding service has been a complete game-changer for our farm operations. Before we started using it, keeping track of feed inventory and managing orders was chaotic and time-consuming. Now, the process is incredibly streamlined—workers can place orders quickly, and we can monitor everything in real time.",
            },
            {
              image: Godbless,
              alt: "Admin testimonial",
              text: "The Stationery and Godown features on the Savarrah platform are exactly what our team needed to simplify operations. As an admin, I can quickly upload new products, make updates, and track orders without worrying about errors or delays. Our workers also appreciate how easy it is to place orders and view the status of their requests.",
            },
          ].map((testimonial, index) => (
            <blockquote
              key={index}
              className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg sm:p-8"
            >
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.alt}
                  className="h-14 w-14 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="text-sm font-medium text-gray-800">
                  Customer {index + 1}
                </div>
              </div>
              <p className="mt-4 text-gray-600 italic">{testimonial.text}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
