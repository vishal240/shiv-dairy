import { ChevronLeft, ChevronRight, Mail, MapPin, Phone } from "react-feather";
import Filters from "../components/Filters";
import Search from "../components/Search";
import amulbanner from "../assets/banner_amul.jpg";
import logoamul from "../assets/logo-amul.webp";
import DateRangePicker from "../components/DateRangePicker";
import ImportExport from "../components/ImportExport";
import { useEffect, useState } from "react";
import ApiService from "../services/api";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Pagination from "../components/Pagination/Pagination";
import { usePagination } from "../hooks/usePagination";

const Stores = () => {
  const [stores, setStores] = useState<any>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchStores();
  }, []);
  // Pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedData,
    goToPage,
  } = usePagination({
    data: stores,
    itemsPerPage: 10,
  });
  const fetchStores = () => {
    ApiService.post("/admin/listStores", {
      page: "1",
      limit: "100",
      search: "",
    })
      .then((res: any) => {
        console.log(res);
        setStores(res.data);
      })
      .catch((err: any) => {
        console.error("Error fetching stores:", err);
      });
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
              {paginatedData.length === 0 ? (
                <div className="col-12">
                  <p>No stores found</p>
                </div>
              ) : (
                paginatedData.map((store: any, index: number) => (
                  <div className="col-md-6 col-lg-4 pt-3" key={index}>
                    <div className="store_card">
                      <div className="image_wrapper">
                        <img
                          src={store.banner_image_url}
                          className="shop_banner"
                        ></img>
                        <img
                          src={store.store_image_url}
                          className="shop_img"
                        ></img>
                      </div>
                      <div className="d-flex align-items-start gap-10 justify-content-center pt-4 mt-3">
                        <h1 className="store_name">{store.store_name}</h1>
                        <span className="status in">
                          {store.is_deleted ? "Inactive" : "Active"}
                        </span>
                      </div>
                      <p className="font-12 text-center color-grey">
                        Created on{" "}
                        {dayjs(store.created_on).format("DD MMM YYYY")}
                      </p>
                      <div className="d-flex gap-10 px-md-2">
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
                            {store.address?.street_1}, {store.address?.city},
                            {store.address?.state}, {store.address?.zip},
                            {store.address?.country}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex gap-10">
                        <button className="black_btn w-100">
                          Go To Dashboard
                        </button>
                        <button
                          className="common-button w-100"
                          onClick={() =>
                            navigate("/viewstore", { state: store })
                          }
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={goToPage}
              showInfo={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stores;
