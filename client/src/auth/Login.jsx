import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Login = () => {
  return (
    <>
      <div className="p-4">
        <section className="auth-section">
          <h1>Login</h1>
          <form id="loginForm">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
            <p>
              Forgot <Link to={'/enterEmail'}>Password</Link>
            </p>
          </form>
          <p>
            Don&apos;t have an account?{' '}
            <Link to={'/register'}>Register here</Link>
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Login;

/**
 - into the login page there should be the login heading and the logo of the company for the user to login into the website
 - how should the ednpoint when a user has forgotten the password the endpoint should be into the website.
 */
