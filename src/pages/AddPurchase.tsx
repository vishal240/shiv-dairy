import { Check, Plus, X } from "react-feather";

const AddPurchase = () => {
  return (
    <div className="container-fluid">
      <div className="row px-2 pt-3">
        <div className="col-md-6 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">Add Purchase</h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span>Purchase List / </span>
            <span className="active">Add Purchase</span>
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
        <div className="col-md-12">
          <div className="row px-2 pt-3">
            <div className="col-12">
              <div className="card_cmn">
                <div className="row">
                  <h5 className="card_heading">Product One</h5>
                </div>
                <div className="row">
                  <div className="col-12 pt-3">
                    <label className="lbl">Select Store</label>
                    <select className="store_select w-100">
                      <option>Shiv Dairy</option>
                    </select>
                  </div>
                  <div className="col-12 pt-3">
                    <label className="lbl">Select Product</label>
                    <select className="store_select w-100">
                      <option>Shiv Dairy</option>
                    </select>
                  </div>
                  <div className="col-md-6 pt-3">
                    <label className="lbl">Add Qty</label>
                    <input type="text" className="input_text"></input>
                  </div>
                  <div className="col-md-6 pt-3">
                    <label className="lbl">Purchase Amount</label>
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
                  <h5 className="card_heading">Product Two</h5>
                </div>
                <div className="row">
                  <div className="col-12 pt-3">
                    <label className="lbl">Select Store</label>
                    <select className="store_select w-100">
                      <option>Shiv Dairy</option>
                    </select>
                  </div>
                  <div className="col-12 pt-3">
                    <label className="lbl">Select Product</label>
                    <select className="store_select w-100">
                      <option>Shiv Dairy</option>
                    </select>
                  </div>
                  <div className="col-md-6 pt-3">
                    <label className="lbl">Add Qty</label>
                    <input type="text" className="input_text"></input>
                  </div>
                  <div className="col-md-6 pt-3">
                    <label className="lbl">Purchase Amount</label>
                    <input type="text" className="input_text"></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row px-2 pt-3">
            <div className="col-12">
              <button className="black_btn">
                {" "}
                <Plus></Plus> Add More
              </button>
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
      </div>
    </div>
  );
};

export default AddPurchase;