import Footer from '../components/Footer';

function EmailSent() {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-blue-600 mb-4">Email Sent</h3>
        <p className="text-gray-700 text-center mb-6">
          An email has been sent to your account. Please log into your email to
          recover your new password.
        </p>
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
          Go to Login
        </button>
      </div>

      <Footer />
    </>
  );
}

export default EmailSent;
