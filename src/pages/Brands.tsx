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
import Pagination from "../components/Pagination/Pagination";
import { usePagination } from "../hooks/usePagination";
import { useTableSelection } from "../hooks/useTableSelection";
import { useEffect, useState } from "react";
import ApiService from "../services/api";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Transform categories data for table
  const tableData: TableRow[] = brands.map((brand: any, index: number) => ({
    id: brand._id || index,
    name: brand.brand_name,
    dateAdded: dayjs(brand.created_on).format("DD/MM/YYYY | HH:mm A"),
    status: brand.is_deleted ? "Inactive" : "Active",
  }));

  // Pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedData,
    goToPage,
  } = usePagination({
    data: tableData,
    itemsPerPage: 10,
  });

  // Selection hook
  const { selectedRows, selectRow, toggleSelectAll, getSelectedCount } =
    useTableSelection();

  // Table columns configuration
  const columns: TableColumn[] = [
    {
      key: "name",
      label: "Brands Name",
      sortable: true,
      // width: "25%",
    },
    {
      key: "dateAdded",
      label: "Added",
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
    navigate(`/editbrands/${rowId}`);
  };
  // Handle row selection
  const handleRowSelect = (rowId: string | number) => {
    selectRow(rowId);
  };

  // Handle select all
  const handleSelectAll = () => {
    const allRowIds = paginatedData.map((row) => row.id);
    toggleSelectAll(allRowIds);
  };

  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = () => {
    setLoading(true);
    ApiService.post("/admin/listBrands", {})
      .then((res: any) => {
        console.log(res);
        setBrands(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteBrands = () => {
    setLoading(true);
    ApiService.post("/admin/deleteBrand", {
      brand_id: selectedRows.toString(),
    })
      .then((res: any) => {
        alert(res.message);
        getBrands();
      })
      .catch((err: any) => {
        alert(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const deleteItem = (rowId: string | number) => {
    ApiService.post("/admin/deleteBrand", {
      brand_id: rowId,
    })
      .then((res: any) => {
        alert(res.message);
        getBrands();
      })
      .catch((err: any) => {
        alert(err.response.data.message);
      });
  };
  return (
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
          <ImportExport
            onAdd={"/addbrands"}
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
                <h1 className="card_heading">Brands</h1>
                <p className="card_subheading">Brands List</p>
              </div>
              <div className="d-flex gap-10 align-items-center ">
                <Search></Search>
                <Filters></Filters>
                <DateRangePicker></DateRangePicker>
                <button
                  onClick={() => {
                    deleteBrands();
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
              </div>
            </div>
            <Table
              columns={columns}
              data={paginatedData}
              loading={loading}
              selectable={true}
              selectedRows={selectedRows}
              onRowSelect={handleRowSelect}
              onSelectAll={handleSelectAll}
              renderCell={renderCell}
              emptyMessage="No brands found"
            />

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

export default Brands;
