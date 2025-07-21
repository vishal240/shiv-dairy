import {
  Check,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Plus,
  Trash,
} from "react-feather";
import Filters from "../components/Filters";
const Setting = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row px-2 pt-3">
          <div className="col-md-6 pt-4 pt-md-0">
            <h1 className="page_heading mb-0">Settings</h1>
            <div className="breadcrumbs">
              <span>Dashboard / </span>
              <span>Settings </span>
            </div>
          </div>
          <div className="col-md-6 pt-3">
            <span className="gap-10 d-flex align-items-center justify-content-md-end">
              <button className="black_btn">
                <Plus></Plus> Add New
              </button>
            </span>
          </div>
        </div>

        <div className="row">
          <div className="col-12 pt-3">
            <ul
              className="nav nav-pills border-bottom mb-3"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Privacy Policy
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Shipping Policy
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  Term & Conditions
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#Refund"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  Refund Policy
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#Discount"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  Discount Coupons
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="row px-2">
                  <div className="col-12 pt-2">
                    <div className="card_cmn">
                      <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
                        <div>
                          <h1 className="card_heading">Privacy Policy</h1>
                        </div>
                        <div className="d-flex gap-10 align-items-center ">
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
                            <th>Privacy Policy</th>
                            <th>Added On</th>
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
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="">
                                  <p className="products_name">Lorem Ipsum</p>
                                  <span className="sku">
                                    Discription is optional
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>24/10/2025</td>

                            <td>
                              <span className="status in">Active</span>
                            </td>
                            <td>
                              <div className="acbtns">
                                <button>
                                  <Eye></Eye>
                                </button>
                                <button>
                                  <Edit></Edit>
                                </button>
                                <button>
                                  <Trash></Trash>
                                </button>
                              </div>
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

              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <div className="card_cmn">
                  <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
                    <div>
                      <h1 className="card_heading">Shipping Policy</h1>
                    </div>
                    <div className="d-flex gap-10 align-items-center ">
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
                        <th>Shipping Policy</th>
                        <th>Added On</th>
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
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="">
                              <p className="products_name">Lorem Ipsum</p>
                              <span className="sku">
                                Discription is optional
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>24/10/2025</td>

                        <td>
                          <span className="status in">Active</span>
                        </td>
                        <td>
                          <div className="acbtns">
                            <button>
                              <Eye></Eye>
                            </button>
                            <button>
                              <Edit></Edit>
                            </button>
                            <button>
                              <Trash></Trash>
                            </button>
                          </div>
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

              <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                <div className="row px-2">
                  <div className="col-12 pt-2">
                    <div className="card_cmn">
                      <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
                        <div>
                          <h1 className="card_heading">Term & Conditions</h1>
                        </div>
                        <div className="d-flex gap-10 align-items-center ">
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
                            <th>T&C</th>
                            <th>Added On</th>
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
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="">
                                  <p className="products_name">Lorem Ipsum</p>
                                  <span className="sku">
                                    Discription is optional
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>24/10/2025</td>

                            <td>
                              <span className="status in">Active</span>
                            </td>
                            <td>
                              <div className="acbtns">
                                <button>
                                  <Eye></Eye>
                                </button>
                                <button>
                                  <Edit></Edit>
                                </button>
                                <button>
                                  <Trash></Trash>
                                </button>
                              </div>
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

              <div
                className="tab-pane fade"
                id="Refund"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                <div className="row px-2">
                  <div className="col-12 pt-2">
                    <div className="card_cmn">
                      <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
                        <div>
                          <h1 className="card_heading">Refund Policy</h1>
                        </div>
                        <div className="d-flex gap-10 align-items-center ">
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
                            <th>Refund Policy</th>
                            <th>Added On</th>
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
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="">
                                  <p className="products_name">Lorem Ipsum</p>
                                  <span className="sku">
                                    Discription is optional
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>24/10/2025</td>

                            <td>
                              <span className="status in">Active</span>
                            </td>
                            <td>
                              <div className="acbtns">
                                <button>
                                  <Eye></Eye>
                                </button>
                                <button>
                                  <Edit></Edit>
                                </button>
                                <button>
                                  <Trash></Trash>
                                </button>
                              </div>
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
              <div
                className="tab-pane fade"
                id="Discount"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                <div className="row px-2">
                  <div className="col-12 pt-2">
                    <div className="card_cmn">
                      <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
                        <div>
                          <h1 className="card_heading">Discount Coupons</h1>
                        </div>
                        <div className="d-flex gap-10 align-items-center ">
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
                            <th>Discount Coupons</th>
                            <th>Added On</th>
                            <th>Status</th>
                            <th>Valid Till</th>
                            <th>Type</th>
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
                                  <p className="products_name">Lorem Ipsum</p>
                                  <span className="sku">
                                    Discription is optional
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>24/10/2025</td>

                            <td>
                              <span className="status in">Active</span>
                            </td>
                            <td>24/10/2025</td>
                            <td>Flat</td>

                            <td>
                              <div className="acbtns">
                                <button>
                                  <Eye></Eye>
                                </button>
                                <button>
                                  <Edit></Edit>
                                </button>
                                <button>
                                  <Trash></Trash>
                                </button>
                              </div>
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
      </div>
    </>
  );
};

export default Setting;
