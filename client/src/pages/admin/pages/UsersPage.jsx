import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../../services/token"; // Function to retrieve token
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const token = getToken(); // Retrieve the token

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include token in header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data); // Assuming the API returns an array of users
      } catch (error) {
        toast.error("Error fetching users: " + error.message); // Show error toast
      }
    };

    fetchUsers();
  }, [token]); // Dependency array includes token to re-fetch if token changes

  const handleDelete = async () => {
    try {
      // Deleting user with API call
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${userToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Update local state to reflect the deletion
      setUsers(users.filter((user) => user._id !== userToDelete._id));

      // Close the modal
      setDeleteModalOpen(false);

      // Show success toast
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Error deleting user: " + error.message); // Show error toast
    }
  };

  const handleEdit = async () => {
    try {
      const updatedData = {
        email: newEmail,
        password: newPassword,
        role: newRole,
        category: newCategory,
      };

      // Updating user data with API call
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${userToEdit._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData), // Sending updated user data
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      // Update user data locally
      setUsers(
        users.map((user) =>
          user._id === userToEdit._id ? { ...user, ...updatedData } : user
        )
      );

      // Close the modal
      setEditModalOpen(false);

      // Show success toast
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("Error updating user: " + error.message); // Show error toast
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(search.toLowerCase()) || // Search by email
      user.role.toLowerCase().includes(search.toLowerCase()) || // Optionally, search by role
      user.category.toLowerCase().includes(search.toLowerCase()) // Optionally, search by category
  );

  return (
    <div className="p-5">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Manage Users
      </h2>
      {/* Display number of users */}
      <p className="text-lg mb-4">Total Users: {users.length}</p>{" "}
      {/* This will display the number of users */}
      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          className="p-3 border rounded-md w-full shadow-sm focus:outline-blue-400"
          placeholder="Search by email, role, or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Link
        to={"/admin/users/create"}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
      >
        Add New User
      </Link>
      {/* User Table */}
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id} // Use _id for key
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.role}</td>
                <td className="px-6 py-3">{user.category}</td>
                <td className="px-6 py-3 space-x-3">
                  <button
                    onClick={() => {
                      setUserToEdit(user);
                      setNewEmail(user.email); // Default to email for editing
                      setNewPassword(""); // Clear password field
                      setNewRole(user.role); // Default to role for editing
                      setNewCategory(user.category); // Default to category for editing
                      setEditModalOpen(true);
                    }}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setUserToDelete(user);
                      setDeleteModalOpen(true);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            <input
              type="text"
              className="p-3 border rounded-md w-full mb-4 shadow-sm focus:outline-blue-400"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <input
              type="password"
              className="p-3 border rounded-md w-full mb-4 shadow-sm focus:outline-blue-400"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="text"
              className="p-3 border rounded-md w-full mb-4 shadow-sm focus:outline-blue-400"
              placeholder="Role"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            />
            <input
              type="text"
              className="p-3 border rounded-md w-full mb-4 shadow-sm focus:outline-blue-400"
              placeholder="Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-end">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default UsersPage;
