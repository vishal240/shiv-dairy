import { Check, ChevronLeft, ChevronRight, Trash } from "react-feather";
import Filters from "../components/Filters";
import Search from "../components/Search";
import DateRangePicker from "../components/DateRangePicker";
import ImportExport from "../components/ImportExport";
import Actions from "../components/Actions";

const Customers = () => {
  return (
    <div className="container-fluid">
      <div className="row px-2 pt-3">
        <div className="col-md-6 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">Customers</h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span className="active">Customers</span>
          </div>
        </div>
        <div className="col-md-6 pt-3">
          <ImportExport
            onAdd={"/addcustomer"}
            onImport={() => {}}
            onExport={() => {}}
          ></ImportExport>
        </div>
      </div>
      <div className="row px-2 py-3">
        <div className="col-12">
          <div className="card_cmn">
            <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
              <div>
                <h1 className="card_heading">Customer</h1>
                <p className="card_subheading">Customer List</p>
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
                  <th>Customer Name</th>
                  <th>Phone</th>
                  <th>Orders</th>
                  <th>Order Value</th>
                  <th>Status</th>
                  <th>Created</th>
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
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="">
                        <p className="products_name">Jhon Doe</p>
                        <span className="sku">jhondow@gmail.com</span>
                      </div>
                    </div>
                  </td>
                  <td>+91 62617 01016</td>
                  <td>25</td>
                  <td>₹1.221.00</td>
                  <td>
                    <span className="status in">Active </span>
                  </td>
                  <td>24/10/2025</td>
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
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="">
                        <p className="products_name">Jhon Doe</p>
                        <span className="sku">jhondow@gmail.com</span>
                      </div>
                    </div>
                  </td>
                  <td>+91 62617 01016</td>
                  <td>25</td>
                  <td>₹1.221.00</td>
                  <td>
                    <span className="status in">Active </span>
                  </td>
                  <td>24/10/2025</td>
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
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="">
                        <p className="products_name">Jhon Doe</p>
                        <span className="sku">jhondow@gmail.com</span>
                      </div>
                    </div>
                  </td>
                  <td>+91 62617 01016</td>
                  <td>25</td>
                  <td>₹1.221.00</td>
                  <td>
                    <span className="status in">Active </span>
                  </td>
                  <td>24/10/2025</td>
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
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="">
                        <p className="products_name">Jhon Doe</p>
                        <span className="sku">jhondow@gmail.com</span>
                      </div>
                    </div>
                  </td>
                  <td>+91 62617 01016</td>
                  <td>25</td>
                  <td>₹1.221.00</td>
                  <td>
                    <span className="status in">Active </span>
                  </td>
                  <td>24/10/2025</td>
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

export default Customers;
