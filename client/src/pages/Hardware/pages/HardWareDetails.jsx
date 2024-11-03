import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../../../components/Footer";

function HardWareDetails() {
  const { id } = useParams();
  //   add a functionality to delete the item if the user is authenticated as an admin
  return (
    <>
      <div className="p-4">
        <h3>HardWare Details</h3>
        <p>the id of the product is {id}</p>
      </div>

      <Footer />
    </>
  );
}

export default HardWareDetails;
