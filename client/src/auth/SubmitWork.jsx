import Footer from '../components/Footer';
import '../styles/submitWork.css';

function SubmitWork() {
  // const [price, setPrice] = useState(0);
  // const [description, setDescription] = useState('');
  // const [category, setCategory] = useState('magazine');

  return (
    <>
      <div className="p-4">
        <section className="submission">
          <h1 className="font-bold text-center">Submit Your Work</h1>
          <form id="workSubmissionForm">
            <label htmlFor="description">Work Description:</label>
            <textarea id="description" name="description" required></textarea>

            <label htmlFor="price">Price in Tsh:</label>
            <input type="number" id="price" name="price" required />

            <label htmlFor="category">Category</label>
            <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option value="books">books</option>
              <option value="magazine">magazine</option>
              <option value="clothing">clothing</option>
              <option value="cards">cards</option>
              <option value="banners">banners</option>
              <option value="cups">cups</option>
              <option value="bags">bags</option>
            </select>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit Work
            </button>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel Submission
            </button>
          </form>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default SubmitWork;
/**
 * add an option for a user to cancel submission \
 * redirect user to the receipt page if the order for the project is done.
 */
