import { useEffect, useState } from "react";
import { getToken } from "../../../services/token";

const token = getToken();

const OrdersCostDashboard = () => {
  // create variable for api url
   const baseURL = import.meta.env.VITE_API_URL;

  const [ordersCostData, setOrdersCostData] = useState({
    animalFeeding: null,
    freshOil: null,
    godown: null,
    hardware: null,
    stationery: null,
    printing: null,
  });
  const [period, setPeriod] = useState("week");

  const fetchOrdersCostData = async (category, period) => {
    try {
      const response = await fetch(
        `${baseURL}/${category}/total-orders?filter=${period}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      return data.totalCost;
    } catch (error) {
      console.error(`Error fetching ${category} orders cost:`, error);
      return "Error fetching data";
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("sw-TZ", {
      style: "currency",
      currency: "TZS",
    }).format(value);
  };

  useEffect(() => {
    const loadOrdersCostData = async () => {
      const animalFeeding = await fetchOrdersCostData("animal-feeding", period);
      const freshOil = await fetchOrdersCostData("fresh-oil", period);
      const godown = await fetchOrdersCostData("godown", period);
      const hardware = await fetchOrdersCostData("hardware", period);
      const stationery = await fetchOrdersCostData("stationery", period);
      const printing = await fetchOrdersCostData("printing", period);

      setOrdersCostData({
        animalFeeding,
        freshOil,
        godown,
        hardware,
        stationery,
        printing,
      });
    };

    loadOrdersCostData();
  }, [period]);

  const categories = [
    {
      key: "animalFeeding",
      name: "Animal Feeding",
      color: "bg-green-500",
      icon: "🌿",
    },
    {
      key: "freshOil",
      name: "Fresh Oil",
      color: "bg-yellow-500",
      icon: "🛢️",
    },
    {
      key: "godown",
      name: "Godown",
      color: "bg-indigo-500",
      icon: "🏢",
    },
    {
      key: "hardware",
      name: "Hardware",
      color: "bg-blue-500",
      icon: "🔧",
    },
    {
      key: "stationery",
      name: "Stationery",
      color: "bg-blue-400",
      icon: "✏️",
    },
    {
      key: "printing",
      name: "Printing",
      color: "bg-blue-600",
      icon: "📃",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-12">
        Total Orders Cost Dashboard
      </h1>

      {/* Dropdown for selecting period */}
      <div className="flex justify-center mb-6">
        <select
          className="border border-gray-300 rounded-lg p-3 text-lg bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(({ key, name, color, icon }) => (
          <div
            key={key}
            className={`${color} text-white p-6 rounded-lg shadow-lg flex items-center space-x-4`}
          >
            <div className="text-3xl">{icon}</div>
            <div>
              <h2 className="text-2xl font-semibold">{name}</h2>
              <p className="text-lg">
                {ordersCostData[key] !== null
                  ? `Total Orders Cost: ${formatCurrency(ordersCostData[key])}`
                  : "Loading..."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersCostDashboard;
