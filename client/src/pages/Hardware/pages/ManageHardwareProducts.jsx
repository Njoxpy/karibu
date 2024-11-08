import Animal2 from "../../../assets/images/animal2.jpg";
import Footer from "../../../components/Footer";

const ManageHardwareProducst = () => {
  const products = [
    {
      id: 1,
      name: "Chakula Cha Paka",
      price: 2_400,
      image: "/images/dog-food.jpg",
    },
    {
      id: 2,
      name: "Chakula Cha Mbwa",
      price: 2_233,
      image: "/images/cat-food.jpg",
    },
    { id: 3, name: "Nyau Food", price: 1_500, image: "/images/cat-food.jpg" },
    { id: 4, name: "Kuku Food", price: 7_000, image: "/images/cat-food.jpg" },
    { id: 5, name: "Bata Food", price: 2_300, image: "/images/cat-food.jpg" },
  ];

  const handleEdit = (id) => {
    // Redirect or open edit modal
  };

  const handleDelete = (id) => {
    // Handle delete logic
  };

  return (
    <>
      <div className="p-4 bg-blue-50">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Manage Animal Products
        </h1>
        <table className="min-w-full bg-white border">
          <thead className="text-center">
            <tr className="text-center">
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">
                  <img
                    src={Animal2}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">Tsh {product.price}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-600 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600 mr-2">
            Previous
          </button>
          <button className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600 mr-2">
            Next
          </button>
        </div>
        <a
          href="/hardware/admin/upload"
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Add New Product
        </a>
      </div>
      <Footer />
    </>
  );
};

export default ManageHardwareProducst;
