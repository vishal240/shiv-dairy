import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Check, X } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Input from "../components/inputs/Input";
import Textarea from "../components/inputs/Textarea";
import Select from "../components/inputs/Select";
import ImageUpload from "../components/inputs/ImageUpload";
import type { ProductFormData, Store, Category, Brand } from "../types/product";
import ApiService from "../services/api";

// Validation schema
const productSchema = yup.object({
  // Basic Information
  store_id: yup.string().required("Store selection is required"),
  product_name: yup
    .string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must not exceed 100 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),

  // Categories and Brand
  category_id: yup.string().required("Category selection is required"),
  sub_category_id: yup.string().required("Sub category selection is required"),
  brand_id: yup.string().required("Brand selection is required"),

  // B2B Pricing
  b2b_unit_price: yup
    .number()
    .required("B2B unit price is required")
    .positive("Price must be positive")
    .min(0.01, "Price must be at least 0.01"),
  b2b_min_batch_qty: yup
    .number()
    .required("Minimum batch quantity is required")
    .positive("Quantity must be positive")
    .integer("Quantity must be a whole number"),
  b2b_batch_qty: yup
    .number()
    .required("Batch quantity is required")
    .positive("Quantity must be positive")
    .integer("Quantity must be a whole number"),
  b2b_discount_type: yup.string().required("Discount type is required"),
  b2b_discount_percentage: yup
    .number()
    .required("Discount percentage is required")
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%"),
  b2b_tax_class: yup.string().required("Tax class is required"),
  b2b_amount: yup
    .number()
    .required("B2B amount is required")
    .positive("Amount must be positive"),

  // B2C Pricing
  b2c_unit_price: yup
    .number()
    .required("B2C unit price is required")
    .positive("Price must be positive")
    .min(0.01, "Price must be at least 0.01"),
  b2c_qty: yup
    .number()
    .required("B2C quantity is required")
    .positive("Quantity must be positive")
    .integer("Quantity must be a whole number"),
  b2c_discount_type: yup.string().required("Discount type is required"),
  b2c_discount_percentage: yup
    .number()
    .required("Discount percentage is required")
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%"),
  b2c_tax_class: yup.string().required("Tax class is required"),
  b2c_amount: yup
    .number()
    .required("B2C amount is required")
    .positive("Amount must be positive"),

  // Media
  product_images: yup.mixed().required("Product image is required"),
  product_videos: yup.mixed().optional(),

  // Status
  status: yup.string().required("Status is required"),
});

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const discountTypeOptions = [
  { value: "percentage", label: "Percentage" },
  { value: "fixed", label: "Fixed Amount" },
];

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema) as any,
    defaultValues: {
      status: "active",
      b2b_discount_type: "percentage",
      b2c_discount_type: "percentage",
      b2b_discount_percentage: 0,
      b2c_discount_percentage: 0,
    },
  });

  const selectedCategoryId = watch("category_id");

  // Load initial data
  useEffect(() => {
    loadStores();
    loadCategories();
    loadBrands();
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  // Update subcategories when category changes
  useEffect(() => {
    if (selectedCategoryId) {
      const selectedCategory = categories.find(cat => cat._id === selectedCategoryId);
      setSubCategories(selectedCategory?.subcategories || []);
      setValue("sub_category_id", ""); // Reset subcategory selection
    }
  }, [selectedCategoryId, categories, setValue]);

  const loadStores = async () => {
    try {
      const response = await ApiService.post("/admin/listStores", {});
      setStores(response.data || []);
    } catch (error) {
      console.error("Error loading stores:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await ApiService.post("/admin/getCategoryList", {});
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const loadBrands = async () => {
    try {
      const response = await ApiService.post("/admin/listBrands", {});
      setBrands(response.data || []);
    } catch (error) {
      console.error("Error loading brands:", error);
    }
  };

  const loadProduct = async (productId: string) => {
    try {
      const response = await ApiService.post("/admin/getProductDetails", {
        product_id: productId,
      });
      const product = response.data;
      
      // Populate form with product data
      Object.keys(product).forEach((key) => {
        if (key in product) {
          setValue(key as keyof ProductFormData, product[key]);
        }
      });
    } catch (error) {
      console.error("Error loading product:", error);
      alert("Error loading product details");
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Append all form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'product_images' && key !== 'product_videos') {
          formData.append(key, value.toString());
        }
      });

      // Append files
      if (data.product_images && data.product_images.length > 0) {
        Array.from(data.product_images).forEach((file, index) => {
          formData.append(`product_image_${index}`, file);
        });
      }

      if (data.product_videos && data.product_videos.length > 0) {
        Array.from(data.product_videos).forEach((file, index) => {
          formData.append(`product_video_${index}`, file);
        });
      }

      const endpoint = id ? "/admin/editProduct" : "/admin/createProduct";
      if (id) {
        formData.append("product_id", id);
      }

      const response = await ApiService.post(endpoint, formData);
      alert(response.message || "Product saved successfully!");
      navigate("/products");
    } catch (error: any) {
      console.error("Error saving product:", error);
      alert(error.response?.data?.message || "Error saving product");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    navigate("/products");
  };

  const storeOptions = stores.map(store => ({
    value: store._id,
    label: store.store_name
  }));

  const categoryOptions = categories.map(category => ({
    value: category._id,
    label: category.product_category_name
  }));

  const subCategoryOptions = subCategories.map(subCategory => ({
    value: subCategory._id,
    label: subCategory.product_category_name
  }));

  const brandOptions = brands.map(brand => ({
    value: brand._id,
    label: brand.brand_name
  }));

  return (
    <div className="container-fluid">
      <div className="row px-2 pt-3">
        <div className="col-md-6 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">
            {id ? "Edit Product" : "Add Product"}
          </h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span>Product List / </span>
            <span className="active">{id ? "Edit Product" : "Add Product"}</span>
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
            {/* Product Information */}
            <div className="row px-2 pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">Product Information</h5>
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
                    <div className="col-12 pt-3">
                      <Input
                        control={control}
                        name="product_name"
                        label="Product Name"
                        type="text"
                        placeholder="Enter product name"
                        error={errors.product_name?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-12 pt-3">
                      <Textarea
                        control={control}
                        name="description"
                        label="Product Description"
                        placeholder="Enter product description"
                        error={errors.description?.message}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* B2B Pricing */}
            <div className="row px-2 pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">Pricing B2B</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="b2b_unit_price"
                        label="Unit Price"
                        type="number"
                        step="0.01"
                        placeholder="Enter unit price"
                        error={errors.b2b_unit_price?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="b2b_min_batch_qty"
                        label="Min Batch Qty"
                        type="number"
                        placeholder="Enter minimum batch quantity"
                        error={errors.b2b_min_batch_qty?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-12 pt-3">
                      <Input
                        control={control}
                        name="b2b_batch_qty"
                        label="Batch Qty"
                        type="number"
                        placeholder="Enter batch quantity"
                        error={errors.b2b_batch_qty?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Select
                        control={control}
                        name="b2b_discount_type"
                        label="Discount Type"
                        options={discountTypeOptions}
                        error={errors.b2b_discount_type?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="b2b_discount_percentage"
                        label="Discount Percentage"
                        type="number"
                        step="0.01"
                        placeholder="Enter discount percentage"
                        error={errors.b2b_discount_percentage?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="b2b_tax_class"
                        label="Tax Class"
                        type="text"
                        placeholder="Enter tax class"
                        error={errors.b2b_tax_class?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="b2b_amount"
                        label="Amount"
                        type="number"
                        step="0.01"
                        placeholder="Enter amount"
                        error={errors.b2b_amount?.message}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* B2C Pricing */}
            <div className="row px-2 pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">Pricing B2C</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="b2c_unit_price"
                        label="Unit Price"
                        type="number"
                        step="0.01"
                        placeholder="Enter unit price"
                        error={errors.b2c_unit_price?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="b2c_qty"
                        label="Qty"
                        type="number"
                        placeholder="Enter quantity"
                        error={errors.b2c_qty?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Select
                        control={control}
                        name="b2c_discount_type"
                        label="Discount Type"
                        options={discountTypeOptions}
                        error={errors.b2c_discount_type?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="b2c_discount_percentage"
                        label="Discount Percentage"
                        type="number"
                        step="0.01"
                        placeholder="Enter discount percentage"
                        error={errors.b2c_discount_percentage?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="b2c_tax_class"
                        label="Tax Class"
                        type="text"
                        placeholder="Enter tax class"
                        error={errors.b2c_tax_class?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="b2c_amount"
                        label="Amount"
                        type="number"
                        step="0.01"
                        placeholder="Enter amount"
                        error={errors.b2c_amount?.message}
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
                        name="product_images"
                        label="Product Images"
                        error={errors.product_images?.message}
                        multiple
                      />
                    </div>
                    <div className="col-12">
                      <ImageUpload
                        control={control}
                        name="product_videos"
                        label="Product Videos (Optional)"
                        error={errors.product_videos?.message}
                        multiple
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
          </div>

          {/* Sidebar */}
          <div className="col-md-4">
            {/* Categories */}
            <div className="row pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">Categories</h5>
                  </div>
                  <div className="row">
                    <div className="col-12 pt-3">
                      <Select
                        control={control}
                        name="category_id"
                        label="Product Categories"
                        options={categoryOptions}
                        error={errors.category_id?.message}
                        disabled={loading}
                      />
                    </div>
                    <div className="col-12 pt-3">
                      <Select
                        control={control}
                        name="sub_category_id"
                        label="Product Sub Categories"
                        options={subCategoryOptions}
                        error={errors.sub_category_id?.message}
                        disabled={loading || !selectedCategoryId}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="row pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">Brands</h5>
                  </div>
                  <div className="row">
                    <div className="col-12 pt-3">
                      <Select
                        control={control}
                        name="brand_id"
                        label="Select Brand"
                        options={brandOptions}
                        error={errors.brand_id?.message}
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
                    <h5 className="card_heading">Status</h5>
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

export default AddProduct;