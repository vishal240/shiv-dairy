import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Check, X, Plus, Trash2 } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Input from "../components/inputs/Input";
import Select from "../components/inputs/Select";
import type { PurchaseFormData, Store, Product } from "../types/purchase";
import ApiService from "../services/api";

// Validation schema
const purchaseSchema = yup.object({
  // Basic Information
  store_id: yup.string().required("Store selection is required"),

  purchase_date: yup.string().required("Purchase date is required"),

  // Purchase Items
  products: yup
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
      })
    )
    .min(1, "At least one purchase item is required"),
});

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
      products: [
        {
          product_id: "",
          quantity: 1,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const watchedItems = watch("products");

  // Load initial data
  useEffect(() => {
    loadStores();
    if (id) {
      loadPurchase(id);
    }
  }, [id]);

  const loadStores = () => {
    ApiService.post("/admin/listStores", {})
      .then((response: any) => {
        setStores(response.data.list || []);
      })
      .catch((error: any) => {
        console.error("Error loading stores:", error);
      });
  };

  const loadProducts = (store_id: string) => {
    ApiService.post("/admin/listProducts", {
      filters: {
        store_id: store_id,
      },
    })
      .then((response: any) => {
        setProducts(response.data.list || []);
      })
      .catch((error: any) => {
        console.error("Error loading products:", error);
      });
  };

  const loadPurchase = (purchaseId: string) => {
    setLoading(true);
    ApiService.post("/admin/detailPurchase", {
      purchase_id: purchaseId,
    })
      .then((response: any) => {
        const purchase = response.data;
        console.log(purchase);
        // Populate form with purchase data
        setValue("store_id", purchase.store_id._id);
        setValue("purchase_date", purchase.purchase_date.split("T")[0]);
        setValue(
          "products",
          purchase.items.map((item: any) => ({
            product_id: item.product_id._id,
            quantity: item.quantity,
          }))
        );
        loadProducts(purchase.store_id._id);
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
      const endpoint = id ? "/admin/editPurchase" : "/admin/createPurchase";
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
    });
  };

  const removePurchaseItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const handleProductChange = (index: number, productId: string) => {
    const selectedProduct = products.find((p) => p._id === productId);
    setValue(`products.${index}.product_id`, selectedProduct?._id || "");
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
                    <div className="col-6 pt-3">
                      <Select
                        control={control}
                        name="store_id"
                        label="Select Store"
                        options={storeOptions}
                        error={errors.store_id?.message}
                        disabled={loading}
                        onChange={(e: any) => {
                          setValue("store_id", e.target.value);
                          loadProducts(e.target.value);
                        }}
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
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Items */}
            <div className="row px-2 pt-3">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <div className="col-md-10">
                      <h5 className="card_heading">Purchase Items</h5>
                    </div>
                    <div className="col-md-2 text-end">
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
                          name={`products.${index}.product_id`}
                          label="Product"
                          options={productOptions}
                          error={errors.products?.[index]?.product_id?.message}
                          disabled={loading}
                          onChange={(e) =>
                            handleProductChange(index, e.target.value)
                          }
                        />
                      </div>
                      <div className="col-md-2 pt-3">
                        <Input
                          control={control}
                          name={`products.${index}.quantity`}
                          label="Quantity"
                          type="number"
                          min="1"
                          placeholder="Enter quantity"
                          error={errors.products?.[index]?.quantity?.message}
                          disabled={loading}
                        />
                      </div>

                      <div className="col-md-2 pt-3 d-flex align-items-center">
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
        </div>
      </form>
    </div>
  );
};

export default AddPurchase;
