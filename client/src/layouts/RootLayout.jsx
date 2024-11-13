import { Link, Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-primary p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            <Link to={"/"}>Savarrah</Link>
          </span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link
              to={"/"}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Home
            </Link>
            <Link
              to={"/godown"}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Godown
            </Link>
            <Link
              to={"/stationery"}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Stationery
            </Link>
            <Link
              to={"/animal-feeding"}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Animal Feeding
            </Link>
            <Link
              to={"/contact"}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              Contact
            </Link>
          </div>
          <div>
            <Link
              to={"/login"}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 mr-2"
            >
              Login
            </Link>

            <Link
              to={"/register"}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
            >
              Signup
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default RootLayout;

/**
 * what should be the safe margin for the website and where to use the safe margin for the website into the page
 * what should be the bg for the root layout of the page but not that teh brand colors for the website are white and blue
 * what should be the hover state of the navlinks into teh root layout of the website?
 */
