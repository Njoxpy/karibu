import Footer from '../components/Footer';

const ForgotPassword = () => {
  return (
    <>
      <div className="p-4">
        <div>
          <form action="">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name=""
              id=""
              placeholder="Enter New Password"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name=""
              id=""
              placeholder="Confirm New Password"
            />

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Confirm
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ForgotPassword;
