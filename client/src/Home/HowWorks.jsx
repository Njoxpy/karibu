const HowWorks = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800">
      <section className="max-w-3xl mx-auto text-center">
        <h2 className="mb-6 text-4xl font-extrabold text-gray-900 dark:text-white">
          How It Works
        </h2>
        <ol className="list-decimal list-inside space-y-4 text-left text-gray-700 dark:text-gray-300">
          <li className="flex items-center">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3 dark:bg-blue-900 dark:text-blue-300">
              1
            </span>
            Create an account or log in.
          </li>
          <li className="flex items-center">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3 dark:bg-blue-900 dark:text-blue-300">
              2
            </span>
            Fill out the work submission form.
          </li>
          <li className="flex items-center">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3 dark:bg-blue-900 dark:text-blue-300">
              3
            </span>
            Receive your receipt.
          </li>
          <li className="flex items-center">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3 dark:bg-blue-900 dark:text-blue-300">
              4
            </span>
            Relax while we process your work.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default HowWorks;
