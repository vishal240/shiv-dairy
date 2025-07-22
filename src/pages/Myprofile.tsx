import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Edit, Mail, MapPin, Phone, Check, X } from "react-feather";
import { useState, useEffect } from "react";

import Input from "../components/inputs/Input";
import ImageUpload from "../components/inputs/ImageUpload";
import type { ProfileFormData, AdminProfile } from "../types/profile";
import ApiService from "../services/api";

import amulbanner from "../assets/ban2.jpg";
import profile from "../assets/profile.jpg";

// Validation schema
const profileSchema = yup.object({
  // General Information
  admin_name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  // user_id: yup.string(),
  // .required("User ID is required")
  // .min(3, "User ID must be at least 3 characters")
  // .max(50, "User ID must not exceed 50 characters")
  // .matches(
  //   /^[a-zA-Z0-9_]+$/,
  //   "User ID can only contain letters, numbers, and underscores"
  // ),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  country_code: yup
    .string()
    .required("Country code is required")
    .matches(/^\+\d{1,4}$/, "Must start with '+' and have 1 to 4 digits"),
  phone_number: yup
    .string()
    .required("Phone is required")
    .matches(/^[+]?[\d\s\-()]{10,15}$/, "Please enter a valid phone number"),
  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must not exceed 200 characters"),
  city: yup
    .string()
    .required("City is required")
    .min(2, "City must be at least 2 characters")
    .max(50, "City must not exceed 50 characters"),
  state: yup
    .string()
    .required("State is required")
    .min(2, "State must be at least 2 characters")
    .max(50, "State must not exceed 50 characters"),
  zip: yup
    .string()
    .required("ZIP code is required")
    .matches(/^[\d\-\s]{3,10}$/, "Please enter a valid ZIP code"),
  country: yup
    .string()
    .required("Country is required")
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must not exceed 50 characters"),

  // Profile Image (optional)
  profile_image: yup.mixed().optional(),
});

const passwordSchema = yup.object({
  old_password: yup
    .string()
    .required("Old password is required")
    .min(8, "Password must be at least 8 characters"),
  new_password: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters"),
  confirm_password: yup
    .string()
    .required("Confirm password is required")
    .min(8, "Password must be at least 8 characters")
    .oneOf([yup.ref("new_password")], "Passwords must match"),
});

const Myprofile = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<AdminProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema) as any,
    defaultValues: {
      admin_name: "",
      email: "",
      country_code: "",
      phone_number: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      profile_image: null,
    },
  });

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: passwordReset,
    setValue: passwordSetValue,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(passwordSchema) as any,
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    setLoading(true);
    ApiService.post("/admin/getAdminDetails", {})
      .then((response: any) => {
        const profile = response.data;
        // console.log(profile);
        setProfileData(profile);

        // Populate form with profile data
        setValue("admin_name", profile.admin_name || "");
        setValue("email", profile.email || "");
        setValue("country_code", profile.country_code || "");
        setValue("phone_number", profile.phone_number || "");
        setValue("address", profile.address?.street_1 || "");
        setValue("city", profile.address?.city || "");
        setValue("state", profile.address?.state || "");
        setValue("zip", profile.address?.zip || "");
        setValue("country", profile.address?.country || "");
      })
      .catch((error) => {
        console.error("Error loading profile:", error);
        alert("Error loading profile data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmit = (data: ProfileFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Append profile fields
      formData.append("admin_name", data.admin_name);
      // formData.append("user_id", data.user_id);
      formData.append("email", data.email);
      formData.append("phone_number", data.phone_number);
      formData.append(
        "address",
        JSON.stringify({
          street_1: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
        })
      );

      // Append profile image if provided
      if (data.profile_image && data.profile_image.length > 0) {
        formData.append("file", data.profile_image[0]);
      }

      ApiService.post("/admin/updateSubAdmin", formData)
        .then((response: any) => {
          alert(response.message || "Profile updated successfully!");
          setIsEditing(false);
          loadProfile(); // Reload profile data
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          alert("Error updating profile data");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const onChangePassword = (data: ProfileFormData) => {
    setPasswordLoading(true);
    ApiService.post("/admin/updateSubAdminPassword", {
      old_password: data.old_password,
      new_password: data.new_password,
      confirm_password: data.confirm_password,
    })
      .then((response: any) => {
        // Clear password fields
        passwordSetValue("old_password", "");
        passwordSetValue("new_password", "");
        passwordSetValue("confirm_password", "");
        passwordReset();
        alert(response.message || "Password changed successfully!");
      })
      .catch((error) => {
        console.error("Error changing password:", error);
        alert(error.response?.data?.message || "Error changing password");
      })
      .finally(() => {
        setPasswordLoading(false);
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
    loadProfile(); // Reset form to original values
  };

  return (
    <div className="container-fluid">
      <div className="row px-2 pt-3">
        <div className="col-md-6 pt-4 pt-md-0">
          <h1 className="page_heading mb-0">My Profile</h1>
          <div className="breadcrumbs">
            <span>Dashboard / </span>
            <span className="active">My Profile</span>
          </div>
        </div>
        <div className="col-md-6 pt-3">
          <span className="gap-10 d-flex align-items-center justify-content-md-end">
            {!isEditing ? (
              <button
                className="black_btn"
                onClick={() => setIsEditing(true)}
                disabled={loading}
              >
                <Edit /> Edit Profile
              </button>
            ) : (
              <>
                <button
                  className="btn_imprt"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  <X /> Cancel
                </button>
                <button
                  className="black_btn"
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                >
                  <Check /> {loading ? "Saving..." : "Save"}
                </button>
              </>
            )}
          </span>
        </div>
      </div>

      <div className="row px-2 py-3">
        <div className="col-md-4 pt-2">
          <div className="store_card">
            <div className="image_wrapper">
              <img src={amulbanner} className="shop_banner" alt="Banner" />
              <img
                src={profileData?.profile_image_url || profile}
                className="shop_img"
                alt="Profile"
              />
            </div>
            <div className="d-flex align-items-start gap-10 justify-content-center pt-4 mt-3">
              <h1 className="store_name">
                {profileData?.admin_name || "Admin"}
              </h1>
              <span className="status in">
                {profileData?.user_type || "Admin"}
              </span>
            </div>
            <p className="font-12 text-center color-grey">
              Created on{" "}
              {profileData?.created_on
                ? new Date(profileData.created_on).toLocaleDateString()
                : "N/A"}
            </p>

            <div className="d-flex gap-10 px-md-2">
              <span className="shop_icon">
                <Mail />
              </span>
              <div>
                <p className="font-12 color-grey mb-0">Email</p>
                <p className="font-12">{profileData?.email || "N/A"}</p>
              </div>
            </div>

            <div className="d-flex gap-10 px-md-2">
              <span className="shop_icon">
                <Phone />
              </span>
              <div>
                <p className="font-12 color-grey mb-0">Phone</p>
                <p className="font-12">{profileData?.phone_number || "N/A"}</p>
              </div>
            </div>

            <div className="d-flex gap-10 px-md-2">
              <span className="shop_icon">
                <MapPin />
              </span>
              <div>
                <p className="font-12 color-grey mb-0">Address</p>
                <p className="font-12">
                  {profileData?.address
                    ? `${profileData.address?.street_1}, ${profileData.address?.city}, ${profileData.address?.state}, ${profileData.address?.zip}, ${profileData.address?.country}`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8 pt-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row px-2">
              <div className="col-12">
                <div className="card_cmn">
                  <div className="row">
                    <h5 className="card_heading">General Information</h5>
                  </div>
                  <div className="row">
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="admin_name"
                        label="Name"
                        type="text"
                        placeholder="Enter your name"
                        error={errors.admin_name?.message}
                        disabled={!isEditing || loading}
                      />
                    </div>

                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="Enter email address"
                        error={errors.email?.message}
                        disabled={!isEditing || loading}
                      />
                    </div>
                    <div className="col-md-2 pt-3">
                      <Input
                        control={control}
                        name="country_code"
                        label="Country Code"
                        type="text"
                        placeholder="Enter country code"
                        error={errors.country_code?.message}
                        disabled={!isEditing || loading}
                      />
                    </div>
                    <div className="col-md-4 pt-3">
                      <Input
                        control={control}
                        name="phone_number"
                        label="Phone"
                        type="tel"
                        placeholder="Enter phone number"
                        error={errors.phone_number?.message}
                        disabled={!isEditing || loading}
                      />
                    </div>
                    <div className="col-12 pt-3">
                      <Input
                        control={control}
                        name="address"
                        label="Address"
                        type="text"
                        placeholder="Enter complete address"
                        error={errors.address?.message}
                        disabled={!isEditing || loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="city"
                        label="City"
                        type="text"
                        placeholder="Enter city"
                        error={errors.city?.message}
                        disabled={!isEditing || loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="state"
                        label="State"
                        type="text"
                        placeholder="Enter state"
                        error={errors.state?.message}
                        disabled={!isEditing || loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="zip"
                        label="ZIP"
                        type="text"
                        placeholder="Enter ZIP code"
                        error={errors.zip?.message}
                        disabled={!isEditing || loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="country"
                        label="Country"
                        type="text"
                        placeholder="Enter country"
                        error={errors.country?.message}
                        disabled={!isEditing || loading}
                      />
                    </div>

                    {isEditing && (
                      <div className="col-12 pt-3">
                        <ImageUpload
                          control={control}
                          name="profile_image"
                          label="Profile Image (Optional)"
                          error={errors.profile_image?.message}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Change Password Section */}
          <div className="row px-2 pt-3">
            <div className="col-12">
              <div className="card_cmn">
                <div className="row">
                  <h5 className="card_heading">Change Password</h5>
                </div>
                <form onSubmit={handlePasswordSubmit(onChangePassword)}>
                  <div className="row">
                    <div className="col-md-4 pt-3">
                      <Input
                        control={passwordControl}
                        name="old_password"
                        label="Old Password"
                        type="password"
                        placeholder="Enter old password"
                        error={passwordErrors.old_password?.message}
                        disabled={loading || passwordLoading}
                      />
                    </div>
                    <div className="col-md-4 pt-3">
                      <Input
                        control={passwordControl}
                        name="new_password"
                        label="New Password"
                        type="password"
                        placeholder="Enter new password"
                        error={passwordErrors.new_password?.message}
                        disabled={loading || passwordLoading}
                      />
                    </div>
                    <div className="col-md-4 pt-3">
                      <Input
                        control={passwordControl}
                        name="confirm_password"
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm new password"
                        error={passwordErrors.confirm_password?.message}
                        disabled={loading || passwordLoading}
                      />
                    </div>
                    <div className="col-12 pt-3">
                      <button
                        type="submit"
                        className="black_btn"
                        disabled={loading || passwordLoading}
                      >
                        <Check />{" "}
                        {passwordLoading ? "Changing..." : "Change Password"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
