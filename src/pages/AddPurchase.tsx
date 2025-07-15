import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Check, X, Plus, Trash2 } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Input from "../components/inputs/Input";
import Textarea from "../components/inputs/Textarea";
import Select from "../components/inputs/Select";
import type { PurchaseFormData, Store, Product } from "../types/purchase";
import ApiService from "../services/api";

// Validation schema
const purchaseSchema = yup.object({
  // Basic Information
  store_id: yup.string().required("Store selection is required"),
  supplier_name: yup
    .string()
    .required("Supplier name is required")
    .min(2, "Supplier name must be at least 2 characters")
    .max(100, "Supplier name must not exceed 100 characters"),
  supplier_email: yup
    .string()
    .required("Supplier email is required")
    .email("Please enter a valid email address"),
  supplier_phone: yup
    .string()
    .required("Supplier phone is required")
    .matches(/^[+]?[\d\s\-()]{10,15}$/, "Please enter a valid phone number"),
  supplier_address: yup
    .string()
    .required("Supplier address is required")
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must not exceed 200 characters"),
  purchase_date: yup
    .string()
    .required("Purchase date is required"),
  invoice_number: yup
    .string()
    .required("Invoice number is required")
    .min(3, "Invoice number must be at least 3 characters")
    .max(50, "Invoice number must not exceed 50 characters"),

  // Purchase Items
  purchase_items: yup
    .array()
    .of(
      yup.object({
        product_id: yup.string().required("Product selection is required"),
        quantity: yup
          .number()
          .required("Quantity is required")
          .positive("Quantity must be positive")
          .integer("Quantity must be a whole number")
          .min(1, "Quantity must be at least 1"),
        unit_price: yup
          .number()
          .required("Unit price is required")
          .positive("Unit price must be positive")
          .min(0.01, "Unit price must be at least 0.01"),
        total_price: yup
          .number()
          .required("Total price is required")
          .positive("Total price must be positive"),
      })
    )
    .min(1, "At least one purchase item is required"),

  // Financial Information
  subtotal: yup
    .number()
    .required("Subtotal is required")
    .min(0, "Subtotal cannot be negative"),
  tax_percentage: yup
    .number()
    .required("Tax percentage is required")
    .min(0, "Tax percentage cannot be negative")
    .max(100, "Tax percentage cannot exceed 100%"),
  tax_amount: yup
    .number()
    .required("Tax amount is required")
    .min(0, "Tax amount cannot be negative"),
  discount_percentage: yup
    .number()
    .required("Discount percentage is required")
    .min(0, "Discount percentage cannot be negative")
    .max(100, "Discount percentage cannot exceed 100%"),
  discount_amount: yup
    .number()
    .required("Discount amount is required")
    .min(0, "Discount amount cannot be negative"),
  shipping_cost: yup
    .number()
    .required("Shipping cost is required")
    .min(0, "Shipping cost cannot be negative"),
  total_amount: yup
    .number()
    .required("Total amount is required")
    .positive("Total amount must be positive"),

  // Payment Information
  payment_method: yup.string().required("Payment method is required"),
  payment_status: yup.string().required("Payment status is required"),
  payment_date: yup.string().optional(),

  // Additional Information
  notes: yup.string().optional().max(500, "Notes must not exceed 500 characters"),
  status: yup.string().required("Status is required"),
});

const paymentMethodOptions = [
  { value: "cash", label: "Cash" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cheque", label: "Cheque" },
  { value: "credit_card", label: "Credit Card" },
  { value: "upi", label: "UPI" },
];

const paymentStatusOptions = [
  { value: "pending", label: "Pending" },
  { value: "partial", label: "Partial" },
  { value: "paid", label: "Paid" },
  { value: "overdue", label: "Overdue" },
];

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "confirmed", label: "Confirmed" },
  { value: "received", label: "Received" },
  { value: "cancelled", label: "Cancelled" },
];

const AddPurchase = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState<Store[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<PurchaseFormData>({
    resolver: yupResolver(purchaseSchema) as any,
    defaultValues: {
      status: "draft",
      payment_status: "pending",
      payment_method: "cash",
      tax_percentage: 18,
      discount_percentage: 0,
      shipping_cost: 0,
      purchase_items: [
        {
          product_id: "",
          quantity: 1,
          unit_price: 0,
          total_price: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "purchase_items",
  });

  const watchedItems = watch("purchase_items");
  const watchedTaxPercentage = watch("tax_percentage");
  const watchedDiscountPercentage = watch("discount_percentage");
  const watchedShippingCost = watch("shipping_cost");

  // Load initial data
  useEffect(() => {
    loadStores();
    loadProducts();
    if (id) {
      loadPurchase(id);
    }
  }, [id]);

  // Calculate totals when items change
  useEffect(() => {
    calculateTotals();
  }, [watchedItems, watchedTaxPercentage, watchedDiscountPercentage, watchedShippingCost]);

  // Calculate item total when quantity or unit price changes
  useEffect(() => {
    watchedItems?.forEach((item, index) => {
      const total = (item.quantity || 0) * (item.unit_price || 0);
      setValue(`purchase_items.${index}.total_price`, total);
    });
  }, [watchedItems, setValue]);

  const calculateTotals = () => {
    const items = watchedItems || [];
    const subtotal = items.reduce((sum, item) => sum + (item.total_price || 0), 0);
    
    const taxAmount = (subtotal * (watchedTaxPercentage || 0)) / 100;
    const discountAmount = (subtotal * (watchedDiscountPercentage || 0)) / 100;
    const totalAmount = subtotal + taxAmount - discountAmount + (watchedShippingCost || 0);

    setValue("subtotal", subtotal);
    setValue("tax_amount", taxAmount);
    setValue("discount_amount", discountAmount);
    setValue("total_amount", totalAmount);
  };

  const loadStores = () => {
    ApiService.post("/admin/listStores", {})
      .then((response: any) => {
        setStores(response.data.list || []);
      })
      .catch((error: any) => {
        console.error("Error loading stores:", error);
      });
  };

  const loadProducts = () => {
    ApiService.post("/admin/listProducts", {})
      .then((response: any) => {
        setProducts(response.data.list || []);
      })
      .catch((error: any) => {
        console.error("Error loading products:", error);
      });
  };

  const loadPurchase = (purchaseId: string) => {
    setLoading(true);
    ApiService.post("/admin/getPurchaseDetails", {
      purchase_id: purchaseId,
    })
      .then((response: any) => {
        const purchase = response.data;
        
        // Populate form with purchase data
        setValue("store_id", purchase.store_id._id);
        setValue("supplier_name", purchase.supplier_name);
        setValue("supplier_email", purchase.supplier_email);
        setValue("supplier_phone", purchase.supplier_phone);
        setValue("supplier_address", purchase.supplier_address);
        setValue("purchase_date", purchase.purchase_date.split('T')[0]);
        setValue("invoice_number", purchase.invoice_number);
        setValue("purchase_items", purchase.purchase_items);
        setValue("subtotal", purchase.subtotal);
        setValue("tax_percentage", purchase.tax_percentage);
        setValue("tax_amount", purchase.tax_amount);
        setValue("discount_percentage", purchase.discount_percentage);
        setValue("discount_amount", purchase.discount_amount);
        setValue("shipping_cost", purchase.shipping_cost);
        setValue("total_amount", purchase.total_amount);
        setValue("payment_method", purchase.payment_method);
        setValue("payment_status", purchase.payment_status);
        setValue("payment_date", purchase.payment_date?.split('T')[0] || "");
        setValue("notes", purchase.notes || "");
        setValue("status", purchase.status);
      })
      .catch((error: any) => {
        console.error("Error loading purchase:", error);
        alert("Error loading purchase data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmit = (data: PurchaseFormData) => {
    setLoading(true);
    try {
      const endpoint = id ? "/admin/editPurchase" : "/admin/addPurchase";
      const submitData = { ...data };
      
      if (id) {
        submitData.purchase_id = id;
      }

      ApiService.post(endpoint, submitData)
        .then((response: any) => {
          alert(response.message || "Purchase saved successfully!");
          navigate("/purchase");
        })
        .catch((error: any) => {
          console.error("Error saving purchase:", error);
          alert(error.response?.data?.message || "Error saving purchase");
        });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    navigate("/purchase");
  };

  const addPurchaseItem = () => {
    append({
      product_id: "",
      quantity: 1,
      unit_price: 0,
      total_price: 0,
    });
  };

  const removePurchaseItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const handleProductChange = (index: number, productId: string) => {
    const selectedProduct = products.find(p => p._id === productId);
    if (selectedProduct) {
      setValue(`purchase_items.${index}.unit_price`, selectedProduct.pricing_b2b.price);
      const quantity = watchedItems[index]?.quantity || 1;
      setValue(`purchase_items.${index}.total_price`, quantity * selectedProduct.pricing_b2b.price);
    }
  };

  const storeOptions = stores.map((store) => ({
    value: store._id,
    label: store.store_name,
  }));

  const productOptions = products.map((product) => ({
    value: product._id,
    label: `${product.product_name} (${product.sku})`,
  }));

  return (
    <div className="container-fluid">
      <div className="row px-2 pt-3">
        <div className="col-md-6 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">
            {id ? "Edit Purchase" : "Add Purchase"}
          </h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span>Purchase List / </span>
            <span className="active">
              {id ? "Edit Purchase" : "Add Purchase"}
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
            {/* Basic Information */}
            <div className="row px-2 pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">Purchase Information</h5>
                  </div>
                  <div className="row">
                    <div className="col-12 pt-3">
                      <Select
                        control={control}
                        name="store_id"
                        label="Select Store"
                        options={storeOptions}
                        error={errors.store_id?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="purchase_date"
                        label="Purchase Date"
                        type="date"
                        error={errors.purchase_date?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="invoice_number"
                        label="Invoice Number"
                        type="text"
                        placeholder="Enter invoice number"
                        error={errors.invoice_number?.message}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Supplier Information */}
            <div className="row px-2 pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">Supplier Information</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="supplier_name"
                        label="Supplier Name"
                        type="text"
                        placeholder="Enter supplier name"
                        error={errors.supplier_name?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="supplier_email"
                        label="Supplier Email"
                        type="email"
                        placeholder="Enter supplier email"
                        error={errors.supplier_email?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="supplier_phone"
                        label="Supplier Phone"
                        type="tel"
                        placeholder="Enter supplier phone"
                        error={errors.supplier_phone?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="supplier_address"
                        label="Supplier Address"
                        type="text"
                        placeholder="Enter supplier address"
                        error={errors.supplier_address?.message}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Items */}
            <div className="row px-2 pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <div className="col-md-8">
                      <h5 className="card_heading">Purchase Items</h5>
                    </div>
                    <div className="col-md-4 text-end">
                      <button
                        type="button"
                        className="black_btn"
                        onClick={addPurchaseItem}
                        disabled={loading}
                      >
                        <Plus /> Add Item
                      </button>
                    </div>
                  </div>
                  {fields.map((field, index) => (
                    <div key={field.id} className="row border-bottom pb-3 mb-3">
                      <div className="col-md-4 pt-3">
                        <Select
                          control={control}
                          name={`purchase_items.${index}.product_id`}
                          label="Product"
                          options={productOptions}
                          error={errors.purchase_items?.[index]?.product_id?.message}
                          disabled={loading}
                          onChange={(e) => handleProductChange(index, e.target.value)}
                        />
                      </div>
                      <div className="col-md-2 pt-3">
                        <Input
                          control={control}
                          name={`purchase_items.${index}.quantity`}
                          label="Quantity"
                          type="number"
                          min="1"
                          placeholder="Enter quantity"
                          error={errors.purchase_items?.[index]?.quantity?.message}
                          disabled={loading}
                        />
                      </div>
                      <div className="col-md-2 pt-3">
                        <Input
                          control={control}
                          name={`purchase_items.${index}.unit_price`}
                          label="Unit Price"
                          type="number"
                          step="0.01"
                          min="0.01"
                          placeholder="Enter unit price"
                          error={errors.purchase_items?.[index]?.unit_price?.message}
                          disabled={loading}
                        />
                      </div>
                      <div className="col-md-2 pt-3">
                        <Input
                          control={control}
                          name={`purchase_items.${index}.total_price`}
                          label="Total Price"
                          type="number"
                          step="0.01"
                          placeholder="Total price"
                          error={errors.purchase_items?.[index]?.total_price?.message}
                          readOnly
                        />
                      </div>
                      <div className="col-md-2 pt-3 d-flex align-items-end">
                        <button
                          type="button"
                          className="common-button text-red w-100"
                          onClick={() => removePurchaseItem(index)}
                          disabled={loading || fields.length === 1}
                        >
                          <Trash2 /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="row px-2 pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">Financial Details</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="subtotal"
                        label="Subtotal"
                        type="number"
                        step="0.01"
                        placeholder="Subtotal"
                        error={errors.subtotal?.message}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="tax_percentage"
                        label="Tax Percentage (%)"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        placeholder="Enter tax percentage"
                        error={errors.tax_percentage?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="tax_amount"
                        label="Tax Amount"
                        type="number"
                        step="0.01"
                        placeholder="Tax amount"
                        error={errors.tax_amount?.message}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="discount_percentage"
                        label="Discount Percentage (%)"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        placeholder="Enter discount percentage"
                        error={errors.discount_percentage?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="discount_amount"
                        label="Discount Amount"
                        type="number"
                        step="0.01"
                        placeholder="Discount amount"
                        error={errors.discount_amount?.message}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="shipping_cost"
                        label="Shipping Cost"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Enter shipping cost"
                        error={errors.shipping_cost?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-12 pt-3">
                      <Input
                        control={control}
                        name="total_amount"
                        label="Total Amount"
                        type="number"
                        step="0.01"
                        placeholder="Total amount"
                        error={errors.total_amount?.message}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="row px-2 pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">Additional Information</h5>
                  </div>
                  <div className="row">
                    <div className="col-12 pt-3">
                      <Textarea
                        control={control}
                        name="notes"
                        label="Notes (Optional)"
                        placeholder="Enter any additional notes"
                        error={errors.notes?.message}
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
            {/* Payment Information */}
            <div className="row pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">Payment Information</h5>
                  </div>
                  <div className="row">
                    <div className="col-12 pt-3">
                      <Select
                        control={control}
                        name="payment_method"
                        label="Payment Method"
                        options={paymentMethodOptions}
                        error={errors.payment_method?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-12 pt-3">
                      <Select
                        control={control}
                        name="payment_status"
                        label="Payment Status"
                        options={paymentStatusOptions}
                        error={errors.payment_status?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-12 pt-3">
                      <Input
                        control={control}
                        name="payment_date"
                        label="Payment Date (Optional)"
                        type="date"
                        error={errors.payment_date?.message}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="row pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">Purchase Status</h5>
                  </div>
                  <div className="row">
                    <div className="col-12 pt-3">
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPurchase;