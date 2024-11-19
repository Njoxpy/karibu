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
debugger

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
import Hardware from "./pages/Hardware/pages/Hardware";
import HardWareDetails from "./pages/Hardware/pages/HardWareDetails";
import HardwareItemsUpload from "./pages/Hardware/Components/HardwareItemsUpload";
import OrderSucessHardware from "./pages/Hardware/Components/OrderSuccessHardware";
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
import OrderSucessPrinting from "./pages/Printing/Components/OrdersSucessPrinting";
import ManagePrintingOrders from "./pages/Printing/Orders/ManagePrinitingOrders";
import HomePrinting from "./pages/Printing/Pages/HomePrinting";
import PrintingOrders from "./pages/Printing/Pages/PrintingOrders";
// printing details
// printing layout
import PrintingLayout from "./pages/Printing/Layouts/PrintingLayout";
// printing error

/* stationery */
// stationey pages
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
import AdminOrders from "./pages/AnimalFeeding/Admin/AdminOrders";
import OrderDetailsAnimal from "./pages/AnimalFeeding/Components/OrderDetails";

// ERROR
import ErrorPage from "./pages/AnimalFeeding/Error/ErrorPage";
import ManageStationeryProducts from "./pages/Stationery/Pages/ManageStationeryProducts";
import InventoryMovement from "./pages/Godown/Pages/InventoryMovement";
import InventoryTable from "./pages/Godown/Pages/InventoryTable";
import Cart from "./components/Cart";
import FoodsBody from "./pages/AnimalFeeding/Pages/FoodsBody";
import AnimalFeedingProductsLayout from "./pages/AnimalFeeding/Layouts/AnimalFeedingProductsLayout"
import BulkUpload from "./pages/AnimalFeeding/Components/BulkUpload";

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

          <Route path="products" element={<AnimalFeedingProductsLayout />}>
            <Route index element={<FoodsBody />} />
            <Route
              path=":productId"
              element={<ProductDetail />}
              errorElement={<ErrorPage />}
            />
          </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetailsAnimal />} />
          <Route path="order/sucess" element={<OrderSucess />} />
          <Route path="admin/bulk-upload" element={<BulkUpload />} />
          <Route path="admin/upload" element={<FoodUpload />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/upload" element={<FoodUpload />} />
          <Route path="admin/manage" element={<ManageFood />} />
        </Route>

        {/* fresh oil */}
        <Route path="/freshOil" element={<OilLayouts />}>
          <Route index element={<OilList />} />
          <Route path="products" element={<OilLayoutProduct />}>
            <Route index element={<Oils />} />
            <Route path=":id" element={<OilDetails />} />
          </Route>
          <Route path="orders" element={<FreshOilOrders />} />
          <Route
            path="orders/:id"
            element={<FreshOilOrdersDetails />}
            errorElement={<FreshOilOrderDetailsError />}
          />
          <Route path="admin/upload" element={<UploadFreshOil />} />
          <Route path="admin/manage" element={<ManagFreshOil />} />
        </Route>

        {/* godown */}
        <Route path="/godown" element={<GodownLayout />}>
          <Route index element={<Godown />} />
          <Route path="products" element={<GodownLayoutProduct />}>
            <Route index element={<InventoryTable />} />
            <Route path=":id" element={<GodownProductDetails />} />
          </Route>
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
          <Route index element={<Hardware />} />
          <Route path="products" element={<HardwareLayoutProducts />}>
            <Route index element={<Hardwares />} />
            <Route path=":id" element={<HardWareDetails />} />
          </Route>
          <Route path="orders" element={<HardwareOrders />} />
          <Route
            path="orders/:id"
            element={<HardWareDetails />}
            errorElement={<HardwareDetailsError />}
          />
          <Route path="admin/upload" element={<HardwareItemsUpload />} />
          <Route path="order/sucess" element={<OrderSucessHardware />} />
          <Route path="admin/orders" element={<HardwareOrders />} />
          <Route path="admin/manage" element={<ManageHardwareProducts />} />
        </Route>

        {/* landing page */}

        {/* printing */}
        <Route path="/printing" element={<PrintingLayout />}>
          <Route index element={<HomePrinting />} />
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
          <Route path="order/sucess" element={<OrderSucessPrinting />} />
          <Route path="admin/orders" element={<PrintingOrders />} />
          <Route path="admin/manage" element={<ManagePrintingOrders />} />
        </Route>

        {/* stationery */}
        <Route path="/stationery" element={<StationeryLayout />}>
          <Route index element={<StationeryItemsList />} />
          <Route path="products" element={<StationeryProductsLayout />}>
            <Route index element={<StationeryBody />} />
            <Route
              path=":id"
              element={<StationeryItemsDetails />}
              errorElement={<StationeryItemsDetails />}
            />
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
