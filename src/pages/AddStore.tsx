import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Check, X } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Input from "../components/inputs/Input";
import Textarea from "../components/inputs/Textarea";
import Select from "../components/inputs/Select";
import FileInput from "../components/inputs/FileInput";
import ImageUpload from "../components/inputs/ImageUpload";
import type { StoreFormData } from "../types/store";

// Validation schema
const storeSchema = yup.object({
  // General Business Information
  storeName: yup
    .string()
    .required("Store name is required")
    .min(2, "Store name must be at least 2 characters")
    .max(100, "Store name must not exceed 100 characters"),

  storeDescription: yup
    .string()
    .required("Store description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),

  primaryPhone: yup
    .string()
    .required("Primary phone is required")
    .matches(/^[+]?[\d\s\-()]{10,15}$/, "Please enter a valid phone number"),

  primaryEmail: yup
    .string()
    .required("Primary email is required")
    .email("Please enter a valid email address"),

  secondaryPhone: yup
    .string()
    .optional()
    .matches(/^[+]?[\d\s\-()]{10,15}$/, "Please enter a valid phone number"),

  secondaryEmail: yup
    .string()
    .optional()
    .email("Please enter a valid email address"),

  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must not exceed 200 characters"),

  city: yup
    .string()
    .required("City is required")
    .min(2, "City must be at least 2 characters")
    .max(50, "City must not exceed 50 characters"),

  state: yup
    .string()
    .required("State is required")
    .min(2, "State must be at least 2 characters")
    .max(50, "State must not exceed 50 characters"),

  country: yup
    .string()
    .required("Country is required")
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must not exceed 50 characters"),

  zipCode: yup
    .string()
    .required("ZIP code is required")
    .matches(/^[\d\-\s]{3,10}$/, "Please enter a valid ZIP code"),

  // Owner Information
  ownerName: yup
    .string()
    .required("Owner name is required")
    .min(2, "Owner name must be at least 2 characters")
    .max(100, "Owner name must not exceed 100 characters"),

  ownerEmail: yup
    .string()
    .required("Owner email is required")
    .email("Please enter a valid email address"),

  ownerPhone: yup
    .string()
    .required("Owner phone is required")
    .matches(/^[+]?[\d\s\-()]{10,15}$/, "Please enter a valid phone number"),

  ownerAddress: yup
    .string()
    .required("Owner address is required")
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must not exceed 200 characters"),

  ownerCity: yup
    .string()
    .required("Owner city is required")
    .min(2, "City must be at least 2 characters")
    .max(50, "City must not exceed 50 characters"),

  ownerState: yup
    .string()
    .required("Owner state is required")
    .min(2, "State must be at least 2 characters")
    .max(50, "State must not exceed 50 characters"),

  ownerCountry: yup
    .string()
    .required("Owner country is required")
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must not exceed 50 characters"),

  ownerZipCode: yup
    .string()
    .required("Owner ZIP code is required")
    .matches(/^[\d\-\s]{3,10}$/, "Please enter a valid ZIP code"),

  // Login Information
  userId: yup
    .string()
    .required("User ID is required")
    .min(3, "User ID must be at least 3 characters")
    .max(50, "User ID must not exceed 50 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "User ID can only contain letters, numbers, and underscores"
    ),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),

  // Status
  status: yup.string().required("Status is required"),
});

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

const AddStore = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StoreFormData>({
    resolver: yupResolver(storeSchema) as any,
    defaultValues: {
      status: "active",
    },
  });

  const onSubmit = async (data: StoreFormData) => {
    setLoading(true);
    try {
      // Create FormData for file uploads
      const formData = new FormData();

      // Append all text fields
      Object.entries(data).forEach(([key, value]) => {
        if (value && typeof value === "string") {
          formData.append(key, value);
        }
      });

      // Append files
      if (data.aadharCard && data.aadharCard.length > 0) {
        formData.append("aadharCard", data.aadharCard[0]);
      }
      if (data.gstCertificate && data.gstCertificate.length > 0) {
        formData.append("gstCertificate", data.gstCertificate[0]);
      }
      if (data.panCard && data.panCard.length > 0) {
        formData.append("panCard", data.panCard[0]);
      }
      if (data.storeImages && data.storeImages.length > 0) {
        Array.from(data.storeImages).forEach((file, index) => {
          formData.append(`storeImage_${index}`, file);
        });
      }
      if (data.bannerImages && data.bannerImages.length > 0) {
        Array.from(data.bannerImages).forEach((file, index) => {
          formData.append(`bannerImage_${index}`, file);
        });
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Store data submitted:", data);
      // alert("Store created successfully!");

      // Reset form and navigate
      // reset();
      // navigate("/stores");
    } catch (error) {
      console.error("Error creating store:", error);
      alert("Error creating store. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    navigate("/stores");
  };

  return (
    <div className="container-fluid">
      <div className="row px-2 pt-3">
        <div className="col-md-6 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">Add Store</h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span>Store List / </span>
            <span className="active">Add Store</span>
          </div>
        </div>
        <div className="col-md-6 pt-3">
          <span className="gap-10 d-flex align-items-center justify-content-md-end">
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
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* General Business Information */}
        <div className="row px-2 pt-3">
          <div className="col-12">
            <div className="card_cmn">
              <div className="row">
                <h5 className="card_heading">General Business Information</h5>
              </div>
              <div className="row">
                <div className="col-12 pt-3">
                  <Input
                    control={control}
                    name="storeName"
                    label="Store Name"
                    type="text"
                    placeholder="Enter store name"
                    error={errors.storeName?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-12 pt-3">
                  <Textarea
                    control={control}
                    name="storeDescription"
                    label="Store Description"
                    placeholder="Enter store description"
                    error={errors.storeDescription?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-6 pt-3">
                  <Input
                    control={control}
                    name="primaryPhone"
                    label="Phone (Primary)"
                    type="tel"
                    placeholder="Enter primary phone number"
                    error={errors.primaryPhone?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-6 pt-3">
                  <Input
                    control={control}
                    name="primaryEmail"
                    label="Email (Primary)"
                    type="email"
                    placeholder="Enter primary email"
                    error={errors.primaryEmail?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-6 pt-3">
                  <Input
                    control={control}
                    name="secondaryPhone"
                    label="Phone (Optional)"
                    type="tel"
                    placeholder="Enter secondary phone number"
                    error={errors.secondaryPhone?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-6 pt-3">
                  <Input
                    control={control}
                    name="secondaryEmail"
                    label="Email (Optional)"
                    type="email"
                    placeholder="Enter secondary email"
                    error={errors.secondaryEmail?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-12 pt-3">
                  <Input
                    control={control}
                    name="address"
                    label="Address"
                    type="text"
                    placeholder="Enter complete address"
                    error={errors.address?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-6 pt-3">
                  <Input
                    control={control}
                    name="city"
                    label="City"
                    type="text"
                    placeholder="Enter city"
                    error={errors.city?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-6 pt-3">
                  <Input
                    control={control}
                    name="state"
                    label="State"
                    type="text"
                    placeholder="Enter state"
                    error={errors.state?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-6 pt-3">
                  <Input
                    control={control}
                    name="country"
                    label="Country"
                    type="text"
                    placeholder="Enter country"
                    error={errors.country?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-6 pt-3">
                  <Input
                    control={control}
                    name="zipCode"
                    label="ZIP Code"
                    type="text"
                    placeholder="Enter ZIP code"
                    error={errors.zipCode?.message}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="row px-2 pt-3">
          <div className="col-12">
            <div className="card_cmn">
              <div className="row">
                <h5 className="card_heading">Documents</h5>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <FileInput
                    control={control}
                    name="aadharCard"
                    label="Upload Aadhar Card"
                    accept=".pdf,.jpg,.jpeg,.png"
                    error={errors.aadharCard?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-4">
                  <FileInput
                    control={control}
                    name="gstCertificate"
                    label="Upload GST Certificate"
                    accept=".pdf,.jpg,.jpeg,.png"
                    error={errors.gstCertificate?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-4">
                  <FileInput
                    control={control}
                    name="panCard"
                    label="Upload PAN Card"
                    accept=".pdf,.jpg,.jpeg,.png"
                    error={errors.panCard?.message}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Owner Information */}
        <div className="row px-2 pt-3">
          <div className="col-12">
            <div className="card_cmn">
              <div className="row">
                <h5 className="card_heading">Owner Information</h5>
              </div>
              <div className="row">
                <div className="col-md-4 pt-3">
                  <Input
                    control={control}
                    name="ownerName"
                    label="Name"
                    type="text"
                    placeholder="Enter owner name"
                    error={errors.ownerName?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-4 pt-3">
                  <Input
                    control={control}
                    name="ownerEmail"
                    label="Email"
                    type="email"
                    placeholder="Enter owner email"
                    error={errors.ownerEmail?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-4 pt-3">
                  <Input
                    control={control}
                    name="ownerPhone"
                    label="Phone"
                    type="tel"
                    placeholder="Enter owner phone"
                    error={errors.ownerPhone?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-12 pt-3">
                  <Input
                    control={control}
                    name="ownerAddress"
                    label="Address"
                    type="text"
                    placeholder="Enter owner address"
                    error={errors.ownerAddress?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-6 pt-3">
                  <Input
                    control={control}
                    name="ownerCity"
                    label="City"
                    type="text"
                    placeholder="Enter owner city"
                    error={errors.ownerCity?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-6 pt-3">
                  <Input
                    control={control}
                    name="ownerState"
                    label="State"
                    type="text"
                    placeholder="Enter owner state"
                    error={errors.ownerState?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-6 pt-3">
                  <Input
                    control={control}
                    name="ownerCountry"
                    label="Country"
                    type="text"
                    placeholder="Enter owner country"
                    error={errors.ownerCountry?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-6 pt-3">
                  <Input
                    control={control}
                    name="ownerZipCode"
                    label="ZIP Code"
                    type="text"
                    placeholder="Enter owner ZIP code"
                    error={errors.ownerZipCode?.message}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Login Information */}
        <div className="row px-2 pt-3">
          <div className="col-12">
            <div className="card_cmn">
              <div className="row">
                <h5 className="card_heading">Login Information</h5>
              </div>
              <div className="row">
                <div className="col-md-4 pt-3">
                  <Input
                    control={control}
                    name="userId"
                    label="User ID"
                    type="text"
                    placeholder="Enter user ID"
                    error={errors.userId?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-4 pt-3">
                  <Input
                    control={control}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    error={errors.password?.message}
                    disabled={loading}
                  />
                </div>
                <div className="col-md-4 pt-3">
                  <Input
                    control={control}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm password"
                    error={errors.confirmPassword?.message}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="row px-2 pt-3">
          <div className="col-12">
            <div className="card_cmn">
              <div className="row">
                <h5 className="card_heading">Media</h5>
              </div>
              <div className="row">
                <div className="col-12">
                  <ImageUpload
                    control={control}
                    name="storeImages"
                    label="Store Image (Optional)"
                    error={errors.storeImages?.message}
                    multiple
                  />
                </div>
                <div className="col-12">
                  <ImageUpload
                    control={control}
                    name="bannerImages"
                    label="Banner Image (Optional)"
                    error={errors.bannerImages?.message}
                    multiple
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="row px-2 pt-3">
          <div className="col-12">
            <div className="card_cmn">
              <div className="row">
                <h5 className="card_heading">Status</h5>
              </div>
              <div className="row">
                <div className="col-md-4 pt-3">
                  <Select
                    control={control}
                    name="status"
                    label="Status"
                    options={statusOptions}
                    error={errors.status?.message}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="row px-2 pt-3">
          <div className="col-12">
            <span className="gap-10 d-flex align-items-center justify-content-md-end">
              <button
                type="button"
                className="btn_imprt"
                onClick={handleCancel}
                disabled={loading}
              >
                <X /> Cancel
              </button>
              <button type="submit" className="black_btn" disabled={loading}>
                <Check /> {loading ? "Saving..." : "Save"}
              </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStore;
