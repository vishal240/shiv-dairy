import { Trash } from "react-feather";
import Filters from "../components/Filters";
import Search from "../components/Search";
import DateRangePicker from "../components/DateRangePicker";
import ImportExport from "../components/ImportExport";
import Actions from "../components/Actions";
import Table, {
  type TableColumn,
  type TableRow,
} from "../components/Table/Table";
import ApiPagination from "../components/Pagination/ApiPagination";
import { useApiPagination } from "../hooks/useApiPagination";
import { useTableSelection } from "../hooks/useTableSelection";
import ApiService from "../services/api";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const CategoriesWithApi = () => {
  const navigate = useNavigate();

  // API call function
  const fetchCategories = async (
    page: number,
    limit: number,
    search: string,
    startDate: string,
    endDate: string
  ) => {
    return await ApiService.post("/admin/getCategoryList", {
      filters: { search: search, startdate: startDate, enddate: endDate },
      sorters: {},
      pagination: {
        page: page.toString(),
        pageSize: limit.toString(),
      },
    });
  };

  // Use API pagination hook
  const {
    data: categories,
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
    apiCall: fetchCategories,
    itemsPerPage: 10,
    initialPage: 1,
  });

  // Transform categories data for table
  const tableData: TableRow[] = categories.map(
    (category: any, index: number) => ({
      id: category._id || index,
      name: category.product_category_name,
      dateAdded: dayjs(category.created_on).format("DD/MM/YYYY | HH:mm A"),
      status: category.is_deleted ? "Inactive" : "Active",
    })
  );

  // Selection hook
  const { selectedRows, selectRow, toggleSelectAll, getSelectedCount } =
    useTableSelection();

  // Table columns configuration
  const columns: TableColumn[] = [
    {
      key: "name",
      label: "Categories Name",
      sortable: true,
    },
    {
      key: "dateAdded",
      label: "Added",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  // Custom cell renderer
  const renderCell = (column: TableColumn, row: TableRow, value: any) => {
    switch (column.key) {
      case "name":
        return (
          <div className="d-flex align-items-center">
            <div>
              <p className="products_name">{value}</p>
            </div>
          </div>
        );
      case "status":
        return <span className="status in">{value}</span>;
      case "actions":
        return (
          <Actions
            deleteItem={() => deleteItem(row.id)}
            editItem={() => editItem(row.id)}
          />
        );
      default:
        return value;
    }
  };

  const editItem = (rowId: string | number) => {
    navigate(`/editcategory/${rowId}`);
  };

  // Handle row selection
  const handleRowSelect = (rowId: string | number) => {
    selectRow(rowId);
  };

  // Handle select all
  const handleSelectAll = () => {
    const allRowIds = tableData.map((row) => row.id);
    toggleSelectAll(allRowIds);
  };

  const deleteCategories = async () => {
    try {
      await ApiService.post("/admin/deleteCategory", {
        category_id: selectedRows.toString(),
      });
      alert("Categories deleted successfully");
      refresh(); // Refresh current page data
    } catch (err: any) {
      alert(err.response?.data?.message || "Error deleting categories");
    }
  };

  const deleteItem = async (rowId: string | number) => {
    try {
      await ApiService.post("/admin/deleteCategory", {
        category_id: rowId,
      });
      alert("Category deleted successfully");
      refresh(); // Refresh current page data
    } catch (err: any) {
      alert(err.response?.data?.message || "Error deleting category");
    }
  };

  // Handle page change
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
    <div className="container-fluid">
      <div className="row px-2 pt-3">
        <div className="col-md-6 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">Categories</h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span className="active">Categories</span>
          </div>
        </div>
        <div className="col-md-6 pt-3">
          <ImportExport
            onAdd={"/addcategories"}
            onImport={() => {}}
            onExport={() => {}}
          />
        </div>
      </div>
      <div className="row px-2 py-3">
        <div className="col-12">
          <div className="card_cmn">
            <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
              <div>
                <h1 className="card_heading">Categories</h1>
                <p className="card_subheading">Categories List</p>
              </div>
              <div className="d-flex gap-10 align-items-center ">
                <Search onSearch={handleSearch} />
                {/* <Filters /> */}
                <DateRangePicker onDateChange={handleDateChange} />
                <button
                  onClick={deleteCategories}
                  className="common-button text-red"
                  disabled={getSelectedCount() === 0 || loading}
                  style={{
                    opacity: getSelectedCount() === 0 || loading ? 0.5 : 1,
                    cursor:
                      getSelectedCount() === 0 || loading
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  <Trash />
                  Delete ({getSelectedCount()})
                </button>
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

            <Table
              columns={columns}
              data={tableData}
              loading={loading}
              selectable={true}
              selectedRows={selectedRows}
              onRowSelect={handleRowSelect}
              onSelectAll={handleSelectAll}
              renderCell={renderCell}
              emptyMessage="No categories found"
            />

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
  );
};

export default CategoriesWithApi;
