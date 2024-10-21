import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// layout
import RootLayout from './layouts/RootLayout';
import OrdersLayout from './layouts/OrdersLayout';

// errors
import NotFound from './error/NotFound';
import OrderDetailsError from './error/OrderDetailsError';

// pages
import Home from './Home/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import SubmitWork from './auth/SubmitWork';
import Receipt from './pages/Receipt';
import ForgotPassword from './auth/ForgotPassword';
import EmailSent from './auth/EmailSent';
import EnterEmail from './auth/EnterEmail';
import UserDashboard from './pages/UserDashboard';
import OrdersTable from './pages/Orders/OrderTable';
import Contact from './pages/Contact';
import Help from './pages/Help';

// details
import OrderDetails from './pages/Orders/OrderDetails';

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/emailsend" element={<EmailSent />} />
        <Route path="/enterEmail" element={<EnterEmail />} />
        <Route path="/password/new" element={<ForgotPassword />} />
        <Route path="/submit" element={<SubmitWork />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/help" element={<Help />} />
        {/* orders */}
        <Route path="/orders" element={<OrdersLayout />}>
          <Route index element={<OrdersTable />} />
          <Route
            path=":id"
            element={<OrderDetails />}
            errorElement={<OrderDetailsError />}
          />
        </Route>
        <Route path="/contact" element={<Contact />} />
        {/* notfound */}
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
