import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Check, X } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Input from "../components/inputs/Input";
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
  country_code_primary: yup
    .string()
    .required("Country code is required")
    .matches(/^\+\d{1,4}$/, "Must start with '+' and have 1 to 4 digits"),
  country_code: yup
    .string()
    .optional()
    .matches(/^\+\d{1,4}$/, "Must start with '+' and have 1 to 4 digits"),

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

  businessName: yup
    .string()
    .required("Business name is required")
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must not exceed 100 characters"),
  business_country_code: yup
    .string()
    .required("Business country code is required")
    .matches(/^\+\d{1,4}$/, "Must start with '+' and have 1 to 4 digits"),
  businessPhone: yup
    .string()
    .required("Business phone is required")
    .matches(/^[+]?[\d\s\-()]{10,15}$/, "Please enter a valid phone number"),

  businessEmail: yup
    .string()
    .required("Business email is required")
    .email("Please enter a valid email address"),

  // Customer Image (optional)
  customerImage: yup.mixed().optional(),
  customer_document: yup.mixed().optional(),
  business_document: yup.mixed().optional(),
});

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
      firstName: "",
      lastName: "",
      primaryPhone: "",
      primaryEmail: "",
      secondaryPhone: "",
      secondaryEmail: "",
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingCountry: "",
      billingZip: "",
      country_code_primary: "",
      country_code: "",
      shippingAddress: "",
      shippingCity: "",
      shippingState: "",
      shippingCountry: "",
      shippingZip: "",
      businessName: "",
      business_country_code: "",
      businessPhone: "",
      businessEmail: "",
      customerImage: null,
      customer_document: null,
      business_document: null,
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
  }, [
    copyBillingToShipping,
    billingAddress,
    billingCity,
    billingState,
    billingCountry,
    billingZip,
    setValue,
  ]);

  const loadCustomer = (customerId: string) => {
    setLoading(true);
    ApiService.post("/admin/detailCustomer", {
      customer_id: customerId,
    })
      .then((response: any) => {
        const customer = response.data;
        console.log(customer);
        // Populate form with customer data
        setValue("firstName", customer.customer.fname || "");
        setValue("lastName", customer.customer.lname || "");
        setValue(
          "country_code_primary",
          customer.customer.country_code_primary || ""
        );
        setValue("primaryPhone", customer.customer.phone_primary || "");
        setValue("primaryEmail", customer.customer.email_primary || "");
        setValue("country_code", customer.customer.country_code || "");
        setValue("secondaryPhone", customer.customer.phone_number || "");
        setValue("secondaryEmail", customer.customer.email || "");

        // Billing address
        setValue("billingAddress", customer.address?.street_1 || "");
        setValue("billingCity", customer.address?.city || "");
        setValue("billingState", customer.address?.state || "");
        setValue("billingCountry", customer.address?.country || "");
        setValue("billingZip", customer.address?.zip || "");

        // Shipping address
        setValue("shippingAddress", customer.business_address?.street_1 || "");
        setValue("shippingCity", customer.business_address?.city || "");
        setValue("shippingState", customer.business_address?.state || "");
        setValue("shippingCountry", customer.business_address?.country || "");
        setValue("shippingZip", customer.business_address?.zip || "");

        setValue("businessName", customer.business?.business_name || "");
        setValue(
          "business_country_code",
          customer.business?.business_country_code || ""
        );
        setValue("businessPhone", customer.business?.business_phone || "");
        setValue("businessEmail", customer.business?.business_email || "");
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
      formData.append("fname", data.firstName);
      formData.append("lname", data.lastName);
      formData.append("country_code_primary", data.country_code_primary);
      formData.append("phone_primary", data.primaryPhone);
      formData.append("email_primary", data.primaryEmail);
      formData.append("country_code", data.country_code);
      formData.append("phone_number", data.secondaryPhone || "");
      formData.append("email", data.secondaryEmail || "");

      formData.append("business_name", data.businessName);
      formData.append("business_country_code", data.business_country_code);
      formData.append("business_phone", data.businessPhone);
      formData.append("business_email", data.businessEmail);

      // Billing address
      formData.append(
        "customer_address",
        JSON.stringify({
          street_1: data.billingAddress,
          city: data.billingCity,
          state: data.billingState,
          country: data.billingCountry,
          zip: data.billingZip,
        })
      );

      // Shipping address
      formData.append(
        "business_address",
        JSON.stringify({
          street_1: data.shippingAddress,
          city: data.shippingCity,
          state: data.shippingState,
          country: data.shippingCountry,
          zip: data.shippingZip,
        })
      );

      // Customer image
      if (data.customerImage && data.customerImage.length > 0) {
        formData.append("file", data.customerImage[0]);
      }
      if (data.customer_document && data.customer_document.length > 0) {
        formData.append("customer_document", data.customer_document[0]);
      }
      if (data.business_document && data.business_document.length > 0) {
        formData.append("business_document", data.business_document[0]);
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
                    <div className="col-md-2 pt-3">
                      <Input
                        control={control}
                        name="country_code_primary"
                        label="Country Code"
                        type="tel"
                        placeholder="Enter country code"
                        error={errors.country_code_primary?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-4 pt-3">
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
                    <div className="col-md-2 pt-3">
                      <Input
                        control={control}
                        name="country_code"
                        label="Country Code"
                        type="tel"
                        placeholder="Enter country code"
                        error={errors.country_code?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-4 pt-3">
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
                    <h5 className="card_heading">Customer Address</h5>
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

            <div className="row px-2 pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">Business Information</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="businessName"
                        label="Business Name"
                        type="text"
                        placeholder="Enter business name"
                        error={errors.businessName?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="businessEmail"
                        label="Business Email"
                        type="email"
                        placeholder="Enter business email"
                        error={errors.businessEmail?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-2 pt-3">
                      <Input
                        control={control}
                        name="business_country_code"
                        label="Country Code"
                        type="tel"
                        placeholder="Enter country code"
                        error={errors.business_country_code?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-4 pt-3">
                      <Input
                        control={control}
                        name="businessPhone"
                        label="Business Phone"
                        type="tel"
                        placeholder="Enter business phone number"
                        error={errors.businessPhone?.message}
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
                      <h5 className="card_heading">Business Address</h5>
                    </div>
                    <div className="col-md-4 pt-2">
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="checkbox"
                          id="copyBilling"
                          checked={copyBillingToShipping}
                          onChange={(e) =>
                            handleCopyBillingToShipping(e.target.checked)
                          }
                          className="chx_input"
                        />
                        <label htmlFor="copyBilling" className="chx_lbl">
                          <Check />
                        </label>
                        <label htmlFor="copyBilling" className="font-12">
                          Same as customer address
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
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">Customer Document</h5>
                  </div>
                  <div className="row">
                    <div className="col-12 pt-3">
                      <ImageUpload
                        control={control}
                        name="customer_document"
                        label="Customer Document (Optional)"
                        error={errors.customer_document?.message}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">Business Document</h5>
                  </div>
                  <div className="row">
                    <div className="col-12 pt-3">
                      <ImageUpload
                        control={control}
                        name="business_document"
                        label="Business Document (Optional)"
                        error={errors.business_document?.message}
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
