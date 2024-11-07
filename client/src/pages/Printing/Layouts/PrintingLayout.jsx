import { Outlet } from "react-router-dom";

function PrintingLayout() {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default PrintingLayout;
