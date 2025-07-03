import { CreditCard, Minus, Plus, Trash } from "react-feather";
import milk from "../assets/milk.jpg";

const Checkout = () => {
  return (
    <div className="container-fluid">
      <div className="row px-2 pt-3">
        <div className="col-md-6 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">Shopping</h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span className="active">Shopping</span>
          </div>
        </div>
        <div className="col-md-6 pt-3 d-flex justify-content-end">
          <button className="black_btn">
            {" "}
            <CreditCard></CreditCard> Go To Payment
          </button>
        </div>
      </div>
      <div className="row px-2 py-3">
        <div className="col-12">
          <p className="font-13">
            There are 3 products in your cart{" "}
            <u>
              <b>Clear Cart</b>
            </u>
          </p>
        </div>
        <div className="col-md-7 mb-2">
          <div className="card_cmn mb-3 h-auto">
            <div className="items_cart">
              <div className="item_img">
                <img src={milk}></img>
              </div>
              <div className="flex-1 px-md-3">
                <p className="font-14 mb-1">
                  <b>Organic Cow Milk</b>
                </p>
                <p className="font-12 mb-2 pb-1 pt-1">
                  Reference site about Lorem Ipsum, giving information on
                  its origins,.
                </p>
                <div className="d-flex gap-10">
                  <span className="qty_manage">
                    <button className="plus">
                      <Minus></Minus>
                    </button>
                    <input type="text"></input>
                    <button className="minus">
                      <Plus></Plus>
                    </button>
                  </span>
                  <button className="btn_remove_item">
                    <Trash></Trash>
                  </button>
                </div>
              </div>
              <div className="item_price ">
                <p className="mb-1 color-grey font-13">Price</p>
                <h2 className="font-18 mb-2">
                  ₹ 48.00 <sub className="font-12">/ Ltr</sub>
                </h2>
                <p className="font-12 mb-0">Qty : 1 Ltr</p>
              </div>
            </div>
          </div>
          <div className="card_cmn mb-3 h-auto">
            <div className="items_cart">
              <div className="item_img">
                <img src={milk}></img>
              </div>
              <div className="flex-1 px-md-3">
                <p className="font-14 mb-1">
                  <b>Organic Cow Milk</b>
                </p>
                <p className="font-12 mb-2 pb-1 pt-1">
                  Reference site about Lorem Ipsum, giving information on
                  its origins,.
                </p>
                <div className="d-flex gap-10">
                  <span className="qty_manage">
                    <button className="plus">
                      <Minus></Minus>
                    </button>
                    <input type="text"></input>
                    <button className="minus">
                      <Plus></Plus>
                    </button>
                  </span>
                  <button className="btn_remove_item">
                    <Trash></Trash>
                  </button>
                </div>
              </div>
              <div className="item_price ">
                <p className="mb-1 color-grey font-13">Price</p>
                <h2 className="font-18 mb-2">
                  ₹ 48.00 <sub className="font-12">/ Ltr</sub>
                </h2>
                <p className="font-12 mb-0">Qty : 1 Ltr</p>
              </div>
            </div>
          </div>
          <div className="card_cmn mb-3 h-auto">
            <div className="items_cart">
              <div className="item_img">
                <img src={milk}></img>
              </div>
              <div className="flex-1 px-md-3">
                <p className="font-14 mb-1">
                  <b>Organic Cow Milk</b>
                </p>
                <p className="font-12 mb-2 pb-1 pt-1">
                  Reference site about Lorem Ipsum, giving information on
                  its origins,.
                </p>
                <div className="d-flex gap-10">
                  <span className="qty_manage">
                    <button className="plus">
                      <Minus></Minus>
                    </button>
                    <input type="text"></input>
                    <button className="minus">
                      <Plus></Plus>
                    </button>
                  </span>
                  <button className="btn_remove_item">
                    <Trash></Trash>
                  </button>
                </div>
              </div>
              <div className="item_price ">
                <p className="mb-1 color-grey font-13">Price</p>
                <h2 className="font-18 mb-2">
                  ₹ 48.00 <sub className="font-12">/ Ltr</sub>
                </h2>
                <p className="font-12 mb-0">Qty : 1 Ltr</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5 mb-2">
          <div className="row">
            <div className="col-12 mb-2">
              <div className="card_cmn">
                <h1 className="card_heading">Order Summery</h1>
                <div className="d-flex justify-content-between color-grey font-13 pt-2">
                  <p className="mb-0">Sub Total</p>
                  <p className="mb-0">₹450.00</p>
                </div>
                <div className="d-flex justify-content-between text-red font-13 pt-2">
                  <p className="mb-0">Discount</p>
                  <p className="mb-0">₹35.00</p>
                </div>
                <div className="d-flex justify-content-between color-grey font-13 pt-2">
                  <p className="mb-0">Delivery Charges</p>
                  <p className="mb-0">₹16.00</p>
                </div>
                <div className="d-flex justify-content-between color-grey font-13 pt-2">
                  <p className="mb-0">GST(18%)</p>
                  <p className="mb-0">₹26.00</p>
                </div>
                <div className="d-flex justify-content-between  color-red font-18 pt-2">
                  <b className="mb-0">Total</b>
                  <b className="mb-0">₹350.00</b>
                </div>
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="card_cmn">
                <h1 className="card_heading">Have a Promo Code ?</h1>
                <div className="pt-2">
                  <input className="promo_code" type="text"></input>
                  <button className="btn_apply_code">Apply</button>
                </div>
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="card_cmn">
                <h1 className="card_heading">Customer Details</h1>
                <div className="pt-2">
                  <label className="lbl">Select Customer</label>
                  <select className="store_select w-100">
                    <option>Jhon Doe</option>
                  </select>
                  <button className="btn_imprt mt-2">
                    {" "}
                    <Plus></Plus> Add Customer
                  </button>
                </div>
                <div className="row">
                  <div className="col-md-4 pt-2">
                    <b className="font-12">Name</b>
                    <p className="mb-2 font-12 pt-1 color-grey">Jhon Doe</p>
                  </div>
                  <div className="col-md-4 pt-2">
                    <b className="font-12">Email</b>
                    <p className="mb-2 font-12 pt-1 color-grey">
                      Jhondoe@gmail.com
                    </p>
                  </div>
                  <div className="col-md-4 pt-2">
                    <b className="font-12">Phone</b>
                    <p className="mb-2 font-12 pt-1 color-grey">
                      +91 62617 01016
                    </p>
                  </div>
                  <div className="col-md-6 pt-2">
                    <b className="font-12">Billing Address</b>
                    <p className="mb-2 font-12 pt-1 color-grey">
                      315, Zainy Manzil, Noorani Nagar, Indore, (M.P) 452001
                    </p>
                  </div>
                  <div className="col-md-6 pt-2">
                    <b className="font-12">Shipping Address</b>
                    <p className="mb-2 font-12 pt-1 color-grey">
                      315, Zainy Manzil, Noorani Nagar, Indore, (M.P) 452001
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

export default Checkout;