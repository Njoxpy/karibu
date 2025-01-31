import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Users,
  DollarSign,
  ShoppingCart,
  Package,
  Loader2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { getToken } from "../../../services/token";
// StatCard Component
const StatCard = ({ title, value, prefix = "", isDrop, Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
    <div className="flex items-center justify-between mb-4">
      <div className="bg-blue-50 p-3 rounded-lg">
        <Icon className="text-blue-600 h-6 w-6" />
      </div>
      {isDrop !== undefined && (
        <div
          className={`${
            isDrop ? "text-red-500" : "text-green-500"
          } flex items-center gap-1 text-sm font-medium`}
        >
          {isDrop ? (
            <>
              <ArrowDownRight className="h-4 w-4" />
              <span>Decrease</span>
            </>
          ) : (
            <>
              <ArrowUpRight className="h-4 w-4" />
              <span>Increase</span>
            </>
          )}
        </div>
      )}
    </div>
    <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">
      {prefix && <span className="text-gray-600 mr-1">{prefix}</span>}
      {typeof value === "number" ? value.toLocaleString() : value}
    </p>
  </div>
);

// Chart Component
const MetricsChart = ({ data, options }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-gray-900 mb-4">
      Dashboard Metrics
    </h3>
    <div className="h-96">
      <Bar data={data} options={options} />
    </div>
  </div>
);

// Error Message Component
const ErrorMessage = ({ message }) => (
  <div className="flex items-center gap-2 p-4 text-red-600 bg-red-50 rounded-lg shadow-sm">
    <AlertCircle className="h-5 w-5" />
    <p>{message}</p>
  </div>
);

const DashboardHome = () => {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [totalOrdersCount, setTotalOrdersCount] = useState(null);
  const [totalSales, setTotalSales] = useState(null);
  const [totalProductsCount, setTotalProductsCount] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [previousOrdersCount, setPreviousOrdersCount] = useState(null);
  const [previousSales, setPreviousSales] = useState(null);
  const [previousProductsCount, setPreviousProductsCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countError, setCountError] = useState(null);
  const [salesError, setSalesError] = useState(null);
  const [productsError, setProductsError] = useState(null);
  const token = getToken();

  const selectedCategory = location.pathname.split("/")[2] || "animal-feeding";

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/${selectedCategory}/orders/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch orders (Status: ${response.status})`);
      }
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalOrdersCount = async () => {
    setCountError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/fresh-oil/orders-count`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch total orders count (Status: ${response.status})`
        );
      }
      const data = await response.json();
      setPreviousOrdersCount(totalOrdersCount);
      setTotalOrdersCount(data.totalCount || 0);
    } catch (err) {
      setCountError(err.message);
    }
  };

  const fetchTotalSales = async () => {
    setSalesError(null);
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/fresh-oil/sales-total",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch total sales (Status: ${response.status})`
        );
      }
      const data = await response.json();
      setPreviousSales(totalSales);
      setTotalSales(data.totalSales || 0);
    } catch (err) {
      setSalesError(err.message);
    }
  };

  const fetchTotalProductsCount = async () => {
    setProductsError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/fresh-oil/products-count`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch total products count (Status: ${response.status})`
        );
      }
      const data = await response.json();
      setPreviousProductsCount(totalProductsCount);
      setTotalProductsCount(data.totalProducts || 0);
    } catch (err) {
      setProductsError(err.message);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/v1/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTotalUsers(data.length);
    } catch (error) {
      toast.error("Failed to fetch users: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchTotalOrdersCount();
    fetchTotalProductsCount();
    fetchTotalSales();
    fetchUsers();
  }, [selectedCategory]);

  const chartData = {
    labels: ["Total Sales", "Total Orders", "Total Products"],
    datasets: [
      {
        label: "Metrics",
        data: [totalSales, totalOrdersCount, totalProductsCount],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // Blue
          "rgba(16, 185, 129, 0.8)", // Green
          "rgba(245, 158, 11, 0.8)", // Orange
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 20,
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="space-y-6 p-4 md:p-6 bg-gray-50">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Orders"
          value={totalOrdersCount}
          isDrop={
            previousOrdersCount !== null &&
            totalOrdersCount < previousOrdersCount
          }
          Icon={ShoppingCart}
        />
        <StatCard
          title="Total Sales"
          value={totalSales}
          prefix="Tsh"
          isDrop={previousSales !== null && totalSales < previousSales}
          Icon={DollarSign}
        />
        <StatCard
          title="Total Products"
          value={totalProductsCount}
          isDrop={
            previousProductsCount !== null &&
            totalProductsCount < previousProductsCount
          }
          Icon={Package}
        />
        <StatCard title="Total Users" value={totalUsers} Icon={Users} />
      </div>

      {/* Chart Section */}
      <MetricsChart data={chartData} options={chartOptions} />

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
        </div>
      )}

      {/* Error States */}
      <div className="space-y-2">
        {error && <ErrorMessage message={error} />}
        {countError && <ErrorMessage message={countError} />}
        {salesError && <ErrorMessage message={salesError} />}
        {productsError && <ErrorMessage message={productsError} />}
      </div>

      {/* Empty State */}
      {!loading && !error && orders.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">No orders found for this category.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
