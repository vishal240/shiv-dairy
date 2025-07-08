import { Check, X } from "react-feather";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { CategoryFormData } from "../types/categories";
import Input from "../components/inputs/Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ApiService from "../services/api";

const AddCategories = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const storeSchema = yup.object({
    product_category_name: yup.string().required("Category name is required"),
    product_sub_category_name: yup
      .string()
      .required("Sub category name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<CategoryFormData>({
    resolver: yupResolver(storeSchema),
  });

  const onSubmit = (data: CategoryFormData) => {
    setLoading(true);
    ApiService.post("/admin/createCategory", {
      product_category_name: data.product_category_name,
      children: [
        {
          product_category_name: data.product_sub_category_name,
        },
      ],
    })
      .then((res: any) => {
        alert(res.message);
        navigate("/categories");
      })
      .catch((err: any) => {
        alert(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    reset();
    navigate("/categories");
  };

  return (
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
            <button
              className="btn_imprt"
              disabled={loading}
              onClick={handleCancel}
            >
              <X></X> Cancel
            </button>
            <button
              className="black_btn"
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
            >
              <Check></Check> {loading ? "Saving..." : "Save"}
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
                    <Input
                      control={control}
                      name="product_category_name"
                      label="Category Name"
                      type="text"
                      placeholder="Enter category name"
                      error={errors.product_category_name?.message}
                      disabled={loading}
                    />
                  </div>
                  <div className="col-12 pt-3">
                    <Input
                      control={control}
                      name="product_sub_category_name"
                      label="Sub Category Name"
                      type="text"
                      placeholder="Enter sub category name"
                      error={errors.product_sub_category_name?.message}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row px-2 pt-3">
          <div className="col-12">
            <span className="gap-10 d-flex align-items-center justify-content-md-end">
              <button
                className="btn_imprt"
                disabled={loading}
                onClick={handleCancel}
              >
                <X></X> Cancel
              </button>
              <button
                className="black_btn"
                disabled={loading}
                onClick={handleSubmit(onSubmit)}
              >
                <Check></Check> {loading ? "Saving..." : "Save"}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategories;
