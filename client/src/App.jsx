import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// layout
import RootLayout from "./layouts/RootLayout";
import OrdersLayout from "./pages/Printing/Layouts/OrdersLayout";
import ReceiptLayout from "./pages/Printing/Layouts/ReceiptLayout";

// errors
import NotFound from "./error/NotFound";
import OrderDetailsError from "./pages/Printing/Error/OrderDetailsError";

// pages
import Home from "./Home/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import SubmitWork from "./pages/Printing/Pages/SubmitWork";
import Receipt from "./pages/Printing/Pages/Receipt";
import ForgotPassword from "./auth/ForgotPassword";
import EmailSent from "./auth/EmailSent";
import EnterEmail from "./auth/EnterEmail";
import UserDashboard from "./pages/Printing/Pages/UserDashboard";
import OrdersTable from "./pages/Printing/Orders/OrderTable";
import Contact, { contactAction } from "./pages/Contact";

// details
import OrderDetails from "./pages/Printing/Orders/OrderDetails";
import ReceiptDetails from "./pages/Printing/receipt/ReceiptDetails";

/* hardware */

// hardware pages
import HardwareList from "./pages/Hardware/pages/HardwareList";
import AddHardware from "./pages/Hardware/pages/AddHardware";
import HardWareDetails from "./pages/Hardware/pages/HardWareDetails";

// harwdware layout
import HardwareLayout from "./pages/Hardware/layouts/HardwareLayout";
import HardwaresLayout from "./pages/Hardware/layouts/HardwaresLayout";

// hardware error
import HardwareDetailsError from "./pages/Hardware/Error/HardwareDetailsError";

/* fresh oil */

// fresh oil pages
import AddOil from "./pages/FreshOil/Components/AddOil";
import OilList from "./pages/FreshOil/Pages/OilList";

// fresh oil details
import OilDetails from "./pages/FreshOil/Pages/OilDetails";

// fresh oil layout
import OilLayouts from "./pages/FreshOil/Layouts/OilLayouts";

// fresh oil error
import OilDetailsError from "./pages/FreshOil/Error/OilDetailsError";

/* GODOWN */

// godown pages
import UploadGodownItems from "./pages/Godown/Components/UploadGodownItems";
import ManageGodownItems from "./pages/Godown/Pages/ManageGodownItems";
import GodownOrders from "./pages/Godown/Pages/GodownOrders";
import Godown from "./pages/Godown/Pages/Godown";
// godown details
import GodownOrderDetails from "./pages/Godown/Pages/GodownOrderDetails";
// godown layout
import GodownLayout from "./pages/Godown/Layouts/GodownLayout";
// godown error
import GodownOrderDetailsError from "./pages/Godown/Error/GodownOrderDetailsError";

/*printing */
// printing pages
// printing details
// printing layout
import PrintingLayout from "./pages/Printing/Layouts/PrintingLayout";
// printing error

/* stationery */
// stationey pages
import SearchItemStationery from "./pages/Stationery/Components/Search";
import StationeryItemsList from "./pages/Stationery/Pages/StationeryItemsList";
import StationeryBody from "./pages/Stationery/Pages/StationeryBody";
import StationeryOrders from "./pages/Stationery/Pages/Orders";
import AddItems from "./pages/Stationery/Components/StationeryItemsUpload";
import OrderSucessStationery from "./pages/Stationery/Components/OrderSucessStationery";
// stationery details
import StationeryOrderDetails from "./pages/Stationery/Pages/StationeryOrderDetails";
import StationeryItemsDetails from "./pages/Stationery/Pages/StationeryItemDetails";
// stationery layout
import StationeryLayout from "./pages/Stationery/Layouts/StationeryLayout";
import StationeryProductsLayout from "./pages/Stationery/Layouts/StationeryProductsLayout";
// stationery error
import StationeryOrderDetailsError from "./pages/Stationery/Error/StationeryOrderDetailsError";

/* ANIMAl FEEDING */
// LAYOUT ANIMAL FEEDING
import AnimalFeedingLayout from "./pages/AnimalFeeding/Layouts/AnimalFeedingLayout";

// PAGES
import AnimalFeeding from "./pages/AnimalFeeding/Pages/AnimalFeeding";
import FoodUpload from "./pages/AnimalFeeding/Admin/FoodUpload";
import Order from "./pages/AnimalFeeding/Components/OrderForm";
import OrderSucess from "./pages/AnimalFeeding/Pages/OrderSuccess";
import ManageFood from "./pages/AnimalFeeding/Admin/AdminManage";
import ProductDetail from "./pages/AnimalFeeding/Pages/ProductDetails";
import Orders from "./pages/AnimalFeeding/Pages/Orders";
import SearchFood from "./pages/AnimalFeeding/Components/FoodSearch";
import AdminOrders from "./pages/AnimalFeeding/Admin/AdminOrders";

// ERROR
import ErrorPage from "./pages/AnimalFeeding/Error/ErrorPage";
import ManageStationeryProducts from "./pages/Stationery/Pages/ManageStationeryProducts";
import InventoryMovement from "./pages/Godown/Pages/InventoryMovement";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/emailsend" element={<EmailSent />} />
        <Route path="/enter-email" element={<EnterEmail />} />
        <Route path="/password/new" element={<ForgotPassword />} />

        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/contact" element={<Contact />} action={contactAction} />
        {/* animal feeding */}
        <Route path="/animal-feeding" element={<AnimalFeedingLayout />}>
          <Route index element={<AnimalFeeding />} />
          <Route
            path="food/:productId"
            element={<ProductDetail />}
            errorElement={<ErrorPage />}
          />
          <Route path="order" element={<Order />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/sucess" element={<OrderSucess />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/upload" element={<FoodUpload />} />
          <Route path="admin/manage" element={<ManageFood />} />
          <Route path="search" element={<SearchFood />} />
        </Route>

        {/* fresh oil */}
        <Route path="/oil" element={<OilLayouts />}>
          <Route index element={<OilList />} />
          <Route
            path=":id"
            element={<OilDetails />}
            errorElement={<OilDetailsError />}
          />
          <Route path="add" element={<AddOil />} />
        </Route>

        {/* godown */}
        <Route path="/godown" element={<GodownLayout />}>
          <Route index element={<Godown />} />
          <Route path="orders" element={<GodownOrders />} />
          <Route
            path="orders/:id"
            element={<GodownOrderDetails />}
            errorElement={<GodownOrderDetailsError />}
          />
          <Route path="admin/upload" element={<UploadGodownItems />} />
          <Route path="admin/manage" element={<ManageGodownItems />} />
          <Route path="admin/move" element={<InventoryMovement />} />
        </Route>
        {/* hardware */}
        <Route path="/hardware" element={<HardwareLayout />}>
          <Route index element={<HardwareList />} />
          <Route path="hardwares" element={<HardwaresLayout />}>
            <Route index element={<HardwareList />} />
            <Route
              path=":id"
              element={<HardWareDetails />}
              errorElement={<HardwareDetailsError />}
            />
          </Route>
          <Route path="add" element={<AddHardware />} />
        </Route>

        {/* landing page */}

        {/* printing */}
        <Route path="/printing" element={<PrintingLayout />}>
          <Route path="submit" element={<SubmitWork />} />
          <Route path="receipts" element={<ReceiptLayout />}>
            <Route index element={<Receipt />} />
            <Route path=":id" element={<ReceiptDetails />} />
          </Route>
          <Route path="orders" element={<OrdersLayout />}>
            <Route index element={<OrdersTable />} />
            <Route
              path=":id"
              element={<OrderDetails />}
              errorElement={<OrderDetailsError />}
            />
          </Route>
        </Route>
        {/* stationery */}
        <Route path="/stationery" element={<StationeryLayout />}>
          <Route index element={<StationeryItemsList />} />
          <Route path="products" element={<StationeryProductsLayout />}>
            <Route index element={<StationeryBody />} />
            <Route path=":id" element={<StationeryItemsDetails />} />
          </Route>
          <Route path="orders" element={<StationeryOrders />} />
          <Route
            path="orders/:id"
            element={<StationeryOrderDetails />}
            errorElement={<StationeryOrderDetailsError />}
          />
          <Route path="admin/upload" element={<AddItems />} />
          <Route path="order/sucess" element={<OrderSucessStationery />} />
          <Route path="admin/orders" element={<StationeryOrders />} />
          <Route path="admin/manage" element={<ManageStationeryProducts />} />
          <Route path="search" element={<SearchItemStationery />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
