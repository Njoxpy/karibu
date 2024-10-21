import { Link } from 'react-router-dom';

const Cta = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800">
      <section className="max-w-3xl mx-auto text-center">
        <h2 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white">
          Ready to Get Started?
        </h2>
        <Link to={'/submit'}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-lg hover:shadow-xl">
            Submit Your Work Now!
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Cta;
