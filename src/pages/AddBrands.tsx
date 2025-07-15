import { Check, X } from "react-feather";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../components/inputs/Input";
import type { Brand } from "../types/brands";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../services/api";
import { useNavigate } from "react-router-dom";
import Textarea from "../components/inputs/Textarea";
import ImageUpload from "../components/inputs/ImageUpload";

const AddBrands = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const storeSchema = yup.object({
    brand_id: yup.string().optional(),
    brand_name: yup.string().required("Brand name is required"),
    description: yup.string().required("Description is required"),
    brand_image: yup.mixed().required("Brand image is required"),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<Brand>({
    resolver: yupResolver(storeSchema as any),
  });

  const { id } = useParams();
  const getCategoryById = (id: string) => {
    ApiService.post("/admin/getBrandDetails", {
      brand_id: id,
    })
      .then((res: any) => {
        console.log(res.data);
        setValue("brand_name", res.data.brand_name);
        setValue("description", res.data.description);
        setValue("brand_image", res.data.brand_image);
      })
      .catch((err: any) => {
        alert(err.response.data.message);
      });
  };
  useEffect(() => {
    if (id) {
      getCategoryById(id);
    }
  }, [id]);
  const onSubmit = (data: Brand) => {
    setLoading(true);
    if (id) {
      const formData = new FormData();
      formData.append("brand_id", id);
      formData.append("brand_name", data.brand_name);
      formData.append("description", data.description);
      if (data.brand_image && data.brand_image.length > 0) {
        formData.append("file", data.brand_image[0]);
      }
      ApiService.post("/admin/editBrand", formData)
        .then((res: any) => {
          alert(res.message);
          navigate("/brands");
        })
        .catch((err: any) => {
          alert(err.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      const formData = new FormData();
      formData.append("brand_name", data.brand_name);
      formData.append("description", data.description);
      if (data.brand_image && data.brand_image.length > 0) {
        formData.append("file", data.brand_image[0]);
      }
      ApiService.post("/admin/createBrand", formData)
        .then((res: any) => {
          alert(res.message);
          navigate("/brands");
        })
        .catch((err: any) => {
          alert(err.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <div className="container-fluid">
      <div className="row px-2 pt-3">
        <div className="col-md-6 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">
            {id ? "Edit Brand" : "Add Brand"}
          </h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span>Brands List / </span>
            <span className="active">{id ? "Edit Brand" : "Add Brand"}</span>
          </div>
        </div>
        <div className="col-md-6 pt-3">
          <span className="gap-10 d-flex align-items-center justify-content-md-end">
            <button
              className="btn_imprt"
              disabled={loading}
              onClick={() => navigate("/brands")}
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
        <div className="col-md-4 ">
          <div className="row pt-3">
            <div className="col-12">
              <div className="card_cmn">
                <div className="row">
                  <h5 className="card_heading">Brand Image</h5>
                </div>
                <div className="row">
                  <div className="col-12 pt-3">
                    <ImageUpload
                      control={control}
                      name="brand_image"
                      label="Brand Image"
                      error={errors.brand_image?.message}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="row px-2 pt-3">
            <div className="col-12">
              <div className="card_cmn">
                <div className="row">
                  <h5 className="card_heading">Brand Information</h5>
                </div>
                <div className="row">
                  <div className="col-12 pt-3">
                    <Input
                      control={control}
                      name="brand_name"
                      label="Brand Name"
                      type="text"
                      placeholder="Enter brand name"
                      error={errors.brand_name?.message}
                      disabled={loading}
                    />
                  </div>
                  <div className="col-12 pt-3">
                    <Textarea
                      control={control}
                      name="description"
                      label="Description"
                      placeholder="Enter description"
                      error={errors.description?.message}
                      disabled={loading}
                    />
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
                  onClick={() => navigate("/brands")}
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
    </div>
  );
};

export default AddBrands;
