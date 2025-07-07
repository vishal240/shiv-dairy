import { ChevronLeft, ChevronRight, Mail, MapPin, Phone } from "react-feather";
import Filters from "../components/Filters";
import Search from "../components/Search";
import amulbanner from "../assets/banner_amul.jpg";
import logoamul from "../assets/logo-amul.webp";
import DateRangePicker from "../components/DateRangePicker";
import ImportExport from "../components/ImportExport";
import { useEffect, useState } from "react";
import ApiService from "../services/api";

const Stores = () => {
  const [stores, setStores] = useState<any>([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response: any = await ApiService.post("/admin/listStores", {
        page: "1",
        limit: "2",
        search: "",
      });
      console.log(response);
      setStores(response.data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row px-2 pt-3">
        <div className="col-md-6 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">Stores</h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span className="active">Stores</span>
          </div>
        </div>
        <div className="col-md-6 pt-3">
          <ImportExport
            onAdd={"/addstore"}
            onImport={() => {}}
            onExport={() => {}}
          />
        </div>
      </div>
      <div className="row px-2 py-3">
        <div className="col-12">
          <div className="card_cmn">
            <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
              <div>
                <h1 className="card_heading">Stores</h1>
                <p className="card_subheading">Our Stores</p>
              </div>
              <div className="d-flex gap-10 align-items-center ">
                <Search />
                <Filters />
                <DateRangePicker />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-lg-4 pt-3">
                <div className="store_card">
                  <div className="image_wrapper">
                    <img src={amulbanner} className="shop_banner"></img>
                    <img src={logoamul} className="shop_img"></img>
                  </div>
                  <div className="d-flex align-items-start gap-10 justify-content-center pt-4 mt-3">
                    <h1 className="store_name">Amul Dairy</h1>
                    <span className="status in">Active</span>
                  </div>
                  <p className="font-12 text-center color-grey">
                    Created on 24 October 2025
                  </p>
                  <div className="d-flex gap-10 px-md-2">
                    <span className="shop_icon">
                      <Mail></Mail>
                    </span>
                    <div>
                      <p className="font-12 color-grey mb-0">Email</p>
                      <p className="font-12">lindablair@mail.com</p>
                    </div>
                  </div>
                  <div className="d-flex gap-10 px-md-2">
                    <span className="shop_icon">
                      <Phone></Phone>
                    </span>
                    <div>
                      <p className="font-12 color-grey mb-0">Phone</p>
                      <p className="font-12">+91 62617010116</p>
                    </div>
                  </div>
                  <div className="d-flex gap-10 px-md-2">
                    <span className="shop_icon">
                      <MapPin></MapPin>
                    </span>
                    <div>
                      <p className="font-12 color-grey mb-0">Address</p>
                      <p className="font-12">
                        315, Annapurna Road, Cipla Complex, Indore, (M.p) 452001
                      </p>
                    </div>
                  </div>
                  <div className="d-flex gap-10">
                    <button className="black_btn w-100">Go To Dashboard</button>
                    <button className="common-button w-100">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="table_footer mt-3">
              <p className="row_counts">Showing 1-5 from 15</p>
              <div className="pagination">
                <button>
                  <ChevronLeft></ChevronLeft>
                </button>
                <ul>
                  <li>1</li>
                  <li className="active">2</li>
                  <li>3</li>
                </ul>
                <button>
                  <ChevronRight></ChevronRight>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stores;
