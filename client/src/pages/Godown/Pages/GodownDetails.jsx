import { useParams } from "react-router-dom";

export default function GodownDetails() {
  const { id } = useParams();
  return (
    <>
      <div>
        <h4>GodownDetails</h4>
        <p>order details for id: {id}</p>
      </div>
    </>
  );
}
