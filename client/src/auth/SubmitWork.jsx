import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Footer from '../components/Footer';
import '../styles/submitWork.css';

function SubmitWork() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('magazine');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process form submission
    const orderData = { description, price, category };
    console.log('Submitting Order:', orderData);

    // Simulate API call or processing here...
    // Redirect to receipt page after submission
    navigate('/receipt'); // Change this path to your actual receipt page path
  };

  const handleCancel = () => {
    // Optionally reset the form or just navigate back
    setDescription('');
    setPrice(0);
    setCategory('magazine');
    navigate('/'); // Change this path to your desired cancellation behavior
  };

  return (
    <>
      <div className="p-4">
        <section className="submission">
          <h1 className="font-bold text-center text-blue-600">
            Submit Your Work
          </h1>
          <form id="workSubmissionForm" onSubmit={handleSubmit}>
            <label htmlFor="description" className="font-bold">
              Work Description:
            </label>
            <textarea
              id="description"
              name="description"
              required
              className="border border-gray-400 rounded w-full p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <label htmlFor="price" className="font-bold">
              Price in Tsh:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              className="border border-gray-400 rounded w-full p-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label htmlFor="category" className="font-bold">
              Category
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="books">Books</option>
              <option value="magazine">Magazine</option>
              <option value="clothing">Clothing</option>
              <option value="cards">Cards</option>
              <option value="banners">Banners</option>
              <option value="cups">Cups</option>
              <option value="bags">Bags</option>
            </select>

            <div className="flex justify-center space-x-4 mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit Work
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel Submission
              </button>
            </div>
          </form>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default SubmitWork;
