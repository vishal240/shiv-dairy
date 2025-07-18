import {
  AlertCircle,
  Box,
  Check,
  ChevronLeft,
  ChevronRight,
  Trash,
  TrendingDown,
  TrendingUp,
} from "react-feather";
// import Filters from "../components/Filters";
import milk from "../assets/milk.jpg";
import Table, {
  type TableColumn,
  type TableRow,
} from "../components/Table/Table";
import { useTableSelection } from "../hooks/useTableSelection";
import ApiService from "../services/api";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ApiPagination from "../components/Pagination/ApiPagination";
import { useApiPagination } from "../hooks/useApiPagination";
import ImportExport from "../components/ImportExport";
import DateRangePicker from "../components/DateRangePicker";
import Search from "../components/Search";
import Actions from "../components/Actions";

const Purchase = () => {
  const navigate = useNavigate();
  // API call function
  const fetchPurchase = async (
    page: number,
    limit: number,
    search: string,
    startDate: string,
    endDate: string
  ) => {
    return await ApiService.post("/admin/listPurchase", {
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
    data: purchases,
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
    apiCall: fetchPurchase,
    itemsPerPage: 10,
    initialPage: 1,
  });
  // Transform categories data for table
  const tableData: TableRow[] = purchases.map(
    (purchase: any, index: number) => ({
      id: purchase._id || index,
      name: purchase.store_id.store_name,
      purchase_code: purchase.purchase_code,
      admin_name: purchase.created_by.admin_name,
      purchase_date: dayjs(purchase.purchase_date).format(
        "DD/MM/YYYY | HH:mm A"
      ),
      status: purchase.is_deleted ? "Inactive" : "Active",
    })
  );
  // Selection hook
  const { selectedRows, selectRow, toggleSelectAll, getSelectedCount } =
    useTableSelection();

  // Table columns configuration
  const columns: TableColumn[] = [
    {
      key: "name",
      label: "Store Name",
      sortable: true,
      // width: "25%",
    },
    {
      key: "purchase_code",
      label: "Purchase Code",
      sortable: true,
      // width: "25%",
    },
    {
      key: "admin_name",
      label: "Admin Name",
      sortable: true,
      // width: "25%",
    },
    {
      key: "purchase_date",
      label: "Purchase Date",
      sortable: true,
      // width: "25%",
    },
    {
      key: "status",
      label: "Status",
      // width: "25%",
    },
    {
      key: "actions",
      label: "Actions",
      // width: "25%",
      // align: "center",
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
    navigate(`/editpurchase/${rowId}`);
  };
  // Handle row selection
  const handleRowSelect = (rowId: string | number) => {
    selectRow(rowId);
  };

  // Handle select all
  const handleSelectAll = () => {
    const allRowIds = purchases.map((row) => row.id);
    toggleSelectAll(allRowIds);
  };

  const deletePurchase = () => {
    ApiService.post("/admin/deletePurchase", {
      purchase_id: selectedRows.toString(),
    })
      .then((res: any) => {
        alert(res.message);
        refresh();
      })
      .catch((err: any) => {
        alert(err.response.data.message);
      });
  };
  const deleteItem = (rowId: string | number) => {
    ApiService.post("/admin/deletePurchase", {
      purchase_id: rowId,
    })
      .then((res: any) => {
        alert(res.message);
        refresh();
      })
      .catch((err: any) => {
        alert(err.response.data.message);
      });
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
          <h1 className="page_heading mb-0">Purchase</h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span className="active">Purchase List</span>
          </div>
        </div>
        <div className="col-md-6 pt-3">
          <ImportExport
            onAdd={"/addpurchase"}
            onImport={() => {}}
            onExport={() => {}}
          ></ImportExport>
        </div>
      </div>

      <div className="row px-2">
        <div className=" col-md-6 col-lg-3 pt-3">
          <div className="card_cmn">
            <span className="icon_cir">
              <Box></Box>
            </span>
            <h3 className="card_sub">Total Products</h3>
            <h2 className="card_head">15,345</h2>
          </div>
        </div>
        <div className=" col-md-6 col-lg-3 pt-3">
          <div className="card_cmn">
            <span className="icon_cir">
              <TrendingDown></TrendingDown>
            </span>
            <h3 className="card_sub">Out of Stock</h3>
            <h2 className="card_head">234</h2>
          </div>
        </div>
        <div className=" col-md-6  col-lg-3 pt-3">
          <div className="card_cmn">
            <span className="icon_cir">
              <TrendingUp></TrendingUp>
            </span>
            <h3 className="card_sub">In Stock</h3>
            <h2 className="card_head">1500</h2>
          </div>
        </div>
        <div className=" col-md-6 col-lg-3 pt-3">
          <div className="card_cmn">
            <span className="icon_cir">
              <AlertCircle></AlertCircle>
            </span>
            <h3 className="card_sub">Low Stock</h3>
            <h2 className="card_head">2,567</h2>
          </div>
        </div>
      </div>

      <div className="row px-2 py-3">
        <div className="col-12">
          <div className="card_cmn">
            <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
              <div>
                <h1 className="card_heading">Purchase</h1>
                <p className="card_subheading">All Purchase</p>
              </div>
              <div className="d-flex gap-10 align-items-center ">
                <Search onSearch={handleSearch}></Search>
                {/* <Filters></Filters> */}
                <DateRangePicker
                  onDateChange={handleDateChange}
                ></DateRangePicker>
                <button
                  onClick={() => {
                    deletePurchase();
                  }}
                  className="common-button text-red"
                  disabled={getSelectedCount() === 0}
                  style={{
                    opacity: getSelectedCount() === 0 ? 0.5 : 1,
                    cursor:
                      getSelectedCount() === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  <Trash></Trash>
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
              emptyMessage="No purchase found"
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

export default Purchase;
