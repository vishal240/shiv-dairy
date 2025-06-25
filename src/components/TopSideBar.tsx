import {
  Menu,
  Search,
  Bell,
  Mail,
  ChevronDown,
  User,
  Settings,
  LogOut,
  PieChart,
  Tv,
  Box,
  ShoppingBag,
  Package,
  Headphones,
  Circle,
} from "react-feather";
import { useState } from "react";
import logo from "../assets/logo.png";
import profile from "../assets/profile.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const TopSideBar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const dashboard = () => {
    navigate("/dashboard");
  };
  const stores = () => {
    navigate("/stores");
  };
  const orders = () => {
    navigate("/orders");
  };
  const products = () => {
    navigate("/products");
  };
  const categories = () => {
    navigate("/categories");
  };
  const brands = () => {
    navigate("/brands");
  };
  const transactions = () => {
    navigate("/transactions");
  };
  const customers = () => {
    navigate("/customers");
  };
  const purchase = () => {
    navigate("/purchase");
  };
  const support = () => {
    navigate("/support");
  };
  const myProfile = () => {
    navigate("/myprofile");
  };
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  
  return (
    <>
      <div className="top_strip">
        <button className="btn_menu" onClick={toggleSidebar}>
          <Menu></Menu>
          Menu
        </button>
        <div className="d-flex align-items-center justify-content-end gap-10">
          <div className="search_input">
            <Search></Search>
            <input type="text" placeholder="Search anything"></input>
          </div>
          <button className="btn_notification">
            <Bell></Bell>
          </button>
          <button className="btn_notification">
            <Mail></Mail>
          </button>
          <div className="dropdown">
            <button
              className="profile_dropdown"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={profile}></img>
              <div className="text-left">
                <b>Shiv Dairy</b>
                <label>Admin</label>
              </div>
              <ChevronDown size={18}></ChevronDown>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#" onClick={myProfile}>
                  {" "}
                  <User></User> My Profile{" "}
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <Settings></Settings> Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={handleLogout}>
                  <LogOut></LogOut> Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`sidebar_wrapper ${sidebarOpen ? "show_sidebar" : ""}`}>
        <div className="logo">
          <img src={logo}></img>
        </div>
        <div className="menus pt-0 pt-md-4">
          <ul className="pt-1">
            <li className="active" onClick={dashboard}>
              <PieChart></PieChart>
              Dashboard
            </li>
            <li className="" onClick={stores}>
              <Tv></Tv>
              Stores
            </li>
            <li className=" p-0">
              <div
                className="accordion accordion-flush w-100 bg-trans"
                id="accordionFlushExample"
              >
                <div className="accordion-item bg-trans">
                  <h2 className="accordion-header bg-trans">
                    <button
                      className="accordion-button bg-trans collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      <Box></Box>
                      Product Management
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body px-2 pb-2 pt-1">
                      <ul className="sub_menu">
                        <li onClick={products}>
                          <Circle></Circle>Products
                        </li>
                        <li onClick={categories}>
                          <Circle></Circle>Categories
                        </li>
                        <li onClick={brands}>
                          <Circle></Circle>Brands
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className=" p-0">
              <div
                className="accordion accordion-flush w-100 bg-trans"
                id="accordionFlushExample2"
              >
                <div className="accordion-item bg-trans">
                  <h2 className="accordion-header bg-trans">
                    <button
                      className="accordion-button bg-trans collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne2"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      <ShoppingBag></ShoppingBag>
                      Order Management
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne2"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample2"
                  >
                    <div className="accordion-body px-2 pb-2 pt-1">
                      <ul className="sub_menu">
                        <li onClick={orders}>
                          <Circle></Circle>Orders
                        </li>
                        <li onClick={customers}>
                          <Circle></Circle>Customers
                        </li>
                        <li onClick={transactions}>
                          <Circle></Circle>Transactions
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="" onClick={purchase}>
              <Package></Package>
              Purchase
            </li>
            <li className="" onClick={support}>
              <Headphones></Headphones>
              Support
            </li>
            <li className="text-red" onClick={handleLogout}>
              <LogOut></LogOut>
              Log Out
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default TopSideBar;