import { Printer } from "react-feather";
import milk from "../assets/milk.jpg";

const Invoice = () => {
  return (
    <div className="container-fluid">
      <div className="row px-2 pt-3">
        <div className="col-md-6 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">Invoice</h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span className="active">Invoice</span>
          </div>
        </div>
      </div>
      <div className="row px-2 pt-3">
        <div className="col-md-7">
          <div className="d-flex justify-content-end">
            <button className="black_btn">
              <Printer></Printer> Print Invoice
            </button>
          </div>

          <div className="row pb-5 pt-3">
            <div className="col-12">
              <div className="card_cmn ">
                <div className="row p-1">
                  <div className="col-8">
                    <h1 className="font-18">TAX INVOICE</h1>
                  </div>
                  <div className="col-4">
                    <p className="mb-0 font-13 color-grey text-right">
                      Invoice No. #23456
                    </p>
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col-4">
                    <div className="card_inv h-100">
                      <p className="font-12 mb-0 color-grey">Date</p>
                      <b className="font-12">24 October 2025</b>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="card_inv h-100">
                      <p className="font-12 mb-0 color-grey">Billed To</p>
                      <b className="font-12">Jhon Doe</b>
                      <p className="font-12 mb-0 color-grey pt-2">
                        Address
                      </p>
                      <p className="font-12">
                        315, YN Road, Indore, (M.P) 452002
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="card_inv h-100">
                      <p className="font-12 mb-0 color-grey">Billed From</p>
                      <b className="font-12">Shiv Dairy</b>
                      <p className="font-12 mb-0 color-grey pt-2">
                        Address
                      </p>
                      <p className="font-12">
                        315, YN Road, Indore, (M.P) 452002
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
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
                                <p className="font-12 color-grey mb-0">
                                  Cow milk
                                </p>
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
                                <p className="font-12 color-grey mb-0">
                                  Cow milk
                                </p>
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

                <div className="row pt-5">
                  <div className="col-12 pb-4">
                    <p className="font-12 mb-0">
                      Thank you for the business
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;