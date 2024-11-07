import { Link } from "react-router-dom";

const Hello = () => {
  return (
    <div className="bg-white hello">
      <main className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Transforming Ideas into Stunning Visual Designs
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Let our experienced team bring your vision to life with tailored
              graphic design solutions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to={"/login"}
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Get Started
              </Link>
              <Link
                className="text-sm font-semibold leading-6 text-gray-900"
                to={"/contact"}
              >
                Contact<span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hello;
