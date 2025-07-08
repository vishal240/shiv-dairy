import {
  Check,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Trash,
  TrendingUp,
} from "react-feather";
import Filters from "../components/Filters";
import Search from "../components/Search";
import shop from "../assets/shop.jpg";
import DateRangePicker from "../components/DateRangePicker";
import ImportExport from "../components/ImportExport";
import Actions from "../components/Actions";

const Transactions = () => {
  return (
    <div className="container-fluid">
      <div className="row px-2 pt-3">
        <div className="col-md-6 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">Transactions</h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span className="active">Transactions List</span>
          </div>
        </div>
        <div className="col-md-6 pt-3">
          <ImportExport
            onAdd={""}
            onImport={() => {}}
            onExport={() => {}}
          ></ImportExport>
        </div>
      </div>

      <div className="row px-2 pt-3">
        <div className="col-12">
          <div className="card_cmn">
            <div className="row">
              <div className="col-md-6 pt-2">
                <div className="card_cmn bg_light">
                  <div className="d-flex gap-10 align-items-center">
                    <span className="icon_cir">
                      <TrendingUp></TrendingUp>
                    </span>
                    <div>
                      <h3 className="card_sub">Total Transactions</h3>
                      <h2 className="card_head">
                        75,345
                        <span>+10%</span>
                      </h2>
                    </div>
                  </div>
                  <div className="row pt-2">
                    <div className="col-md-6 pt-3">
                      <div className="card_cmn">
                        <b className="font-13 color-grey">B2B</b>
                        <h5 className="mb-0 pt-1">2,234</h5>
                      </div>
                    </div>
                    <div className="col-md-6 pt-3">
                      <div className="card_cmn">
                        <b className="font-13 color-grey">B2C</b>
                        <h5 className="mb-0 pt-1">5,725</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 pt-2">
                <div className="card_cmn bg_light">
                  <div className="d-flex gap-10 align-items-center">
                    <span className="icon_cir">
                      <DollarSign></DollarSign>
                    </span>
                    <div>
                      <h3 className="card_sub">Total Revenue</h3>
                      <h2 className="card_head">
                        ₹95,564
                        <span>+10%</span>
                      </h2>
                    </div>
                  </div>
                  <div className="row pt-2">
                    <div className="col-md-6 pt-3">
                      <div className="card_cmn">
                        <b className="font-13 color-grey">B2B</b>
                        <h5 className="mb-0 pt-1">₹6,894</h5>
                      </div>
                    </div>
                    <div className="col-md-6 pt-3">
                      <div className="card_cmn">
                        <b className="font-13 color-grey">B2C</b>
                        <h5 className="mb-0 pt-1">₹3,925</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row px-2 py-3">
        <div className="col-12">
          <div className="card_cmn">
            <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
              <div>
                <h1 className="card_heading">Transactions</h1>
                <p className="card_subheading">All Transactions</p>
              </div>
              <div className="d-flex gap-10 align-items-center ">
                <Search></Search>
                <Filters></Filters>
                <DateRangePicker></DateRangePicker>
                <button className="common-button text-red">
                  <Trash></Trash>
                  Delete
                </button>
              </div>
            </div>
            <table className="data_table">
              <thead>
                <tr>
                  <th>
                    <input
                      id="chx"
                      className="chx_input"
                      type="checkbox"
                    ></input>
                    <label className="chx_lbl" htmlFor="chx">
                      <Check></Check>
                    </label>
                  </th>
                  <th>Trans ID</th>
                  <th>Store</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      id="chx2"
                      className="chx_input"
                      type="checkbox"
                    ></input>
                    <label className="chx_lbl" htmlFor="chx2">
                      <Check></Check>
                    </label>
                  </td>
                  <td>#302012</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img src={shop} className="product-img"></img>
                      <div className="px-2">
                        <p className="products_name">Shiv Dairy</p>
                        <span className="sku">YN, Road, Indore</span>
                      </div>
                    </div>
                  </td>
                  <td>24/10/2025</td>

                  <td>
                    <div className="d-flex align-items-center">
                      <div className="">
                        <p className="products_name">Jhon Doe</p>
                        <span className="sku">jhondow@gmail.com</span>
                      </div>
                    </div>
                  </td>
                  <td>₹121.00</td>
                  <td>B2B</td>
                  <td>
                    <span className="status low">Processing</span>
                  </td>
                  <td>
                    <Actions></Actions>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      id="chx2"
                      className="chx_input"
                      type="checkbox"
                    ></input>
                    <label className="chx_lbl" htmlFor="chx2">
                      <Check></Check>
                    </label>
                  </td>
                  <td>#302012</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img src={shop} className="product-img"></img>
                      <div className="px-2">
                        <p className="products_name">Shiv Dairy</p>
                        <span className="sku">YN, Road, Indore</span>
                      </div>
                    </div>
                  </td>
                  <td>24/10/2025</td>

                  <td>
                    <div className="d-flex align-items-center">
                      <div className="">
                        <p className="products_name">Jhon Doe</p>
                        <span className="sku">jhondow@gmail.com</span>
                      </div>
                    </div>
                  </td>
                  <td>₹121.00</td>
                  <td>B2B</td>
                  <td>
                    <span className="status low">Processing</span>
                  </td>
                  <td>
                    <Actions></Actions>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      id="chx2"
                      className="chx_input"
                      type="checkbox"
                    ></input>
                    <label className="chx_lbl" htmlFor="chx2">
                      <Check></Check>
                    </label>
                  </td>
                  <td>#302012</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img src={shop} className="product-img"></img>
                      <div className="px-2">
                        <p className="products_name">Shiv Dairy</p>
                        <span className="sku">YN, Road, Indore</span>
                      </div>
                    </div>
                  </td>
                  <td>24/10/2025</td>

                  <td>
                    <div className="d-flex align-items-center">
                      <div className="">
                        <p className="products_name">Jhon Doe</p>
                        <span className="sku">jhondow@gmail.com</span>
                      </div>
                    </div>
                  </td>
                  <td>₹121.00</td>
                  <td>B2B</td>
                  <td>
                    <span className="status low">Processing</span>
                  </td>
                  <td>
                    <Actions></Actions>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      id="chx2"
                      className="chx_input"
                      type="checkbox"
                    ></input>
                    <label className="chx_lbl" htmlFor="chx2">
                      <Check></Check>
                    </label>
                  </td>
                  <td>#302012</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img src={shop} className="product-img"></img>
                      <div className="px-2">
                        <p className="products_name">Shiv Dairy</p>
                        <span className="sku">YN, Road, Indore</span>
                      </div>
                    </div>
                  </td>
                  <td>24/10/2025</td>

                  <td>
                    <div className="d-flex align-items-center">
                      <div className="">
                        <p className="products_name">Jhon Doe</p>
                        <span className="sku">jhondow@gmail.com</span>
                      </div>
                    </div>
                  </td>
                  <td>₹121.00</td>
                  <td>B2B</td>
                  <td>
                    <span className="status low">Processing</span>
                  </td>
                  <td>
                    <Actions></Actions>
                  </td>
                </tr>
              </tbody>
            </table>
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

export default Transactions;
