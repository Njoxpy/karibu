import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// layout
import RootLayout from "./layouts/RootLayout";
import OrdersLayout from "./pages/Printing/Layouts/OrdersLayout";
// errors
import NotFound from "./error/NotFound";
import OrderDetailsError from "./pages/Printing/Error/OrderDetailsError";

// pages
import Home from "./Home/Home";
import Login from "./auth/Login";
import OrdersTable from "./pages/Printing/Orders/OrderTable";
import Contact from "./pages/Contact";

// details
import OrderDetails from "./pages/Printing/Orders/OrderDetails";

/* hardware */

// hardware pages
import Hardware from "./pages/Hardware/pages/Hardware";
import HardWareDetails from "./pages/Hardware/pages/HardWareDetails";
import HardwareItemsUpload from "./pages/Hardware/Components/HardwareItemsUpload";
import ManageHardwareProducts from "./pages/Hardware/pages/ManageHardwareProducts";
import HardwareOrders from "./pages/Hardware/pages/HardwareOrders";
import Hardwares from "./pages/Hardware/pages/Hardwares";

// harwdware layout
import HardwareLayoutProducts from "./pages/Hardware/layouts/HardwareProductsLayout";
import HardwareLayout from "./pages/Hardware/layouts/HardwareLayot";

// hardware error
import HardwareDetailsError from "./pages/Hardware/Error/HardwareDetailsError";

/* fresh oil */

// fresh oil pages
import OilList from "./pages/FreshOil/Pages/Oil";
import UploadFreshOil from "./pages/FreshOil/Components/UploadFreshOil";
import ManagFreshOil from "./pages/FreshOil/Pages/ManageFreshOil";
import Oils from "./pages/FreshOil/Pages/Oils";
import FreshOilOrders from "./pages/FreshOil/Pages/FreshOilOrders";

// fresh oil details
import OilDetails from "./pages/FreshOil/Pages/OilDetails";
import FreshOilOrdersDetails from "./pages/FreshOil/Pages/FreshOilOrdersDetails";

// fresh oil layout
import OilLayouts from "./pages/FreshOil/Layouts/OilLayouts";
import OilLayoutProduct from "./pages/FreshOil/Layouts/OilLayoutProducts";

// fresh oil error
import FreshOilOrderDetailsError from "./pages/FreshOil/Error/FreshOilOrderDetailsError";

/* GODOWN */

// godown pages
import UploadGodownItems from "./pages/Godown/Components/UploadGodownItems";
import ManageGodownItems from "./pages/Godown/Pages/ManageGodownItems";
import GodownProductDetails from "./pages/Godown/Pages/GodownProductDetails";
import GodownOrders from "./pages/Godown/Pages/GodownOrders";
import Godown from "./pages/Godown/Pages/Godown";
// godown details
import GodownOrderDetails from "./pages/Godown/Pages/GodownOrderDetails";
// godown layout
import GodownLayout from "./pages/Godown/Layouts/GodownLayout";
import GodownLayoutProduct from "./pages/Godown/Layouts/GodownLayoutProduct";
// godown error
import GodownOrderDetailsError from "./pages/Godown/Error/GodownOrderDetailsError";

/*printing */
// printing pages
import HomePrinting from "./pages/Printing/Pages/HomePrinting";
import PrintingOrders from "./pages/Printing/Pages/PrintingOrders";
// printing details
// printing layout
import PrintingLayout from "./pages/Printing/Layouts/PrintingLayout";
// printing error

/* stationery */
import StationeryItemsList from "./pages/Stationery/Pages/StationeryItemsList";
import StationeryBody from "./pages/Stationery/Pages/StationeryBody";
import StationeryOrders from "./pages/Stationery/Pages/Orders";
import AddItems from "./pages/Stationery/Components/StationeryItemsUpload";
// stationery details
import StationeryOrderDetails from "./pages/Stationery/Pages/StationeryOrderDetails";
import StationeryItemsDetails from "./pages/Stationery/Pages/StationeryItemDetails";
// stationery layout
import StationeryLayout from "./pages/Stationery/Layouts/StationeryLayout";
import StationeryProductsLayout from "./pages/Stationery/Layouts/StationeryProductsLayout";
// stationery error
import StationeryOrderDetailsError from "./pages/Stationery/Error/StationeryOrderDetailsError";
import StationeryItemsError from "./pages/Stationery/Error/StationeryItemsError";
/* ANIMAl FEEDING */
// LAYOUT ANIMAL FEEDING
import AnimalFeedingLayout from "./pages/AnimalFeeding/Layouts/AnimalFeedingLayout";

// PAGES
import AnimalFeeding from "./pages/AnimalFeeding/Pages/AnimalFeeding";
import FoodUpload from "./pages/AnimalFeeding/Admin/FoodUpload";
import ManageFood from "./pages/AnimalFeeding/Admin/AdminManage";
import ProductDetail from "./pages/AnimalFeeding/Pages/ProductDetails";
import Orders from "./pages/AnimalFeeding/Pages/Orders";
import OrderDetailsAnimal from "./pages/AnimalFeeding/Components/OrderDetails";

// ERROR
import ErrorPage from "./pages/AnimalFeeding/Error/ErrorPage";
import ManageStationeryProducts from "./pages/Stationery/Pages/ManageStationeryProducts";
import InventoryTable from "./pages/Godown/Pages/InventoryTable";
import FoodsBody from "./pages/AnimalFeeding/Pages/FoodsBody";
import AnimalFeedingProductsLayout from "./pages/AnimalFeeding/Layouts/AnimalFeedingProductsLayout";
import BulkUploadGodown from "./pages/Godown/Components/BulkUploadGodown";
import OrderItem from "./pages/FreshOil/Components/OrderItem";
import OrderItemGodown from "./pages/Godown/Pages/OrderItemGodown";
import OrderItemStationery from "./pages/Stationery/Pages/OrderItemStationery";
import OrderItemAnimalFeeding from "./pages/AnimalFeeding/Pages/OrderItemAnimalFeeding";
import OrderItemHardware from "./pages/Hardware/pages/OrderItemHardware";
import AnimalFeedingOrderDetailsError from "./pages/AnimalFeeding/Error/AnimalFeedingOrderDetailsError";
// admin
import DashboardLayout from "./pages/admin/layout/DashboardLayout";
import DashboardHome from "./pages/admin/pages/DashboardHome";
import UsersPage from "./pages/admin/pages/UsersPage";
import ReportsPage from "./pages/admin/pages/ReportsPage";
import UserProfile from "./components/UserProfile";
import AddUserPage from "./pages/admin/components/AddUserPage";

import OilDetailsError from "./pages/FreshOil/Error/OilDetailsError";
import GodownItemsDetailsError from "./pages/Godown/Error/GodownItemsDetailsError";
import HardWareOrdersDetails from "./pages/Hardware/pages/HardWareOrdersDetails";
import ProductsMovement from "./pages/Godown/Pages/movement/Product";
import ProductsMovementDetails from "./pages/Godown/Pages/movement/ProductMovementDetails";
import MovementLogs from "./pages/Godown/Pages/movement/MovementLogs";

import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="admin/*"
          element={
            <ProtectedRoute roles={["admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/create" element={<AddUserPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* admin */}

          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<UserProfile />} />

          {/* animal feeding */}
          <Route path="/animal-feeding" element={<AnimalFeedingLayout />}>
            <Route index element={<AnimalFeeding />} />

            <Route path="products" element={<AnimalFeedingProductsLayout />}>
              <Route index element={<FoodsBody />} />
              <Route
                path=":id"
                element={<ProductDetail />}
                errorElement={<ErrorPage />}
              />
            </Route>
            <Route path="order-item" element={<OrderItemAnimalFeeding />} />
            <Route path="orders" element={<Orders />} />
            <Route
              path="orders/:id"
              element={<OrderDetailsAnimal />}
              errorElement={<AnimalFeedingOrderDetailsError />}
            />
            <Route path="admin/upload" element={<FoodUpload />} />
            <Route path="admin/manage" element={<ManageFood />} />
          </Route>

          {/* fresh oil */}
          <Route path="/fresh-oil" element={<OilLayouts />}>
            <Route index element={<OilList />} />
            <Route path="products" element={<OilLayoutProduct />}>
              <Route index element={<Oils />} />
              <Route
                path=":id"
                element={<OilDetails />}
                errorElement={<OilDetailsError />}
              />
            </Route>
            <Route path="orders" element={<FreshOilOrders />} />
            <Route
              path="orders/:id"
              element={<FreshOilOrdersDetails />}
              errorElement={<FreshOilOrderDetailsError />}
            />
            <Route path="order-item" element={<OrderItem />} />
            <Route path="admin/upload" element={<UploadFreshOil />} />
            <Route path="admin/manage" element={<ManagFreshOil />} />
          </Route>

          {/* godown */}
          <Route path="/godown" element={<GodownLayout />}>
            <Route index element={<Godown />} />
            <Route path="products" element={<GodownLayoutProduct />}>
              <Route index element={<InventoryTable />} />
              <Route
                path=":id"
                element={<GodownProductDetails />}
                errorElement={<GodownItemsDetailsError />}
              />
            </Route>
            <Route path="orders" element={<GodownOrders />} />
            <Route
              path="orders/:id"
              element={<GodownOrderDetails />}
              errorElement={<GodownOrderDetailsError />}
            />
            <Route path="order-item" element={<OrderItemGodown />} />
            <Route path="admin/upload" element={<UploadGodownItems />} />
            <Route path="admin/bulk-upload" element={<BulkUploadGodown />} />
            <Route path="admin/manage" element={<ManageGodownItems />} />
            <Route path="admin/movement-logs" element={<MovementLogs />} />
            <Route path="admin/move">
              <Route index element={<ProductsMovement />} />{" "}
              <Route path=":id" element={<ProductsMovementDetails />} />{" "}
            </Route>
          </Route>

          {/* hardware */}
          <Route path="/hardware" element={<HardwareLayout />}>
            <Route index element={<Hardware />} />
            <Route path="products" element={<HardwareLayoutProducts />}>
              <Route index element={<Hardwares />} />
              <Route path=":id" element={<HardWareDetails />} />
            </Route>
            <Route path="orders" element={<HardwareOrders />} />
            <Route
              path="orders/:id"
              element={<HardWareOrdersDetails />}
              errorElement={<HardwareDetailsError />}
            />
            <Route path="order-item" element={<OrderItemHardware />} />
            <Route path="admin/upload" element={<HardwareItemsUpload />} />
            <Route path="admin/manage" element={<ManageHardwareProducts />} />
          </Route>

          {/* printing */}
          <Route path="/printing" element={<PrintingLayout />}>
            <Route index element={<HomePrinting />} />
            <Route path="orders" element={<OrdersLayout />}>
              <Route index element={<OrdersTable />} />
              <Route
                path=":id"
                element={<OrderDetails />}
                errorElement={<OrderDetailsError />}
              />
            </Route>
            <Route path="admin/orders" element={<PrintingOrders />} />
          </Route>

          {/* stationery */}
          <Route path="/stationery" element={<StationeryLayout />}>
            <Route index element={<StationeryItemsList />} />
            <Route path="products" element={<StationeryProductsLayout />}>
              <Route index element={<StationeryBody />} />
              <Route
                path=":id"
                element={<StationeryItemsDetails />}
                errorElement={<StationeryItemsError />}
              />
            </Route>
            <Route path="orders" element={<StationeryOrders />} />
            <Route
              path="orders/:id"
              element={<StationeryOrderDetails />}
              errorElement={<StationeryOrderDetailsError />}
            />
            <Route path="order-item" element={<OrderItemStationery />} />
            <Route path="admin/upload" element={<AddItems />} />
            <Route path="admin/manage" element={<ManageStationeryProducts />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
