import { Check, Minus, UploadCloud, X } from "react-feather";

import dummy from "../assets/img-dummy.jpg";
import shop from "../assets/shop.jpg";

const AddStore = () => {
  return (
    <div className="container-fluid">
      <div className="row px-2 pt-3">
        <div className="col-md-6 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">Add Store</h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span>Store List / </span>
            <span className="active">Add Store</span>
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
      <div className="row px-2 pt-3">
        <div className="col-12">
          <div className="card_cmn">
            <div className="row">
              <h5 className="card_heading">Genral Business Information</h5>
            </div>
            <div className="row">
              <div className="col-12 pt-3">
                <label className="lbl">Store name</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-12 pt-3">
                <label className="lbl">Store Discription</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-6 pt-3">
                <label className="lbl">Phone (Primery)</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-6 pt-3">
                <label className="lbl">Email (Primery)</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-6 pt-3">
                <label className="lbl">Phone (Optional)</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-6 pt-3">
                <label className="lbl">Email (Optional)</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-12 pt-3">
                <label className="lbl">Address</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-6 pt-3">
                <label className="lbl">City</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-6 pt-3">
                <label className="lbl">State</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-6 pt-3">
                <label className="lbl">Country</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-6 pt-3">
                <label className="lbl">Zip</label>
                <input type="text" className="input_text"></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row px-2 pt-3">
        <div className="col-12">
          <div className="card_cmn">
            <div className="row">
              <h5 className="card_heading">Documents</h5>
            </div>
            <div className="row">
              <div className="col-md-4 pt-2">
                <p className="color-grey font-12 mb-2 pt-2">
                  aadharcard.pdf
                </p>
                <label className="lbl_docs" htmlFor="aadhar">
                  <UploadCloud></UploadCloud>
                  Upload Aadhar Card
                </label>
                <input type="file" id="aadhar" className="doc_npt"></input>
              </div>
              <div className="col-md-4 pt-2">
                <p className="color-grey font-12 mb-2 pt-2">gst.pdf</p>
                <label className="lbl_docs" htmlFor="aadhar">
                  <UploadCloud></UploadCloud>
                  Upload GST Certificate
                </label>
                <input type="file" id="aadhar" className="doc_npt"></input>
              </div>
              <div className="col-md-4 pt-2">
                <p className="color-grey font-12 mb-2 pt-2">pancard.pdf</p>
                <label className="lbl_docs" htmlFor="aadhar">
                  <UploadCloud></UploadCloud>
                  Upload Pan Card
                </label>
                <input type="file" id="aadhar" className="doc_npt"></input>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row px-2 pt-3">
        <div className="col-12">
          <div className="card_cmn">
            <div className="row">
              <h5 className="card_heading">Owner Information</h5>
            </div>
            <div className="row">
              <div className="col-md-4 pt-3">
                <label className="lbl">Name</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-4 pt-3">
                <label className="lbl">Email</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-4 pt-3">
                <label className="lbl">Phone</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-12 pt-3">
                <label className="lbl">Address</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-6 pt-3">
                <label className="lbl">City</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-6 pt-3">
                <label className="lbl">State</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-6 pt-3">
                <label className="lbl">Country</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-6 pt-3">
                <label className="lbl">Zip</label>
                <input type="text" className="input_text"></input>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row px-2 pt-3">
        <div className="col-12">
          <div className="card_cmn">
            <div className="row">
              <h5 className="card_heading">Login Information</h5>
            </div>
            <div className="row">
              <div className="col-md-4 pt-3">
                <label className="lbl">User ID</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-4 pt-3">
                <label className="lbl">Password</label>
                <input type="text" className="input_text"></input>
              </div>
              <div className="col-md-4 pt-3">
                <label className="lbl">Confiirm Password</label>
                <input type="text" className="input_text"></input>
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
                <label className="lbl">Store Image (Optional)</label>
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
                <label className="lbl">Banner Image (Optional)</label>
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
  );
};

export default AddStore;