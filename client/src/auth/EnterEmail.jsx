import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useState } from 'react';

function EnterEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Email submitted:', email);

    // Navigate to the Email Sent page
    navigate('/password/new');
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">
            Enter Your Email
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter the email for your account"
              required
              className="border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
              Submit
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default EnterEmail;
