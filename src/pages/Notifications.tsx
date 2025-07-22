import React, { useState } from "react";
import { Check, X } from "react-feather";
import { useEffect } from "react";
import ApiService from "../services/api";
const Notifications = () => {
  const [notifications, setnotifications] = useState([]);
  useEffect(() => {
    getNotifications();
  }, []);
  const getNotifications = async () => {
    try {
      await ApiService.post("/admin/getNotifications", {}).then(
        (response: any) => {
          if (response.status === 200) {
            setnotifications(response.data);
          }
        }
      );
    } catch (error: any) {
      console.log(error);
    }
  };
  const markAsUnread = async (id: string) => {
    try {
      await ApiService.post("/admin/setNotificationStatus", {
        notification_id: id,
      }).then((response: any) => {
        if (response.status === 200) {
          getNotifications();
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  };
  const markAsRead = async (id: string) => {
    try {
      await ApiService.post("/admin/setNotificationStatus", {
        notification_id: id,
      }).then((response: any) => {
        if (response.status === 200) {
          getNotifications();
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row px-2 pt-3">
          <div className="col-md-6 pt-4 pt-md-0">
            <h1 className="page_heading mb-0">Notifications</h1>
            <div className="breadcrumbs">
              <span>Dashboard / </span>
              <span>Notifications List </span>
            </div>
          </div>
          {/* <div className="col-md-6 pt-3">
            <span className="gap-10 d-flex align-items-center justify-content-md-end">
              <button className="btn_imprt">
                <X></X> Mark as unread
              </button>

              <button className="black_btn">
                <Check></Check> Mark as read
              </button>
            </span>
          </div> */}
        </div>
        <div className="row px-2">
          {notifications.length > 0 ? (
            notifications.map((item: any, index: any) => (
              <div className="col-8 mt-2" key={index}>
                <div className="card_cmn">
                  <h6 className="font-14">You have a new notification</h6>
                  <p className="font-12 color-grey">{item.title}</p>
                  <p className="font-12 color-grey">{item.message}</p>
                  <span className="gap-10 d-flex align-items-center ">
                    {item.status === "unread" ? (
                      <button
                        className="btn_imprt"
                        onClick={() => markAsUnread(item._id)}
                      >
                        <X></X> Mark as unread
                      </button>
                    ) : (
                      <button
                        className="black_btn"
                        onClick={() => markAsRead(item._id)}
                      >
                        <Check></Check> Mark as read
                      </button>
                    )}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 mt-2">
              <div className="card_cmn">
                <h6 className="font-14">No notifications found</h6>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;
