import {
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  Trash,
  TrendingUp,
  Users,
} from "react-feather";

import amulbanner from "../assets/ban2.jpg";

import TopSideBar from "../components/TopSideBar";

import profile from "../assets/profile.jpg";

import Filters from "../components/Filters";
import Search from "../components/Search";
import milk from "../assets/milk.jpg";
import DateRangePicker from "../components/DateRangePicker";
import Actions from "../components/Actions";

const CustomerDetails = () => {
  return (
    <>
      <div className="wrapper2">
        <TopSideBar></TopSideBar>
        <div className="container-fluid">
          <div className="row px-2 pt-3">
            <div className="col-md-6 pt-4 pt-md-0">
              <h1 className="page_heading mb-0">Customer Details</h1>
              <div className="breadcrumbs">
                <span>Dashboard / </span>
                <span>Customer List / </span>

                <span className="active">Customer Details</span>
              </div>
            </div>
          </div>
          <div className="row px-2 py-3">
            <div className="col-md-4 pt-2">
              <div className="store_card">
                <div className="image_wrapper">
                  <img src={amulbanner} className="shop_banner"></img>
                  <img src={profile} className="shop_img"></img>
                </div>
                <div className="d-flex align-items-start gap-10 justify-content-center pt-4 mt-3">
                  <h1 className="store_name">Shiv Dairy</h1>
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
                    <p className="font-12 color-grey mb-0">Billing Address</p>
                    <p className="font-12">
                      315, Annapurna Road, Cipla Complex, Indore, (M.p) 452001
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-10 px-md-2">
                  <span className="shop_icon">
                    <MapPin></MapPin>
                  </span>
                  <div>
                    <p className="font-12 color-grey mb-0">Shipping Address</p>
                    <p className="font-12">
                      315, Annapurna Road, Cipla Complex, Indore, (M.p) 452001
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-10 px-md-2">
                  <span className="shop_icon">
                    <ShoppingBag></ShoppingBag>
                  </span>
                  <div>
                    <p className="font-12 color-grey mb-0">Last Order</p>
                    <p className="font-12">24 October 2025 </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 ">
              <div className="row px-2">
                <div className=" col-md-6 col-lg-4 pt-2">
                  <div className="card_cmn">
                    <span className="icon_cir">
                      <TrendingUp></TrendingUp>
                    </span>
                    <h3 className="card_sub">Total Order Value</h3>
                    <h2 className="card_head">
                      ₹75,345
                      <span>+10%</span>
                    </h2>
                  </div>
                </div>
                <div className=" col-md-6 col-lg-4 pt-2">
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
                <div className=" col-md-6  col-lg-4 pt-2">
                  <div className="card_cmn">
                    <span className="icon_cir">
                      <Users></Users>
                    </span>
                    <h3 className="card_sub">Reward</h3>
                    <h2 className="card_head">
                      1500
                      <span>+10%</span>
                    </h2>
                  </div>
                </div>
              </div>
              <div className="row px-2 pt-3">
                <div className="col-12">
                  <div className="card_cmn">
                    <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
                      <div>
                        <h1 className="card_heading">Orders</h1>
                        <p className="card_subheading">Recent Orders</p>
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
                          <th>Order ID</th>
                          <th>Products</th>
                          <th>Date</th>

                          <th>Total</th>

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
                              <img src={milk} className="product-img"></img>
                              <div className="px-2">
                                <p className="products_name">Cow Milk</p>
                                <span className="sku">+3 other products</span>
                              </div>
                            </div>
                          </td>
                          <td>24/10/2025</td>

                          <td>₹121.00</td>

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
                              <img src={milk} className="product-img"></img>
                              <div className="px-2">
                                <p className="products_name">Cow Milk</p>
                                <span className="sku">+3 other products</span>
                              </div>
                            </div>
                          </td>
                          <td>24/10/2025</td>

                          <td>₹121.00</td>

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
                              <img src={milk} className="product-img"></img>
                              <div className="px-2">
                                <p className="products_name">Cow Milk</p>
                                <span className="sku">+3 other products</span>
                              </div>
                            </div>
                          </td>
                          <td>24/10/2025</td>

                          <td>₹121.00</td>

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
                              <img src={milk} className="product-img"></img>
                              <div className="px-2">
                                <p className="products_name">Cow Milk</p>
                                <span className="sku">+3 other products</span>
                              </div>
                            </div>
                          </td>
                          <td>24/10/2025</td>

                          <td>₹121.00</td>

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
                              <img src={milk} className="product-img"></img>
                              <div className="px-2">
                                <p className="products_name">Cow Milk</p>
                                <span className="sku">+3 other products</span>
                              </div>
                            </div>
                          </td>
                          <td>24/10/2025</td>

                          <td>₹121.00</td>

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
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
