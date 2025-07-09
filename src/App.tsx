import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

// Layouts
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import PublicLayout from "./layouts/PublicLayout";

// Auth pages
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";

// Protected pages
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Stores from "./pages/Stores";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import Transactions from "./pages/Transactions";
import Customers from "./pages/Customers";
import Purchase from "./pages/Purchase";
import Support from "./pages/Support";
import AddStore from "./pages/AddStore";
import ViewStore from "./pages/ViewStore";
import AddOrder from "./pages/AddOrder";
import SelectStore from "./pages/SelectStore";
import Checkout from "./pages/Checkout";
import AddProduct from "./pages/AddProduct";
import OrderDetails from "./pages/OrderDetails";
import AddCategories from "./pages/AddCategories";
import AddBrands from "./pages/AddBrands";
import AddCustomer from "./pages/AddCustomer";
import AddPurchase from "./pages/AddPurchase";
import Myprofile from "./pages/Myprofile";
import CustomerDetails from "./pages/CustomerDetails";
import Invoice from "./pages/Invoice";

function App() {
  return (
    <AuthProvider>
      <Router basename="/shivdairyadmin">
        <Routes>
          {/* Public routes - only accessible when NOT authenticated */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <PublicLayout />
              </PublicRoute>
            }
          >
            <Route index element={<Login />} />
            <Route path="forgot" element={<ForgotPassword />} />
            <Route path="reset" element={<ResetPassword />} />
          </Route>

          {/* Protected routes - only accessible when authenticated */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="stores" element={<Stores />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="brands" element={<Brands />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="customers" element={<Customers />} />
            <Route path="purchase" element={<Purchase />} />
            <Route path="support" element={<Support />} />
            <Route path="addstore" element={<AddStore />} />
            <Route path="viewstore" element={<ViewStore />} />
            <Route path="addorder" element={<AddOrder />} />
            <Route path="selectstore" element={<SelectStore />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="editproduct/:id" element={<AddProduct />} />
            <Route path="orderdetails" element={<OrderDetails />} />
            <Route path="addcategories" element={<AddCategories />} />
            <Route path="editcategory/:id" element={<AddCategories />} />
            <Route path="addbrands" element={<AddBrands />} />
            <Route path="editbrands/:id" element={<AddBrands />} />
            <Route path="addcustomer" element={<AddCustomer />} />
            <Route path="addpurchase" element={<AddPurchase />} />
            <Route path="myprofile" element={<Myprofile />} />
            <Route path="customerdetails" element={<CustomerDetails />} />
            <Route path="invoice" element={<Invoice />} />
          </Route>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
