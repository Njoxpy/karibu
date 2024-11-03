import { Outlet } from "react-router-dom";

const GodownLayout = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default GodownLayout;
