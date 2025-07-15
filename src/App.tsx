import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy } from "react";
import { AuthProvider } from "./contexts/AuthContext";
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const PublicRoute = lazy(() => import("./components/PublicRoute"));

// Layouts
const AuthenticatedLayout = lazy(() => import("./layouts/AuthenticatedLayout"));
const PublicLayout = lazy(() => import("./layouts/PublicLayout"));

// Auth pages
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Login = lazy(() => import("./pages/Login"));

// Protected pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Orders = lazy(() => import("./pages/Orders"));
const Stores = lazy(() => import("./pages/Stores"));
const Products = lazy(() => import("./pages/Products"));
const Brands = lazy(() => import("./pages/Brands"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Customers = lazy(() => import("./pages/Customers"));
const Purchase = lazy(() => import("./pages/Purchase"));
const Support = lazy(() => import("./pages/Support"));
const AddStore = lazy(() => import("./pages/AddStore"));
const ViewStore = lazy(() => import("./pages/ViewStore"));
const AddOrder = lazy(() => import("./pages/AddOrder"));
const SelectStore = lazy(() => import("./pages/SelectStore"));
const Checkout = lazy(() => import("./pages/Checkout"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const AddCategories = lazy(() => import("./pages/AddCategories"));
const AddBrands = lazy(() => import("./pages/AddBrands"));
const AddCustomer = lazy(() => import("./pages/AddCustomer"));
const AddPurchase = lazy(() => import("./pages/AddPurchase"));
const Myprofile = lazy(() => import("./pages/Myprofile"));
const CustomerDetails = lazy(() => import("./pages/CustomerDetails"));
const Invoice = lazy(() => import("./pages/Invoice"));
const CategoriesWithApi = lazy(() => import("./pages/CategoriesWithApi"));
function App() {
  return (
    <AuthProvider>
      <Router basename="/admin">
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
            <Route path="categories" element={<CategoriesWithApi />} />
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
            <Route path="editcustomer/:id" element={<AddCustomer />} />
            <Route path="addpurchase" element={<AddPurchase />} />
            <Route path="editpurchase/:id" element={<AddPurchase />} />
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
