import Filters from "../components/Filters";
import Search from "../components/Search";

import prod from "../assets/prod.jpg";
import DateRangePicker from "../components/DateRangePicker";
import ImportExport from "../components/ImportExport";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useEffect, useState } from "react";
import ApiService from "../services/api";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";
import { usePagination } from "../hooks/usePagination";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    ApiService.post("/admin/listProducts", {}).then((res: any) => {
      console.log(res);
      setProducts(res.data.list);
    });
  }, []);
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedData,
    goToPage,
  } = usePagination({
    data: products,
    itemsPerPage: 10,
  });
  return (
    <div className="container-fluid">
      <div className="row px-2 pt-3">
        <div className="col-md-6 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">Products</h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span className="active">Products</span>
          </div>
        </div>
        <div className="col-md-6 pt-3">
          <ImportExport
            onAdd={"/addproduct"}
            onImport={() => {}}
            onExport={() => {}}
          ></ImportExport>
        </div>
      </div>
      <div className="row px-2 py-3">
        <div className="col-12">
          <div className="card_cmn">
            <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
              <div>
                <h1 className="card_heading">Products</h1>
                <p className="card_subheading">Our Products</p>
              </div>
              <div className="d-flex gap-10 align-items-center ">
                <Search></Search>
                <Filters></Filters>
                <DateRangePicker></DateRangePicker>
              </div>
            </div>

            <div className="row">
              {paginatedData.length === 0 ? (
                <div className="col-12">
                  <p>No products found</p>
                </div>
              ) : (
                paginatedData.map((product: any, index: number) => (
                  <div className="col-md-2 col-lg-3 pt-3" key={index}>
                    <div className="store_card">
                      <div>
                        <img
                          src={
                            product.product_images.length > 0
                              ? product.product_images[0]
                              : ""
                          }
                          className="w-100 radius-10"
                        ></img>
                      </div>
                      <h2 className="prd_name">{product.product_name}</h2>
                      <div className="d-flex align-items-center justify-content-between">
                        <h1 className="store_name2">
                          {product.store_id?.store_name}
                        </h1>
                        <span className="font-10 text-green">In-Stock</span>
                      </div>
                      <div className="prod_detail pt-2">
                        <p>SKU - {product.sku}</p>
                        <p>
                          Category -{" "}
                          {product.category_id?.product_category_name}
                        </p>
                        <p>Price (B2B) - ₹{product.pricing_b2b.final_price}</p>
                        <p>Price (B2C) - ₹{product.pricing_b2c.final_price}</p>
                        <p>
                          Added on{" "}
                          {dayjs(product.created_on).format("DD/MM/YYYY")}
                        </p>
                      </div>
                      <div className="d-flex pt-2 align-items-center gap-10">
                        {/* <button className="common-button w-100">View</button> */}
                        <button
                          className="common-button w-100"
                          onClick={() =>
                            navigate(`/editproduct/${product.product_id}`)
                          }
                        >
                          Edit
                        </button>
                        <button className="common-button w-100">Delete</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={goToPage}
              showInfo={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
