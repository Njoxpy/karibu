import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([]); // Ensure it's initialized as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [search, setSearch] = useState(""); // Search input state

  // Fetching users when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/users")
      .then((response) => {
        setUsers(response.data.users || []); // Ensure that users is always an array
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  // Handle user deletion
  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:5000/api/v1/users/${userId}`)
        .then((response) => {
          alert("User deleted successfully!");
          setUsers(users.filter(user => user.id !== userId)); // Remove deleted user from state
        })
        .catch((error) => {
          alert("Failed to delete user.");
        });
    }
  };

  // Filter users based on search input
  const filteredUsers = Array.isArray(users) ? users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  ) : []; // Ensure `users` is always an array before applying `filter`

  if (loading) return <p>Loading...</p>; // Display loading state
  if (error) return <p className="text-red-600">{error}</p>; // Display error state

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold">Manage Users</h2>
      {/* Search Bar */}
      <div className="mt-4 mb-4 flex justify-between items-center">
        <input
          type="text"
          className="p-2 border rounded-md"
          placeholder="Search users by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search state
        />
        <Link
          to="/admin/users/create"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add New User
        </Link>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">User ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${user.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <Link
                    to={`/admin/users/edit/${user.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>
                  {" | "}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
