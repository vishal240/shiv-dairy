import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/inputs/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ApiService from "../services/api";
const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[0-9]{10}$/;
  const profileSchema = yup.object({
    email: yup
      .string()
      .required("Email or Phone number is required")
      .test(
        "is-email-or-phone",
        "Enter a valid email or phone number",
        (value) => {
          return emailRegex.test(value) || phoneRegex.test(value);
        }
      ),
  });
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
    ApiService.post("/admin/forgotAdminPassword", data)
      .then((response: any) => {
        setMessage(response.message);
        navigate("/reset", { state: data });
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
          <h1>Forgot Password</h1>
          <p>
            Enter the registered email id and we will send you a link to reset
            your password
          </p>
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
              name="email"
              label="Email"
              type="text"
              placeholder="Enter your email"
              error={errors.email?.message}
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
            {loading ? "Sending..." : "Submit"}
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

export default ForgotPassword;
