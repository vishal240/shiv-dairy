import { Check, Minus, X } from "react-feather";

import TopSideBar from "../components/TopSideBar";

import dummy from "../assets/img-dummy.jpg";
import shop from "../assets/shop.jpg";

const AddProduct = () => {
  return (
    <>
      <div className="wrapper2">
        <TopSideBar></TopSideBar>
        <div className="container-fluid">
          <div className="row px-2 pt-3">
            <div className="col-md-6 pt-4 pt-md-0">
              <h1 className="page_heading mb-0">Add Product</h1>
              <div className="breadcrumbs">
                <span>Dashboard / </span>
                <span>Product List / </span>
                <span className="active">Add Product</span>
              </div>
            </div>
            <div className="col-md-6 pt-3">
              <span className="gap-10 d-flex align-items-center justify-content-md-end">
                <button className="btn_imprt">
                  <X></X> Cancel
                </button>
                <button className="black_btn">
                  <Check></Check> Save
                </button>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="row px-2 pt-3">
                <div className="col-12">
                  <div className="card_cmn">
                    <div className="row">
                      <h5 className="card_heading">Product Information</h5>
                    </div>
                    <div className="row">
                      <div className="col-12 pt-3">
                        <label className="lbl">Select Store</label>
                        <select className="store_select w-100">
                          <option>Shiv Dairy</option>
                        </select>
                      </div>
                      <div className="col-12 pt-3">
                        <label className="lbl">Product Name</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-12 pt-3">
                        <label className="lbl">Store Discription</label>
                        <textarea className="textarea"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row px-2 pt-3">
                <div className="col-12">
                  <div className="card_cmn">
                    <div className="row">
                      <h5 className="card_heading">Pricing B2B</h5>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">Unit Price</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">Min Batch Qty</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-12 col-12 pt-3">
                        <label className="lbl">Batch Qty</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">Discount Type</label>
                        <select className="store_select w-100">
                          <option></option>
                        </select>
                      </div>
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">Discount Percentage</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">Tax Class</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">Amount</label>
                        <input type="text" className="input_text "></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row px-2 pt-3">
                <div className="col-12">
                  <div className="card_cmn">
                    <div className="row">
                      <h5 className="card_heading">Pricing B2C</h5>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">Unit Price</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">Qty</label>
                        <input type="text" className="input_text "></input>
                      </div>

                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">Discount Type</label>
                        <select className="store_select w-100">
                          <option></option>
                        </select>
                      </div>
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">Discount Percentage</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">Tax Class</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-md-6 col-12 pt-3">
                        <label className="lbl">Amount</label>
                        <input type="text" className="input_text "></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row px-2 pt-3">
                <div className="col-12">
                  <div className="card_cmn">
                    <div className="row">
                      <h5 className="card_heading">Media</h5>
                    </div>
                    <div className="row">
                      <div className="col-12 pt-3">
                        <label className="lbl">Product Image (Optional)</label>
                        <div className="media mt-1 pt-5">
                          <div className="img_con">
                            <span>
                              <img src={dummy}></img>
                            </span>
                            <span>
                              <img src={shop}></img>
                              <button>
                                <Minus></Minus>
                              </button>
                            </span>
                          </div>
                          <p className="text-center font-14 pt-3">
                            Drag and drop image here, or click add image
                          </p>
                          <div className="d-flex jusify-content-center">
                            <label className="upload_btn" htmlFor="image">
                              Add Image
                            </label>
                            <input
                              type="file"
                              id="image"
                              className="file_npt"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 pt-3">
                        <label className="lbl">Product Video (Optional)</label>
                        <div className="media mt-1 pt-5">
                          <div className="img_con">
                            <span>
                              <img src={dummy}></img>
                            </span>
                            <span>
                              <img src={shop}></img>
                              <button>
                                <Minus></Minus>
                              </button>
                            </span>
                          </div>
                          <p className="text-center font-14 pt-3">
                            Drag and drop image here, or click add image
                          </p>
                          <div className="d-flex jusify-content-center">
                            <label className="upload_btn" htmlFor="image">
                              Add Image
                            </label>
                            <input
                              type="file"
                              id="image"
                              className="file_npt"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row px-2 pt-3">
                <div className="col-12">
                  <div className="card_cmn">
                    <div className="row">
                      <h5 className="card_heading">Status</h5>
                    </div>
                    <div className="row">
                      <div className="col-md-4 pt-3">
                        <label className="lbl">Status</label>
                        <select className="store_select w-100">
                          <option>Active</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row px-2 pt-3">
                <div className="col-12">
                  <span className="gap-10 d-flex align-items-center justify-content-md-end">
                    <button className="btn_imprt">
                      <X></X> Cancel
                    </button>
                    <button className="black_btn">
                      <Check></Check> Save
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="row pt-3">
                <div className="col-12">
                  <div className="card_cmn">
                    <div className="row">
                      <h5 className="card_heading">Categories</h5>
                    </div>
                    <div className="row">
                      <div className="col-12 pt-3">
                        <label className="lbl">Product Categories</label>
                        <select className="store_select w-100">
                          <option></option>
                        </select>
                      </div>

                      <div className="col-12 pt-3">
                        <label className="lbl">Product Sub Categories</label>
                        <select className="store_select w-100">
                          <option></option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12">
                  <div className="card_cmn">
                    <div className="row">
                      <h5 className="card_heading">Brands</h5>
                    </div>
                    <div className="row">
                      <div className="col-12 pt-3">
                        <label className="lbl">Select Brand</label>
                        <select className="store_select w-100">
                          <option></option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12">
                  <div className="card_cmn">
                    <div className="row">
                      <h5 className="card_heading">Status</h5>
                    </div>
                    <div className="row">
                      <div className="col-12 pt-3">
                        <label className="lbl">Status</label>
                        <select className="store_select w-100">
                          <option></option>
                        </select>
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

export default AddProduct;
