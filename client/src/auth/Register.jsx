import { useState } from "react";
import axios from "axios";

const SignupForm = () => {

  const baseURL = import.meta.env.VITE_API_URL ;
  // State for form fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "employee",
    category: "",
  });
  
  // State for form submission and feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Available categories based on your schema
  const categories = [
    { value: "printing", label: "Printing" },
    { value: "fresh-oil", label: "Fresh Oil" },
    { value: "hardware", label: "Hardware" },
    { value: "animal-feeding", label: "Animal Feeding" },
    { value: "godown", label: "Godown" },
    { value: "stationery", label: "Stationery" },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing again
    if (error) setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    if (!formData.category) {
      setError("Please select a category");
      setLoading(false);
      return;
    }

    try {
      // Submit data to your API endpoint
      const response = await axios.post(
        `${baseURL}/users/signup`,
        {
          email: formData.email,
          password: formData.password,
          role: formData.role,
          category: formData.category,
        }
      );

      // Handle success
      setSuccess(true);
      // Reset form
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        role: "employee",
        category: "",
      });
    } catch (err) {
      // Handle error
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Success message */}
          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              Registration successful! You can now log in.
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>

            {/* Confirm Password field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Role selection */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Category selection */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <div className="mt-1">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </form>

          {/* Login link */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <a
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in to your account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
