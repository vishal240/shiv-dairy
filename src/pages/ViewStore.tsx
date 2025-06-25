import Filters from "../components/Filters";
import Search from "../components/Search";
import amulbanner from "../assets/banner_amul.jpg";
import logoamul from "../assets/logo-amul.webp";
import prod from "../assets/prod.jpg";
import TopSideBar from "../components/TopSideBar";
import DateRangePicker from "../components/DateRangePicker";
import ImportExport from "../components/ImportExport";
import { ChevronLeft, ChevronRight, Mail, MapPin, Phone } from "react-feather";

const ViewStore = () => {
  return (
    <>
      <div className="wrapper2">
        <TopSideBar></TopSideBar>
        <div className="container-fluid">
          <div className="row px-2">
            <div className="col-md-12 pt-4">
              <div className="store_card">
                <div className="row">
                  <div className="col-md-6">
                    <div className="image_wrapper">
                      <img src={amulbanner} className="shop_banner"></img>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start gap-10  pt-4 mt-3">
                      <img src={logoamul} className="shop_img2"></img>
                      <div>
                        <h1 className="store_name mb-0">Amul Dairy</h1>
                        <span className="status in">Active</span>
                        <p className="font-12 text-center color-grey pt-1">
                          Created on 24 October 2025
                        </p>
                      </div>
                    </div>

                    <div className="d-flex gap-10 px-md-2 pt-2">
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
                          315, Annapurna Road, Cipla Complex, Indore, (M.p)
                          452001
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row px-2 pt-3">
            <div className="col-md-6 pt-4 pt-md-0">
              <h1 className="page_heading mb-0">Store Products</h1>
              <div className="breadcrumbs">
                <span>Dashboard / </span>
                <span className="active">Store Products</span>
              </div>
            </div>
            <div className="col-md-6 pt-3">
              <ImportExport></ImportExport>
            </div>
          </div>
          <div className="row px-2 py-3">
            <div className="col-12">
              <div className="card_cmn">
                <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
                  <div>
                    <h1 className="card_heading">Products</h1>
                    <p className="card_subheading">Our Products</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center ">
                    <Search></Search>
                    <Filters></Filters>
                    <DateRangePicker></DateRangePicker>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-2 col-lg-3 pt-3">
                    <div className="store_card">
                      <div>
                        <img src={prod} className="w-100 radius-10"></img>
                      </div>
                      <h2 className="prd_name">Organic cow milk</h2>
                      <div className="d-flex align-items-center justify-content-between">
                        <h1 className="store_name2">Amul Dairy</h1>
                        <span className="font-10 text-green">In-Stock</span>
                      </div>
                      <div className="prod_detail pt-2">
                        <p>SKU - #276459A</p>
                        <p>Category - Cow Milk</p>
                        <p>Price - ₹24.00/-</p>
                        <p>Added on 12/10/2023</p>
                      </div>
                      <div className="d-flex pt-2 align-items-center gap-10">
                        <button className="common-button w-100">View</button>
                        <button className="common-button w-100">Edit</button>
                        <button className="common-button w-100">Delete</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 col-lg-3 pt-3">
                    <div className="store_card">
                      <div>
                        <img src={prod} className="w-100 radius-10"></img>
                      </div>
                      <h2 className="prd_name">Organic cow milk</h2>
                      <div className="d-flex align-items-center justify-content-between">
                        <h1 className="store_name2">Amul Dairy</h1>
                        <span className="font-10 text-green">In-Stock</span>
                      </div>
                      <div className="prod_detail pt-2">
                        <p>SKU - #276459A</p>
                        <p>Category - Cow Milk</p>
                        <p>Price - ₹24.00/-</p>
                        <p>Added on 12/10/2023</p>
                      </div>
                      <div className="d-flex pt-2 align-items-center gap-10">
                        <button className="common-button w-100">View</button>
                        <button className="common-button w-100">Edit</button>
                        <button className="common-button w-100">Delete</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 col-lg-3 pt-3">
                    <div className="store_card">
                      <div>
                        <img src={prod} className="w-100 radius-10"></img>
                      </div>
                      <h2 className="prd_name">Organic cow milk</h2>
                      <div className="d-flex align-items-center justify-content-between">
                        <h1 className="store_name2">Amul Dairy</h1>
                        <span className="font-10 text-green">In-Stock</span>
                      </div>
                      <div className="prod_detail pt-2">
                        <p>SKU - #276459A</p>
                        <p>Category - Cow Milk</p>
                        <p>Price - ₹24.00/-</p>
                        <p>Added on 12/10/2023</p>
                      </div>
                      <div className="d-flex pt-2 align-items-center gap-10">
                        <button className="common-button w-100">View</button>
                        <button className="common-button w-100">Edit</button>
                        <button className="common-button w-100">Delete</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 col-lg-3 pt-3">
                    <div className="store_card">
                      <div>
                        <img src={prod} className="w-100 radius-10"></img>
                      </div>
                      <h2 className="prd_name">Organic cow milk</h2>
                      <div className="d-flex align-items-center justify-content-between">
                        <h1 className="store_name2">Amul Dairy</h1>
                        <span className="font-10 text-green">In-Stock</span>
                      </div>
                      <div className="prod_detail pt-2">
                        <p>SKU - #276459A</p>
                        <p>Category - Cow Milk</p>
                        <p>Price - ₹24.00/-</p>
                        <p>Added on 12/10/2023</p>
                      </div>
                      <div className="d-flex pt-2 align-items-center gap-10">
                        <button className="common-button w-100">View</button>
                        <button className="common-button w-100">Edit</button>
                        <button className="common-button w-100">Delete</button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-2 col-lg-3 pt-3">
                    <div className="store_card">
                      <div>
                        <img src={prod} className="w-100 radius-10"></img>
                      </div>
                      <h2 className="prd_name">Organic cow milk</h2>
                      <div className="d-flex align-items-center justify-content-between">
                        <h1 className="store_name2">Amul Dairy</h1>
                        <span className="font-10 text-green">In-Stock</span>
                      </div>
                      <div className="prod_detail pt-2">
                        <p>SKU - #276459A</p>
                        <p>Category - Cow Milk</p>
                        <p>Price - ₹24.00/-</p>
                        <p>Added on 12/10/2023</p>
                      </div>
                      <div className="d-flex pt-2 align-items-center gap-10">
                        <button className="common-button w-100">View</button>
                        <button className="common-button w-100">Edit</button>
                        <button className="common-button w-100">Delete</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 col-lg-3 pt-3">
                    <div className="store_card">
                      <div>
                        <img src={prod} className="w-100 radius-10"></img>
                      </div>
                      <h2 className="prd_name">Organic cow milk</h2>
                      <div className="d-flex align-items-center justify-content-between">
                        <h1 className="store_name2">Amul Dairy</h1>
                        <span className="font-10 text-green">In-Stock</span>
                      </div>
                      <div className="prod_detail pt-2">
                        <p>SKU - #276459A</p>
                        <p>Category - Cow Milk</p>
                        <p>Price - ₹24.00/-</p>
                        <p>Added on 12/10/2023</p>
                      </div>
                      <div className="d-flex pt-2 align-items-center gap-10">
                        <button className="common-button w-100">View</button>
                        <button className="common-button w-100">Edit</button>
                        <button className="common-button w-100">Delete</button>
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
      </div>
    </>
  );
};

export default ViewStore;
