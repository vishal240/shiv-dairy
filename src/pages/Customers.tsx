import { Check, ChevronLeft, ChevronRight, Trash } from "react-feather";
import Filters from "../components/Filters";
import Search from "../components/Search";
import milk from "../assets/milk.jpg";
import DateRangePicker from "../components/DateRangePicker";
import ImportExport from "../components/ImportExport";
import Actions from "../components/Actions";
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

const Customers = () => {
  const navigate = useNavigate();

  // API call function
  const fetchCustomers = async (
    page: number,
    limit: number,
    search: string,
    startDate: string,
    endDate: string
  ) => {
    return await ApiService.post("/admin/listCustomer", {
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
    data: customers,
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
    apiCall: fetchCustomers,
    itemsPerPage: 10,
    initialPage: 1,
  });
  // Transform categories data for table
  const tableData: TableRow[] = customers.map(
    (customer: any, index: number) => ({
      id: customer._id || index,
      name: customer.fname + " " + customer.lname,
      phone: customer.country_code_primary + customer.phone_primary,
      email: customer.email_primary,
      user_id: customer.user_id,
      created_on: dayjs(customer.created_on).format("DD/MM/YYYY | HH:mm A"),
      status: customer.status.toUpperCase(),
    })
  );
  // Selection hook
  const { selectedRows, selectRow, toggleSelectAll, getSelectedCount } =
    useTableSelection();

  // Table columns configuration
  const columns: TableColumn[] = [
    {
      key: "name",
      label: "Customer Name",
      sortable: true,
      // width: "25%",
    },
    {
      key: "phone",
      label: "Phone",
      sortable: true,
      // width: "25%",
    },
    {
      key: "email",
      label: "Email",
      // width: "25%",
    },
    {
      key: "user_id",
      label: "User ID",
      // width: "25%",
    },
    {
      key: "status",
      label: "Status",
      // width: "25%",
    },
    {
      key: "created_on",
      label: "Created On",
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
    navigate(`/editcustomer/${rowId}`);
  };
  // Handle row selection
  const handleRowSelect = (rowId: string | number) => {
    selectRow(rowId);
  };

  // Handle select all
  const handleSelectAll = () => {
    const allRowIds = customers.map((row) => row.id);
    toggleSelectAll(allRowIds);
  };

  const deleteCustomers = () => {
    ApiService.post("/admin/deleteCustomer", {
      customer_id: selectedRows.toString(),
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
    ApiService.post("/admin/deleteCustomer", {
      customer_id: rowId,
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
          <h1 className="page_heading mb-0">Customers</h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span className="active">Customers</span>
          </div>
        </div>
        <div className="col-md-6 pt-3">
          <ImportExport
            onAdd={"/addcustomer"}
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
                <h1 className="card_heading">Customer</h1>
                <p className="card_subheading">Customer List</p>
              </div>
              <div className="d-flex gap-10 align-items-center ">
                <Search onSearch={handleSearch}></Search>
                {/* <Filters></Filters> */}
                <DateRangePicker
                  onDateChange={handleDateChange}
                ></DateRangePicker>
                <button
                  onClick={() => {
                    deleteCustomers();
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
              emptyMessage="No customers found"
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

export default Customers;
