import {
  AlertCircle,
  Book,
  Box,
  Calendar,
  Check,
  Cloud,
  CreditCard,
  DownloadCloud,
  File,
  Loader,
  Mail,
  Map,
  Phone,
  ShoppingCart,
  User,
} from "react-feather";

import TopSideBar from "../components/TopSideBar";

import milk from "../assets/milk.jpg";

const OrderDetails = () => {
  return (
    <>
      <div className="wrapper2">
        <TopSideBar></TopSideBar>
        <div className="container-fluid">
          <div className="row px-2 pt-3">
            <div className="col-md-6 pt-4 pt-md-0">
              <h1 className="page_heading mb-0">Order Details</h1>
              <div className="breadcrumbs">
                <span>Dashboard / </span>
                <span>Order List / </span>

                <span className="active">Order Details</span>
              </div>
            </div>
            <div className="col-md-6 pt-3">
              <span className="gap-10 d-flex align-items-center justify-content-md-end">
                <select className="store_select">
                  <option>Processing</option>
                </select>
                <button className="btn_imprt">
                  <DownloadCloud></DownloadCloud> Export
                </button>
                <button className="black_btn">
                  <File></File> Download Invoice
                </button>
              </span>
            </div>
          </div>
          <div className="row px-2 ">
            <div className="col-md-4 pt-3">
              <div className="card_cmn">
                <h1 className="card_heading d-flex align-items-center gap-10">
                  Order #302011H <span className="status low">Processing</span>{" "}
                </h1>

                <div className="d-flex pt-3 justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10 font-13">
                    <span className="icon_cir">
                      <Calendar></Calendar>
                    </span>
                    Added
                  </div>
                  <div>
                    <b className="font-13">12 Dec 2022</b>
                  </div>
                </div>
                <div className="d-flex pt-3 justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10 font-13">
                    <span className="icon_cir">
                      <CreditCard></CreditCard>
                    </span>
                    Payment Method
                  </div>
                  <div>
                    <b className="font-13">Visa</b>
                  </div>
                </div>
                <div className="d-flex pt-3 justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10 font-13">
                    <span className="icon_cir">
                      <Book></Book>
                    </span>
                    Shipping Method
                  </div>
                  <div>
                    <b className="font-13">Flat Shipping</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 pt-3">
              <div className="card_cmn">
                <h1 className="card_heading d-flex align-items-center gap-10">
                  Customer
                </h1>

                <div className="d-flex pt-3 justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10 font-13">
                    <span className="icon_cir">
                      <User></User>
                    </span>
                    Customer
                  </div>
                  <div>
                    <b className="font-13">Jhon Doe</b>
                  </div>
                </div>
                <div className="d-flex pt-3 justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10 font-13">
                    <span className="icon_cir">
                      <Mail></Mail>
                    </span>
                    Email
                  </div>
                  <div>
                    <b className="font-13">jhon@gmail.com</b>
                  </div>
                </div>
                <div className="d-flex pt-3 justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10 font-13">
                    <span className="icon_cir">
                      <Phone></Phone>
                    </span>
                    Phone
                  </div>
                  <div>
                    <b className="font-13">+91 62617 01016</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 pt-3">
              <div className="card_cmn">
                <h1 className="card_heading d-flex align-items-center gap-10">
                  Document
                </h1>

                <div className="d-flex pt-3 justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10 font-13">
                    <span className="icon_cir">
                      <File></File>
                    </span>
                    Invoice
                  </div>
                  <div>
                    <b className="font-13">AV-123</b>
                  </div>
                </div>
                <div className="d-flex pt-3 justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10 font-13">
                    <span className="icon_cir">
                      <Box></Box>
                    </span>
                    Shipping
                  </div>
                  <div>
                    <b className="font-13">SHP-201988</b>
                  </div>
                </div>
                <div className="d-flex pt-3 justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10 font-13">
                    <span className="icon_cir">
                      <AlertCircle></AlertCircle>
                    </span>
                    Rewards
                  </div>
                  <div>
                    <b className="font-13">450 Points</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row px-2">
            <div className="col-md-8 pt-3">
              <div className="card_cmn">
                <h1 className="card_heading d-flex align-items-center gap-10">
                  Product List <span className="status in">2 Products</span>{" "}
                </h1>

                <table className="table_order_details mt-3">
                  <thead>
                    <tr>
                      <th>Products</th>
                      <th>SKU</th>
                      <th>QTY</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center gap-10">
                          <img src={milk} className="prd_img"></img>
                          <span>
                            <p className="font-13 mb-0">Milk</p>
                            <p className="font-12 color-grey mb-0">Cow milk</p>
                          </span>
                        </div>
                      </td>
                      <td>30211</td>
                      <td>1 pcs</td>
                      <td>₹400.00</td>
                      <td>₹400.00</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center gap-10">
                          <img src={milk} className="prd_img"></img>
                          <span>
                            <p className="font-13 mb-0">Milk</p>
                            <p className="font-12 color-grey mb-0">Cow milk</p>
                          </span>
                        </div>
                      </td>
                      <td>30211</td>
                      <td>1 pcs</td>
                      <td>₹400.00</td>
                      <td>₹400.00</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Subtotal</td>
                      <td>₹400.00</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>VAT (0%)</td>
                      <td>₹30.00</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Shipping Rate</td>
                      <td>₹30.00</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Grand Total</td>
                      <td>
                        <b>$590.00</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="row">
                <div className="col-md-12 pt-3">
                  <div className="card_cmn">
                    <h1 className="card_heading d-flex align-items-center gap-10">
                      Address
                    </h1>

                    <div className="d-flex align-items-center gap-10 font-13 pt-3">
                      <span className="icon_cir">
                        <Map></Map>
                      </span>
                      <div>
                        <p className="font-12 color-grey mb-1">Billing</p>
                        <p className="font-12 mb-0">
                          1833 Bel Meadow Drive, Fontana, California 92335, USA
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-10 font-13 pt-3">
                      <span className="icon_cir">
                        <Map></Map>
                      </span>
                      <div>
                        <p className="font-12 color-grey mb-1">Shipping</p>
                        <p className="font-12 mb-0">
                          1833 Bel Meadow Drive, Fontana, California 92335, USA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 pt-3">
                  <div className="card_cmn">
                    <h1 className="card_heading d-flex align-items-center gap-10">
                      Order Status
                    </h1>
                    <div className="d-flex align-items-center gap-10 font-13 pt-3">
                      <span className="icon_cir">
                        <ShoppingCart></ShoppingCart>
                      </span>
                      <div>
                        <p className="font-13  mb-0">Order Placed</p>
                        <p className="font-12 color-grey mb-0">
                          An order has been placed.
                        </p>
                        <p className="font-12 color-grey mb-0">
                          12/12/2022, 03:00
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-10 font-13 pt-3">
                      <span className="icon_cir active">
                        <Loader></Loader>
                      </span>
                      <div>
                        <p className="font-13  mb-0">Processing</p>
                        <p className="font-12 color-grey mb-0">
                          An order has been placed.
                        </p>
                        <p className="font-12 color-grey mb-0">
                          12/12/2022, 03:00
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-10 font-13 pt-3">
                      <span className="icon_cir">
                        <Box></Box>
                      </span>
                      <div>
                        <p className="font-13  mb-0">Packed</p>
                        <p className="font-12 color-grey mb-0">
                          An order has been placed.
                        </p>
                        <p className="font-12 color-grey mb-0">
                          12/12/2022, 03:00
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-10 font-13 pt-3">
                      <span className="icon_cir">
                        <Cloud></Cloud>
                      </span>
                      <div>
                        <p className="font-13  mb-0">Shipping</p>
                        <p className="font-12 color-grey mb-0">
                          An order has been placed.
                        </p>
                        <p className="font-12 color-grey mb-0">
                          12/12/2022, 03:00
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-10 font-13 pt-3">
                      <span className="icon_cir">
                        <Check></Check>
                      </span>
                      <div>
                        <p className="font-13  mb-0">Delivered</p>
                        <p className="font-12 color-grey mb-0">
                          An order has been placed.
                        </p>
                        <p className="font-12 color-grey mb-0">
                          12/12/2022, 03:00
                        </p>
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

export default OrderDetails;
