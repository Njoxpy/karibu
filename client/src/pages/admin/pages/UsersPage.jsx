import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../../services/token";
import { toast, ToastContainer } from "react-toastify";
import {
  Search,
  Edit2,
  Trash2,
  Plus,
  X,
  Loader2,
  Users as UsersIcon,
  Mail,
  Building,
  Tags,
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../../components/Pagination"; // Import the Pagination component

// Reusable components
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const FormField = ({ label, icon: Icon, error, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <input
        {...props}
        className={`
          w-full ${Icon ? "pl-10" : "pl-3"} pr-3 py-2
          border-2 rounded-md
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition duration-200
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const Button = ({ variant = "primary", icon: Icon, children, ...props }) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border-2 border-gray-300 text-gray-600 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
    warning: "border border-yellow-500 text-yellow-500 hover:bg-yellow-50",
    delete: "border border-red-500 text-red-500 hover:bg-red-50",
  };

  return (
    <button
      {...props}
      className={`
        inline-flex items-center px-4 py-2 
        rounded-md transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${variants[variant]} ${props.className || ""}
      `}
    >
      {Icon && <Icon size={16} className="mr-2" />}
      {children}
    </button>
  );
};

const SelectField = ({ label, icon: Icon, options, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <select
        {...props}
        className={`
          w-full ${Icon ? "pl-10" : "pl-3"} pr-3 py-2
          border-2 border-gray-300 rounded-md
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition duration-200
        `}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    category: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const token = getToken();

  const categories = [
    { value: "animal-feeding", label: "Animal Feeding" },
    { value: "fresh-oil", label: "Fresh Oil" },
    { value: "godown", label: "Godown" },
    { value: "hardware", label: "Hardware" },
    { value: "printing", label: "Printing" },
    { value: "stationery", label: "Stationery" },
  ];

  const roles = [
    { value: "employee", label: "Employee" },
    { value: "admin", label: "Admin" },
  ];

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/v1/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${userToEdit._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      await fetchUsers();
      setEditModalOpen(false);
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("Failed to update user: " + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${userToDelete._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      await fetchUsers();
      setDeleteModalOpen(false);
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user: " + error.message);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <UsersIcon className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Manage Users
            </h2>
            <p className="text-lg text-gray-600 pt-2">
              Total Users:{" "}
              <span className="font-semibold text-gray-800">
                {users.length}
              </span>
            </p>
          </div>
        </div>

        <Link to="/admin/users/create">
          <Button icon={Plus} variant="primary">
            Add New User
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 font-medium">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <Button
                        variant="warning"
                        icon={Edit2}
                        onClick={() => {
                          setUserToEdit(user);
                          setFormData({
                            email: user.email,
                            password: "",
                            role: user.role,
                            category: user.category,
                          });
                          setEditModalOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="delete"
                        icon={Trash2}
                        onClick={() => {
                          setUserToDelete(user);
                          setDeleteModalOpen(true);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit User"
      >
        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          icon={Mail}
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Leave blank to keep current password"
        />
        <SelectField
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          options={roles}
          icon={Building}
        />
        <SelectField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          options={categories}
          icon={Tags}
        />
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="secondary" onClick={() => setEditModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete User"
      >
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete User
          </Button>
        </div>
      </Modal>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredUsers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={3000}
      />
    </div>
  );
};

export default UsersPage;
