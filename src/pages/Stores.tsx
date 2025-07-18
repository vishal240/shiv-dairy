import { Mail, MapPin, Phone } from "react-feather";
import Search from "../components/Search";
import ImportExport from "../components/ImportExport";
import ApiService from "../services/api";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ApiPagination from "../components/Pagination/ApiPagination";
import { useApiPagination } from "../hooks/useApiPagination";
import DateRangePicker from "../components/DateRangePicker";

const Stores = () => {
  const navigate = useNavigate();

  // API call function
  const fetchStores = async (
    page: number,
    limit: number,
    search: string,
    startdate: string,
    enddate: string
  ) => {
    return await ApiService.post("/admin/listStores", {
      filters: {
        search: search,
        startdate: startdate,
        enddate: enddate,
      },
      sorters: {},
      pagination: {
        page: page.toString(),
        pageSize: limit.toString(),
      },
    });
  };
  // Use API pagination hook
  const {
    data: stores,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    loading,
    error,
    goToPage,
    refresh,
    goToSearch,
    goToDateSearch,
  } = useApiPagination({
    apiCall: fetchStores,
    itemsPerPage: 10,
    initialPage: 1,
  });
  // Handle page change
  const handlePageChange = (page: number) => {
    goToPage(page);
  };
  const handleSearch = (value: string) => {
    goToSearch(value);
  };
  const handleDateChange = (startDate: any, endDate: any) => {
    goToDateSearch(
      dayjs(startDate).format("YYYY-MM-DD"),
      dayjs(endDate).format("YYYY-MM-DD")
    );
  };
  const handleExport = () => {
    if (!stores || stores.length === 0) {
      console.error("No data available to export.");
      return;
    }

    exportToCSV(stores, "stores.csv");
  };
  const exportToCSV = (data: any[], fileName: string) => {
    const csvContent = data
      .map((row) =>
        Object.values(row)
          .map((value) => `"${value}"`) // Wrap values in quotes to handle commas
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
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
            onExport={handleExport}
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
                <Search onSearch={handleSearch} />
                {/* <Filters /> */}
                <DateRangePicker onDateChange={handleDateChange} />
                <button
                  onClick={refresh}
                  className="common-button"
                  disabled={loading}
                >
                  Refresh
                </button>
              </div>
            </div>
            {error && (
              <div
                className="alert alert-danger"
                style={{
                  fontSize: "12px",
                  padding: "8px",
                  marginBottom: "15px",
                }}
              >
                {error}
              </div>
            )}
            <div className="row">
              {stores.length === 0 ? (
                <div className="col-12">
                  <p>No stores found</p>
                </div>
              ) : (
                stores.map((store: any, index: number) => (
                  <div className="col-md-6 col-lg-4 pt-3" key={index}>
                    <div className="store_card">
                      <div className="image_wrapper">
                        <img
                          src={store.banner_image}
                          className="shop_banner"
                        ></img>
                        <img src={store.store_image} className="shop_img"></img>
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

            <ApiPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              loading={loading}
              showInfo={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stores;
