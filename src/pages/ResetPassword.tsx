import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/inputs/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ApiService from "../services/api";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const state = location.state;
  const profileSchema = yup.object({
    email: yup.string(),
    otp: yup
      .string()
      .required("OTP is required")
      .min(6, "OTP must be at least 6 characters"),
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
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const goToLogin = () => {
    navigate("/");
  };

  const onSubmit = (data: any) => {
    setLoading(true);
    data.email = state?.email;
    ApiService.post("/admin/forgotAdminPassword", data)
      .then((response: any) => {
        alert(response.message);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        setError(error.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <section className="wrapper">
        <div className="login_card">
          <h1>Reset Password</h1>
          <p>Enter your new password below</p>

          {error && (
            <div
              className="alert alert-danger"
              style={{
                fontSize: "12px",
                padding: "8px",
                marginBottom: "15px",
                backgroundColor: "#ffe6e6",
                color: "#d63384",
                border: "1px solid #f5c6cb",
                borderRadius: "5px",
              }}
            >
              {error}
            </div>
          )}

          {message && (
            <div
              className="alert alert-success"
              style={{
                fontSize: "12px",
                padding: "8px",
                marginBottom: "15px",
                backgroundColor: "#e6ffe6",
                color: "#198754",
                border: "1px solid #c3e6cb",
                borderRadius: "5px",
              }}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              control={control}
              name="otp"
              label="OTP"
              type="text"
              placeholder="Enter your otp"
              error={errors.otp?.message}
            />
            <Input
              control={control}
              name="new_password"
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              error={errors.new_password?.message}
            />
            <Input
              control={control}
              name="confirm_password"
              label="Confirm Password"
              type="password"
              placeholder="Enter your confirm password"
              error={errors.confirm_password?.message}
            />
          </form>

          <div
            className="big_btn mt-3"
            onClick={handleSubmit(onSubmit)}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Resetting..." : "Submit"}
          </div>

          <p className="text-center font-12 mt-3">
            Remember your password?{" "}
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={goToLogin}
            >
              Back to Login
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
