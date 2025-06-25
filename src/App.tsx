import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

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
      <Router>
        <Routes>
          {/* Public routes - only accessible when NOT authenticated */}
          <Route path="/" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/forgot" element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          } />
          <Route path="/reset" element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          } />

          {/* Protected routes - only accessible when authenticated */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="/stores" element={
            <ProtectedRoute>
              <Stores />
            </ProtectedRoute>
          } />
          <Route path="/products" element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } />
          <Route path="/categories" element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          } />
          <Route path="/brands" element={
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          } />
          <Route path="/transactions" element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          } />
          <Route path="/customers" element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          } />
          <Route path="/purchase" element={
            <ProtectedRoute>
              <Purchase />
            </ProtectedRoute>
          } />
          <Route path="/support" element={
            <ProtectedRoute>
              <Support />
            </ProtectedRoute>
          } />
          <Route path="/addstore" element={
            <ProtectedRoute>
              <AddStore />
            </ProtectedRoute>
          } />
          <Route path="/viewstore" element={
            <ProtectedRoute>
              <ViewStore />
            </ProtectedRoute>
          } />
          <Route path="/addorder" element={
            <ProtectedRoute>
              <AddOrder />
            </ProtectedRoute>
          } />
          <Route path="/selectstore" element={
            <ProtectedRoute>
              <SelectStore />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/addproduct" element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          } />
          <Route path="/orderdetails" element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          } />
          <Route path="/addcategories" element={
            <ProtectedRoute>
              <AddCategories />
            </ProtectedRoute>
          } />
          <Route path="/addbrands" element={
            <ProtectedRoute>
              <AddBrands />
            </ProtectedRoute>
          } />
          <Route path="/addcustomer" element={
            <ProtectedRoute>
              <AddCustomer />
            </ProtectedRoute>
          } />
          <Route path="/addpurchase" element={
            <ProtectedRoute>
              <AddPurchase />
            </ProtectedRoute>
          } />
          <Route path="/myprofile" element={
            <ProtectedRoute>
              <Myprofile />
            </ProtectedRoute>
          } />
          <Route path="/customerdetails" element={
            <ProtectedRoute>
              <CustomerDetails />
            </ProtectedRoute>
          } />
          <Route path="/invoice" element={
            <ProtectedRoute>
              <Invoice />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;