import { Link } from 'react-router-dom';

const Hello = () => {
  return (
    <>
      <div>
        <section className="hello">
          <h1 className="font-bold p-3">
            Transform Your Ideas into Stunning Designs!
          </h1>
          <p>
            Easily submit your work descriptions and receive professional
            graphic design services.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link to={'/submit'}>Submit Your Work</Link>
          </button>
        </section>
      </div>
    </>
  );
};

export default Hello;
