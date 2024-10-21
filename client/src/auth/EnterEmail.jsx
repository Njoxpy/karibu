import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function EnterEmail() {
  const navigate = useNavigate();
  return (
    <>
      <div className="p-4">
        <h3>Enter Email</h3>

        <form action="">
          <input
            type="email"
            name=""
            id=""
            placeholder="Enter The E-Mail For Your Account"
            required
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>

          {/* send user to emailsent */}
          {navigate('/password/new')}
        </form>
      </div>

      <Footer />
    </>
  );
}

export default EnterEmail;
