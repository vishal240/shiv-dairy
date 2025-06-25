import { Check, X } from "react-feather";

import TopSideBar from "../components/TopSideBar";

const AddCategories = () => {
  return (
    <>
      <div className="wrapper2">
        <TopSideBar></TopSideBar>
        <div className="container-fluid">
          <div className="row px-2 pt-3">
            <div className="col-md-6 pt-4 pt-md-0">
              <h1 className="page_heading mb-0">Add Category</h1>
              <div className="breadcrumbs">
                <span>Dashboard / </span>
                <span>Category List / </span>
                <span className="active">Add Category</span>
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
                      <h5 className="card_heading">Genral Information</h5>
                    </div>
                    <div className="row">
                      <div className="col-12 pt-3">
                        <label className="lbl">Category Name</label>
                        <input type="text" className="input_text "></input>
                      </div>
                      <div className="col-12 pt-3">
                        <label className="lbl">Sub Category Name</label>
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
      </div>
    </>
  );
};

export default AddCategories;
