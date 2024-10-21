const Features = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Innovative Solutions for Every Business
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            At Savarrah, we empower businesses with technology-driven solutions
            that streamline operations and enhance productivity.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
              <svg
                className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 10h10a2 2 0 010 4H5a2 2 0 010-4zm0-6h10a2 2 0 010 4H5a2 2 0 010-4zm0 12h10a2 2 0 010 4H5a2 2 0 010-4z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Seamless Collaboration
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Enhance teamwork with our tools that facilitate communication and
              project management across all teams.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
              <svg
                className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a8 8 0 00-7.475 4.5 1 1 0 001.952.654A6 6 0 0110 4a6 6 0 016.523 3.154 1 1 0 001.952-.654A8 8 0 0010 2z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Data-Driven Insights
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Utilize our analytics tools to turn data into actionable insights
              for better decision-making.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
              <svg
                className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 2a1 1 0 00-1 1v4H4a1 1 0 100 2h3v4a1 1 0 102 0V9h3a1 1 0 100-2h-3V3a1 1 0 00-1-1z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Custom Workflows
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Tailor workflows to meet the unique needs of your team with our
              customizable solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
