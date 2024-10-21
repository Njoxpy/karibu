import { Link } from 'react-router-dom';

const Cta = () => {
  return (
    <>
      <div className="p-4">
        <section className="cta-section">
          <h2>Ready to Get Started?</h2>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link to={'/submit'}>Submit Your Work Now!</Link>
          </button>
        </section>
      </div>
    </>
  );
};

export default Cta;
