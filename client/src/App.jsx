import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// layout
import RootLayout from "./layouts/RootLayout";
import OrdersLayout from "./layouts/OrdersLayout";
import ReceiptLayout from "./layouts/ReceiptLayout";

// errors
import NotFound from "./error/NotFound";
import OrderDetailsError from "./error/OrderDetailsError";

// pages
import Home from "./Home/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import SubmitWork from "./auth/SubmitWork";
import Receipt from "./pages/Receipt";
import ForgotPassword from "./auth/ForgotPassword";
import EmailSent from "./auth/EmailSent";
import EnterEmail from "./auth/EnterEmail";
import UserDashboard from "./pages/UserDashboard";
import OrdersTable from "./pages/Printing/Orders/OrderTable";
import Contact from "./pages/Contact";
import Help from "./pages/Help";

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

/*godown */

// godown pages
import AddGodown from "./pages/Godown/Components/AddOrder";
import GodownList from "./pages/Godown/Pages/GodownList";
// godown details
import GodownDetails from "./pages/Godown/Pages/GodownDetails";
// godown layout
import GodownLayout from "./pages/Godown/Layouts/GodownLayout";
// godown error
import GodownDetailsError from "./pages/Godown/Error/GodownDetailsError";

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
import StationeryOrders from "./pages/Stationery/Pages/Orders";
import AddItems from "./pages/Stationery/Components/StationeryItemsUpload";
import OrderSucessStationery from "./pages/Stationery/Components/OrderSucessStationery";
// stationery details
import StationeryItemsDetails from "./pages/Stationery/Pages/StationeryItemDetails";
// stationery layout
import StationeryLayout from "./pages/Stationery/Layouts/StationeryLayout";
// stationery error

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

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/emailsend" element={<EmailSent />} />
        <Route path="/enterEmail" element={<EnterEmail />} />
        <Route path="/password/new" element={<ForgotPassword />} />

        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
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
          {/*
           should the links for admin int the page be into the app.js or it should have its own protetcted routes */}
        </Route>

        {/* godown */}
        <Route path="/godown" element={<GodownLayout />}>
          <Route index element={<GodownList />} />
          <Route
            path=":id"
            element={<GodownDetails />}
            errorElement={<GodownDetailsError />}
          />
          <Route path="add" element={<AddGodown />} />
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
          <Route path=":id" element={<StationeryItemsDetails />} />
          <Route path="orders" element={<StationeryOrders />} />
          <Route path="admin/upload" element={<AddItems />} />
          <Route path="order/sucess" element={<OrderSucessStationery />} />
          <Route path="admin/orders" element={<StationeryOrders />} />
          <Route path="admin/manage" element={<ManageFood />} />
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
