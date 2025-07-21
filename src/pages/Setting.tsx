import React from 'react';
import * as yup from 'yup';
import SettingsTab from '../components/Settings/SettingsTab';
import type { SettingsTabConfig } from '../types/settings';

const Setting = () => {
  // Configuration for different settings tabs
  const tabConfigs: SettingsTabConfig[] = [
    {
      id: 'privacy-policy',
      label: 'Privacy Policy',
      apiEndpoint: '/admin/listPrivacyPolicy',
      createEndpoint: '/admin/createPrivacyPolicy',
      updateEndpoint: '/admin/updatePrivacyPolicy',
      deleteEndpoint: '/admin/deletePrivacyPolicy',
      columns: [
        {
          key: 'title',
          label: 'Policy Title',
          sortable: true,
        },
        {
          key: 'created_on',
          label: 'Added On',
          sortable: true,
        },
        {
          key: 'status',
          label: 'Status',
        },
      ],
      formFields: [
        {
          name: 'title',
          label: 'Policy Title',
          type: 'text',
          required: true,
          validation: yup
            .string()
            .required('Policy title is required')
            .min(3, 'Title must be at least 3 characters')
            .max(100, 'Title must not exceed 100 characters'),
        },
        {
          name: 'content',
          label: 'Policy Content',
          type: 'textarea',
          required: true,
          validation: yup
            .string()
            .required('Policy content is required')
            .min(10, 'Content must be at least 10 characters'),
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: true,
          options: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ],
        },
      ],
    },
    {
      id: 'shipping-policy',
      label: 'Shipping Policy',
      apiEndpoint: '/admin/listShippingPolicy',
      createEndpoint: '/admin/createShippingPolicy',
      updateEndpoint: '/admin/updateShippingPolicy',
      deleteEndpoint: '/admin/deleteShippingPolicy',
      columns: [
        {
          key: 'title',
          label: 'Policy Title',
          sortable: true,
        },
        {
          key: 'created_on',
          label: 'Added On',
          sortable: true,
        },
        {
          key: 'status',
          label: 'Status',
        },
      ],
      formFields: [
        {
          name: 'title',
          label: 'Policy Title',
          type: 'text',
          required: true,
          validation: yup
            .string()
            .required('Policy title is required')
            .min(3, 'Title must be at least 3 characters')
            .max(100, 'Title must not exceed 100 characters'),
        },
        {
          name: 'content',
          label: 'Policy Content',
          type: 'textarea',
          required: true,
          validation: yup
            .string()
            .required('Policy content is required')
            .min(10, 'Content must be at least 10 characters'),
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: true,
          options: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ],
        },
      ],
    },
    {
      id: 'terms-conditions',
      label: 'Terms & Conditions',
      apiEndpoint: '/admin/listTermsConditions',
      createEndpoint: '/admin/createTermsConditions',
      updateEndpoint: '/admin/updateTermsConditions',
      deleteEndpoint: '/admin/deleteTermsConditions',
      columns: [
        {
          key: 'title',
          label: 'Terms Title',
          sortable: true,
        },
        {
          key: 'created_on',
          label: 'Added On',
          sortable: true,
        },
        {
          key: 'status',
          label: 'Status',
        },
      ],
      formFields: [
        {
          name: 'title',
          label: 'Terms Title',
          type: 'text',
          required: true,
          validation: yup
            .string()
            .required('Terms title is required')
            .min(3, 'Title must be at least 3 characters')
            .max(100, 'Title must not exceed 100 characters'),
        },
        {
          name: 'content',
          label: 'Terms Content',
          type: 'textarea',
          required: true,
          validation: yup
            .string()
            .required('Terms content is required')
            .min(10, 'Content must be at least 10 characters'),
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: true,
          options: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ],
        },
      ],
    },
    {
      id: 'refund-policy',
      label: 'Refund Policy',
      apiEndpoint: '/admin/listRefundPolicy',
      createEndpoint: '/admin/createRefundPolicy',
      updateEndpoint: '/admin/updateRefundPolicy',
      deleteEndpoint: '/admin/deleteRefundPolicy',
      columns: [
        {
          key: 'title',
          label: 'Policy Title',
          sortable: true,
        },
        {
          key: 'created_on',
          label: 'Added On',
          sortable: true,
        },
        {
          key: 'status',
          label: 'Status',
        },
      ],
      formFields: [
        {
          name: 'title',
          label: 'Policy Title',
          type: 'text',
          required: true,
          validation: yup
            .string()
            .required('Policy title is required')
            .min(3, 'Title must be at least 3 characters')
            .max(100, 'Title must not exceed 100 characters'),
        },
        {
          name: 'content',
          label: 'Policy Content',
          type: 'textarea',
          required: true,
          validation: yup
            .string()
            .required('Policy content is required')
            .min(10, 'Content must be at least 10 characters'),
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: true,
          options: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ],
        },
      ],
    },
    {
      id: 'discount-coupons',
      label: 'Discount Coupons',
      apiEndpoint: '/admin/listDiscountCoupons',
      createEndpoint: '/admin/createDiscountCoupon',
      updateEndpoint: '/admin/updateDiscountCoupon',
      deleteEndpoint: '/admin/deleteDiscountCoupon',
      columns: [
        {
          key: 'coupon_name',
          label: 'Coupon Name',
          sortable: true,
        },
        {
          key: 'coupon_code',
          label: 'Coupon Code',
          sortable: true,
        },
        {
          key: 'discount_value',
          label: 'Discount',
          render: (value: number, item: any) => (
            <span>
              {value}
              {item.discount_type === 'percentage' ? '%' : ' ₹'}
            </span>
          ),
        },
        {
          key: 'valid_till',
          label: 'Valid Till',
          sortable: true,
        },
        {
          key: 'status',
          label: 'Status',
        },
      ],
      formFields: [
        {
          name: 'coupon_name',
          label: 'Coupon Name',
          type: 'text',
          required: true,
          validation: yup
            .string()
            .required('Coupon name is required')
            .min(3, 'Name must be at least 3 characters')
            .max(50, 'Name must not exceed 50 characters'),
        },
        {
          name: 'coupon_code',
          label: 'Coupon Code',
          type: 'text',
          required: true,
          validation: yup
            .string()
            .required('Coupon code is required')
            .min(3, 'Code must be at least 3 characters')
            .max(20, 'Code must not exceed 20 characters')
            .matches(/^[A-Z0-9]+$/, 'Code must contain only uppercase letters and numbers'),
        },
        {
          name: 'discount_type',
          label: 'Discount Type',
          type: 'select',
          required: true,
          options: [
            { value: 'percentage', label: 'Percentage' },
            { value: 'fixed', label: 'Fixed Amount' },
          ],
        },
        {
          name: 'discount_value',
          label: 'Discount Value',
          type: 'number',
          required: true,
          validation: yup
            .number()
            .required('Discount value is required')
            .positive('Discount value must be positive')
            .max(100, 'Percentage discount cannot exceed 100%'),
        },
        {
          name: 'min_order_amount',
          label: 'Minimum Order Amount',
          type: 'number',
          required: true,
          validation: yup
            .number()
            .required('Minimum order amount is required')
            .min(0, 'Amount cannot be negative'),
        },
        {
          name: 'max_discount_amount',
          label: 'Maximum Discount Amount',
          type: 'number',
          required: false,
          validation: yup
            .number()
            .positive('Amount must be positive')
            .nullable(),
        },
        {
          name: 'valid_from',
          label: 'Valid From',
          type: 'date',
          required: true,
          validation: yup
            .string()
            .required('Valid from date is required'),
        },
        {
          name: 'valid_till',
          label: 'Valid Till',
          type: 'date',
          required: true,
          validation: yup
            .string()
            .required('Valid till date is required'),
        },
        {
          name: 'usage_limit',
          label: 'Usage Limit',
          type: 'number',
          required: true,
          validation: yup
            .number()
            .required('Usage limit is required')
            .positive('Usage limit must be positive')
            .integer('Usage limit must be a whole number'),
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: false,
          validation: yup
            .string()
            .max(500, 'Description must not exceed 500 characters'),
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: true,
          options: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ],
        },
      ],
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row px-2 pt-3">
        <div className="col-md-6 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">Settings</h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span>Settings</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 pt-3">
          <ul
            className="nav nav-pills border-bottom mb-3"
            id="pills-tab"
            role="tablist"
          >
            {tabConfigs.map((config, index) => (
              <li key={config.id} className="nav-item" role="presentation">
                <button
                  className={`nav-link ${index === 0 ? 'active' : ''}`}
                  id={`pills-${config.id}-tab`}
                  data-bs-toggle="pill"
                  data-bs-target={`#pills-${config.id}`}
                  type="button"
                  role="tab"
                  aria-controls={`pills-${config.id}`}
                  aria-selected={index === 0}
                >
                  {config.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="tab-content" id="pills-tabContent">
            {tabConfigs.map((config, index) => (
              <div
                key={config.id}
                className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
                id={`pills-${config.id}`}
                role="tabpanel"
                aria-labelledby={`pills-${config.id}-tab`}
              >
                <div className="row px-2">
                  <div className="col-12 pt-2">
                    <SettingsTab config={config} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;