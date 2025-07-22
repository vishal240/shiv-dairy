import React, { useState } from "react";
import { Check, Edit, Plus, Trash, X } from "react-feather";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Table, { type TableColumn, type TableRow } from "../Table/Table";
import { useTableSelection } from "../../hooks/useTableSelection";
import ApiPagination from "../Pagination/ApiPagination";
import { useApiPagination } from "../../hooks/useApiPagination";
import Input from "../inputs/Input";
import Textarea from "../inputs/Textarea";
import Select from "../inputs/Select";
import ApiService from "../../services/api";
import dayjs from "dayjs";
import type { SettingsTabConfig } from "../../types/settings";
import TextEditor from "../inputs/TextEditor";

interface SettingsTabProps {
  config: SettingsTabConfig;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ config }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Create validation schema from config
  const validationSchema = yup.object().shape(
    config.formFields.reduce((acc, field) => {
      let fieldSchema: any = yup.string();

      if (field.required) {
        fieldSchema = fieldSchema.required(`${field.label} is required`);
      }

      if (field.type === "number") {
        fieldSchema = yup.number().positive("Must be a positive number");
        if (field.required) {
          fieldSchema = fieldSchema.required(`${field.label} is required`);
        }
      }

      if (field.type === "date") {
        fieldSchema = yup.string();
        if (field.required) {
          fieldSchema = fieldSchema.required(`${field.label} is required`);
        }
      }

      if (field.validation) {
        fieldSchema = field.validation;
      }

      acc[field.name] = fieldSchema;
      return acc;
    }, {} as any)
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: config.formFields.reduce((acc, field) => {
      if (field.type === "number") {
        acc[field.name] = 0;
      } else if (field.type === "date") {
        acc[field.name] = "";
      } else {
        acc[field.name] = "";
      }
      return acc;
    }, {} as any),
  });

  // API call function
  const fetchData = async (
    page: number,
    limit: number,
    search: string,
    startDate: string,
    endDate: string
  ) => {
    return await ApiService.post(config.apiEndpoint, {
      filters: {
        search,
        startdate: startDate,
        enddate: endDate,
        ...(config.label === "Discount Coupons"
          ? {}
          : { page_type: config.label }),
      },
      sorters: {},
      pagination: {
        page: page.toString(),
        pageSize: limit.toString(),
      },
    });
  };

  // Use API pagination hook
  const {
    data: items,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    loading: dataLoading,
    error,
    goToPage,
    refresh,
  } = useApiPagination({
    apiCall: fetchData,
    itemsPerPage: 10,
    initialPage: 1,
  });

  // Transform data for table
  const tableData: TableRow[] = items.map((item: any, index: number) => ({
    id: item._id || index,
    ...item,
    created_on: dayjs(item.created_on).format("DD/MM/YYYY | HH:mm A"),
    status: item.status || "active",
  }));

  // Selection hook
  const { selectedRows, selectRow, toggleSelectAll, getSelectedCount } =
    useTableSelection();

  // Table columns from config
  const columns: TableColumn[] = [
    ...config.columns.map((col) => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable || false,
    })),
    {
      key: "actions",
      label: "Actions",
    },
  ];

  // Custom cell renderer
  const renderCell = (column: TableColumn, row: TableRow, value: any) => {
    const configColumn = config.columns.find((col) => col.key === column.key);

    if (configColumn?.render) {
      return configColumn.render(value, row);
    }

    switch (column.key) {
      case "status":
        return (
          <span className={`status ${value === "active" ? "in" : "out"}`}>
            {value}
          </span>
        );
      case "actions":
        return (
          <div className="acbtns">
            {/* <button onClick={() => handleView(row._id)}>
              <Eye />
            </button> */}
            <button onClick={() => handleEdit(row._id)}>
              <Edit />
            </button>
            <button onClick={() => handleDelete(row._id)}>
              <Trash />
            </button>
          </div>
        );
      default:
        return value;
    }
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

  // Handle page change
  const handlePageChange = (page: number) => {
    goToPage(page);
  };

  // Modal handlers
  const handleAdd = () => {
    setEditingItem(null);
    reset();
    setShowModal(true);
  };

  const handleEdit = (id: string | number) => {
    const item = items.find((item: any) => item._id === id);
    if (item) {
      setEditingItem(item);
      // Populate form with item data
      config.formFields.forEach((field) => {
        setValue(field.name, item[field.name] || "");
      });
      setShowModal(true);
    }
  };

  const handleView = (id: string | number) => {
    const item = items.find((item: any) => item._id === id);
    if (item) {
      alert(`Viewing: ${item.content}`);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await ApiService.post(config.deleteEndpoint, {
          page_id: id,
          coupon_id: id,
        });
        refresh();
        alert("Item deleted successfully");
      } catch (error: any) {
        alert(error.response?.data?.message || "Error deleting item");
      }
    }
  };

  const handleBulkDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${getSelectedCount()} items?`
      )
    ) {
      try {
        await ApiService.post(config.deleteEndpoint, {
          page_id: selectedRows,
          coupon_id: selectedRows,
        });
        refresh();
        alert("Items deleted successfully");
      } catch (error: any) {
        alert(error.response?.data?.message || "Error deleting items");
      }
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const endpoint = editingItem
        ? config.updateEndpoint
        : config.createEndpoint;
      const submitData = editingItem
        ? {
            ...data,
            page_id: editingItem._id,
            coupon_id: editingItem._id,
            page_type: config.label,
          }
        : { ...data, page_type: config.label };

      await ApiService.post(endpoint, submitData);

      setShowModal(false);
      reset();
      setEditingItem(null);
      refresh();
      alert(`Item ${editingItem ? "updated" : "created"} successfully`);
    } catch (error: any) {
      alert(error.response?.data?.message || "Error saving item");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    reset();
    setEditingItem(null);
  };

  return (
    <>
      <div className="card_cmn">
        <div className="d-md-flex pb-3 pb-md-0 justify-content-between">
          <div>
            <h1 className="card_heading">{config.label}</h1>
          </div>
          <div className="d-flex gap-10 align-items-center">
            <button
              onClick={handleBulkDelete}
              className="common-button text-red"
              disabled={getSelectedCount() === 0 || dataLoading}
              style={{
                opacity: getSelectedCount() === 0 || dataLoading ? 0.5 : 1,
                cursor:
                  getSelectedCount() === 0 || dataLoading
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              <Trash />
              Delete ({getSelectedCount()})
            </button>
            <button onClick={handleAdd} className="black_btn">
              <Plus /> Add New
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
          loading={dataLoading}
          selectable={true}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
          renderCell={renderCell}
          emptyMessage={`No ${config.label.toLowerCase()} found`}
        />

        <ApiPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          loading={dataLoading}
          showInfo={true}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          id="settingsModal"
          aria-labelledby="settingsModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="settingsModalLabel">
                  {editingItem ? "Edit" : "Add"} {config.label}
                </h5>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    {config.formFields.map((field) => (
                      <div key={field.name} className="col-md-6 pt-3">
                        {field.type === "textarea" ? (
                          <TextEditor
                            control={control}
                            name={field.name}
                            label={field.label}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            //   error={errors[field.name]?.message?.toString()}
                            //   disabled={loading}
                          />
                        ) : field.type === "select" ? (
                          <Select
                            control={control}
                            name={field.name}
                            label={field.label}
                            options={field.options || []}
                            error={errors[field.name]?.message?.toString()}
                            disabled={loading}
                          />
                        ) : (
                          <Input
                            control={control}
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            error={errors[field.name]?.message?.toString()}
                            disabled={loading}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn_imprt"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  <X /> Cancel
                </button>
                <button
                  type="button"
                  className="black_btn"
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                >
                  <Check /> {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsTab;
