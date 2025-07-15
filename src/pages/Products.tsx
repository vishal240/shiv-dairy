import Search from "../components/Search";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";
import DateRangePicker from "../components/DateRangePicker";
import ImportExport from "../components/ImportExport";
import { useState } from "react";
import ApiService from "../services/api";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ApiPagination from "../components/Pagination/ApiPagination";
import { useApiPagination } from "../hooks/useApiPagination";

const Products = ({ store_id }: { store_id?: string }) => {
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const handleDeleteProduct = async () => {
    if (selectedProductId) {
      try {
        await ApiService.post("/admin/deleteProduct", {
          product_id: selectedProductId,
        });
        // Refresh the products list
        refresh();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
    setDeleteModalOpen(false);
    setSelectedProductId(null);
  };

  const fetchProducts = async (
    page: number,
    limit: number,
    search: string,
    startDate: string,
    endDate: string,
    store_id: string
  ) => {
    return await ApiService.post("/admin/listProducts", {
      filters: {
        search: search,
        startdate: startDate,
        enddate: endDate,
        store_id: store_id,
      },
      sorters: {},
      pagination: {
        page: page.toString(),
        pageSize: limit.toString(),
      },
    });
  };
  const {
    data: products,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    loading,
    error,
    goToPage,
    goToSearch,
    goToDateSearch,
    refresh,
  } = useApiPagination({
    apiCall: fetchProducts,
    itemsPerPage: 10,
    initialPage: 1,
    store_id: store_id,
  });
  const handlePageChange = (page: number) => {
    goToPage(page);
  };
  const handleSearch = (value: string) => {
    goToSearch(value);
  };
  const handleDateChange = (startDate: any, endDate: any) => {
    goToDateSearch(
      dayjs(startDate).format("YYYY-MM-DD"),
      dayjs(endDate).format("YYYY-MM-DD")
    );
  };
  return (
    <>
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
              onAdd="/addproduct"
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
                  <Search onSearch={handleSearch}></Search>
                  {/* <Filters></Filters> */}
                  <DateRangePicker
                    onDateChange={handleDateChange}
                  ></DateRangePicker>
                  <button
                    onClick={refresh}
                    className="common-button"
                    disabled={loading}
                  >
                    Refresh
                  </button>
                </div>
              </div>
              {error && (
                <div
                  className="alert alert-danger"
                  style={{
                    fontSize: "12px",
                    padding: "8px",
                    marginBottom: "15px",
                  }}
                >
                  {error}
                </div>
              )}
              <div className="row">
                {products.length === 0 ? (
                  <div className="col-12">
                    <p>No products found</p>
                  </div>
                ) : (
                  products.map((product: any, index: number) => (
                    <div className="col-md-2 col-lg-3 pt-3" key={index}>
                      <div className="store_card">
                        <div>
                          <img
                            src={
                              product.product_images.length > 0
                                ? product.product_images[0].generatedFilename
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
                          <p>
                            Price (B2B) - ₹{product.pricing_b2b.final_price}
                          </p>
                          <p>
                            Price (B2C) - ₹{product.pricing_b2c.final_price}
                          </p>
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
                              navigate(`/editproduct/${product._id}`)
                            }
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProductId(product._id);
                              setDeleteModalOpen(true);
                            }}
                            className="common-button w-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <ApiPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                loading={loading}
                showInfo={true}
              />
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedProductId(null);
        }}
        onDelete={handleDeleteProduct}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </>
  );
};

export default Products;
