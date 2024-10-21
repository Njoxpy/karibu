import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Register = () => {
  return (
    <>
      <div className="p-4">
        <section className="auth-section" id="register">
          <h1>Register</h1>
          <form id="registrationForm">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="emailReg" name="email" required />

            <label htmlFor="password">Password:</label>
            <input type="password" id="passwordReg" name="password" required />

            <button type="submit">Register</button>

            <p>
              Already Registered <Link to={'/login'}>Login here</Link>
            </p>
          </form>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Register;
