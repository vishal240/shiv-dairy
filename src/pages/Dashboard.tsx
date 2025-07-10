import {
  Box,
  Check,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Trash,
  TrendingUp,
  Users,
} from "react-feather";
import DateRangePicker from "../components/DateRangePicker";
import milk from "../assets/milk.jpg";
import shop from "../assets/shop.jpg";
import Filters from "../components/Filters";
import Search from "../components/Search";

const Dashboard = () => {
  return (
    <>
      <div className="row pt-3 px-2">
        <div className="col-md-6 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">Dashboard</h1>
          <p className="font-12 mb-1 mt-1 color-grey">
            Your selected store is <b>Shiv Dairy</b>
          </p>
        </div>
        <div className="col-md-6 pt-3 pt-md-0">
          <div className="d-flex gap-10 justify-content-md-end">
            <div>
              <select className="store_select">
                <option>Please Select Store</option>
              </select>
            </div>
            <DateRangePicker onDateChange={() => {}}></DateRangePicker>
          </div>
        </div>
      </div>
      <div className="row px-2">
        <div className=" col-md-6 col-lg-3 pt-3">
          <div className="card_cmn">
            <span className="icon_cir">
              <TrendingUp></TrendingUp>
            </span>
            <h3 className="card_sub">Total Sales</h3>
            <h2 className="card_head">
              ₹75,345
              <span>+10%</span>
            </h2>
          </div>
        </div>
        <div className=" col-md-6 col-lg-3 pt-3">
          <div className="card_cmn">
            <span className="icon_cir">
              <ShoppingBag></ShoppingBag>
            </span>
            <h3 className="card_sub">Total Orders</h3>
            <h2 className="card_head">
              234
              <span>+10%</span>
            </h2>
          </div>
        </div>
        <div className=" col-md-6  col-lg-3 pt-3">
          <div className="card_cmn">
            <span className="icon_cir">
              <Users></Users>
            </span>
            <h3 className="card_sub">Total Customers</h3>
            <h2 className="card_head">
              1500
              <span>+10%</span>
            </h2>
          </div>
        </div>
        <div className=" col-md-6 col-lg-3 pt-3">
          <div className="card_cmn">
            <span className="icon_cir">
              <Box></Box>
            </span>
            <h3 className="card_sub">Total Products</h3>
            <h2 className="card_head">
              2,567
              <span>+10%</span>
            </h2>
          </div>
        </div>
      </div>
      <div className="row px-2">
        <div className="col-md-5 pt-3">
          <div className="card_cmn">
            <h1 className="card_heading">Sales Progress</h1>
            <p className="card_subheading">Sales</p>
          </div>
        </div>
        <div className="col-md-7 pt-3">
          <div className="card_cmn">
            <h1 className="card_heading">Statistics</h1>
            <p className="card_subheading">Revenue and Sales</p>
          </div>
        </div>
      </div>
      <div className="row px-2">
        <div className="col-lg-7 pt-3">
          <div className="card_cmn">
            <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
              <div>
                <h1 className="card_heading">Top Selling Products</h1>
                <p className="card_subheading">Checkout top selling products</p>
              </div>
              <div className="d-flex gap-10 align-items-center ">
                <Search onSearch={() => {}}></Search>
                <Filters></Filters>
              </div>
            </div>
            <table className="data_table">
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Sale</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img src={milk} className="product-img"></img>
                      <div className="px-2">
                        <p className="products_name">Cow Milk</p>
                        <span className="sku">SKU #AB234S</span>
                      </div>
                    </div>
                  </td>
                  <td>400</td>
                  <td>₹3,450</td>
                  <td>₹35.00</td>
                  <td>
                    <span className="status low">Low Stock</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img src={milk} className="product-img"></img>
                      <div className="px-2">
                        <p className="products_name">Cow Milk</p>
                        <span className="sku">SKU #AB234S</span>
                      </div>
                    </div>
                  </td>
                  <td>400</td>
                  <td>₹3,450</td>
                  <td>₹35.00</td>
                  <td>
                    <span className="status out">Out Stock</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img src={milk} className="product-img"></img>
                      <div className="px-2">
                        <p className="products_name">Cow Milk</p>
                        <span className="sku">SKU #AB234S</span>
                      </div>
                    </div>
                  </td>
                  <td>400</td>
                  <td>₹3,450</td>
                  <td>₹35.00</td>
                  <td>
                    <span className="status in">In Stock</span>
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
        <div className="col-lg-5 pt-3">
          <div className="card_cmn">
            <div className="d-flex justify-content-between">
              <div>
                <h1 className="card_heading">Sales by Stores</h1>
                <p className="card_subheading">Sales performance by Stores</p>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center pb-2">
              <div className="d-flex align-items-center">
                <img src={shop} className="product-img"></img>
                <div className="px-2">
                  <span className="products_name mb-0">Gupta Dairy</span>
                  <span className="sku d-block pt-0 pb-2">340 Sales</span>
                </div>
              </div>
              <h3 className="store_sell">
                ₹17,468 <span>+10%</span>{" "}
              </h3>
            </div>
            <div className="d-flex justify-content-between align-items-center pb-2">
              <div className="d-flex align-items-center">
                <img src={shop} className="product-img"></img>
                <div className="px-2">
                  <span className="products_name mb-0">Gupta Dairy</span>
                  <span className="sku d-block pt-0 pb-2">340 Sales</span>
                </div>
              </div>
              <h3 className="store_sell">
                ₹17,468 <span>+10%</span>{" "}
              </h3>
            </div>
            <div className="d-flex justify-content-between align-items-center pb-2">
              <div className="d-flex align-items-center">
                <img src={shop} className="product-img"></img>
                <div className="px-2">
                  <span className="products_name mb-0">Gupta Dairy</span>
                  <span className="sku d-block pt-0 pb-2">340 Sales</span>
                </div>
              </div>
              <h3 className="store_sell">
                ₹17,468 <span>+10%</span>{" "}
              </h3>
            </div>
            <div className="d-flex justify-content-between align-items-center pb-2">
              <div className="d-flex align-items-center">
                <img src={shop} className="product-img"></img>
                <div className="px-2">
                  <span className="products_name mb-0">Gupta Dairy</span>
                  <span className="sku d-block pt-0 pb-2">340 Sales</span>
                </div>
              </div>
              <h3 className="store_sell">
                ₹17,468 <span>+10%</span>{" "}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row px-2">
        <div className="col-lg-12 pt-3">
          <div className="card_cmn">
            <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
              <div>
                <h1 className="card_heading">Inventory</h1>
                <p className="card_subheading">Check Inventory</p>
              </div>
              <div className="d-flex gap-10 align-items-center">
                <Search onSearch={() => {}}></Search>
                <Filters></Filters>
              </div>
            </div>
            <table className="data_table">
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Store</th>
                  <th>Available Qty</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img src={milk} className="product-img"></img>
                      <div className="px-2">
                        <p className="products_name">Cow Milk</p>
                        <span className="sku">SKU #AB234S</span>
                      </div>
                    </div>
                  </td>
                  <td>Amul Dairy</td>
                  <td>35</td>

                  <td>
                    <span className="status low">Low Stock</span>
                  </td>
                  <td>
                    <button className="btn_add">Add Inventory</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img src={milk} className="product-img"></img>
                      <div className="px-2">
                        <p className="products_name">Cow Milk</p>
                        <span className="sku">SKU #AB234S</span>
                      </div>
                    </div>
                  </td>
                  <td>Amul Dairy</td>
                  <td>35</td>

                  <td>
                    <span className="status low">Low Stock</span>
                  </td>
                  <td>
                    <button className="btn_add">Add Inventory</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img src={milk} className="product-img"></img>
                      <div className="px-2">
                        <p className="products_name">Cow Milk</p>
                        <span className="sku">SKU #AB234S</span>
                      </div>
                    </div>
                  </td>
                  <td>Amul Dairy</td>
                  <td>35</td>

                  <td>
                    <span className="status low">Low Stock</span>
                  </td>
                  <td>
                    <button className="btn_add">Add Inventory</button>
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

      <div className="row px-2">
        <div className="col-lg-12 pt-3">
          <div className="card_cmn">
            <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
              <div>
                <h1 className="card_heading">Orders</h1>
                <p className="card_subheading">Recent Orders</p>
              </div>
              <div className="d-flex gap-10 align-items-center ">
                <Search onSearch={() => {}}></Search>
                <Filters></Filters>
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
                  <th>Order ID</th>
                  <th>Products</th>
                  <th>Date</th>
                  <th>Store</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
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
                      <img src={milk} className="product-img"></img>
                      <div className="px-2">
                        <p className="products_name">Cow Milk</p>
                        <span className="sku">+3 other products</span>
                      </div>
                    </div>
                  </td>
                  <td>24/10/2025</td>
                  <td>Shiv Dairy</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="">
                        <p className="products_name">Jhon Doe</p>
                        <span className="sku">jhondow@gmail.com</span>
                      </div>
                    </div>
                  </td>
                  <td>₹121.00</td>
                  <td>Mastercard</td>
                  <td>
                    <span className="status low">Processing</span>
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
                      <img src={milk} className="product-img"></img>
                      <div className="px-2">
                        <p className="products_name">Cow Milk</p>
                        <span className="sku">+3 other products</span>
                      </div>
                    </div>
                  </td>
                  <td>24/10/2025</td>
                  <td>Shiv Dairy</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="">
                        <p className="products_name">Jhon Doe</p>
                        <span className="sku">jhondow@gmail.com</span>
                      </div>
                    </div>
                  </td>
                  <td>₹121.00</td>
                  <td>Mastercard</td>
                  <td>
                    <span className="status low">Processing</span>
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
                      <img src={milk} className="product-img"></img>
                      <div className="px-2">
                        <p className="products_name">Cow Milk</p>
                        <span className="sku">+3 other products</span>
                      </div>
                    </div>
                  </td>
                  <td>24/10/2025</td>
                  <td>Shiv Dairy</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="">
                        <p className="products_name">Jhon Doe</p>
                        <span className="sku">jhondow@gmail.com</span>
                      </div>
                    </div>
                  </td>
                  <td>₹121.00</td>
                  <td>Mastercard</td>
                  <td>
                    <span className="status low">Processing</span>
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
    </>
  );
};

export default Dashboard;
