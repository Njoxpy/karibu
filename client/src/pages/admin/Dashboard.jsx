import AdminDashboard from "./adminDashboard";
import NavbarAdmin from "./NavbarAdmin";

const Dashboard = () => {
    return (
        <>
            <NavbarAdmin />
            <div className="p-6">
                <AdminDashboard />
            </div>
        </>
    )
}

export default Dashboard;