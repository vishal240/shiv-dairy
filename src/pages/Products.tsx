import Filters from "../components/Filters";
import Search from "../components/Search";

import prod from "../assets/prod.jpg";
import TopSideBar from "../components/TopSideBar";
import DateRangePicker from "../components/DateRangePicker";
import ImportExport from "../components/ImportExport";
import { ChevronLeft, ChevronRight } from "react-feather";

const Products = () => {
  return (
    <>
      <div className="wrapper2">
        <TopSideBar></TopSideBar>
        <div className="container-fluid">
          <div className="row px-2 pt-3">
            <div className="col-md-6 pt-4 pt-md-0">
              <h1 className="page_heading mb-0">Products</h1>
              <div className="breadcrumbs">
                <span>Dashboard / </span>
                <span className="active">Products</span>
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

export default Products;
