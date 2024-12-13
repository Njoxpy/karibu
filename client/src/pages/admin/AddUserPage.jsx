import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUserPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [status, setStatus] = useState("active");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newUser = {
                name,
                email,
                password,
                role,
                status,
            };

            const response = await axios.post(
                "http://localhost:5000/api/v1/users",
                newUser
            );

            if (response.status === 201) {
                // Redirect to the users page or show a success message
                navigate("/admin/users");
            }
        } catch (error) {
            setError("Failed to add user. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold">Add New User</h2>
            <form onSubmit={handleSubmit} className="mt-5">
                {error && <p className="text-red-600">{error}</p>}

                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter user's name"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter user's email"
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter user's password"
                    />
                </div>

                {/* Role */}
                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium">
                        Role
                    </label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* Status */}
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium">
                        Status
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-2 bg-blue-500 text-white rounded-md ${loading ? "bg-gray-400" : "hover:bg-blue-600"
                        }`}
                >
                    {loading ? "Adding..." : "Add User"}
                </button>
            </form>
        </div>
    );
};

export default AddUserPage;
