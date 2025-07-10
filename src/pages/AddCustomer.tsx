import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Check, X } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Input from "../components/inputs/Input";
import Select from "../components/inputs/Select";
import ImageUpload from "../components/inputs/ImageUpload";
import type { CustomerFormData } from "../types/customer";
import ApiService from "../services/api";

// Validation schema
const customerSchema = yup.object({
  // Personal Information
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),

  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),

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

  // Billing Address
  billingAddress: yup
    .string()
    .required("Billing address is required")
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must not exceed 200 characters"),

  billingCity: yup
    .string()
    .required("Billing city is required")
    .min(2, "City must be at least 2 characters")
    .max(50, "City must not exceed 50 characters"),

  billingState: yup
    .string()
    .required("Billing state is required")
    .min(2, "State must be at least 2 characters")
    .max(50, "State must not exceed 50 characters"),

  billingCountry: yup
    .string()
    .required("Billing country is required")
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must not exceed 50 characters"),

  billingZip: yup
    .string()
    .required("Billing ZIP code is required")
    .matches(/^[\d\-\s]{3,10}$/, "Please enter a valid ZIP code"),

  // Shipping Address
  shippingAddress: yup
    .string()
    .required("Shipping address is required")
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must not exceed 200 characters"),

  shippingCity: yup
    .string()
    .required("Shipping city is required")
    .min(2, "City must be at least 2 characters")
    .max(50, "City must not exceed 50 characters"),

  shippingState: yup
    .string()
    .required("Shipping state is required")
    .min(2, "State must be at least 2 characters")
    .max(50, "State must not exceed 50 characters"),

  shippingCountry: yup
    .string()
    .required("Shipping country is required")
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must not exceed 50 characters"),

  shippingZip: yup
    .string()
    .required("Shipping ZIP code is required")
    .matches(/^[\d\-\s]{3,10}$/, "Please enter a valid ZIP code"),

  // Status
  status: yup.string().required("Status is required"),

  // Customer Image (optional)
  customerImage: yup.mixed().optional(),
});

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

const AddCustomer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [copyBillingToShipping, setCopyBillingToShipping] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CustomerFormData>({
    resolver: yupResolver(customerSchema) as any,
    defaultValues: {
      status: "active",
    },
  });

  // Watch billing address fields for copying to shipping
  const billingAddress = watch("billingAddress");
  const billingCity = watch("billingCity");
  const billingState = watch("billingState");
  const billingCountry = watch("billingCountry");
  const billingZip = watch("billingZip");

  // Load customer data for editing
  useEffect(() => {
    if (id) {
      loadCustomer(id);
    }
  }, [id]);

  // Copy billing address to shipping address when checkbox is checked
  useEffect(() => {
    if (copyBillingToShipping) {
      setValue("shippingAddress", billingAddress || "");
      setValue("shippingCity", billingCity || "");
      setValue("shippingState", billingState || "");
      setValue("shippingCountry", billingCountry || "");
      setValue("shippingZip", billingZip || "");
    }
  }, [copyBillingToShipping, billingAddress, billingCity, billingState, billingCountry, billingZip, setValue]);

  const loadCustomer = (customerId: string) => {
    setLoading(true);
    ApiService.post("/admin/getCustomerDetails", {
      customer_id: customerId,
    })
      .then((response: any) => {
        const customer = response.data;
        
        // Populate form with customer data
        setValue("firstName", customer.firstName || "");
        setValue("lastName", customer.lastName || "");
        setValue("primaryPhone", customer.primaryPhone || "");
        setValue("primaryEmail", customer.primaryEmail || "");
        setValue("secondaryPhone", customer.secondaryPhone || "");
        setValue("secondaryEmail", customer.secondaryEmail || "");
        
        // Billing address
        setValue("billingAddress", customer.billingAddress?.address || "");
        setValue("billingCity", customer.billingAddress?.city || "");
        setValue("billingState", customer.billingAddress?.state || "");
        setValue("billingCountry", customer.billingAddress?.country || "");
        setValue("billingZip", customer.billingAddress?.zip || "");
        
        // Shipping address
        setValue("shippingAddress", customer.shippingAddress?.address || "");
        setValue("shippingCity", customer.shippingAddress?.city || "");
        setValue("shippingState", customer.shippingAddress?.state || "");
        setValue("shippingCountry", customer.shippingAddress?.country || "");
        setValue("shippingZip", customer.shippingAddress?.zip || "");
        
        setValue("status", customer.status || "active");
      })
      .catch((error) => {
        console.error("Error loading customer:", error);
        alert("Error loading customer data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmit = (data: CustomerFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Personal information
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("primaryPhone", data.primaryPhone);
      formData.append("primaryEmail", data.primaryEmail);
      formData.append("secondaryPhone", data.secondaryPhone || "");
      formData.append("secondaryEmail", data.secondaryEmail || "");
      
      // Billing address
      formData.append("billingAddress", JSON.stringify({
        address: data.billingAddress,
        city: data.billingCity,
        state: data.billingState,
        country: data.billingCountry,
        zip: data.billingZip,
      }));
      
      // Shipping address
      formData.append("shippingAddress", JSON.stringify({
        address: data.shippingAddress,
        city: data.shippingCity,
        state: data.shippingState,
        country: data.shippingCountry,
        zip: data.shippingZip,
      }));
      
      formData.append("status", data.status);
      
      // Customer image
      if (data.customerImage && data.customerImage.length > 0) {
        formData.append("customerImage", data.customerImage[0]);
      }

      const endpoint = id ? "/admin/editCustomer" : "/admin/createCustomer";
      if (id) {
        formData.append("customer_id", id);
      }

      ApiService.post(endpoint, formData)
        .then((response: any) => {
          alert(response.message || "Customer saved successfully!");
          navigate("/customers");
        })
        .catch((error) => {
          console.error("Error saving customer:", error);
          alert(error.response?.data?.message || "Error saving customer");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error: any) {
      console.error("Error saving customer:", error);
      alert(error.response?.data?.message || "Error saving customer");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    navigate("/customers");
  };

  const handleCopyBillingToShipping = (checked: boolean) => {
    setCopyBillingToShipping(checked);
  };

  return (
    <div className="container-fluid">
      <div className="row px-2 pt-3">
        <div className="col-md-6 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">
            {id ? "Edit Customer" : "Add Customer"}
          </h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span>Customer List / </span>
            <span className="active">
              {id ? "Edit Customer" : "Add Customer"}
            </span>
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
        <div className="row">
          <div className="col-md-8">
            {/* Customer Information */}
            <div className="row px-2 pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">Customer Information</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="firstName"
                        label="First Name"
                        type="text"
                        placeholder="Enter first name"
                        error={errors.firstName?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="lastName"
                        label="Last Name"
                        type="text"
                        placeholder="Enter last name"
                        error={errors.lastName?.message}
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
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="row px-2 pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">Billing Address</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-12 pt-3">
                      <Input
                        control={control}
                        name="billingAddress"
                        label="Address"
                        type="text"
                        placeholder="Enter billing address"
                        error={errors.billingAddress?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="billingCity"
                        label="City"
                        type="text"
                        placeholder="Enter city"
                        error={errors.billingCity?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="billingState"
                        label="State"
                        type="text"
                        placeholder="Enter state"
                        error={errors.billingState?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="billingCountry"
                        label="Country"
                        type="text"
                        placeholder="Enter country"
                        error={errors.billingCountry?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="billingZip"
                        label="ZIP Code"
                        type="text"
                        placeholder="Enter ZIP code"
                        error={errors.billingZip?.message}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="row px-2 pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <div className="col-md-8">
                      <h5 className="card_heading">Shipping Address</h5>
                    </div>
                    <div className="col-md-4 pt-2">
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="checkbox"
                          id="copyBilling"
                          checked={copyBillingToShipping}
                          onChange={(e) => handleCopyBillingToShipping(e.target.checked)}
                          className="chx_input"
                        />
                        <label htmlFor="copyBilling" className="chx_lbl">
                          <Check />
                        </label>
                        <label htmlFor="copyBilling" className="font-12">
                          Same as billing address
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 pt-3">
                      <Input
                        control={control}
                        name="shippingAddress"
                        label="Address"
                        type="text"
                        placeholder="Enter shipping address"
                        error={errors.shippingAddress?.message}
                        disabled={loading || copyBillingToShipping}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="shippingCity"
                        label="City"
                        type="text"
                        placeholder="Enter city"
                        error={errors.shippingCity?.message}
                        disabled={loading || copyBillingToShipping}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="shippingState"
                        label="State"
                        type="text"
                        placeholder="Enter state"
                        error={errors.shippingState?.message}
                        disabled={loading || copyBillingToShipping}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="shippingCountry"
                        label="Country"
                        type="text"
                        placeholder="Enter country"
                        error={errors.shippingCountry?.message}
                        disabled={loading || copyBillingToShipping}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="shippingZip"
                        label="ZIP Code"
                        type="text"
                        placeholder="Enter ZIP code"
                        error={errors.shippingZip?.message}
                        disabled={loading || copyBillingToShipping}
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
                  <button
                    type="submit"
                    className="black_btn"
                    disabled={loading}
                  >
                    <Check /> {loading ? "Saving..." : "Save"}
                  </button>
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-md-4">
            {/* Customer Image */}
            <div className="row pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">Customer Image</h5>
                  </div>
                  <div className="row">
                    <div className="col-12 pt-3">
                      <ImageUpload
                        control={control}
                        name="customerImage"
                        label="Customer Image (Optional)"
                        error={errors.customerImage?.message}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;