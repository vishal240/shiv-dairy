import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/inputs/Input";
import type { LoginFormData } from "../Model/login";

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError("");
    try {
      // Simulate API call - replace with your actual authentication logic
      if (
        data.email === "admin@shivdairy.com" &&
        data.password === "password123"
      ) {
        // Generate a mock token - replace with actual token from your API
        const mockToken = "mock-jwt-token-" + Date.now();
        login(mockToken);
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };
  const goToForgotPassword = () => {
    navigate("/forgot");
  };
  return (
    <section className="wrapper">
      <div className="login_card">
        <h1>Admin Login 👋</h1>
        <p>
          Today is a new day. It's your day. You shape it. Sign in to start
          managing your projects.
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              control={control}
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              disabled={loading}
            />
            <Input
              control={control}
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              error={errors.password?.message}
              disabled={loading}
            />
          </div>
        </form>
        <p className="text-right font-12 mt-2">
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={goToForgotPassword}
          >
            Forgot Username/Password?
          </span>
        </p>
        <div>
          <button
            type="button"
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
              width: "100%",
            }}
            className="big_btn"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Submit"}
          </button>
        </div>
        <div style={{ marginTop: "15px", fontSize: "11px", color: "#737791" }}>
          <p>
            <strong>Demo Credentials:</strong>
          </p>
          <p>Email: admin@shivdairy.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </section>
  );
};

export default Login;
