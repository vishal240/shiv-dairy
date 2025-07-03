import Filters from "../components/Filters";
import Search from "../components/Search";

import prod from "../assets/prod.jpg";

import { ChevronLeft, ChevronRight, ShoppingBag } from "react-feather";

const AddOrder = () => {
  return (
    <div className="container-fluid">
      <div className="row px-2 pt-3">
        <div className="col-md-12 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">Shopping</h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span className="active">Shopping</span>
          </div>
        </div>
      </div>
      <div className="row px-2 py-3">
        <div className="col-12">
          <div className="card_cmn">
            <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
              <div className="d-flex gap-10 align-items-center ">
                <Search></Search>
                <Filters></Filters>
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
                    <p>Category - Cow Milk</p>
                    <p>Starts From - ₹24.00/-</p>
                  </div>
                  <div className="d-flex pt-2 align-items-center gap-10">
                    <button className="black_btn w-100">
                      <ShoppingBag></ShoppingBag>
                      Select Store
                    </button>
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
                    <p>Category - Cow Milk</p>
                    <p>Starts From - ₹24.00/-</p>
                  </div>
                  <div className="d-flex pt-2 align-items-center gap-10">
                    <button className="black_btn w-100">
                      <ShoppingBag></ShoppingBag>
                      Select Store
                    </button>
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
                    <p>Category - Cow Milk</p>
                    <p>Starts From - ₹24.00/-</p>
                  </div>
                  <div className="d-flex pt-2 align-items-center gap-10">
                    <button className="black_btn w-100">
                      <ShoppingBag></ShoppingBag>
                      Select Store
                    </button>
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
                    <p>Category - Cow Milk</p>
                    <p>Starts From - ₹24.00/-</p>
                  </div>
                  <div className="d-flex pt-2 align-items-center gap-10">
                    <button className="black_btn w-100">
                      <ShoppingBag></ShoppingBag>
                      Select Store
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

export default AddOrder;