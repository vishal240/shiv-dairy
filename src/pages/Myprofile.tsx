import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Edit, Mail, MapPin, Phone, User, Check, X } from "react-feather";
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
  user_id: yup
    .string()
    .required("User ID is required")
    .min(3, "User ID must be at least 3 characters")
    .max(50, "User ID must not exceed 50 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "User ID can only contain letters, numbers, and underscores"
    ),
  email_primary: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  phone_primary: yup
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

  // Change Password (optional fields)
  old_password: yup
    .string()
    .when(["new_password", "confirm_password"], {
      is: (new_password: string, confirm_password: string) => 
        new_password || confirm_password,
      then: (schema) => schema.required("Old password is required to change password"),
      otherwise: (schema) => schema.optional(),
    }),
  new_password: yup
    .string()
    .when("old_password", {
      is: (old_password: string) => old_password,
      then: (schema) => schema
        .required("New password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
      otherwise: (schema) => schema.optional(),
    }),
  confirm_password: yup
    .string()
    .when("new_password", {
      is: (new_password: string) => new_password,
      then: (schema) => schema
        .required("Please confirm your new password")
        .oneOf([yup.ref("new_password")], "Passwords must match"),
      otherwise: (schema) => schema.optional(),
    }),

  // Profile Image (optional)
  profile_image: yup.mixed().optional(),
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
    reset,
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema) as any,
  });

  const watchedPasswords = watch(["old_password", "new_password", "confirm_password"]);
  const hasPasswordFields = watchedPasswords.some(field => field && field.length > 0);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await ApiService.post("/admin/getAdminDetails", {});
      const profile = response.data;
      setProfileData(profile);
      
      // Populate form with profile data
      setValue("admin_name", profile.admin_name || "");
      setValue("user_id", profile.user_id || "");
      setValue("email_primary", profile.email_primary || "");
      setValue("phone_primary", profile.phone_primary || "");
      setValue("address", profile.address || "");
      setValue("city", profile.city || "");
      setValue("state", profile.state || "");
      setValue("zip", profile.zip || "");
      setValue("country", profile.country || "");
    } catch (error) {
      console.error("Error loading profile:", error);
      alert("Error loading profile data");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Append profile fields
      formData.append("admin_name", data.admin_name);
      formData.append("user_id", data.user_id);
      formData.append("email_primary", data.email_primary);
      formData.append("phone_primary", data.phone_primary);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("zip", data.zip);
      formData.append("country", data.country);

      // Append profile image if provided
      if (data.profile_image && data.profile_image.length > 0) {
        formData.append("profile_image", data.profile_image[0]);
      }

      const response = await ApiService.post("/admin/updateProfile", formData);
      alert(response.message || "Profile updated successfully!");
      setIsEditing(false);
      loadProfile(); // Reload profile data
    } catch (error: any) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const onChangePassword = async (data: ProfileFormData) => {
    if (!hasPasswordFields) {
      alert("Please fill in password fields to change password");
      return;
    }

    setPasswordLoading(true);
    try {
      const response = await ApiService.post("/admin/changePassword", {
        old_password: data.old_password,
        new_password: data.new_password,
        confirm_password: data.confirm_password,
      });
      
      alert(response.message || "Password changed successfully!");
      
      // Clear password fields
      setValue("old_password", "");
      setValue("new_password", "");
      setValue("confirm_password", "");
    } catch (error: any) {
      console.error("Error changing password:", error);
      alert(error.response?.data?.message || "Error changing password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    loadProfile(); // Reset form to original values
  };

  if (loading && !profileData) {
    return (
      <div className="container-fluid">
        <div className="row px-2 pt-3">
          <div className="col-12 text-center">
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

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
              <h1 className="store_name">{profileData?.admin_name || "Admin"}</h1>
              <span className="status in">{profileData?.user_type || "Admin"}</span>
            </div>
            <p className="font-12 text-center color-grey">
              Created on {profileData?.created_on ? new Date(profileData.created_on).toLocaleDateString() : "N/A"}
            </p>
            
            <div className="d-flex gap-10 px-md-2">
              <span className="shop_icon">
                <User />
              </span>
              <div>
                <p className="font-12 color-grey mb-0">User ID</p>
                <p className="font-12">{profileData?.user_id || "N/A"}</p>
              </div>
            </div>
            
            <div className="d-flex gap-10 px-md-2">
              <span className="shop_icon">
                <Mail />
              </span>
              <div>
                <p className="font-12 color-grey mb-0">Email</p>
                <p className="font-12">{profileData?.email_primary || "N/A"}</p>
              </div>
            </div>
            
            <div className="d-flex gap-10 px-md-2">
              <span className="shop_icon">
                <Phone />
              </span>
              <div>
                <p className="font-12 color-grey mb-0">Phone</p>
                <p className="font-12">{profileData?.phone_primary || "N/A"}</p>
              </div>
            </div>
            
            <div className="d-flex gap-10 px-md-2">
              <span className="shop_icon">
                <MapPin />
              </span>
              <div>
                <p className="font-12 color-grey mb-0">Address</p>
                <p className="font-12">
                  {profileData?.address ? 
                    `${profileData.address}, ${profileData.city}, ${profileData.state}, ${profileData.zip}, ${profileData.country}` 
                    : "N/A"
                  }
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
                        name="user_id"
                        label="User ID"
                        type="text"
                        placeholder="Enter user ID"
                        error={errors.user_id?.message}
                        disabled={!isEditing || loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="email_primary"
                        label="Email Address"
                        type="email"
                        placeholder="Enter email address"
                        error={errors.email_primary?.message}
                        disabled={!isEditing || loading}
                      />
                    </div>
                    <div className="col-md-6 pt-3">
                      <Input
                        control={control}
                        name="phone_primary"
                        label="Phone"
                        type="tel"
                        placeholder="Enter phone number"
                        error={errors.phone_primary?.message}
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
                <div className="row">
                  <div className="col-md-4 pt-3">
                    <Input
                      control={control}
                      name="old_password"
                      label="Old Password"
                      type="password"
                      placeholder="Enter old password"
                      error={errors.old_password?.message}
                      disabled={loading || passwordLoading}
                    />
                  </div>
                  <div className="col-md-4 pt-3">
                    <Input
                      control={control}
                      name="new_password"
                      label="New Password"
                      type="password"
                      placeholder="Enter new password"
                      error={errors.new_password?.message}
                      disabled={loading || passwordLoading}
                    />
                  </div>
                  <div className="col-md-4 pt-3">
                    <Input
                      control={control}
                      name="confirm_password"
                      label="Confirm Password"
                      type="password"
                      placeholder="Confirm new password"
                      error={errors.confirm_password?.message}
                      disabled={loading || passwordLoading}
                    />
                  </div>
                  <div className="col-12 pt-3">
                    <button
                      type="button"
                      className="black_btn"
                      onClick={handleSubmit(onChangePassword)}
                      disabled={loading || passwordLoading || !hasPasswordFields}
                    >
                      <Check /> {passwordLoading ? "Changing..." : "Change Password"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;