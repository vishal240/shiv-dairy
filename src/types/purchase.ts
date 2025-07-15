export interface PurchaseFormData {
  // Basic Information
  store_id: string;
  supplier_name: string;
  supplier_email: string;
  supplier_phone: string;
  supplier_address: string;
  purchase_date: string;
  invoice_number: string;
  
  // Purchase Items
  purchase_items: PurchaseItem[];
  
  // Totals
  subtotal: number;
  tax_percentage: number;
  tax_amount: number;
  discount_percentage: number;
  discount_amount: number;
  shipping_cost: number;
  total_amount: number;
  
  // Payment Information
  payment_method: string;
  payment_status: string;
  payment_date?: string;
  
  // Additional Information
  notes?: string;
  status: string;
  
  // Optional ID for editing
  purchase_id?: string;
}

export interface PurchaseItem {
  product_id: string;
  product_name?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
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

export interface Purchase {
  _id: string;
  store_id: Store;
  supplier_name: string;
  supplier_email: string;
  supplier_phone: string;
  supplier_address: string;
  purchase_date: string;
  invoice_number: string;
  purchase_items: PurchaseItem[];
  subtotal: number;
  tax_percentage: number;
  tax_amount: number;
  discount_percentage: number;
  discount_amount: number;
  shipping_cost: number;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  payment_date?: string;
  notes?: string;
  status: string;
  created_on: string;
  is_deleted: boolean;
}