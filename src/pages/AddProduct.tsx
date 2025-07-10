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
  { value: "draft", label: "Draft" },
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
      b2b_min_batch_qty: 1,
      b2b_discount_type: "percentage",
      b2c_discount_type: "percentage",
      b2b_discount_percentage: 0,
      b2c_discount_percentage: 0,
      b2b_batch_qty: 1,
    },
  });

  const selectedCategoryId = watch("category_id");

  useEffect(() => {
    if (watch("b2b_discount_type") === "percentage") {
      const finalPrice =
        Number(watch("b2b_unit_price")) * Number(watch("b2b_batch_qty")) -
        (Number(watch("b2b_unit_price")) *
          Number(watch("b2b_batch_qty")) *
          Number(watch("b2b_discount_percentage"))) /
          100;
      setValue("b2b_amount", finalPrice);
    } else {
      const finalPrice =
        Number(watch("b2b_unit_price")) * Number(watch("b2b_batch_qty")) -
        Number(watch("b2b_discount_percentage"));
      setValue("b2b_amount", finalPrice);
    }
  }, [
    watch("b2b_unit_price"),
    watch("b2b_batch_qty"),
    watch("b2b_discount_percentage"),
    watch("b2b_discount_type"),
  ]);

  useEffect(() => {
    if (watch("b2c_discount_type") === "percentage") {
      const finalPrice =
        Number(watch("b2c_unit_price")) * Number(watch("b2c_qty")) -
        (Number(watch("b2c_unit_price")) *
          Number(watch("b2c_qty")) *
          Number(watch("b2c_discount_percentage"))) /
          100;
      setValue("b2c_amount", finalPrice);
    } else {
      const finalPrice =
        Number(watch("b2c_unit_price")) * Number(watch("b2c_qty")) -
        Number(watch("b2c_discount_percentage"));
      setValue("b2c_amount", finalPrice);
    }
  }, [
    watch("b2c_unit_price"),
    watch("b2c_qty"),
    watch("b2c_discount_percentage"),
    watch("b2c_discount_type"),
  ]);

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
      ApiService.post("/admin/getSubCategories", {
        parent_category_id: selectedCategoryId,
      })
        .then((response: any) => {
          setSubCategories(response.data || []);
        })
        .catch((error: any) => {
          console.error("Error loading subcategories:", error);
        });
      setValue("sub_category_id", ""); // Reset subcategory selection
    }
  }, [selectedCategoryId, setValue]);

  const loadStores = () => {
    ApiService.post("/admin/listStores", {})
      .then((response: any) => {
        setStores(response.data.list || []);
      })
      .catch((error: any) => {
        console.error("Error loading stores:", error);
      });
  };

  const loadCategories = () => {
    ApiService.post("/admin/getCategoryList", {})
      .then((response: any) => {
        setCategories(response.data.list || []);
      })
      .catch((error: any) => {
        console.error("Error loading categories:", error);
      });
  };

  const loadBrands = () => {
    ApiService.post("/admin/listBrands", {})
      .then((response: any) => {
        setBrands(response.data.list || []);
      })
      .catch((error: any) => {
        console.error("Error loading brands:", error);
      });
  };

  const loadProduct = (productId: string) => {
    ApiService.post("/admin/getProductDetails", {
      product_id: productId,
    })
      .then((response: any) => {
        const product = response.data;
        console.log(product);
        setValue("product_name", product.product_name);
        setValue("store_id", product.store_id._id);
        setValue("category_id", product.category_id._id);
        setValue("sub_category_id", product.subcategory_id._id);
        setValue("brand_id", product.brand_id._id);
        setValue("b2b_batch_qty", product.pricing_b2b.batch);
        setValue("b2b_min_batch_qty", product.pricing_b2b.batch_quantity);
        setValue("b2b_discount_type", product.pricing_b2b.discount_type);
        setValue(
          "b2b_discount_percentage",
          product.pricing_b2b.discount_percentage
        );
        setValue("b2b_unit_price", product.pricing_b2b.price);
        setValue("b2b_amount", product.pricing_b2b.final_price);
        setValue("b2c_qty", product.pricing_b2c.quantity);
        setValue("b2c_discount_type", product.pricing_b2c.discount_type);
        setValue(
          "b2c_discount_percentage",
          product.pricing_b2c.discount_percentage
        );
        setValue("b2c_unit_price", product.pricing_b2c.price);
        setValue("b2c_amount", product.pricing_b2c.final_price);
        setValue("status", product.status);
        console.log(product);
        // Populate form with product data
        // Object.keys(product).forEach((key) => {
        //   if (key in product) {
        //     setValue(key as keyof ProductFormData, product[key]);
        //   }
        // });
      })
      .catch((error: any) => {
        console.error("Error loading product:", error);
      });
  };

  const onSubmit = (data: ProductFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("product_name", data.product_name);
      formData.append("store_id", data.store_id);
      formData.append("category_id", data.category_id);
      formData.append("subcategory_id", data.sub_category_id);
      formData.append("brand_id", data.brand_id);
      formData.append(
        "pricing_b2b",
        JSON.stringify({
          batch: data.b2b_batch_qty,
          batch_quantity: data.b2b_min_batch_qty,
          discount_type: data.b2b_discount_type,
          discount_percentage: data.b2b_discount_percentage,
          price: data.b2b_unit_price,
          final_price: data.b2b_amount,
        })
      );
      formData.append(
        "pricing_b2c",
        JSON.stringify({
          quantity: data.b2c_qty,
          discount_type: data.b2c_discount_type,
          discount_percentage: data.b2c_discount_percentage,
          price: data.b2c_unit_price,
          final_price: data.b2c_amount,
        })
      );
      if (data.product_images && data.product_images.length > 0) {
        for (let i = 0; i < data.product_images.length; i++) {
          formData.append("product_images", data.product_images[i]);
        }
      }
      if (data.product_videos && data.product_videos.length > 0) {
        for (let i = 0; i < data.product_videos.length; i++) {
          formData.append("product_images", data.product_videos[i]);
        }
      }
      formData.append("status", data.status);

      const endpoint = id ? "/admin/editProduct" : "/admin/addProduct";
      if (id) {
        formData.append("product_id", id);
      }

      ApiService.post(endpoint, formData)
        .then((response: any) => {
          alert(response.message || "Product saved successfully!");
          navigate("/products");
        })
        .catch((error: any) => {
          console.error("Error saving product:", error);
          alert(error.response?.data?.message || "Error saving product");
        });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    navigate("/products");
  };

  const storeOptions = stores.map((store) => ({
    value: store._id,
    label: store.store_name,
  }));

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.product_category_name,
  }));

  const subCategoryOptions = subCategories.map((subCategory) => ({
    value: subCategory._id,
    label: subCategory.product_category_name,
  }));

  const brandOptions = brands.map((brand) => ({
    value: brand._id,
    label: brand.brand_name,
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
            <span className="active">
              {id ? "Edit Product" : "Add Product"}
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
                        label="Batch"
                        type="number"
                        placeholder="Enter batch"
                        error={errors.b2b_min_batch_qty?.message}
                        disabled={true}
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
                        label="Discount"
                        type="number"
                        step="0.01"
                        placeholder="Enter discount"
                        error={errors.b2b_discount_percentage?.message}
                        disabled={loading}
                      />
                    </div>

                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="b2b_amount"
                        label="Final Amount"
                        type="number"
                        step="0.01"
                        placeholder="Enter amount"
                        error={errors.b2b_amount?.message}
                        readOnly={true}
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
                        label="Discount"
                        type="number"
                        step="0.01"
                        placeholder="Enter discount"
                        error={errors.b2c_discount_percentage?.message}
                        disabled={loading}
                      />
                    </div>

                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="b2c_amount"
                        label="Final Amount"
                        type="number"
                        step="0.01"
                        placeholder="Enter amount"
                        error={errors.b2c_amount?.message}
                        readOnly={true}
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
