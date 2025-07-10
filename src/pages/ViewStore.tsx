import { Mail, MapPin, Phone } from "react-feather";
import Products from "./Products";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const ViewStore = () => {
  const [store, setStore] = useState<any>({});
  const location = useLocation();

  useEffect(() => {
    setStore(location.state);
  }, [location]);

  return (
    <div className="container-fluid">
      <div className="row px-2">
        <div className="col-md-12 pt-4">
          <div className="store_card">
            <div className="row">
              <div className="col-md-6">
                <div className="image_wrapper">
                  <img
                    src={store.banner_image_url}
                    className="shop_banner"
                  ></img>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start gap-10  pt-4 mt-3">
                  <img src={store.store_image_url} className="shop_img2"></img>
                  <div>
                    <h1 className="store_name mb-0">{store.store_name}</h1>
                    <span className="status in">
                      {store.is_deleted ? "Inactive" : "Active"}
                    </span>
                    <p className="font-12 text-center color-grey pt-1">
                      Created on {dayjs(store.created_on).format("DD MMM YYYY")}
                    </p>
                  </div>
                </div>

                <div className="d-flex gap-10 px-md-2 pt-2">
                  <span className="shop_icon">
                    <Mail></Mail>
                  </span>
                  <div>
                    <p className="font-12 color-grey mb-0">Email</p>
                    <p className="font-12">{store.email}</p>
                  </div>
                </div>
                <div className="d-flex gap-10 px-md-2">
                  <span className="shop_icon">
                    <Phone></Phone>
                  </span>
                  <div>
                    <p className="font-12 color-grey mb-0">Phone</p>
                    <p className="font-12">
                      {store.country_code_primary}
                      {store.phone_primary}
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-10 px-md-2">
                  <span className="shop_icon">
                    <MapPin></MapPin>
                  </span>
                  <div>
                    <p className="font-12 color-grey mb-0">Address</p>
                    <p className="font-12">
                      {store.address?.street_1}, {store.address?.city},{" "}
                      {store.address?.state}, {store.address?.zip},{" "}
                      {store.address?.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Products />
    </div>
  );
};

export default ViewStore;
