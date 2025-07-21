export interface PolicyItem {
  _id: string;
  title: string;
  content: string;
  status: 'active' | 'inactive';
  created_on: string;
  updated_on: string;
}

export interface DiscountCoupon {
  _id: string;
  coupon_name: string;
  coupon_code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_discount_amount?: number;
  valid_from: string;
  valid_till: string;
  usage_limit: number;
  used_count: number;
  status: 'active' | 'inactive' | 'expired';
  description?: string;
  created_on: string;
}

export interface SettingsFormData {
  title: string;
  content: string;
  status: 'active' | 'inactive';
}

export interface DiscountFormData {
  coupon_name: string;
  coupon_code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_discount_amount?: number;
  valid_from: string;
  valid_till: string;
  usage_limit: number;
  status: 'active' | 'inactive';
  description?: string;
}

export interface SettingsTabConfig {
  id: string;
  label: string;
  apiEndpoint: string;
  createEndpoint: string;
  updateEndpoint: string;
  deleteEndpoint: string;
  columns: SettingsColumn[];
  formFields: SettingsFormField[];
}

export interface SettingsColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: any) => React.ReactNode;
}

export interface SettingsFormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'number';
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: any;
}