import { useState, useEffect } from "react";
import Orders from "./Orders";

function TestingPagination() {
  const [orders, setOrders] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderPerPage, setOrderPerPage] = useState(2);

  const URL = "http://localhost:3003/orders";

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        setIsLoading(true);
        if (!response.ok) {
          throw new Error("response not ok");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <Orders loading={loading} orders={orders} />
    </>
  );
}

export default TestingPagination;
