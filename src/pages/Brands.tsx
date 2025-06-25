import { Check, ChevronLeft, ChevronRight, Trash } from "react-feather";
import Filters from "../components/Filters";
import Search from "../components/Search";
import milk from "../assets/milk.jpg";
import TopSideBar from "../components/TopSideBar";
import DateRangePicker from "../components/DateRangePicker";
import ImportExport from "../components/ImportExport";
import Actions from "../components/Actions";
const Brands = () => {
  return (
    <>
      <div className="wrapper2">
        <TopSideBar></TopSideBar>
        <div className="container-fluid">
          <div className="row px-2 pt-3">
            <div className="col-md-6 pt-4 pt-md-0">
              <h1 className="page_heading mb-0">Brands</h1>
              <div className="breadcrumbs">
                <span>Dashboard / </span>
                <span className="active">Brands</span>
              </div>
            </div>
            <div className="col-md-6 pt-3">
              <ImportExport></ImportExport>
            </div>
          </div>
          <div className="row px-2 py-3">
            <div className="col-12">
              <div className="card_cmn">
                <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
                  <div>
                    <h1 className="card_heading">Brands</h1>
                    <p className="card_subheading">Brands List</p>
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

                      <th>Brands Name</th>
                      <th>Added</th>
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
                          <img src={milk} className="product-img"></img>
                          <div className="px-2">
                            <p className="products_name">Amul Dairy</p>
                            <span className="sku">Discription is normal</span>
                          </div>
                        </div>
                      </td>
                      <td>24/10/2025</td>

                      <td>
                        <span className="status in">Active</span>
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

                      <td>
                        <div className="d-flex align-items-center">
                          <img src={milk} className="product-img"></img>
                          <div className="px-2">
                            <p className="products_name">Amul Dairy</p>
                            <span className="sku">Discription is normal</span>
                          </div>
                        </div>
                      </td>
                      <td>24/10/2025</td>

                      <td>
                        <span className="status in">Active</span>
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

                      <td>
                        <div className="d-flex align-items-center">
                          <img src={milk} className="product-img"></img>
                          <div className="px-2">
                            <p className="products_name">Amul Dairy</p>
                            <span className="sku">Discription is normal</span>
                          </div>
                        </div>
                      </td>
                      <td>24/10/2025</td>

                      <td>
                        <span className="status in">Active</span>
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
    </>
  );
};

export default Brands;
