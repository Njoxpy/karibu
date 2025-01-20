import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/auth/useLogin";
import Logo from "../assets/images/logo.png";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext"; // Import the context

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const { login, isLoading, error, user } = useLogin(); // Access user from the hook
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Get logout function from context

  const validate = () => {
    const newErrors = {};
    setErrors({ email: "", password: "", general: "" });

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await login(email, password); // Call the login function from the hook
    } catch (err) {
      setErrors({
        ...errors,
        general: err.message || "Login failed. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (user) {
      console.log("User data after login:", user);

      // Navigate based on user category
      switch (user.category.toLowerCase()) {
        case "printing":
          navigate("/printing");
          break;
        case "fresh-oil":
          navigate("/fresh-oil");
          break;
        case "hardware":
          navigate("/hardware");
          break;
        case "animal-feeding":
          navigate("/animal-feeding");
          break;
        case "godown":
          navigate("/godown");
          break;
        case "stationery":
          navigate("/stationery");
          break;
        default:
          navigate("/dashboard");
          break;
      }
    }
  }, [user, navigate]); // Triggered when user state is updated

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={Logo} className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <p className="text-sm text-red-600 text-center">
                {errors.general}
              </p>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign in"}
              </button>
            </div>
          </form>

          {/* Show logout button if user is logged in */}
          {user && (
            <button
              onClick={logout}
              className="mt-4 w-full rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white"
            >
              Log out
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
