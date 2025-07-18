export interface PurchaseFormData {
  // Basic Information
  store_id: string;
  purchase_date: string;

  // Purchase Items
  products: PurchaseItem[];

  // Optional ID for editing
  purchase_id?: string;
}

export interface PurchaseItem {
  product_id: string;
  product_name?: string;
  quantity: number;
}

export interface Store {
  _id: string;
  store_name: string;
}

export interface Product {
  _id: string;
  product_name: string;
  sku: string;
  pricing_b2b: {
    price: number;
  };
}
