import {
  Menu,
  Search,
  Bell,
  Mail,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "react-feather";

import { Fragment, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import ApiService from "../services/api";
import Icons from "./Icons";

const TopSideBar = () => {
  const [menuList, setmenuList] = useState<any>([]);
  const [adminDetails, setadminDetails] = useState<any>("");
  const navigate = useNavigate();
  const locations = useLocation();
  const { logout } = useAuth();
  const [notificationscount, setnotificationscount] = useState(0);
  useEffect(() => {
    getMenus();
    getAdminDetails();
    getNotifications();
  }, []);
  const getNotifications = async () => {
    try {
      await ApiService.post("/admin/getNotificationCount", {}).then(
        (response: any) => {
          if (response.status === 200) {
            setnotificationscount(response.data.unread_count);
          }
        }
      );
    } catch (error: any) {
      console.log(error);
    }
  };
  const getAdminDetails = async () => {
    try {
      await ApiService.post("/admin/getAdminDetails", {}).then(
        (response: any) => {
          if (response.status === 200) {
            setadminDetails(response.data);
          }
        }
      );
    } catch (error: any) {
      console.log(error);
    }
  };
  const getMenus = async () => {
    try {
      await ApiService.post("/admin/getMenuList", {}).then((response: any) => {
        if (response.status === 200) {
          setmenuList(response.data);
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const myProfile = () => {
    navigate("/myprofile");
  };
  const setting = () => {
    navigate("/settings");
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
          <button
            className="btn_notification"
            onClick={() => navigate("/notifications")}
          >
            <Bell></Bell>
            {notificationscount > 0 && (
              <span className="notification_count">{notificationscount}</span>
            )}
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
              <img src={adminDetails?.profile_image_url}></img>
              <div className="text-left">
                <b>{adminDetails?.admin_name}</b>
                <label>{adminDetails?.user_type}</label>
              </div>
              <ChevronDown size={18}></ChevronDown>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" onClick={myProfile}>
                  {" "}
                  <User></User> My Profile{" "}
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={setting}>
                  <Settings></Settings> Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleLogout}>
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
            {menuList.map((item: any, index: any) => (
              <Fragment key={index}>
                {item.submenu.length == 0 && (
                  <li
                    className={
                      locations.pathname === item.menu_url ? "active" : ""
                    }
                    onClick={() => navigate(item.menu_url)}
                  >
                    <Icons item={item.icon} /> {item.menu_name}
                  </li>
                )}
                {item.submenu.length > 0 && (
                  <li className=" p-0">
                    <div
                      className="accordion accordion-flush w-100 bg-trans"
                      id={`accordionFlushExample${index}`}
                    >
                      <div className="accordion-item bg-trans">
                        <h2 className="accordion-header bg-trans">
                          <button
                            className="accordion-button bg-trans collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#flush-collapseOne${index}`}
                            aria-expanded="false"
                            aria-controls={`flush-collapseOne${index}`}
                          >
                            <Icons item={item.icon} /> {item.menu_name}
                          </button>
                        </h2>
                        <div
                          id={`flush-collapseOne${index}`}
                          className="accordion-collapse collapse"
                          data-bs-parent={`#accordionFlushExample${index}`}
                        >
                          <div className="accordion-body px-2 pb-2 pt-1">
                            <ul className="sub_menu">
                              {item.submenu.map((item1: any, index1: any) => (
                                <li
                                  key={index1}
                                  className={
                                    locations.pathname === item1.menu_url
                                      ? "active"
                                      : ""
                                  }
                                  onClick={() => navigate(item1.menu_url)}
                                >
                                  <Icons item={item1.icon} /> {item1.menu_name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )}
              </Fragment>
            ))}

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
